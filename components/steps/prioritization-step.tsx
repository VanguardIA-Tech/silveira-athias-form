"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

type PrioritizationData = {
  [key: string]: {
    selected: boolean
    impact: number
  }
}

type PrioritizationStepProps = {
  data: PrioritizationData
  updateData: (data: PrioritizationData) => void
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

export default function PrioritizationStep({ data, updateData }: PrioritizationStepProps) {
  const [localData, setLocalData] = useState<PrioritizationData>(data)

  const handleSelectionChange = (id: string, selected: boolean) => {
    const newData = {
      ...localData,
      [id]: {
        ...localData[id],
        selected,
        impact: selected ? localData[id].impact : 0,
      },
    }

    setLocalData(newData)
    updateData(newData)
  }

  const handleImpactChange = (id: string, impact: number) => {
    const newData = {
      ...localData,
      [id]: {
        ...localData[id],
        impact,
      },
    }

    setLocalData(newData)
    updateData(newData)
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200 p-4 rounded-lg mb-6">
        <p className="text-slate-700 text-sm mb-2">
          <strong className="text-amber-600">Passo 1:</strong> marque ✅ se faz sentido ou ❌ se não faz.
        </p>
        <p className="text-slate-700 text-sm">
          <strong className="text-amber-600">Passo 2:</strong> dê uma nota de Impacto 0-5 apenas nos itens ✅.
          <br />
          <span className="text-cyan-600">(0 = impacto nulo | 5 = transformador)</span>
        </p>
      </div>

      {/* Mobile-first design */}
      <div className="space-y-6 md:hidden">
        {solutions.map((solution, index) => (
          <motion.div
            key={solution.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-lg p-4"
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-amber-600 text-lg">{solution.id}</span>
                <span className="text-cyan-600 text-sm font-medium">{solution.example}</span>
              </div>
              <h3 className="text-slate-900 font-medium text-sm leading-tight">{solution.title}</h3>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-slate-700 block mb-2">Faz sentido?</span>
                <div className="flex gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => handleSelectionChange(solution.id, true)}
                    className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all font-medium ${
                      localData[solution.id].selected
                        ? "bg-cyan-600 text-white shadow-lg"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                    <span>Sim</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectionChange(solution.id, false)}
                    className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all font-medium ${
                      !localData[solution.id].selected
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    <X className="h-4 w-4" />
                    <span>Não</span>
                  </button>
                </div>
              </div>

              {localData[solution.id].selected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm font-medium text-slate-700 block mb-2">Impacto (0-5)</span>
                  <div className="grid grid-cols-6 gap-2">
                    {[0, 1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleImpactChange(solution.id, rating)}
                        className={`h-12 rounded-lg flex items-center justify-center transition-all font-bold ${
                          localData[solution.id].impact === rating
                            ? "bg-gradient-to-r from-amber-500 to-cyan-600 text-white shadow-lg scale-105"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100/80 backdrop-blur-md">
              <th className="p-3 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">#</th>
              <th className="p-3 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                Proposta de solução
              </th>
              <th className="p-3 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                Exemplo de ganho
              </th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">✅</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">❌</th>
              <th className="p-3 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">
                Impacto 0-5
              </th>
            </tr>
          </thead>
          <tbody>
            {solutions.map((solution, index) => (
              <motion.tr
                key={solution.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-slate-200 hover:bg-slate-50"
              >
                <td className="p-3 text-amber-600 font-medium">{solution.id}</td>
                <td className="p-3 text-slate-700">{solution.title}</td>
                <td className="p-3 text-cyan-600 text-sm">{solution.example}</td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleSelectionChange(solution.id, true)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      localData[solution.id].selected
                        ? "bg-cyan-600 text-white shadow-lg"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleSelectionChange(solution.id, false)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      !localData[solution.id].selected
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </td>
                <td className="p-3">
                  {localData[solution.id].selected ? (
                    <div className="flex justify-center gap-1">
                      {[0, 1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleImpactChange(solution.id, rating)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            localData[solution.id].impact === rating
                              ? "bg-gradient-to-r from-amber-500 to-cyan-600 text-white shadow-lg"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-slate-400">-</div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {Object.values(localData).some((item) => item.selected && item.impact > 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-slate-100/80 backdrop-blur-md border border-slate-200 rounded-lg"
        >
          <h3 className="font-semibold text-amber-600 mb-2">Top 3 Prioridades</h3>
          <div className="space-y-2">
            {Object.entries(localData)
              .filter(([, item]) => item.selected && item.impact > 0)
              .sort(([, a], [, b]) => b.impact - a.impact)
              .slice(0, 3)
              .map(([key, item], index) => {
                const solution = solutions.find((s) => s.id === key)
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="font-semibold text-amber-600">{index + 1}.</span>
                    <span className="text-slate-700 text-sm md:text-base">{solution?.title}</span>
                    <span className="ml-auto font-medium text-cyan-600">Impacto {item.impact}/5</span>
                  </div>
                )
              })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
