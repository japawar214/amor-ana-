
"use client"

import React from 'react'
import { ClockCard } from '@/components/romantic/ClockCard'
import { TimeConverter } from '@/components/romantic/TimeConverter'
import { LoveQuote } from '@/components/romantic/LoveQuote'

export default function Home() {
  return (
    <main className="min-h-screen romantic-gradient relative py-12 px-4 md:px-8 overflow-x-hidden">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center space-y-6 mb-16 relative z-10">
        <div className="flex justify-center items-center gap-2 mb-2">
          <h2 className="text-lg md:text-xl font-medium text-accent tracking-widest uppercase">Corações em Sincronia</h2>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl text-gradient leading-tight">
          Não importa o fuso horário, meu coração está sempre no seu horário
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Uma ponte de amor conectando Surat e Curitiba. Feito para que cada segundo conte.
        </p>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Live Clocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ClockCard 
            name="Jai" 
            label="Surat, Índia" 
            flag="🇮🇳" 
            timezone="Asia/Kolkata" 
            className="md:translate-y-4"
          />
          <ClockCard 
            name="Ana" 
            label="Curitiba, Brasil" 
            flag="🇧🇷" 
            timezone="America/Sao_Paulo" 
            className="md:-translate-y-4"
          />
        </div>

        {/* Converter Section */}
        <section className="py-12 bg-white/30 backdrop-blur-md rounded-[3rem] border border-white/40 shadow-2xl">
          <h3 className="text-center font-headline text-4xl text-accent mb-8">Conversor de Amor</h3>
          <TimeConverter />
        </section>

        {/* Static Love Quote Section */}
        <LoveQuote />
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/50 border border-primary/20 backdrop-blur-sm">
          <span className="text-sm font-medium text-muted-foreground">Sincronizando corações desde 2024 • Surat ↔ Curitiba</span>
        </div>
        <p className="text-xs text-muted-foreground/60">
          Feito com carinho por Jai, para Ana.
        </p>
      </footer>
    </main>
  )
}
