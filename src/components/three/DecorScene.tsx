import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import type { Mesh } from 'three'

function FloatingShape({
  color,
  position,
  kind,
}: {
  color: string
  position: [number, number, number]
  kind: 'sphere' | 'torus' | 'box'
}) {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3
      ref.current.rotation.y += delta * 0.4
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.4}>
      <mesh ref={ref} position={position}>
        {kind === 'sphere' && <sphereGeometry args={[0.45, 32, 32]} />}
        {kind === 'torus' && <torusGeometry args={[0.4, 0.14, 24, 48]} />}
        {kind === 'box' && <boxGeometry args={[0.55, 0.55, 0.55]} />}
        {kind === 'sphere' ? (
          <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0.2} />
        ) : (
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.25} />
        )}
      </mesh>
    </Float>
  )
}

export function DecorScene({
  accent = '#C93F5F',
  secondary = '#2E4A3D',
}: {
  accent?: string
  secondary?: string
}) {
  return (
    <div className="absolute inset-0 opacity-90" aria-hidden>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4] }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[2, 2, 2]} intensity={1} color={accent} />
          <pointLight position={[-2, -1, 1]} intensity={0.7} color="#D4A574" />
          <FloatingShape color={accent} position={[-1.2, 0.4, 0]} kind="sphere" />
          <FloatingShape color={secondary} position={[1.3, -0.3, -0.4]} kind="torus" />
          <FloatingShape color="#D4A574" position={[0.6, 0.9, -0.6]} kind="box" />
          <Sparkles count={40} scale={4} size={2} speed={0.3} color="#F0D9BC" />
        </Suspense>
      </Canvas>
    </div>
  )
}
