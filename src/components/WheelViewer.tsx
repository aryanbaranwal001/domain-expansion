import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";
import { OrbitControls, Html, Environment, ContactShadows } from "@react-three/drei";
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
        <div className="w-6 h-6 border-2 border-slate-200 border-t-amber-500 rounded-full animate-spin"></div>
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
        color="#D4AF37" 
        roughness={1} 
        metalness={0} 
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
  fov = 35
}: WheelViewerProps) => {
  return (
    <ThreeErrorBoundary>
      <div className="w-full h-[600px] bg-transparent rounded-xl overflow-hidden my-8 relative group">
        <Canvas 
          shadows 
          camera={{ position: cameraPosition, fov: fov }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={<Loader />}>
            {/* Manual Lighting Setup */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <directionalLight position={[-10, 10, 5]} intensity={0.8} />
            <Environment preset="city" />
            
            <Wheel 
              url="/wheel_full.stl" 
              position={position} 
              rotation={rotation} 
              scale={scale} 
            />

            <ContactShadows 
              position={[0, -2, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={4.5} 
            />

            <OrbitControls 
              makeDefault 
              autoRotate={false}
              enableDamping
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
};

export default WheelViewer;
