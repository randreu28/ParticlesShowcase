import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

import bufferVertexShader from "../public/config/vertex.glsl";
import bufferFragmentShader from "../public/config/fragment.glsl";

export default function Particles() {
  const ref = useRef();
  useEffect(() => {
    document.getElementsByTagName("body")[0].classList.add("bg-gray-800");
  }, []);

  const [parameters] = useState({
    bufferColor: 0xf8665d,
    particleSize: 2,
    transparencyState: 0.0,
    randomState: 0.0,
    state1: 1.0,
    state2: 1.0,
    state3: 1.0,
  });

  useEffect(() => {
    const canvas = ref.current;

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      if (window.innerWidth >= 768) {
        camera.position.y = 0.3;
        camera.position.z = 2.5;
      }
      if (window.innerWidth >= 1024) {
        camera.position.x = 0;
        camera.position.y = 0.3;
        camera.position.z = 2;
      }
      if (window.innerWidth >= 1280) {
        camera.position.x = -1;
        camera.position.y = 0;
        camera.position.z = 2;
      }

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Scene
    const scene = new THREE.Scene();

    // Cursor
    const mouse = {
      x: 0,
      y: 0,
    };

    window.addEventListener("mousemove", (event) => {
      //Value's domain is [-1, 1]
      mouse.x = (event.clientX / sizes.width) * 2 - 1;
      mouse.y = (event.clientY / sizes.height) * -2 + 1;
    });

    //Geometries (And some more in case GLTFloader fails)
    const geometry = new THREE.BufferGeometry();

    const geometry1 = new THREE.BoxBufferGeometry(1, 1, 1, 16, 16, 16);
    const geometry1Attribute = new THREE.BufferAttribute(
      geometry1.attributes.position.array,
      3
    );

    const geometry2 = new Float32Array(geometry1.attributes.position.count * 3);
    for (let i = 0; i < geometry1.attributes.position.count * 3; i++) {
      geometry2[i] = (Math.random() - 0.5) * 10; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
    }
    const geometry2Attribute = new THREE.BufferAttribute(geometry2, 3);

    const geometry3 = new THREE.DodecahedronBufferGeometry(0.65, 3);
    const geometry3Attribute = new THREE.BufferAttribute(
      geometry3.attributes.position.array,
      3
    );

    const geometry4 = new THREE.TorusBufferGeometry(0.65, 0.2, 16, 100);
    const geometry4Attribute = new THREE.BufferAttribute(
      geometry4.attributes.position.array,
      3
    );

    const geometry5 = new THREE.TorusKnotBufferGeometry(0.65, 0.2, 100, 16);
    const geometry5Attribute = new THREE.BufferAttribute(
      geometry5.attributes.position.array,
      3
    );

    geometry.setAttribute("position", geometry1Attribute);
    geometry.setAttribute("position2", geometry2Attribute);
    geometry.setAttribute("position3", geometry3Attribute);
    geometry.setAttribute("position4", geometry4Attribute);
    geometry.setAttribute("position5", geometry5Attribute);

    const gltfLoader = new GLTFLoader();

    gltfLoader.load("/three/models/king.glb", (gltf) => {
      const geometry3Attribute = new THREE.BufferAttribute(
        gltf.scene.children[0].geometry.attributes.position.array,
        3
      );
      geometry.setAttribute("position3", geometry3Attribute);
    });

    gltfLoader.load("/three/models/rocket.glb", (gltf) => {
      const geometry4Attribute = new THREE.BufferAttribute(
        gltf.scene.children[0].geometry.attributes.position.array,
        3
      );
      geometry.setAttribute("position4", geometry4Attribute);
    });

    gltfLoader.load("/three/models/lightbulb.glb", (gltf) => {
      const geometry5Attribute = new THREE.BufferAttribute(
        gltf.scene.children[0].geometry.attributes.position.array,
        3
      );
      geometry.setAttribute("position5", geometry5Attribute);
    });

    //Custom shaders
    const bufferMaterial = new THREE.ShaderMaterial({
      vertexShader: bufferVertexShader,
      fragmentShader: bufferFragmentShader,
      transparent: true,
      vertexColors: true,
      uniforms: {
        particleSize: {
          value: parameters.particleSize,
        },
        bufferColor: {
          value: new THREE.Color(parameters.bufferColor),
        },
        time: {
          value: 0,
        },
        transparencyState: {
          value: parameters.transparencyState,
        },
        randomState: {
          value: parameters.randomState,
        },
        state1: {
          value: parameters.state1,
        },
        state2: {
          value: parameters.state2,
        },
        state3: {
          value: parameters.state3,
        },
      },
    });

    //final geometry display and tweaks
    const buffer = new THREE.Points(geometry, bufferMaterial);

    buffer.rotation.x = 0.5;
    buffer.rotation.y = 0.5;
    scene.add(buffer);

    // Camera (responsive)
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );

    camera.position.y = 0.3;
    camera.position.z = 3;

    if (window.innerWidth >= 768) {
      camera.position.y = 0.3;
      camera.position.z = 2.5;
    }
    if (window.innerWidth >= 1024) {
      camera.position.x = 0;
      camera.position.y = 0.3;
      camera.position.z = 2;
    }
    if (window.innerWidth >= 1280) {
      camera.position.x = -1;
      camera.position.y = 0;
      camera.position.z = 2;
    }

    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Animate
    const clock = new THREE.Clock();

    //Cycle between geometries

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      buffer.rotation.x += 0.02 * (-mouse.y * 0.25 - buffer.rotation.x + 0.25);
      buffer.rotation.y += 0.02 * (mouse.x * 0.25 - buffer.rotation.y + 0.25);

      //Update material
      bufferMaterial.uniforms.time.value = elapsedTime;
      bufferMaterial.uniforms.transparencyState.value =
        parameters.transparencyState;
      bufferMaterial.uniforms.randomState.value = parameters.randomState;
      bufferMaterial.uniforms.particleSize.value = parameters.particleSize;
      bufferMaterial.uniforms.state1.value = parameters.state1;
      bufferMaterial.uniforms.state2.value = parameters.state2;
      bufferMaterial.uniforms.state3.value = parameters.state3;

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    //Welcome animation
    gsap.to(parameters, {
      randomState: 1.0,
      duration: 3.0,
      ease: "circ.out",
    });
    gsap.to(parameters, {
      delay: 1,
      transparencyState: 1.0,
      duration: 3.0,
      ease: "circ.out",
    });
  }, [parameters]);

/*   useEffect(() => {
    switch (tic) {
      case 0:
        gsap.to(parameters, {
          state1: 1.0,
          state2: 1.0,
          state3: 1.0,
          duration: 1.25,
          ease: "circ.out",
        });
        break;
      case 1:
        gsap.to(parameters, {
          state3: 0.0,
          duration: 1.25,
          ease: "circ.out",
        });
        break;
      case 2:
        gsap.to(parameters, {
          state2: 0.0,
          duration: 1.25,
          ease: "circ.out",
        });
        break;
      case 3:
        gsap.to(parameters, {
          state1: 0.0,
          duration: 1.25,
          ease: "circ.out",
        });
        break;
      default:
        console.error("tic value expected to be between 0 and 3");
        break;
    }
  }, [tic, parameters]);

  useEffect(() => {
    switch (isInSection) {
      case navigation[router.locale].main[0].href:
        gsap.to(parameters, {
          randomState: 1.0,
          duration: 3.0,
          ease: "circ.out",
        });
        break;
      case navigation[router.locale].main[1].href:
        gsap.to(parameters, {
          randomState: 0.0,
          duration: 3.0,
        });
        break;
      case navigation[router.locale].main[2].href:
        gsap.to(parameters, {
          randomState: 0.0,
          duration: 3.0,
        });
        break;
      case navigation[router.locale].main[3].href:
        gsap.to(parameters, {
          randomState: 0.0,
          duration: 3.0,
        });
        break;
      default:
        console.error("expected navigation value");
        break;
    }
  }, [isInSection, navigation, parameters]); */

  return <canvas className="fixed -z-10" ref={ref} />;
}
