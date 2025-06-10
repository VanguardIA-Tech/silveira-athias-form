"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type MaturityData = {
  [key: string]: number
}

type MaturityStepProps = {
  data: MaturityData
  updateData: (data: MaturityData) => void
}

const maturityStatements = [
  {
    dimension: "Compreensão",
    statements: [
      {
        id: "understanding1",
        text: "Temos políticas internas de uso de IA documentadas.",
      },
      {
        id: "understanding2",
        text: "A equipe entende exemplos práticos de IA no Direito.",
      },
    ],
  },
  {
    dimension: "Navegação",
    statements: [
      {
        id: "navigation1",
        text: "Usamos prompts padronizados em fluxos diários.",
      },
      {
        id: "navigation2",
        text: "Resultados de IA integram-se facilmente ao ERP jurídico.",
      },
    ],
  },
  {
    dimension: "Habilitação",
    statements: [
      {
        id: "enablement1",
        text: "Já temos automações em produção que combinam IA e dados internos.",
      },
      {
        id: "enablement2",
        text: "Medimos KPIs de impacto (horas economizadas etc.).",
      },
    ],
  },
]

export default function MaturityStep({ data, updateData }: MaturityStepProps) {
  const [localData, setLocalData] = useState<MaturityData>(data)

  const handleRatingChange = (id: string, value: number) => {
    const newData = {
      ...localData,
      [id]: value,
    }

    setLocalData(newData)
    updateData(newData)
  }

  const getDimensionScore = (dimension: string) => {
    const statements = maturityStatements.find((d) => d.dimension === dimension)?.statements || []
    const scores = statements.map((s) => localData[s.id] || 0)
    return (scores.reduce((sum, score) => sum + score, 0) / (statements.length * 5)) * 100
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-700/50 backdrop-blur-md border border-slate-600/50 p-4 rounded-lg mb-6">
        <p className="text-slate-300 text-sm">
          Avalie cada afirmativa em uma escala de 1 a 5, onde:
          <br />
          <strong className="text-amber-400">1 = Discordo totalmente</strong> e{" "}
          <strong className="text-amber-400">5 = Concordo totalmente</strong>
        </p>
      </div>

      {maturityStatements.map((dimensionGroup, groupIndex) => (
        <motion.div
          key={dimensionGroup.dimension}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-white">{dimensionGroup.dimension}</h3>
            <div className="flex items-center gap-2">
              <div className="h-2 w-20 md:w-24 bg-slate-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${getDimensionScore(dimensionGroup.dimension)}%` }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </div>
              <span className="text-sm text-slate-300">{Math.round(getDimensionScore(dimensionGroup.dimension))}%</span>
            </div>
          </div>

          <div className="bg-slate-700/50 backdrop-blur-md rounded-lg border border-slate-600/50 overflow-hidden">
            {dimensionGroup.statements.map((statement, index) => (
              <div
                key={statement.id}
                className={`p-4 ${index !== dimensionGroup.statements.length - 1 ? "border-b border-slate-600/30" : ""}`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-300 text-sm md:text-base">{statement.text}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60">Avalie honestamente a situação atual do escritório.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex gap-2 md:gap-3">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(statement.id, rating)}
                          className={`
                            w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all font-medium
                            ${
                              localData[statement.id] === rating
                                ? "bg-gradient-to-r from-amber-400 to-cyan-400 text-slate-900 shadow-lg scale-105"
                                : "bg-slate-600 text-slate-300 hover:bg-slate-500 border border-slate-500/50"
                            }
                          `}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {Object.keys(localData).length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-lg"
        >
          <h3 className="font-semibold text-amber-400 mb-2">Resumo da Maturidade</h3>
          <div className="space-y-4">
            {maturityStatements.map((dimension) => {
              const score = getDimensionScore(dimension.dimension)
              let status = "Iniciante"
              let color = "text-orange-400"

              if (score >= 80) {
                status = "Avançado"
                color = "text-cyan-400"
              } else if (score >= 40) {
                status = "Intermediário"
                color = "text-amber-400"
              }

              return (
                <div key={dimension.dimension} className="flex items-center justify-between">
                  <span className="font-medium text-slate-300">{dimension.dimension}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 md:w-32 bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          score >= 80 ? "bg-cyan-400" : score >= 40 ? "bg-amber-400" : "bg-orange-400"
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className={`font-medium ${color} text-sm`}>{status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
