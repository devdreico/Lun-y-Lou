import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import type { Group, Mesh } from 'three'

function GlassOrb({
  position,
  scale = 1,
  color = '#C93F5F',
  distort = 0.35,
}: {
  position: [number, number, number]
  scale?: number
  color?: string
  distort?: number
}) {
  const ref = useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.25
    ref.current.rotation.x += delta * 0.12
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * 0.7 + position[0]) * 0.15
  })

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          roughness={0.15}
          metalness={0.2}
          distort={distort}
          speed={1.4}
          transparent
          opacity={0.88}
        />
      </mesh>
    </Float>
  )
}

function Ribbon() {
  const ref = useRef<Group>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * 0.15
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.35
  })

  return (
    <group ref={ref} position={[0, -0.2, -1]}>
      <mesh>
        <torusGeometry args={[1.6, 0.12, 32, 100]} />
        <MeshWobbleMaterial
          color="#D4A574"
          factor={0.35}
          speed={1.2}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[1.25, 0.06, 24, 80]} />
        <meshStandardMaterial color="#2E4A3D" metalness={0.4} roughness={0.35} />
      </mesh>
    </group>
  )
}

function Diamonds() {
  const group = useRef<Group>(null)
  const items = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        pos: [
          Math.cos((i / 8) * Math.PI * 2) * 2.4,
          Math.sin((i / 8) * Math.PI * 2) * 1.4,
          -0.5 - (i % 3) * 0.4,
        ] as [number, number, number],
        scale: 0.12 + (i % 3) * 0.05,
        speed: 0.4 + (i % 4) * 0.15,
      })),
    [],
  )

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.12
  })

  return (
    <group ref={group}>
      {items.map((d, i) => (
        <mesh key={i} position={d.pos} scale={d.speed}>
          <octahedronGeometry args={[d.scale, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#E86A86' : '#F0D9BC'}
            emissive={i % 2 === 0 ? '#C93F5F' : '#D4A574'}
            emissiveIntensity={0.35}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state, delta) => {
    const { camera, pointer } = state
    const k = 1 - Math.pow(0.001, delta)
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * k
    camera.position.y += (pointer.y * 0.35 - camera.position.y) * k
    camera.lookAt(0, 0, 0)
  })
  return null
}

export function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 6, 4]} intensity={1.1} color="#FFF5EE" />
          <pointLight position={[-4, -2, 2]} intensity={1.4} color="#C93F5F" />
          <pointLight position={[3, -3, -2]} intensity={0.9} color="#D4A574" />

          <GlassOrb position={[-2.2, 0.9, 0]} scale={0.85} color="#C93F5F" distort={0.4} />
          <GlassOrb position={[2.4, -0.6, -0.4]} scale={1.1} color="#2E4A3D" distort={0.3} />
          <GlassOrb position={[1.6, 1.4, -1]} scale={0.55} color="#D4A574" distort={0.45} />
          <GlassOrb position={[-1.4, -1.3, 0.4]} scale={0.45} color="#E86A86" distort={0.5} />

          <Ribbon />
          <Diamonds />

          <Sparkles count={80} scale={[6, 4, 3]} size={2.5} speed={0.35} color="#F0D9BC" opacity={0.7} />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}
