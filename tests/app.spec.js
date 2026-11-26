import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';

const isOwnRequest = (url, baseURL) => new URL(url).origin === new URL(baseURL).origin;

function watchForProblems(page, baseURL) {
  const problems = [];

  page.on('pageerror', (err) => problems.push(`Uncaught exception: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`Console error: ${msg.text()}`);
  });
  page.on('requestfailed', (req) => {
    // Browsers cancel media preloads; a missing file still surfaces as a 404 or wrong content-type.
    const cancelledMedia = req.resourceType() === 'media' && req.failure()?.errorText === 'net::ERR_ABORTED';
    if (isOwnRequest(req.url(), baseURL) && !cancelledMedia) {
      problems.push(`Request failed: ${req.url()} (${req.failure()?.errorText})`);
    }
  });
  page.on('response', (res) => {
    if (!isOwnRequest(res.url(), baseURL)) return;
    if (res.status() >= 400) {
      problems.push(`HTTP ${res.status()}: ${res.url()}`);
      return;
    }
    // Vite serves index.html with a 200 for missing files.
    const type = res.request().resourceType();
    const contentType = res.headers()['content-type'] || '';
    if (type === 'image' && !contentType.startsWith('image/')) {
      problems.push(`Expected an image but got "${contentType}": ${res.url()}`);
    }
    if (type === 'media' && !/^(audio|video)\//.test(contentType)) {
      problems.push(`Expected audio but got "${contentType}": ${res.url()}`);
    }
  });

  return problems;
}

const CANVAS_ONLY_CSS = `
  body > *:not(canvas) { visibility: hidden !important; }
  html, body { background: transparent !important; }
`;

async function captureCanvas(page) {
  const canvas = page.locator('body > canvas').first();
  const png = PNG.sync.read(await canvas.screenshot({ omitBackground: true, style: CANVAS_ONLY_CSS }));
  let litPixels = 0;
  for (let i = 0; i < png.data.length; i += 4) {
    const brightness = png.data[i] + png.data[i + 1] + png.data[i + 2];
    if (png.data[i + 3] > 200 && brightness > 60) litPixels++;
  }
  return { litPixels, totalPixels: png.width * png.height, data: png.data };
}

function differingPixels(a, b) {
  let diff = 0;
  for (let i = 0; i < a.length; i += 4) {
    if (Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]) > 30) diff++;
  }
  return diff;
}

async function captureCanvasCenter(page, size = 40) {
  const box = await page.locator('body > canvas').first().boundingBox();
  const png = PNG.sync.read(await page.screenshot({
    clip: { x: box.x + box.width / 2 - size / 2, y: box.y + box.height / 2 - size / 2, width: size, height: size },
    style: CANVAS_ONLY_CSS,
  }));
  return png;
}

function averageBrightness(data) {
  let total = 0;
  for (let i = 0; i < data.length; i += 4) total += (data[i] + data[i + 1] + data[i + 2]) / 3;
  return total / (data.length / 4);
}

const closeIntro = (page) => page.locator('#intro-box-modal').click({ position: { x: 10, y: 10 } });

test.describe('Simple Solar System Sandbox', () => {
  let problems;

  test.beforeEach(async ({ page, baseURL }) => {
    problems = watchForProblems(page, baseURL);
    await page.goto('./');
    await page.waitForLoadState('networkidle');
  });

  test.afterEach(() => {
    expect(problems, 'the page should load without errors').toEqual([]);
  });

  test('loads with the intro, WebGL canvas, and controls', async ({ page }) => {
    await expect(page).toHaveTitle('Simple Solar System Sandbox');
    await expect(page.locator('#intro-box-modal')).toBeVisible();
    await expect(page.locator('body > canvas').first()).toBeVisible();

    const hasWebGL = await page.evaluate(() => {
      const canvas = document.querySelector('body > canvas');
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    });
    expect(hasWebGL, 'the main canvas should have a WebGL context').toBe(true);

    await expect(page.locator('.lil-gui').getByText('Toggle Orbit Paths')).toBeVisible();
    await expect(page.locator('.lil-gui').getByText('Scale Controls')).toBeVisible();
  });

  test('renders the solar system and keeps animating', async ({ page }) => {
    await closeIntro(page);
    await expect(page.locator('#intro-box-modal')).toBeHidden();

    await page.waitForTimeout(1500);
    const first = await captureCanvas(page);

    expect(first.litPixels, 'the scene should not be blank').toBeGreaterThan(first.totalPixels * 0.01);

    await page.locator('.lil-gui').getByText('Scale Controls').click();
    const timeSlider = page.locator('.lil-gui .controller', { hasText: 'Time Scale' }).locator('input');
    await timeSlider.fill('50');
    await timeSlider.press('Enter');

    await page.waitForTimeout(1500);
    const second = await captureCanvas(page);
    const runningDiff = differingPixels(first.data, second.data);

    const pause = page.locator('.lil-gui').getByRole('button', { name: 'Pause/Resume Time' });
    await pause.click();
    await page.waitForTimeout(500);
    const pausedFirst = await captureCanvas(page);
    await page.waitForTimeout(1500);
    const pausedSecond = await captureCanvas(page);
    const pausedDiff = differingPixels(pausedFirst.data, pausedSecond.data);

    expect(pausedDiff, 'the scene should hold still while time is paused').toBeLessThan(50);
    expect(
      runningDiff,
      'the scene should change over time (animation loop running)',
    ).toBeGreaterThan(Math.max(300, pausedDiff * 10));
  });

  test('intro can be closed and reopened with the About button', async ({ page }) => {
    const intro = page.locator('#intro-box-modal');

    await page.locator('.intro-box h1').click();
    await expect(intro).toBeVisible();

    await closeIntro(page);
    await expect(intro).toBeHidden();

    await page.locator('#about-button').click();
    await expect(intro).toBeVisible();
  });

  test('orbit-path and scale controls respond', async ({ page }) => {
    await closeIntro(page);
    const gui = page.locator('.lil-gui');

    await gui.getByText('Toggle Orbit Paths').click();
    for (const name of ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Hide All', 'Show All']) {
      await gui.getByRole('button', { name, exact: true }).click();
    }

    await gui.getByText('Scale Controls').click();
    const sizeSlider = gui.locator('.controller', { hasText: 'Planet Size Scale' }).locator('input');
    await sizeSlider.fill('100');
    await sizeSlider.press('Enter');
    await expect(sizeSlider).toHaveValue('100');

    await gui.getByRole('button', { name: 'Pause/Resume Time' }).click();
    await gui.getByRole('button', { name: 'Pause/Resume Time' }).click();
  });

  test('music toggle switches on and off', async ({ page }) => {
    await closeIntro(page);
    const button = page.locator('#music-button');

    await button.click();
    await expect(button).toHaveClass(/music-on/);
    await button.click();
    await expect(button).not.toHaveClass(/music-on/);
  });

  test('camera controls and viewport gizmo respond to the mouse', async ({ page }) => {
    await closeIntro(page);
    await page.waitForTimeout(500);

    await page.mouse.move(640, 400);
    await page.mouse.down();
    await page.mouse.move(800, 450, { steps: 10 });
    await page.mouse.up();
    await page.mouse.wheel(0, -500);

    const gizmoInCorner = await page.evaluate(() =>
      [...document.querySelectorAll('body > div')].some((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 50 && r.height > 50 &&
          r.right > window.innerWidth - 40 && r.bottom > window.innerHeight - 40;
      }),
    );
    expect(gizmoInCorner, 'the viewport gizmo should be in the bottom-right corner').toBe(true);
  });

  test('focus controls fly to a planet and show its facts', async ({ page }) => {
    await closeIntro(page);
    const panel = page.locator('#info-panel');
    const gui = page.locator('.lil-gui');

    await gui.getByText('Focus Camera').click();
    await gui.getByRole('button', { name: 'Jupiter', exact: true }).click();
    await expect(panel).toBeVisible();
    await expect(page.locator('#info-panel-title')).toHaveText('Jupiter');
    await expect(panel).toContainText('69,911 km');

    await page.waitForTimeout(2000);
    const { data } = await captureCanvasCenter(page);
    expect(averageBrightness(data), 'the focused planet should fill the center of the view').toBeGreaterThan(60);

    await gui.getByRole('button', { name: 'Release Focus' }).click();
    await expect(panel).toBeHidden();

    await gui.getByRole('button', { name: 'Saturn', exact: true }).click();
    await expect(page.locator('#info-panel-title')).toHaveText('Saturn');
    await page.locator('#info-panel-close').click();
    await expect(panel).toBeHidden();
  });

  test('the Moon can be focused and notes its scaled distance', async ({ page }) => {
    await expect(page.locator('.scale-text')).toContainText('Moon Distance');
    await closeIntro(page);
    const gui = page.locator('.lil-gui');

    await gui.getByText('Focus Camera').click();
    await gui.getByRole('button', { name: 'Moon', exact: true }).click();
    await expect(page.locator('#info-panel-title')).toHaveText('Moon');
    await expect(page.locator('#info-panel')).toContainText('384,400 km (shown scaled with planet size)');
  });

  test('the asteroid belt can be hidden and shown', async ({ page }) => {
    await closeIntro(page);
    const gui = page.locator('.lil-gui');

    await gui.getByText('Scale Controls').click();
    await gui.getByRole('button', { name: 'Pause/Resume Time' }).click();
    await gui.getByText('Toggle Asteroid Belt').click();
    const toggle = gui.getByRole('button', { name: 'Asteroid Belt', exact: true });

    await page.waitForTimeout(500);
    const shown = await captureCanvas(page);
    await toggle.click();
    await page.waitForTimeout(500);
    const hidden = await captureCanvas(page);
    await toggle.click();
    await page.waitForTimeout(500);
    const shownAgain = await captureCanvas(page);

    expect(differingPixels(shown.data, hidden.data), 'hiding the belt should change the view').toBeGreaterThan(50);
    expect(differingPixels(shown.data, shownAgain.data), 'showing it again should restore the view').toBeLessThan(20);
  });

  test('clicking a planet focuses it and Escape releases it', async ({ page }) => {
    await closeIntro(page);
    const panel = page.locator('#info-panel');

    await page.mouse.click(120, 400);
    await expect(panel).toBeVisible();
    await expect(page.locator('#info-panel-title')).toHaveText('Earth');

    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
  });
});
