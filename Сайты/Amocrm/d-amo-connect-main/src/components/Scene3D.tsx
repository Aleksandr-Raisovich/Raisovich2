import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useTexture } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';

const SocialCube = ({
  position,
  textureUrl,
  scrollY
}: {
  position: [number, number, number];
  textureUrl: string;
  scrollY: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4 + scrollY * 0.002;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime + position[0]) * 0.3 - scrollY * 0.001;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = ({ scrollY }: { scrollY: number }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02 + scrollY * 0.0001;
      particlesRef.current.rotation.x = scrollY * 0.0001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#0891b2"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

const Scene = ({ scrollY }: { scrollY: number }) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.y = -scrollY * 0.002;
    camera.position.z = 8 + scrollY * 0.001;
  });

  const logos = [
    {
      position: [-5, 2, -3] as [number, number, number],
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png'
    }, // Telegram
    {
      position: [5, -1, -4] as [number, number, number],
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png'
    }, // WhatsApp
    {
      position: [-3, -3, -2] as [number, number, number],
      url: 'https://avatars.githubusercontent.com/u/1324680?s=200&v=4'
    }, // AmoCRM
    {
      position: [4, 3, -5] as [number, number, number],
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/VK.com-logo.svg/512px-VK.com-logo.svg.png'
    }, // VK
  ];

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[10, 10, 5]} intensity={0.5} color="#3b82f6" />

      <ParticleField scrollY={scrollY} />

      <Suspense fallback={null}>
        {logos.map((logo, index) => (
          <SocialCube
            key={index}
            position={logo.position}
            textureUrl={logo.url}
            scrollY={scrollY}
          />
        ))}
      </Suspense>
    </>
  );
};

const Scene3D = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Scene scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
