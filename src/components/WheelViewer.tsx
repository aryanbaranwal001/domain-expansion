import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { STLLoader, mergeVertices } from "three-stdlib";
import { Html, Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

class ThreeErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[400px] flex items-center justify-center bg-transparent border border-dashed border-slate-300 rounded-xl" />
      );
    }
    return this.props.children;
  }
}

const Loader = () => {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    </Html>
  );
};

interface WheelProps {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number | [number, number, number];
}

const Wheel = ({ url, position, rotation, scale }: WheelProps) => {
  const rawGeometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  const geometry = useMemo(() => {
    if (!rawGeometry) return null;
    try {
      const merged = mergeVertices(rawGeometry);
      merged.computeVertexNormals();
      return merged;
    } catch (e) {
      return rawGeometry;
    }
  }, [rawGeometry]);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002;
    }
    if (materialRef.current) {
      // Cursed Pulse: The wheel "breathes" with dark energy
      materialRef.current.emissiveIntensity = 0.2 + Math.sin(t * 1.5) * 0.15;
    }
  });

  if (!geometry) return null;

  return (
    <Float 
      speed={0.8} 
      rotationIntensity={0.4} 
      floatIntensity={0.6}
    >
      <mesh 
        ref={meshRef}
        geometry={geometry} 
        position={position} 
        rotation={rotation} 
        scale={scale} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          ref={materialRef}
          color="#6b4f0b" 
          roughness={0.65} 
          metalness={0.45} 
          emissive="#331100" 
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

const CursedLighting = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lightRef.current) {
      // Slower, heavier throb instead of fast flickering
      lightRef.current.intensity = 80 + Math.random() * 5 + Math.sin(t * 3) * 15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.02} />
      
      {/* Hellish Underglow - Slower throb */}
      <pointLight 
        ref={lightRef}
        position={[0, -6, 4]} 
        intensity={80} 
        color="#ff1100" 
        distance={25} 
        decay={2} 
      />

      {/* Main Menacing Spot - Intensified for sharp definition */}
      <spotLight 
        position={[10, 15, 10]} 
        intensity={450} 
        angle={0.25} 
        penumbra={1} 
        color="#ffffff" 
        castShadow 
      />

      {/* Back Rim - Intensified Deep Amber */}
      <pointLight 
        position={[-8, 4, -8]} 
        intensity={120} 
        color="#ff6600" 
      />
      
      {/* Side definition - Intensified */}
      <directionalLight position={[-5, 0, 5]} intensity={1.0} color="#442200" />
    </>
  );
};

interface WheelViewerProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  cameraPosition?: [number, number, number];
  fov?: number;
}

const WheelViewer = ({ 
  position = [0, 0, 0], 
  rotation = [1.04, 0, 0], 
  scale = 0.04,
  cameraPosition = [0, 0, 10],
  fov = 35
}: WheelViewerProps) => {
  return (
    <ThreeErrorBoundary>
      <div className="w-full h-[600px] bg-transparent overflow-hidden my-8 relative pointer-events-none">
        <Canvas 
          shadows 
          camera={{ position: cameraPosition, fov: fov }}
          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: "high-performance",
            toneMapping: THREE.ReinhardToneMapping,
            toneMappingExposure: 1.3,
            premultipliedAlpha: false
          }}
        >
          <Suspense fallback={<Loader />}>
            <CursedLighting />

            <Wheel 
              url="/wheel_full.stl" 
              position={position} 
              rotation={rotation} 
              scale={scale} 
            />

            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
};

export default WheelViewer;
