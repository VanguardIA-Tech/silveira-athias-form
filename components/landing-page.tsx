"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Scale, Gavel, FileText, PilcrowSquare, CheckCircle, Sparkles } from "lucide-react"
import NextImage from "next/image"
import LogoSilveira from "./LogoSilveira"

type LandingPageProps = {
  onUnlock: () => void
}

type AnimationPhase = "idle" | "hover" | "clicked" | "hammer" | "pulse" | "dispersing" | "complete"

export default function LandingPage({ onUnlock }: LandingPageProps) {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>("idle")
  const [isHovering, setIsHovering] = useState(false)

  const handleClick = () => {
    if (animationPhase !== "idle") return

    setAnimationPhase("clicked")

    // Sequência de animações
    setTimeout(() => setAnimationPhase("hammer"), 500)
    setTimeout(() => setAnimationPhase("pulse"), 1200)
    setTimeout(() => setAnimationPhase("dispersing"), 2000)
    setTimeout(() => {
      setAnimationPhase("complete")
      onUnlock()
    }, 3000)
  }

  const handleHover = () => {
    if (animationPhase === "idle") {
      setIsHovering(true)
    }
  }

  const handleHoverEnd = () => {
    setIsHovering(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo - 3x maior */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex justify-center mb-4">
            <LogoSilveira />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-amber-400/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span className="text-slate-800 text-xs font-medium">VanguardIA × Silveira Athias</span>
            <Sparkles className="h-3 w-3 text-cyan-600" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Desbloqueie o
            <span className="block bg-gradient-to-r from-amber-500 via-amber-600 to-cyan-600 bg-clip-text text-transparent">
              Futuro da IA
            </span>
            no Direito
          </h1>

          <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Uma experiência exclusiva de onboarding para os sócios do Silveira Athias.
            <br />
            <span className="text-amber-600 font-medium">Suas decisões moldarão o futuro da inovação.</span>
          </p>
        </motion.div>

        {/* Justice Scale Animation - Com borda pulsante */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-8"
        >
          <motion.button
            onClick={handleClick}
            onHoverStart={handleHover}
            onHoverEnd={handleHoverEnd}
            disabled={animationPhase !== "idle"}
            className="relative group cursor-pointer disabled:cursor-default"
            whileTap={{ scale: 0.98 }}
          >
            {/* Borda Pulsante Externa */}
            {animationPhase === "idle" && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-amber-400/60"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0.2, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{ transform: "translate(-4px, -4px)", width: "calc(100% + 8px)", height: "calc(100% + 8px)" }}
              />
            )}

            {/* Segunda Borda Pulsante */}
            {animationPhase === "idle" && (
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-500/40"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.4, 0.1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                style={{ transform: "translate(-8px, -8px)", width: "calc(100% + 16px)", height: "calc(100% + 16px)" }}
              />
            )}

            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-cyan-500/30 rounded-full blur-xl"
              animate={{
                scale: animationPhase === "pulse" ? [1, 2, 1] : isHovering ? 1.2 : 1,
                opacity: animationPhase === "pulse" ? [0.4, 0.8, 0.4] : isHovering ? 0.8 : 0.4,
              }}
              transition={{
                duration: animationPhase === "pulse" ? 0.8 : 0.3,
                ease: "easeOut",
              }}
            />

            {/* Main Container */}
            <div className="relative w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center border-3 border-amber-400/30 backdrop-blur-md shadow-xl">
              {/* Justice Scale */}
              <AnimatePresence>
                {(animationPhase === "idle" || animationPhase === "hover" || animationPhase === "clicked") && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                      opacity: 1,
                      scale: animationPhase === "clicked" ? 1.1 : 1,
                      rotate: isHovering && animationPhase === "idle" ? [0, -3, 3, -2, 2, 0] : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      rotate: {
                        duration: 0.6,
                        ease: "easeInOut",
                        repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 1,
                      },
                      scale: { duration: 0.3 },
                      opacity: { duration: 0.3 },
                    }}
                    className="relative"
                  >
                    <Scale className="h-10 w-10 md:h-12 md:w-12 text-amber-400" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hammer Animation */}
              <AnimatePresence>
                {animationPhase === "hammer" && (
                  <motion.div
                    initial={{ opacity: 0, y: -30, rotate: -45 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [-30, 0, 0, 8],
                      rotate: [-45, 0, 0, 15],
                    }}
                    transition={{
                      duration: 0.8,
                      times: [0, 0.3, 0.7, 1],
                      ease: "easeInOut",
                    }}
                    className="absolute"
                  >
                    <Gavel className="h-10 w-10 md:h-12 md:w-12 text-cyan-400" />

                    {/* Impact Effect */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 bg-cyan-400/20 rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dispersing Icons */}
              <AnimatePresence>
                {animationPhase === "dispersing" && (
                  <>
                    {/* Contract Icon */}
                    <motion.div
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: 0,
                        x: -60,
                        y: -50,
                        scale: 0.5,
                        rotate: -180,
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute"
                    >
                      <FileText className="h-6 w-6 text-amber-500" />
                    </motion.div>

                    {/* Paragraph Icon */}
                    <motion.div
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: 0,
                        x: 60,
                        y: -50,
                        scale: 0.5,
                        rotate: 180,
                      }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                      className="absolute"
                    >
                      <PilcrowSquare className="h-6 w-6 text-cyan-500" />
                    </motion.div>

                    {/* Check Icon */}
                    <motion.div
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: 0,
                        x: 0,
                        y: 60,
                        scale: 0.5,
                        rotate: 360,
                      }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="absolute"
                    >
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Pulse Effect */}
              {animationPhase === "pulse" && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 3, 4],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-cyan-500/30 rounded-full"
                />
              )}
            </div>
          </motion.button>
        </motion.div>

        {/* Action Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-6"
        >
          <div className="bg-white/70 backdrop-blur-md border border-amber-400/20 rounded-full px-6 py-2 inline-block">
            <span className="text-slate-700 font-medium text-sm">
              {animationPhase === "idle"
                ? "Clique para Iniciar o Diagnóstico"
                : animationPhase === "clicked"
                  ? "Preparando..."
                  : animationPhase === "hammer"
                    ? "Ativando Sistema..."
                    : animationPhase === "pulse"
                      ? "Desbloqueando..."
                      : animationPhase === "dispersing"
                        ? "Carregando Experiência..."
                        : "Redirecionando..."}
            </span>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: animationPhase === "idle" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-slate-600 text-xs"
        >
          <p>Clique na balança da justiça para começar sua jornada de transformação digital</p>
        </motion.div>
      </div>
    </div>
  )
}
