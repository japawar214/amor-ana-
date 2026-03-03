"use client"

import React from 'react'
import { Quote } from 'lucide-react'

export function LoveQuote() {
  const quote = "O amor não conhece distância, pois nossos corações batem no mesmo ritmo, não importa onde estejamos."

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="relative p-12 text-center bg-white/40 backdrop-blur-md rounded-[3rem] border border-primary/10 shadow-xl overflow-hidden">
        <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/10" />
        <p className="font-headline text-2xl md:text-4xl text-foreground leading-relaxed italic relative z-10 px-8 py-4">
          "{quote}"
        </p>
        <Quote className="absolute bottom-6 right-6 w-12 h-12 text-primary/10 rotate-180" />
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground italic">
          Uma promessa eterna entre Surat e Curitiba.
        </p>
      </div>
    </div>
  )
}
