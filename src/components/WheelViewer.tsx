import React, { Suspense, useRef } from "react";
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
        <div className="w-full h-[400px] flex items-center justify-center bg-slate-100 border border-dashed border-slate-300 rounded-xl">
          <p className="text-slate-500">Failed to load 3D preview. Please refresh or try another browser.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-slate-600 bg-white/90 p-6 rounded-xl shadow-2xl border border-slate-100 min-w-[200px]">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-semibold">Initializing 3D Environment...</p>
        <p className="text-[10px] text-slate-400 mt-1">Loading large asset (35MB)</p>
      </div>
    </Html>
  );
};

const Wheel = ({ url }: { url: string }) => {
  // Use useLoader with a catch or check if it returns anything
  const geometry = useLoader(STLLoader, url);
  
  if (!geometry) return null;

  return (
    <Center top>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
      </mesh>
    </Center>
  );
};

const WheelViewer = () => {
  return (
    <ThreeErrorBoundary>
      <div className="w-full h-[500px] bg-gradient-to-b from-slate-50 to-slate-200 rounded-xl overflow-hidden my-8 border border-slate-200 shadow-xl relative group">
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <h3 className="text-slate-800 font-bold text-lg">Interactive Wheel Model</h3>
          <p className="text-slate-500 text-xs font-medium">STL Viewer • 35MB Asset</p>
        </div>
        
        <Canvas 
          shadows 
          camera={{ position: [10, 10, 10], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color('#f8fafc'), 0);
          }}
        >
          <Suspense fallback={<Loader />}>
            <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.6, blur: 2 }}>
              <Wheel url="/wheel_full.stl" />
            </Stage>
            <OrbitControls 
              makeDefault 
              autoRotate 
              autoRotateSpeed={0.5} 
              minPolarAngle={0} 
              maxPolarAngle={Math.PI / 1.8}
              enableDamping
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-4 left-4 text-slate-400 text-[10px] flex gap-4">
          <span>Drag to Rotate</span>
          <span>Scroll to Zoom</span>
        </div>
      </div>
    </ThreeErrorBoundary>
  );
};

export default WheelViewer;
