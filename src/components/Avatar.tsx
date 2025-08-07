// components/Avatar.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AvatarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  size?: 'sm' | 'md' | 'lg'
}

const Avatar = ({ user, size = 'md' }: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden border-2 border-white/20 shadow-lg`}
    >
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || 'User avatar'}
          width={size === 'lg' ? 64 : size === 'md' ? 48 : 32}
          height={size === 'lg' ? 64 : size === 'md' ? 48 : 32}
          className="object-cover"
        />
      ) : (
        <span className={`${textSize[size]} font-bold text-white`}>
          {initials}
        </span>
      )}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        whileHover={{
          borderColor: 'rgba(255, 255, 255, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default Avatar