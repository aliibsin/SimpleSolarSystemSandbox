import * as THREE from 'three';

class Ring {
  constructor(scene, name, texturePath, innerRadius, outerRadius, initialPosition, inclination, solarSystemScale) {
    this.name = name;
    this.texturePath = texturePath;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.initialPosition = initialPosition;
    this.inclination = inclination;
    this.solarSystemScale = solarSystemScale;

    this.thetaSegments = 128;
    this.phiSegments = 64;

    this.geometry = this.#geometry();
    this.#setUvForMapTexture();
    this.texture = this.#texture();
    this.material = this.#material();
    this.body = this.#body();

    this.#setInitialOrientation();
    scene.add(this.body);
  }

  #geometry () {
    return new THREE.RingGeometry(this.innerRadius, this.outerRadius, this.thetaSegments);
  }

  #setUvForMapTexture () {
    const midRadius = (this.innerRadius + this.outerRadius) / 2;
    let pos = this.geometry.attributes.position;
    let v3 = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      this.geometry.attributes.uv.setXY(i, v3.length() < midRadius ? 0 : 1, 1);
    }
  }

  #texture () {
    return new THREE.TextureLoader().load(this.texturePath);
  }

  #material () {
    return new THREE.MeshStandardMaterial({ map: this.texture, side: THREE.DoubleSide, transparent: true, opacity: 0.8, depthWrite: false });
  }

  #body () {
    const body = new THREE.Mesh(this.geometry, this.material);
    body.castShadow = true;
    body.receiveShadow = true;
    return body;
  }

  #setInitialOrientation () {
    this.body.position.set(0, 0, this.initialPosition / this.solarSystemScale);
    this.body.rotateX(Math.PI / 2);
    this.body.rotateX(-this.inclination * Math.PI / 180);
  }
}

export default Ring;

