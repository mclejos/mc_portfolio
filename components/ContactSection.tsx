"use client"

import { useState } from "react"
import ButterflyDrift from "@/components/ButterflyDrift"

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const email = "alejosmarkchristian@gmail.com"

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* CONTAINED BOX WITH EXPANDED HEIGHT */}
      <div className="relative rounded-3xl border border-neutral-800/90 bg-[#07090e] overflow-hidden shadow-2xl p-8 sm:p-12 flex flex-col justify-between min-h-[600px] h-auto">
        
        {/* Butterfly Drift Canvas Backdrop */}
        <div className="absolute inset-0 z-0 cursor-crosshair">
          <ButterflyDrift accentColor="#CCFF00" background="#07090E" baseColor="#E2E8F0" blur={10} density={80} reach={35} size={45} vignette={85}/>
          {/* Subtle gradient overlay to keep text and dock crisp */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Top Header Section */}
        <div className="relative z-10 max-w-xl pointer-events-none">
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-700/60 backdrop-blur-md mb-4 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-300">
              Available for Internships & Projects
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Let’s <span className="text-[#ccff00]">Connect</span>
          </h2>

          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-normal leading-relaxed max-w-md">
            Have an internship role, project collaboration, or want to discuss software systems? Let's get in touch.
          </p>
        </div>

        {/* Bottom Floating Island / Dock */}
        <div className="relative z-10 w-full flex justify-center pt-8">
          <div className="w-full sm:w-auto inline-flex flex-wrap items-center justify-between sm:justify-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-neutral-900/80 border border-neutral-700/70 backdrop-blur-xl shadow-2xl">
            
            {/* Email Pill & Copy */}
            <div className="flex items-center gap-2 pl-3 pr-1.5 py-1">
              <span className="text-xs font-mono text-neutral-300 select-all truncate max-w-[200px] sm:max-w-none">
                {email}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-[#ccff00] hover:text-black text-neutral-200 font-medium transition-colors border border-neutral-700/60 shrink-0"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Vertical Divider (Hidden on small mobile wrap) */}
            <div className="hidden sm:block h-5 w-[1px] bg-neutral-700/60" />

            {/* External Links */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
              <a
                href={`mailto:${email}`}
                className="text-xs px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition-colors border border-neutral-700/40"
              >
                Send Mail ↗
              </a>
              <a
                href="https://www.linkedin.com/in/mark-christian-alejos-230a2734b/"
                target="_blank"
                rel="noreferrer"
                className="text-xs px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition-colors border border-neutral-700/40"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/mclejos"
                target="_blank"
                rel="noreferrer"
                className="text-xs px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 transition-colors border border-neutral-700/40"
              >
                GitHub ↗
              </a>
              <a
                href="assets/Mark_Christian-Alejos-CV.pdf"
                download="Mark_Christian-Alejos-CV.pdf"
                target="_blank"
                className="text-xs px-3.5 py-1.5 rounded-xl bg-[#ccff00] text-black font-semibold hover:opacity-90 transition-opacity"
              >
                Resume ↓
              </a>
            </div>

          </div>
        </div>

        {/* Hint Pill in Top Corner */}
        <div className="absolute top-5 right-5 hidden sm:block z-10 pointer-events-none select-none">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest border border-neutral-800/80 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
            Butterfly Drift • Hover To Disperse
          </span>
        </div>

      </div>
    </section>
  )
}
