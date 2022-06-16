import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function ParticlesFiver() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[2, 1, 1]}/>
      <OrbitControls />
      <points>
        <boxGeometry args={[1, 1, 1, 16, 16, 16]}></boxGeometry>
        <pointsMaterial color={0xf8665d} size={0.015}></pointsMaterial>
      </points>
    </>
  );
}
