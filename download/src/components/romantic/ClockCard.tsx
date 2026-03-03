"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ClockCardProps {
  label: string
  timezone: string
  flag: string
  name: string
  className?: string
}

export function ClockCard({ label, timezone, flag, name, className }: ClockCardProps) {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('pt-BR', { 
        timeZone: timezone, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })
      const dateStr = now.toLocaleDateString('pt-BR', {
        timeZone: timezone,
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })
      setTime(timeStr)
      setDate(dateStr)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [timezone])

  return (
    <Card className={cn("overflow-hidden border-2 border-primary/20 shadow-xl bg-white/60 backdrop-blur-sm group hover:border-accent/40 transition-all duration-500", className)}>
      <CardHeader className="pb-2 space-y-0">
        <div className="flex items-center justify-between">
          <span className="text-4xl">{flag}</span>
          <Clock className="w-5 h-5 text-primary/40 group-hover:text-accent/60 transition-colors" />
        </div>
        <CardTitle className="font-headline text-3xl text-foreground mt-2">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardHeader>
      <CardContent className="pt-4 text-center">
        <div className="text-5xl font-bold tracking-tight animate-pulse-slow text-accent">
          {time || '--:--:--'}
        </div>
        <div className="mt-2 text-sm text-muted-foreground capitalize">
          {date || 'carregando...'}
        </div>
      </CardContent>
    </Card>
  )
}
