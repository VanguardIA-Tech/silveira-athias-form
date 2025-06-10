"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type AdoptionData = {
  knowledge: number
  tools: number
  integration: number
  automation: number
  measurement: number
}

type AdoptionStepProps = {
  data: AdoptionData
  updateData: (data: AdoptionData) => void
}

const adoptionQuestions = [
  {
    id: "knowledge",
    theme: "Conhecimento",
    question: "A equipe conhece exemplos práticos de IA no Direito?",
  },
  {
    id: "tools",
    theme: "Ferramentas",
    question: "Usamos IA no dia a dia (elaboração de peças, pesquisa, etc.)?",
  },
  {
    id: "integration",
    theme: "Integração",
    question: "Resultados gerados por IA entram nos nossos sistemas (ERP, CRM, etc.)?",
  },
  {
    id: "automation",
    theme: "Automatização",
    question: "Já temos tarefas automatizadas com IA em produção (ex.: alerta de prazos)?",
  },
  {
    id: "measurement",
    theme: "Medição",
    question: "Medimos o ganho de tempo ou qualidade trazido pela IA?",
  },
]

const scaleLabels = [
  { value: 0, label: "Nunca testamos IA." },
  { value: 1, label: "Fizemos testes pontuais por curiosidade." },
  { value: 2, label: "Temos um experimento interno em andamento." },
  { value: 3, label: "Já usamos IA em um fluxo real, mas de forma limitada." },
  { value: 4, label: "Vários times utilizam IA diariamente." },
  { value: 5, label: "A IA está integrada aos indicadores de performance do escritório." },
]

export default function AdoptionStep({ data, updateData }: AdoptionStepProps) {
  const [localData, setLocalData] = useState<AdoptionData>(data)

  const handleRatingChange = (id: string, value: number) => {
    const newData = {
      ...localData,
      [id]: value,
    }

    setLocalData(newData)
    updateData(newData)
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-amber-600 mb-2">Escala de Adoção:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {scaleLabels.map((item) => (
            <div key={item.value} className="flex items-center gap-2">
              <span className="font-bold text-cyan-600 w-4">{item.value}</span>
              <span className="text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-first design */}
      <div className="space-y-6 md:hidden">
        {adoptionQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-lg p-4"
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-amber-600 text-sm">{question.theme}</span>
              </div>
              <h3 className="text-slate-900 font-medium text-sm leading-tight">{question.question}</h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange(question.id, rating)}
                  className={`h-12 rounded-lg flex items-center justify-center transition-all font-bold text-lg ${
                    localData[question.id as keyof AdoptionData] === rating
                      ? "bg-gradient-to-r from-amber-500 to-cyan-600 text-white shadow-lg scale-105"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300"
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100/80 backdrop-blur-md">
              <th className="p-3 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">Tema</th>
              <th className="p-3 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">Pergunta</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">0</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">1</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">2</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">3</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">4</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">5</th>
            </tr>
          </thead>
          <tbody>
            {adoptionQuestions.map((question, index) => (
              <motion.tr
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-slate-200 hover:bg-slate-50"
              >
                <td className="p-3 text-amber-600 font-medium">{question.theme}</td>
                <td className="p-3 text-slate-700">{question.question}</td>
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <td key={rating} className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleRatingChange(question.id, rating)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all font-medium ${
                        localData[question.id as keyof AdoptionData] === rating
                          ? "bg-gradient-to-r from-amber-500 to-cyan-600 text-white shadow-lg"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300"
                      }`}
                    >
                      ○
                    </button>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {Object.values(localData).some((value) => value > 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-slate-100/80 backdrop-blur-md border border-slate-200 rounded-lg"
        >
          <h3 className="font-semibold text-amber-600 mb-2">Mapa de Adoção Atual</h3>
          <div className="space-y-3">
            {adoptionQuestions.map((question) => {
              const score = localData[question.id as keyof AdoptionData]
              const percentage = (score / 5) * 100

              return (
                <div key={question.id} className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 text-sm">{question.theme}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 md:w-32 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          score >= 4 ? "bg-cyan-600" : score >= 2 ? "bg-amber-500" : "bg-orange-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-cyan-600 w-8">{score}/5</span>
                  </div>
                </div>
              )
            })}
            <div className="pt-2 border-t border-slate-300">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Média Geral</span>
                <span className="font-bold text-amber-600">
                  {(Object.values(localData).reduce((sum, val) => sum + val, 0) / 5).toFixed(1)}/5
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
