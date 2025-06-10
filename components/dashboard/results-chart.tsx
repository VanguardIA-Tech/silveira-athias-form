"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useDatabase } from "./database-context"

type Props = {
  votingData: any
  showFinalResults?: boolean
}

export default function ResultsChart({ showFinalResults = false }: Props) {
  const { votes, finalVotes } = useDatabase()
  const [animatedVotes, setAnimatedVotes] = useState(votes)

  const displayVotes = showFinalResults && finalVotes ? finalVotes : votes
  const totalVotes = displayVotes.optionA + displayVotes.optionB + displayVotes.optionC || 1

  const percentageA = Math.round((displayVotes.optionA / totalVotes) * 100) || 0
  const percentageB = Math.round((displayVotes.optionB / totalVotes) * 100) || 0
  const percentageC = Math.round((displayVotes.optionC / totalVotes) * 100) || 0

  useEffect(() => {
    setAnimatedVotes(displayVotes)
  }, [displayVotes])

  const options = [
    {
      id: "optionA",
      label: "Pesquisa de Jurisprudência automática",
      description: "1 h ➜ 3 min por busca",
      votes: displayVotes.optionA,
      percentage: percentageA,
      color: "from-amber-500 to-amber-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      id: "optionB",
      label: "Triagem de Novos Casos por área/risco",
      description: "70% menos trabalho manual",
      votes: displayVotes.optionB,
      percentage: percentageB,
      color: "from-cyan-500 to-cyan-600",
      textColor: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
    {
      id: "optionC",
      label: "Gerador de Minutas de petições/contratos",
      description: "Primeira versão em 5 min",
      votes: displayVotes.optionC,
      percentage: percentageC,
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ]

  // Ordenar opções por número de votos (maior para menor)
  const sortedOptions = [...options].sort((a, b) => b.votes - a.votes)

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 space-y-4 md:space-y-6">
        {sortedOptions.map((option) => (
          <div key={option.id} className="space-y-2 md:space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium ${option.textColor} text-sm md:text-base leading-tight`}>{option.label}</h4>
                <p className="text-xs md:text-sm text-slate-600 mt-1">{option.description}</p>
              </div>
              <div className="text-right sm:text-left sm:ml-4 flex-shrink-0">
                <span className="text-xl md:text-2xl font-bold text-slate-900">{option.votes}</span>
                <span className="text-sm md:text-lg text-slate-600 ml-1">votos</span>
              </div>
            </div>

            <div className="h-6 md:h-8 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${option.color} rounded-full relative`}
                initial={{ width: "0%" }}
                animate={{ width: `${option.percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="h-full flex items-center justify-end pr-2 md:pr-3">
                  <span className="text-white font-bold text-xs md:text-sm">{option.percentage}%</span>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {showFinalResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 md:mt-8 p-3 md:p-4 bg-slate-100/80 border border-slate-200 rounded-lg"
        >
          <h3 className="font-bold text-base md:text-lg mb-2 text-slate-900">Resultado da Votação</h3>
          <p className="text-slate-700 text-sm md:text-base">
            A opção <span className={sortedOptions[0].textColor}>{sortedOptions[0].label}</span> foi a mais votada com{" "}
            <span className="font-bold text-slate-900">{sortedOptions[0].percentage}%</span> dos votos.
          </p>
        </motion.div>
      )}
    </div>
  )
}
