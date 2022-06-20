import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/router";
import { Suspense } from "react";
import ParticlesFiver from "../components/ParticlesFiver";

export default function Fiver() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen bg-gray-800">
      <Canvas>
        <Suspense fallback={null}>
          <ParticlesFiver router={router}/>
        </Suspense>
      </Canvas>
    </div>
  );
}
