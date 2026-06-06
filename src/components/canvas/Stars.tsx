import { useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Points as ThreePoints } from 'three';

import useInViewCanvas from '../../hooks/useInViewCanvas';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

interface StarsProps {
  color?: string;
  size?: number;
  stride?: number;
  frustumCulled?: boolean;
  reducedMotion?: boolean;
}

const Stars: React.FC<StarsProps> = ({ reducedMotion = false, ...props }) => {
  const ref = useRef<ThreePoints>(null);
  const { invalidate } = useThree();
  const [sphere] = useState(() => random.inSphere(new Float32Array(2001), { radius: 1.2 }));

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      invalidate();
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#915EFF"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewCanvas();

  return (
    <div ref={ref} className="w-full h-auto absolute inset-0 z-[-1]">
      {inView && (
        <Canvas camera={{ position: [0, 0, 1] }} frameloop={reducedMotion ? 'never' : 'demand'}>
          <Stars reducedMotion={reducedMotion} />
          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default StarsCanvas;
