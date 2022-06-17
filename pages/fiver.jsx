import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/router";
import { Suspense } from "react";
import ParticlesFiver from "../components/ParticlesFiver";

export default function Fiver() {
  const router = useRouter();
  return (
    <div className="h-screen">
      <Canvas className="bg-gray-800">
        <Suspense fallback={null}>
          <ParticlesFiver router={router}/>
        </Suspense>
      </Canvas>
    </div>
  );
}
