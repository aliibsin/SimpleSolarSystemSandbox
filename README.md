# SimpleSolarSystemSandbox

<div align="center">
   <img src=docs/images/SSSS.png >
</div>
<br/>

Simple Solar System Sandbox is a 3D representation of our solar system: the Sun, the eight planets, the Moon and the asteroid belt. Users can adjust planet size and time scales, follow any body to learn about it, and jump to the real positions of the planets on any date from 1800 to 2050. You can access the live version [here](https://aliibsin.github.io/SimpleSolarSystemSandbox/).

## Usage
This sandbox requires a browser that supports WebGL.

<br/>
<div align="center">
   <img src=docs/images/opening.png >
</div>
<br/>

Click and drag your mouse or use the viewports at the bottom right to rotate. Use the mouse wheel or touch controls to zoom.

<br/>
<div align="center">
   <img src=docs/images/anim_camera.gif >
</div>
<br/>

Use the controls on the top right to:

 * **Focus Camera**: fly to the Sun, a planet, the Moon or the asteroid belt and follow it. A panel shows facts about it. You can also click a body in the scene, and close the panel or press Escape to release it.
 * **Toggle Orbit Paths** and **Toggle Asteroid Belt**: show or hide orbits and the belt.
 * **Set Date**: enter a date or press Today to move every planet and the Moon to its real position on that date, or press Line Up Planets to return to the opening arrangement.
 * **Scale Controls**: pause time and change the time scale and planet size scale.

The readout at the top of the screen shows the simulation clock: the date and time when a date is set, or the time elapsed since the planets were lined up.

<br/>
<div align="center">
   <img src=docs/images/anim_scales.gif >
</div>
<br/>

## Scales and accuracy

 * Distances are 1/10,000 and the Sun is 1/1,000 of real size. Planets are 1/1,000 multiplied by the planet size scale.
 * The Moon's distance from Earth is 1/10,000 multiplied by the planet size scale, so it stays outside Earth at any size.
 * Asteroids are enlarged for visibility. The belt shows 8,000 of the millions of real asteroids.
 * At time scale 1, one simulated hour passes every second.
 * Planet positions use JPL's approximate orbital elements and are within about 0.2° of JPL Horizons between 1800 and 2050. The Moon is within about half a degree. On a real date Earth also turns to the correct time of day.

## Technologies
This app uses

 * JavaScript
 * three.js
 * HTML and CSS

Orbital data comes from JPL's [Approximate Positions of the Planets](https://ssd.jpl.nasa.gov/planets/approx_pos.html) and physical data from NASA's planetary fact sheets.

## Run this sandbox locally
 * Clone repo
 * Run `npm install`
 * Run `npm start`
 * Get local url and paste it in your browser

## Testing
Smoke tests use [Playwright](https://playwright.dev/) to load the app in headless Chromium, against both the production build and the dev server. They check that it loads without errors or missing assets, renders and animates the scene, and that the intro, controls, focus, date controls, music toggle, and camera respond.

 * Run `npx playwright install chromium` (first time only)
 * Run `npm test`

Run them before opening a pull request, especially after upgrading dependencies.

## Future Considerations

 * Ceres and other dwarf planets
 * Real orientations for planets' rotation axes
 * A real-time speed option
