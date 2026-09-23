import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, PresentationControls, RoundedBox } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import type { Product } from '../../types'

function PhotoPanel({
  textureUrl,
  position,
  rotationY,
  index,
}: {
  textureUrl: string
  position: [number, number, number]
  rotationY: number
  index: number
}) {
  const ref = useRef<Mesh>(null)
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const tex = loader.load(textureUrl)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [textureUrl])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + index) * 0.06
  })

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[1.55, 2.05, 0.06]} radius={0.06} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.25}
          metalness={0.05}
          transmission={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>
      <mesh ref={ref} position={[0, 0, 0.04]}>
        <planeGeometry args={[1.4, 1.9]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* glass edge glow */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[1.48, 1.98]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

function PanelCarousel({ images }: { images: string[] }) {
  const group = useRef<Group>(null)
  const radius = 2.35

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.25) * 0.35 + state.pointer.x * 0.35
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.12,
      0.05,
    )
    void delta
  })

  const panels = useMemo(() => {
    const n = images.length
    return images.map((src, i) => {
      const angle = (i / Math.max(n, 1)) * Math.PI * 0.9 - Math.PI * 0.45
      return {
        src,
        pos: [Math.sin(angle) * radius, 0, Math.cos(angle) * radius - radius * 0.35] as [
          number,
          number,
          number,
        ],
        rotY: angle,
        i,
      }
    })
  }, [images])

  return (
    <group ref={group}>
      {panels.map((p) => (
        <Float key={p.i} speed={1.6} rotationIntensity={0.25} floatIntensity={0.45}>
          <PhotoPanel textureUrl={p.src} position={p.pos} rotationY={p.rotY} index={p.i} />
        </Float>
      ))}
    </group>
  )
}

function StageBase() {
  return (
    <group position={[0, -1.45, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial color="#F6F1E8" roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.6, 2.75, 64]} />
        <meshStandardMaterial color="#C93F5F" emissive="#C93F5F" emissiveIntensity={0.25} />
      </mesh>
    </group>
  )
}

export function ProductPanels3D({ product }: { product: Product }) {
  const images = product.images.map((i) => i.src)

  return (
    <div className="h-full w-full min-h-[340px]">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.15, 5.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 4]} intensity={1.2} />
          <pointLight position={[-4, 2, 3]} intensity={0.8} color="#C93F5F" />
          <pointLight position={[4, -1, 2]} intensity={0.5} color="#D4A574" />

          <PresentationControls
            global
            snap
            speed={1.4}
            polar={[-0.15, 0.2]}
            azimuth={[-0.5, 0.5]}
          >
            <PanelCarousel images={images} />
          </PresentationControls>

          <StageBase />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      <p className="mt-2 text-center text-xs text-ink/45">
        Arrastra para explorar las vistas del producto en 3D
      </p>
    </div>
  )
}
