"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Target, Heart, Sparkles } from "lucide-react"

type CompletionStepProps = {
  formData: any
}

const solutions = [
  {
    id: "A",
    title: "Pesquisa de Jurisprudência automática",
    example: "1 h ➜ 3 min por busca",
  },
  {
    id: "B",
    title: "Triagem de Novos Casos por área/risco",
    example: "70% menos trabalho manual",
  },
  {
    id: "C",
    title: "Gerador de Minutas de petições/contratos",
    example: "Primeira versão em 5 min",
  },
  {
    id: "D",
    title: "Revisão LGPD de documentos",
    example: "Destaca 90% das cláusulas críticas",
  },
  {
    id: "E",
    title: "Busca Interna Inteligente em arquivos do escritório",
    example: "30% menos tempo procurando info",
  },
  {
    id: "F",
    title: "Alertas de Prazos automáticos no ERP jurídico",
    example: "Reduz risco de perda de prazo a zero",
  },
]

export default function CompletionStep({ formData }: CompletionStepProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    const saveData = async () => {
      setIsSaving(true)
      try {
        // Gerar session ID único
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        const response = await fetch("/api/onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            adoption: formData.adoption,
            prioritization: formData.prioritization,
            respondentInfo: {
              name: "Sócio Silveira Athias", // Pode ser personalizado
              email: null,
            },
          }),
        })

        const result = await response.json()

        if (result.success) {
          setSaveSuccess(true)
          console.log("Dados salvos com sucesso:", result)
        } else {
          console.error("Erro ao salvar dados:", result.message)
        }
      } catch (error) {
        console.error("Erro ao salvar dados:", error)
      } finally {
        setIsSaving(false)
      }
    }

    // Salvar dados quando o componente carregar
    saveData()
  }, [formData])

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate top 3 priorities
  const topPriorities = Object.entries(formData.prioritization)
    .filter(([, item]: [string, any]) => item.selected && item.impact > 0)
    .sort(([, a], [, b]) => (b as any).impact - (a as any).impact)
    .slice(0, 3)
    .map(([key, item]) => ({
      id: key,
      title: solutions.find((s) => s.id === key)?.title || "",
      example: solutions.find((s) => s.id === key)?.example || "",
      impact: (item as any).impact,
    }))

  return (
    <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
      {showConfetti && <Confetti />}

      {/* Success Icon and Title */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg"
        >
          <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-white" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 md:mb-4"
        >
          🎉 Diagnóstico Concluído!
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-700 mb-6 md:mb-8 text-sm md:text-base lg:text-lg px-4"
        >
          Obrigado por participar do diagnóstico de IA do Silveira Athias!
          <br />
          <span className="text-amber-600 font-medium">Suas respostas foram registradas com sucesso.</span>
        </motion.p>
      </div>

      {/* Top Priorities */}
      {topPriorities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-100/80 backdrop-blur-md border border-slate-200 rounded-lg p-4 md:p-6 mx-4 md:mx-0"
        >
          <h3 className="font-semibold text-lg md:text-xl text-amber-600 mb-4 md:mb-6 flex items-center gap-2 justify-center">
            <Target className="h-5 w-5 md:h-6 md:w-6" />
            <span>🎯 Suas Top Prioridades</span>
          </h3>

          <div className="space-y-4 md:space-y-6">
            {topPriorities.map((priority, index) => (
              <motion.div
                key={priority.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.2 }}
                className="bg-white/70 rounded-lg p-4 md:p-5 border border-slate-200 shadow-sm"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-gradient-to-br from-amber-500 to-cyan-600 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm md:text-base">{index + 1}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-900 text-sm md:text-base lg:text-lg font-medium mb-1 md:mb-2 leading-tight">
                      {priority.title}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-600 mb-2 md:mb-3">{priority.example}</p>

                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="h-2 md:h-2.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-500 to-cyan-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${(priority.impact / 5) * 100}%` }}
                          transition={{ delay: 1.2 + index * 0.2, duration: 1 }}
                        />
                      </div>
                      <span className="text-xs md:text-sm text-amber-600 font-medium whitespace-nowrap">
                        Impacto {priority.impact}/5
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Thank You Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-center bg-gradient-to-br from-amber-50 to-cyan-50 border border-amber-200/50 rounded-lg p-6 md:p-8 mx-4 md:mx-0"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
          className="text-4xl md:text-5xl lg:text-6xl mb-4"
        >
          💙
        </motion.div>

        <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-2 md:mb-4">Muito Obrigado!</h4>

        <p className="text-slate-700 text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
          Sua participação é fundamental para o futuro da inovação no Silveira Athias. Em breve, nossa equipe entrará em
          contato para apresentar o plano personalizado baseado em suas respostas.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-slate-600"
        >
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            <span>Feito com carinho pela VanguardIA</span>
          </div>
          <span className="hidden md:inline">•</span>
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
            <span>Transformando o futuro jurídico</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#0ea5e9" : "#10b981",
            left: `${Math.random() * 100}%`,
            top: "-10px",
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
