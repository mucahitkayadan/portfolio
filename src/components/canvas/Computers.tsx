import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Mesh } from 'three';

import useIsMobile from '../../hooks/useIsMobile';
import useInViewCanvas from '../../hooks/useInViewCanvas';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import CanvasLoader from '../Loader';

interface ComputersProps {
  isMobile: boolean;
  reducedMotion: boolean;
}

const Computers: React.FC<ComputersProps> = ({ isMobile, reducedMotion }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');
  const meshRef = useRef<Mesh>(null);
  const { invalidate } = useThree();

  useFrame((_, delta) => {
    if (meshRef.current && isMobile && !reducedMotion) {
      meshRef.current.rotation.y += delta * 0.5;
      invalidate();
    }
  });

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow={!isMobile}
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.55 : 0.75}
        position={isMobile ? [0, -4.75, 0] : [0, -3.25, -1.5]}
        rotation={isMobile ? [0, 0, 0] : [-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas: React.FC = () => {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewCanvas();

  return (
    <div ref={ref} className="w-full h-full">
      {inView && (
        <Canvas
          className="w-full h-full"
          frameloop={reducedMotion ? 'never' : 'demand'}
          shadows={!isMobile}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={isMobile ? { position: [0, 0, 22], fov: 45 } : { position: [20, 3, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={<CanvasLoader />}>
            {!isMobile && !reducedMotion && (
              <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
                autoRotate
              />
            )}
            <Computers isMobile={isMobile} reducedMotion={reducedMotion} />
          </Suspense>

          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default ComputersCanvas;
