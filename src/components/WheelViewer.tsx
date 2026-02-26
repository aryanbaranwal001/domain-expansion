import React, { Suspense, useRef, useState } from "react";
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

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Three.js Rendering Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[400px] flex items-center justify-center bg-transparent border border-dashed border-slate-300 rounded-xl">
          <p className="text-slate-500 text-sm">3D Preview Unavailable</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-amber-600 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 min-w-[200px]">
        <div className="w-10 h-10 border-4 border-amber-200/30 border-t-amber-500 rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-semibold">Forging Gold...</p>
      </div>
    </Html>
  );
};

interface WheelProps {
  url: string;
  orientation: "flat" | "upright" | "side";
}

const Wheel = ({ url, orientation }: WheelProps) => {
  const geometry = useLoader(STLLoader, url);
  
  if (!geometry) return null;

  // Define rotations based on orientation
  const rotations: Record<string, [number, number, number]> = {
    flat: [0, 0, 0],
    upright: [Math.PI / 2, 0, 0],
    side: [0, Math.PI / 2, 0],
  };

  return (
    <Center top>
      <mesh geometry={geometry} rotation={rotations[orientation]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#D4AF37" 
          roughness={1} 
          metalness={0} 
        />
      </mesh>
    </Center>
  );
};

const WheelViewer = () => {
  const [orientation, setOrientation] = useState<"flat" | "upright" | "side">("flat");

  return (
    <ThreeErrorBoundary>
      <div className="w-full h-[600px] bg-transparent rounded-xl overflow-hidden my-8 relative group">
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <h3 className="text-foreground font-bold text-xl tracking-tight">Golden Wheel</h3>
          <p className="text-muted-foreground text-xs font-medium">Matte Finish • Interactive 3D View</p>
        </div>

        {/* Orientation Controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {(["flat", "upright", "side"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setOrientation(opt)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all border ${
                orientation === opt
                  ? "bg-amber-600 text-white border-amber-500 shadow-lg scale-105"
                  : "bg-white/10 text-slate-400 border-white/10 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        
        <Canvas 
          shadows 
          camera={{ position: [8, 8, 8], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={<Loader />}>
            <Stage 
              environment="city" 
              intensity={0.8} 
              contactShadow={{ opacity: 0.5, blur: 2.5 }}
              adjustCamera={1.2}
            >
              <Wheel url="/wheel_full.stl" orientation={orientation} />
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

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 text-[10px] flex gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
          <span>DRAG TO ROTATE</span>
          <span>SCROLL TO ZOOM</span>
        </div>
      </div>
    </ThreeErrorBoundary>
  );
};

export default WheelViewer;
