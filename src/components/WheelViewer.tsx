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
      meshRef.current.rotation.z += 0.002; // Slower, heavier rotation
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
          color="#6b4f0b" // Darker "Blood Gold"
          roughness={0.65} 
          metalness={0.45} 
          emissive="#331100" // Deeper red-tinted glow
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
      // Unstable Energy: The hellish underglow flickers
      lightRef.current.intensity = 60 + Math.random() * 15 + Math.sin(t * 10) * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={0.01} />
      
      {/* Hellish Underglow - Flickering */}
      <pointLight 
        ref={lightRef}
        position={[0, -6, 4]} 
        intensity={70} 
        color="#ff1100" 
        distance={25} 
        decay={2} 
      />

      {/* Main Menacing Spot - Defines the silhouette */}
      <spotLight 
        position={[10, 15, 10]} 
        intensity={250} 
        angle={0.25} 
        penumbra={1} 
        color="#ffffff" 
        castShadow 
      />

      {/* Back Rim - Deep Amber */}
      <pointLight 
        position={[-8, 4, -8]} 
        intensity={40} 
        color="#ff6600" 
      />
      
      {/* Side definition */}
      <directionalLight position={[-5, 0, 5]} intensity={0.5} color="#442200" />
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
  rotation = [1.02, 0, 0], 
  scale = 0.03,
  cameraPosition = [0, 0, 10],
  fov = 35
}: WheelViewerProps) => {
  return (
    <ThreeErrorBoundary>
      <div className="w-full h-[600px] bg-transparent rounded-xl overflow-hidden my-8 relative group pointer-events-none">
        <Canvas 
          shadows 
          camera={{ position: cameraPosition, fov: fov }}
          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: "high-performance",
            toneMapping: THREE.ReinhardToneMapping,
            toneMappingExposure: 1.3
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

            <ContactShadows 
              position={[0, -2.8, 0]} 
              opacity={0.9} 
              scale={15} 
              blur={2} 
              far={10} 
              color="#000000"
            />
            
            <Environment preset="night" />
          </Suspense>
        </Canvas>
        
        {/* Deep Cursed Domain Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        
        {/* Subtle scanning line effect (optional but adds to the domain vibe) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </ThreeErrorBoundary>
  );
};

export default WheelViewer;

