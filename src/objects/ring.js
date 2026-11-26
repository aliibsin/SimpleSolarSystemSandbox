import * as THREE from 'three';

class Ring {
  constructor(scene, name, texturePath, innerRadius, outerRadius, inclination) {
    this.name = name;
    this.texturePath = texturePath;
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.inclination = inclination;

    this.thetaSegments = 128;

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
    const pos = this.geometry.attributes.position;
    const uv = this.geometry.attributes.uv;
    const v3 = new THREE.Vector3();
    const width = this.outerRadius - this.innerRadius;

    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      uv.setXY(i, (v3.length() - this.innerRadius) / width, 1);
    }
  }

  #texture () {
    const texture = new THREE.TextureLoader().load(this.texturePath);
    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  }

  #material () {
    return new THREE.MeshStandardMaterial({ map: this.texture, side: THREE.DoubleSide, transparent: true, opacity: 0.8, depthWrite: false });
  }

  #body () {
    return new THREE.Mesh(this.geometry, this.material);
  }

  #setInitialOrientation () {
    this.body.rotateX(Math.PI / 2);
    this.body.rotateX(-this.inclination * Math.PI / 180);
  }
}

export default Ring;

