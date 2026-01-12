import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, Float, Sparkles } from '@react-three/drei';
import { Gear, FloatingParticle } from './MechanicalParts';
import UI from './UI';

const SceneContent = () => {
  return (
    <>
      <color attach="background" args={['#0f0f11']} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f97316" />

      {/* Industrial HDRI Environment */}
      <Environment preset="city" blur={0.5} />

      {/* Pages=2 enables scrolling functionality */}
      <ScrollControls pages={2} damping={0.3}>

        {/* Background 3D Elements that move with scroll */}
        <Scroll>
          {/* Group 1: Visible on first screen */}
          <group position={[0, -1, -5]}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <Gear position={[2.5, 2, 0]} scale={1.5} color="#d97706" speed={0.2} />
              <Gear position={[-2.5, -1, -2]} scale={1.2} color="#52525b" speed={-0.3} />
              <Gear position={[-3, 3, -5]} scale={0.8} color="#f59e0b" speed={0.4} />
            </Float>
          </group>

          {/* Group 2: Visible when scrolling down */}
          <group position={[0, -9, -5]}>
            <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
              <Gear position={[3, 1, -1]} scale={2} color="#3f3f46" speed={-0.2} />
              <Gear position={[-2, -2, 0]} scale={1.3} color="#ea580c" speed={0.3} />
              <Gear position={[0, 4, -3]} scale={1} color="#fbbf24" speed={0.5} />
              <Gear position={[4, -4, -4]} scale={0.6} color="#71717a" speed={-0.4} />
            </Float>
          </group>

          {/* Floating Particles spread vertically */}
          {Array.from({ length: 40 }).map((_, i) => (
            <FloatingParticle
              key={i}
              position={[
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 25 - 5, // Spread along Y axis from top to bottom
                (Math.random() - 0.5) * 10
              ]}
            />
          ))}
        </Scroll>

        <Sparkles count={80} scale={[12, 20, 10]} size={4} speed={0.4} opacity={0.5} color="#fbbf24" position={[0, -5, 0]} />

        {/* HTML UI Overlay */}
        <Scroll html style={{ width: '100%' }}>
          <UI />
        </Scroll>
      </ScrollControls>
    </>
  );
};

const Scene: React.FC = () => {
  return (
    <div className="w-full h-screen" style={{ background: '#0f0f11' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;