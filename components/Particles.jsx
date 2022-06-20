import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as THREE from "three";
import gsap from "gsap";
import GUI from 'lil-gui';

import bufferVertexShader from "../public/three/vertex.glsl";
import bufferFragmentShader from "../public/three/fragment.glsl";

export default function Particles() {
  const ref = useRef();
  const router = useRouter();

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

    camera.position.z = 2;

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

    //GUI
    const gui = new GUI();
    const guiGeneral = gui.addFolder('General');
    const guiStates = gui.addFolder('States');
    
    router.beforePopState(({ }) => {
      gui.destroy(); //Destroys gui before route change
      return true;
    });

    guiGeneral.addColor(parameters, "bufferColor").onChange(() => {
      bufferMaterial.uniforms.bufferColor.value.set(parameters.bufferColor);
    });

    guiStates
    .add(parameters, "transparencyState")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Alpha");

    guiStates
    .add(parameters, "randomState")
    .min(0)
    .max(1)
    .step(0.01)
    .name("Random state");

    guiStates
    .add(parameters, "state1")
    .min(0)
    .max(1)
    .step(0.01)
    .name("State 1");

    guiStates
    .add(parameters, "state2")
    .min(0)
    .max(1)
    .step(0.01)
    .name("State 2")

    guiStates
    .add(parameters, "state3")
    .min(0)
    .max(1)
    .step(0.01)
    .name("State 3")


    // Animate
    const clock = new THREE.Clock();

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
    gsap.to(parameters, {
      state1: 1.0,
      state2: 1.0,
      state3: 1.0,
      duration: 1.25,
      ease: "circ.out",
    });
  }, [parameters]);

  return <canvas className="fixed -z-10" ref={ref} />;
}
