// Replace your particles code with this:

'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const [particles, setParticles] = useState<Array<{
    id: string;
    width: number;
    height: number;
    top: number;
    left: number;
  }> | null>(null);

  useEffect(() => {
    // Only generate particles on client side
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: `particle-${i}`,
        width: Math.random() * 5 + 1,
        height: Math.random() * 5 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
      }))
    );
  }, [count]);

  if (!particles) return null;

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute rounded-full bg-white/10"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
        />
      ))}
    </>
  );
};

export default FloatingParticles;