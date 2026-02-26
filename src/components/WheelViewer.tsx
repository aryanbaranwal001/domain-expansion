import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { STLLoader, BufferGeometryUtils } from "three-stdlib";
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
  
  // Process geometry to be smooth instead of faceted/boxy
  const geometry = useMemo(() => {
    if (!rawGeometry) return null;
    
    // STL files usually have duplicate vertices for every face (flat shading).
    // Merging them allows Three.js to calculate smooth vertex normals.
    const merged = BufferGeometryUtils.mergeVertices(rawGeometry);
    merged.computeVertexNormals();
    return merged;
  }, [rawGeometry]);
  
  // Slow, heavy rotation for a menacing feel
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion + continuous rotation
      meshRef.current.rotation.z += 0.003;
    }
  });

  if (!geometry) return null;

  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
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
          color="#8a6712" // Deep, aged gold
          roughness={0.7} // High roughness for a matte look
          metalness={0.5} // Balanced metalness to avoid boxy specular highlights
          emissive="#1a0d00"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
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
            toneMappingExposure: 1.2
          }}
        >
          <Suspense fallback={<Loader />}>
            {/* DOMAIN ATMOSPHERE LIGHTING */}
            
            {/* Very low ambient light to keep shadows deep */}
            <ambientLight intensity={0.02} />
            
            {/* Cursed Underglow - Softened to avoid harsh hotspots on facets */}
            <pointLight 
              position={[0, -5, 4]} 
              intensity={50} 
              color="#ff3300" 
              distance={25} 
              decay={1.8} 
            />

            {/* Top Rim Light - High penumbra for soft falloff */}
            <spotLight 
              position={[5, 10, 5]} 
              intensity={120} 
              angle={0.4} 
              penumbra={1} 
              color="#ffffff" 
              castShadow 
            />

            {/* Back rim light for silhouette definition */}
            <pointLight 
              position={[-5, 2, -5]} 
              intensity={30} 
              color="#ffaa00" 
            />

            <Wheel 
              url="/wheel_full.stl" 
              position={position} 
              rotation={rotation} 
              scale={scale} 
            />

            <ContactShadows 
              position={[0, -2.8, 0]} 
              opacity={0.8} 
              scale={12} 
              blur={2} 
              far={10} 
              color="#000000"
            />
            
            {/* Environment adds subtle reflections to the gold metalness */}
            <Environment preset="night" />
          </Suspense>
        </Canvas>
        
        {/* Vignette effect overlay to darken the edges of the "domain" */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>
    </ThreeErrorBoundary>
  );
};

export default WheelViewer;

