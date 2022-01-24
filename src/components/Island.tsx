import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import IslandAsset from '../assets/Island'

export const Island = () => {
  return (
    <Canvas camera={{ position: [0, 5, 15] }}>
      <IslandComponent />
    </Canvas>
  )
}

const IslandComponent = (props: JSX.IntrinsicElements['mesh']) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <IslandAsset {...props} />
      </Suspense>
      <OrbitControls enableZoom={false} enableDamping />
    </>
  )
}

export default Island
