"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

type ReadinessData = {
  [key: string]: boolean | null
}

type ReadinessStepProps = {
  data: ReadinessData
  updateData: (data: ReadinessData) => void
}

const readinessQuestions = [
  {
    id: "question1",
    text: "Conseguimos liberar todos os acessos necessários até 14/06?",
  },
  {
    id: "question2",
    text: "Existe um ponto-focal técnico interno para validações?",
  },
  {
    id: "question3",
    text: "Já temos guidelines de segurança da informação que a IA deve seguir?",
  },
]

export default function ReadinessStep({ data, updateData }: ReadinessStepProps) {
  const [localData, setLocalData] = useState<ReadinessData>(data)

  const handleAnswerChange = (id: string, value: boolean) => {
    const newData = {
      ...localData,
      [id]: value,
    }

    setLocalData(newData)
    updateData(newData)
  }

  const getReadinessScore = () => {
    const answeredQuestions = Object.values(localData).filter((value) => value !== null)
    if (answeredQuestions.length === 0) return 0

    const positiveAnswers = answeredQuestions.filter((value) => value === true)
    return (positiveAnswers.length / answeredQuestions.length) * 100
  }

  const readinessScore = getReadinessScore()

  return (
    <div className="space-y-6">
      <div className="bg-slate-700/50 backdrop-blur-md border border-slate-600/50 p-4 rounded-lg mb-6">
        <p className="text-slate-300 text-sm">
          Responda às seguintes perguntas para avaliarmos a prontidão operacional do escritório para implementação de
          IA.
        </p>
      </div>

      <div className="space-y-4">
        {readinessQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-slate-700/50 backdrop-blur-md rounded-lg border border-slate-600/50 p-4"
          >
            <div className="flex flex-col gap-4">
              <span className="text-slate-300 text-sm md:text-base">{question.text}</span>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => handleAnswerChange(question.id, true)}
                  className={`
                    px-6 py-3 md:px-8 md:py-4 rounded-lg flex items-center gap-2 transition-all font-medium
                    ${
                      localData[question.id] === true
                        ? "bg-cyan-600 text-white border border-cyan-500/50 shadow-lg"
                        : "bg-slate-600 text-slate-300 hover:bg-slate-500 border border-slate-500/50"
                    }
                  `}
                >
                  <Check className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-sm md:text-base">Sim</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswerChange(question.id, false)}
                  className={`
                    px-6 py-3 md:px-8 md:py-4 rounded-lg flex items-center gap-2 transition-all font-medium
                    ${
                      localData[question.id] === false
                        ? "bg-red-600 text-white border border-red-500/50 shadow-lg"
                        : "bg-slate-600 text-slate-300 hover:bg-slate-500 border border-slate-500/50"
                    }
                  `}
                >
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-sm md:text-base">Não</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {Object.keys(localData).some((key) => localData[key] !== null) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-lg"
        >
          <h3 className="font-semibold text-amber-400 mb-4">Análise de Prontidão</h3>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-slate-300">Prontidão Operacional</span>
              <span className="text-sm font-medium text-slate-300">{Math.round(readinessScore)}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-600 rounded-full">
              <motion.div
                className={`h-2.5 rounded-full ${
                  readinessScore >= 70 ? "bg-cyan-400" : readinessScore >= 40 ? "bg-amber-400" : "bg-red-400"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${readinessScore}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {readinessScore === 100 ? (
              <div className="flex items-center gap-2 text-cyan-400">
                <Check className="h-5 w-5" />
                <span>Excelente! O escritório está pronto para implementação.</span>
              </div>
            ) : readinessScore >= 70 ? (
              <div className="text-amber-400">
                <p>O escritório está bem preparado, mas há alguns pontos a melhorar.</p>
              </div>
            ) : readinessScore >= 40 ? (
              <div className="text-yellow-400">
                <p>Existem alguns desafios operacionais que precisam ser resolvidos.</p>
              </div>
            ) : (
              <div className="text-red-400">
                <p>Há importantes barreiras operacionais que precisam ser superadas antes da implementação.</p>
              </div>
            )}

            <div className="pt-2">
              <h4 className="font-medium text-slate-300 mb-2">Próximos passos recomendados:</h4>
              <ul className="space-y-1 text-sm text-slate-400">
                {localData.question1 === false && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>Agendar reunião para definir plano de liberação de acessos</span>
                  </li>
                )}
                {localData.question2 === false && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>Designar um ponto focal técnico para o projeto</span>
                  </li>
                )}
                {localData.question3 === false && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>Desenvolver guidelines de segurança da informação para uso de IA</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
