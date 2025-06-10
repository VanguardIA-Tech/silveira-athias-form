"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type ObstaclesData = {
  people: string
  processes: string
  technology: string
}

type ObstaclesStepProps = {
  data: ObstaclesData
  updateData: (data: ObstaclesData) => void
}

const obstacleCategories = [
  {
    id: "people",
    category: "Pessoas",
    options: [
      { id: "time", label: "Falta de tempo para treinamento" },
      { id: "resistance", label: "Resistência a novas ferramentas" },
      { id: "turnover", label: "Rotatividade da equipe" },
    ],
  },
  {
    id: "processes",
    category: "Processos",
    options: [
      { id: "standards", label: "Não há procedimentos padronizados" },
      { id: "bureaucracy", label: "Burocracia interna" },
      { id: "ownership", label: "Falta de responsável definido" },
    ],
  },
  {
    id: "technology",
    category: "Tecnologia",
    options: [
      { id: "legacy", label: "Sistemas legados difíceis de integrar" },
      { id: "security", label: "Restrições LGPD / segurança" },
      { id: "budget", label: "Orçamento limitado" },
    ],
  },
]

export default function ObstaclesStep({ data, updateData }: ObstaclesStepProps) {
  const [localData, setLocalData] = useState<ObstaclesData>(data)

  const handleSelectionChange = (category: string, value: string) => {
    const newData = {
      ...localData,
      [category]: value,
    }

    setLocalData(newData)
    updateData(newData)
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200 p-4 rounded-lg mb-6">
        <p className="text-slate-700 text-sm">
          <strong className="text-amber-600">Assinale apenas uma opção por categoria</strong> — identifique o principal
          obstáculo em cada área.
        </p>
      </div>

      <div className="space-y-6">
        {obstacleCategories.map((categoryGroup, groupIndex) => (
          <motion.div
            key={categoryGroup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.2 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-lg p-4"
          >
            <h3 className="font-semibold text-lg text-amber-600 mb-4">{categoryGroup.category}</h3>

            <div className="space-y-3">
              {categoryGroup.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    localData[categoryGroup.id as keyof ObstaclesData] === option.id
                      ? "bg-amber-100 border border-amber-300"
                      : "bg-slate-50 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name={categoryGroup.id}
                    value={option.id}
                    checked={localData[categoryGroup.id as keyof ObstaclesData] === option.id}
                    onChange={() => handleSelectionChange(categoryGroup.id, option.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      localData[categoryGroup.id as keyof ObstaclesData] === option.id
                        ? "border-amber-500 bg-amber-500"
                        : "border-slate-400"
                    }`}
                  >
                    {localData[categoryGroup.id as keyof ObstaclesData] === option.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-slate-700 text-sm md:text-base">{option.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {Object.values(localData).some((value) => value !== "") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-slate-100/80 backdrop-blur-md border border-slate-200 rounded-lg"
        >
          <h3 className="font-semibold text-amber-600 mb-2">Obstáculos Identificados</h3>
          <div className="space-y-2">
            {obstacleCategories.map((category) => {
              const selectedOption = category.options.find(
                (opt) => opt.id === localData[category.id as keyof ObstaclesData],
              )

              if (!selectedOption) return null

              return (
                <div key={category.id} className="flex items-center gap-2">
                  <span className="font-medium text-cyan-600">{category.category}:</span>
                  <span className="text-slate-700 text-sm md:text-base">{selectedOption.label}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
