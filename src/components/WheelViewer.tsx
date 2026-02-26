import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";
import { OrbitControls, Stage, Center, Html } from "@react-three/drei";
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
    <Center top position={position} rotation={rotation}>
      <mesh geometry={geometry} scale={scale} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#D4AF37" 
          roughness={1} 
          metalness={0} 
        />
      </mesh>
    </Center>
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
  rotation = [0, 0, 0], 
  scale = 1,
  cameraPosition = [8, 8, 8],
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
            <Stage 
              environment="city" 
              intensity={0.8} 
              contactShadow={{ opacity: 0.5, blur: 2.5 }}
              adjustCamera={1.2}
            >
              <Wheel 
                url="/wheel_full.stl" 
                position={position} 
                rotation={rotation} 
                scale={scale} 
              />
            </Stage>
            <OrbitControls 
              makeDefault 
              autoRotate={false}
              enableDamping
              dampingFactor={0.05}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
            />
          </Suspense>
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
};

export default WheelViewer;
