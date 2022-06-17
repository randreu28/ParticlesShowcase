import {
  ComputedAttribute,
  OrbitControls,
  PerspectiveCamera,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useRef, useEffect } from "react";

import gsap from "gsap";
import GUI from "lil-gui";

import bufferVertexShader from "../public/three/vertex.glsl";
import bufferFragmentShader from "../public/three/fragment.glsl";

export default function ParticlesFiver({ router }) {
  const [parameters] = useState(
    {
      bufferColor: 0xf8665d,
      particleSize: 2,
      transparencyState: 0.0,
      randomState: 0.0,
      state1: 1.0,
      state2: 1.0,
      state3: 1.0,
    },
    []
  );
  const shaderRef = useRef();

  const ShaderMaterial = shaderMaterial(
    {
      particleSize: parameters.particleSize,
      bufferColor: new THREE.Color(parameters.bufferColor).convertLinearToSRGB(),
      time: 0,
      transparencyState: parameters.transparencyState,
      randomState: parameters.randomState,
      state1: parameters.state1,
      state2: parameters.state2,
      state3: parameters.state3,
    },
    bufferVertexShader,
    bufferFragmentShader
  );
  extend({ ShaderMaterial });
  ShaderMaterial.key = THREE.MathUtils.generateUUID();

  //Keeps the uniforms updated
  useFrame((state) => {
    shaderRef.current.material.uniforms.particleSize.value =
      parameters.particleSize;
    shaderRef.current.material.uniforms.bufferColor.value = new THREE.Color(
      parameters.bufferColor
    ).convertLinearToSRGB();
    shaderRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    shaderRef.current.material.uniforms.transparencyState.value =
      parameters.transparencyState;
    shaderRef.current.material.uniforms.randomState.value =
      parameters.randomState;
    shaderRef.current.material.uniforms.state1.value = parameters.state1;
    shaderRef.current.material.uniforms.state2.value = parameters.state2;
    shaderRef.current.material.uniforms.state3.value = parameters.state3;
  });

  //GUI
  const gui = new GUI();
  const guiGeneral = gui.addFolder("General");
  const guiStates = gui.addFolder("States");

  guiGeneral.addColor(parameters, "bufferColor").onChange(() => {
    shaderRef.current.material.uniforms.bufferColor.value = new THREE.Color(
      parameters.bufferColor
    ).convertLinearToSRGB;
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

  guiStates.add(parameters, "state1").min(0).max(1).step(0.01).name("State 1");

  guiStates.add(parameters, "state2").min(0).max(1).step(0.01).name("State 2");

  guiStates.add(parameters, "state3").min(0).max(1).step(0.01).name("State 3");

  useEffect(() => {
    router.beforePopState(() => {
      gui.destroy(); //Destroys gui before route change
      return true;
    });

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
    
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[2, 1, 1]} />
      <OrbitControls />
      <points ref={shaderRef}>
        <bufferGeometry>
          <ComputedAttribute
            name="position"
            compute={(geometry) => {
              const geometry1 = new THREE.BoxBufferGeometry(
                1,
                1,
                1,
                16,
                16,
                16
              );
              const geometry1Attribute = new THREE.BufferAttribute(
                geometry1.attributes.position.array,
                3
              );
              return geometry1Attribute;
            }}
            usage={THREE.StaticReadUsage}
          />

          <ComputedAttribute
            name="position2"
            compute={(geometry) => {
              const geometry1 = new THREE.BoxBufferGeometry(
                1,
                1,
                1,
                16,
                16,
                16
              );
              const geometry2 = new Float32Array(
                geometry1.attributes.position.count * 3
              );
              for (
                let i = 0;
                i < geometry1.attributes.position.count * 3;
                i++
              ) {
                geometry2[i] = (Math.random() - 0.5) * 10; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
              }
              const geometry2Attribute = new THREE.BufferAttribute(
                geometry2,
                3
              );
              return geometry2Attribute;
            }}
            usage={THREE.StaticReadUsage}
          />

          <ComputedAttribute
            name="position3"
            compute={(geometry) => {
              const geometry3 = new THREE.DodecahedronBufferGeometry(0.65, 3);
              const geometry3Attribute = new THREE.BufferAttribute(
                geometry3.attributes.position.array,
                3
              );
              return geometry3Attribute;
            }}
            usage={THREE.StaticReadUsage}
          />

          <ComputedAttribute
            name="position4"
            compute={(geometry) => {
              const geometry4 = new THREE.TorusBufferGeometry(
                0.65,
                0.2,
                16,
                100
              );
              const geometry4Attribute = new THREE.BufferAttribute(
                geometry4.attributes.position.array,
                3
              );
              return geometry4Attribute;
            }}
            usage={THREE.StaticReadUsage}
          />

          <ComputedAttribute
            name="position5"
            compute={(geometry) => {
              const geometry5 = new THREE.TorusKnotBufferGeometry(
                0.65,
                0.2,
                100,
                16
              );
              const geometry5Attribute = new THREE.BufferAttribute(
                geometry5.attributes.position.array,
                3
              );
              return geometry5Attribute;
            }}
            usage={THREE.StaticReadUsage}
          />
        </bufferGeometry>
        <shaderMaterial
          key={ShaderMaterial.key}
          transparent={true}
          vertexColors={true}
        />
      </points>
    </>
  );
}
