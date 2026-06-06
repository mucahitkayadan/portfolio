import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import useInViewCanvas from '../../hooks/useInViewCanvas';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import CanvasLoader from '../Loader';

const Earth: React.FC = () => {
  const earth = useGLTF('./planet/scene.gltf');

  return <primitive object={earth.scene} scale={2.25} position-y={0} rotation-y={0} />;
};

const EarthCanvas: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewCanvas();

  return (
    <div ref={ref} className="w-full h-full">
      {inView && (
        <Canvas
          shadows
          frameloop={reducedMotion ? 'never' : 'demand'}
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            {!reducedMotion && (
              <OrbitControls
                autoRotate
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            )}
            <Earth />
            <Preload all />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default EarthCanvas;
