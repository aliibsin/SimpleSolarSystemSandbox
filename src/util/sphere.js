import * as THREE from 'three';

class Sphere {
  constructor(name, texturePath, radius, options, materialType = THREE.MeshStandardMaterial) {
    this.name = name;
    this.texturePath = texturePath;
    this.radius = radius;
    this.options = options;
    this.materialType = materialType;

    this.widthDivisions = 128;
    this.heightDivisions = 128;

    this.geometry = this.#geometry();
    this.texture = this.#texture();
    this.material = this.#material();
    this.body = this.#body();
  }

  rotateBody (timescale, targetFps, rotationHours, rotationDirection) {
    const radiansPerFrame = (2 * Math.PI) / ((rotationHours / timescale) * targetFps);
    this.body.rotateY(radiansPerFrame * rotationDirection * timescale);
  }

  #geometry () {
    return new THREE.SphereGeometry(this.radius, this.widthDivisions, this.heightDivisions);
  }

  #texture () {
    const texture = new THREE.TextureLoader().load(this.texturePath);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  }

  #material () {
    return new this.materialType({ map: this.texture, ...this.options });
  }

  #body () {
    const body = new THREE.Mesh(this.geometry, this.material);
    body.name = this.name;
    return body;
  }
}

export default Sphere;
