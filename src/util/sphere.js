import * as THREE from 'three';

class Sphere {
  constructor(name, texturePath, radius, options = {}, materialType = THREE.MeshStandardMaterial) {
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

  #geometry () {
    return new THREE.SphereGeometry(this.radius, this.widthDivisions, this.heightDivisions);
  }

  #texture () {
    const texture = new THREE.TextureLoader().load(`assets/${this.texturePath}`);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  }

  #material () {
    return new this.materialType({ map: this.texture, ...this.options });
  }

  #body () {
    return new THREE.Mesh(this.geometry, this.material);
  }
}

export default Sphere;
