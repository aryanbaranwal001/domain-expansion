import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";
import { Html, Environment, ContactShadows } from "@react-three/drei";
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
        <div className="w-6 h-6 border-2 border-slate-800 border-t-amber-900 rounded-full animate-spin"></div>
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
  const geometry = useLoader(STLLoader, url);
  
  if (!geometry) return null;

  return (
    <mesh 
      geometry={geometry} 
      position={position} 
      rotation={rotation} 
      scale={scale} 
      castShadow 
      receiveShadow
    >
      <meshStandardMaterial 
        color="#8B6508" 
        roughness={0.7} 
        metalness={0.3} 
        emissive="#221100"
        emissiveIntensity={0.1}
      />
    </mesh>
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
  fov = 30
}: WheelViewerProps) => {
  return (
    <ThreeErrorBoundary>
      <div className="w-full h-[600px] bg-transparent rounded-xl overflow-hidden my-8 relative group pointer-events-none">
        <Canvas 
          shadows 
          camera={{ position: cameraPosition, fov: fov }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={<Loader />}>
            {/* Moody JJK-style Lighting */}
            <ambientLight intensity={0.05} />
            
            {/* Underglow - Deep Amber */}
            <pointLight position={[0, -5, 2]} intensity={12} color="#ffaa00" distance={15} decay={2} />
            
            {/* Front dramatic light */}
            <spotLight 
              position={[0, 5, 10]} 
              intensity={20} 
              angle={0.4} 
              penumbra={1} 
              color="#ffffff" 
              castShadow 
              shadow-mapSize={[1024, 1024]}
            />
            
            {/* Subtle side fill to keep geometry visible */}
            <directionalLight position={[-5, 2, 2]} intensity={0.5} color="#4444ff" />

            <Wheel 
              url="/wheel_full.stl" 
              position={position} 
              rotation={rotation} 
              scale={scale} 
            />

            <ContactShadows 
              position={[0, -2.5, 0]} 
              opacity={0.8} 
              scale={15} 
              blur={1.5} 
              far={5} 
              color="#000000"
            />
          </Suspense>
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
};

export default WheelViewer;
