import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { Mesh, Shape } from 'three';
import { GearProps } from '../types';

// Procedural Gear Geometry
const createGearShape = (teeth: number, outerRadius: number, innerRadius: number) => {
  const shape = new Shape();
  const step = (Math.PI * 2) / teeth;
  
  shape.moveTo(outerRadius, 0);
  
  for (let i = 0; i < teeth; i++) {
    const angle = step * i;
    const nextAngle = step * (i + 1);
    
    // Tooth
    shape.lineTo(outerRadius * Math.cos(angle + step * 0.2), outerRadius * Math.sin(angle + step * 0.2));
    shape.lineTo(outerRadius * 1.2 * Math.cos(angle + step * 0.4), outerRadius * 1.2 * Math.sin(angle + step * 0.4));
    shape.lineTo(outerRadius * 1.2 * Math.cos(angle + step * 0.6), outerRadius * 1.2 * Math.sin(angle + step * 0.6));
    shape.lineTo(outerRadius * Math.cos(angle + step * 0.8), outerRadius * Math.sin(angle + step * 0.8));
    
    // Inner arc
    shape.lineTo(outerRadius * Math.cos(nextAngle), outerRadius * Math.sin(nextAngle));
  }
  
  // Center hole
  const hole = new Shape();
  hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, false);
  shape.holes.push(hole);
  
  return shape;
};

export const Gear: React.FC<GearProps> = ({ position, rotation = [0, 0, 0], scale = 1, color = "#fbbf24", speed = 1 }) => {
  const meshRef = useRef<Mesh>(null);
  const scroll = useScroll(); // Access scroll data
  
  const teeth = 12;
  const shape = React.useMemo(() => createGearShape(teeth, 1, 0.3), []);
  const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 };

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base rotation based on time
      let rotationValue = delta * 0.5 * speed;
      
      // Additional rotation based on scroll delta (speed of scrolling)
      // scroll.delta is the difference in scroll position between frames
      if (scroll) {
          rotationValue += scroll.delta * 20 * Math.sign(speed);
      }

      meshRef.current.rotation.z += rotationValue;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.4} 
        metalness={0.8}
      />
    </mesh>
  );
};

export const FloatingParticle: React.FC<{ position: [number, number, number] }> = ({ position }) => {
    const meshRef = useRef<Mesh>(null);
    useFrame((state) => {
        if(meshRef.current) {
             meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
             meshRef.current.rotation.x += 0.01;
             meshRef.current.rotation.y += 0.01;
        }
    })
    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#555" wireframe />
        </mesh>
    )
}