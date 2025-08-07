// components/StarBackground.tsx
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const StarBackground = () => {
  const [stars, setStars] = useState<Array<{
    id: string
    size: number
    x: number
    y: number
    opacity: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    // Generate stars only on client side
    setStars(
      Array.from({ length: 200 }).map((_, i) => ({
        id: `star-${i}`,
        size: Math.random() * 1.5 + 0.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 5,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.y}%`,
            left: `${star.x}%`,
            boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}
      
      {/* Milky Way effect */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      />
    </div>
  )
}

export default StarBackground