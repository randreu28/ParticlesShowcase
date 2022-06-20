import Particles from "../components/Particles";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Particles />
    </Suspense>
  );
}
