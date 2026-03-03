
"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TimeConverter() {
  const [istTime, setIstTime] = useState<string>('')
  const [brtTime, setBrtTime] = useState<string>('')
  const [diffLabel, setDiffLabel] = useState<string>('')

  // Helper to get offset from UTC in minutes for a specific timezone
  const getOffsetInMinutes = useCallback((tz: string) => {
    const now = new Date()
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false
    }).formatToParts(now)
    
    const m = Object.fromEntries(parts.map(p => [p.type, p.value]))
    const zoned = new Date(Date.UTC(
      parseInt(m.year), 
      parseInt(m.month) - 1, 
      parseInt(m.day),
      parseInt(m.hour) % 24, 
      parseInt(m.minute), 
      parseInt(m.second)
    ))
    return (zoned.getTime() - now.getTime()) / 60000
  }, [])

  const convertTime = useCallback((time: string, fromTz: string, toTz: string) => {
    if (!time || !time.includes(':')) return ''
    try {
      const [hours, minutes] = time.split(':').map(Number)
      if (isNaN(hours) || isNaN(minutes)) return ''

      const fromOffset = getOffsetInMinutes(fromTz)
      const toOffset = getOffsetInMinutes(toTz)
      
      let totalMinutes = (hours * 60 + minutes) - fromOffset + toOffset
      totalMinutes = (totalMinutes + 1440) % 1440
      
      const h = Math.floor(totalMinutes / 60)
      const m = Math.floor(totalMinutes % 60)
      
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    } catch (e) {
      return ''
    }
  }, [getOffsetInMinutes])

  const handleIstChange = useCallback((val: string) => {
    setIstTime(val)
    const converted = convertTime(val, 'Asia/Kolkata', 'America/Sao_Paulo')
    setBrtTime(converted)
  }, [convertTime])

  const handleBrtChange = useCallback((val: string) => {
    setBrtTime(val)
    const converted = convertTime(val, 'America/Sao_Paulo', 'Asia/Kolkata')
    setIstTime(converted)
  }, [convertTime])

  useEffect(() => {
    const initialize = () => {
      const now = new Date()
      const istString = now.toLocaleTimeString('en-GB', { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      
      setIstTime(istString)
      const converted = convertTime(istString, 'Asia/Kolkata', 'America/Sao_Paulo')
      setBrtTime(converted)

      const istOff = getOffsetInMinutes('Asia/Kolkata')
      const brtOff = getOffsetInMinutes('America/Sao_Paulo')
      const diffMins = Math.abs(istOff - brtOff)
      const diffHours = Math.floor(diffMins / 60)
      const remainingMins = Math.floor(diffMins % 60)
      
      setDiffLabel(`Estamos a ${diffHours}h${remainingMins > 0 ? remainingMins + 'min' : ''} de distância, mas nossos corações estão juntos 💕`)
    }

    initialize()
  }, [convertTime, getOffsetInMinutes])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 mt-12 px-4 relative">
      <div className="text-center mb-8">
        <p className="inline-block px-6 py-2 rounded-full bg-white/80 border border-primary/20 text-accent font-medium shadow-sm">
          {diffLabel || 'Calculando distância...'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
        <div className="space-y-4 p-6 bg-white/40 rounded-3xl border border-primary/10 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🇮🇳</span>
            <Label className="text-lg font-headline font-semibold">Horário do Jai (Índia)</Label>
          </div>
          <Input 
            type="time" 
            value={istTime}
            onChange={(e) => handleIstChange(e.target.value)}
            className="text-2xl h-16 rounded-2xl border-2 border-primary/20 focus-visible:ring-accent text-center font-bold text-foreground"
          />
          <p className="text-xs text-muted-foreground text-center italic">Horário Padrão da Índia (IST)</p>
        </div>

        <div className="space-y-4 p-6 bg-white/40 rounded-3xl border border-primary/10 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🇧🇷</span>
            <Label className="text-lg font-headline font-semibold">Horário da Ana (Brasil)</Label>
          </div>
          <Input 
            type="time" 
            value={brtTime}
            onChange={(e) => handleBrtChange(e.target.value)}
            className="text-2xl h-16 rounded-2xl border-2 border-primary/20 focus-visible:ring-accent text-center font-bold text-foreground"
          />
          <p className="text-xs text-muted-foreground text-center italic">Horário de Brasília (BRT)</p>
        </div>
      </div>
    </div>
  )
}
