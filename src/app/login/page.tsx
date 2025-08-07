// app/login/page.tsx
'use client'

import AuthForm from '@/components/AuthForm'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the star background to avoid SSR issues
const StarBackground = dynamic(() => import('@/components/StarBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gray-900" />
})

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Stellar background */}
      {isMounted && <StarBackground />}

      {/* Animated nebula effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob"
        />
      </div>

      {/* Glowing particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{
              duration: 5 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Comet effect */}
      <motion.div
        initial={{ x: '-100%', y: '100%', opacity: 0 }}
        animate={{ x: '200%', y: '-100%', opacity: [0, 1, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatDelay: 5 }}
        className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full filter blur-sm"
        style={{ boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)' }}
      />

      {/* Main content */}
      <AuthForm type="login" />
    </div>
  )
}