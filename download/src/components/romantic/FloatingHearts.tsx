"use client"

import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

export function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number, left: string, size: number, duration: number, delay: number }[]>([])

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-primary/20"
          style={{
            left: heart.left,
            bottom: '-50px',
            animation: `float ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`
          }}
        >
          <Heart fill="currentColor" stroke="none" />
        </div>
      ))}
    </div>
  )
}
