import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import ParticlesFiver from '../components/ParticlesFiver'

export default function Fiver() {
  return (
    <div className='h-screen'>
        <Canvas>
            <Suspense fallback={null}>
                <ParticlesFiver/>
            </Suspense>
        </Canvas>
    </div>
  )
}
