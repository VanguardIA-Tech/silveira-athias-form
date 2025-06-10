"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

type BarriersStepProps = {
  data: string
  updateData: (data: string) => void
}

const barriers = [
  {
    id: "a",
    emoji: "⏱️",
    title: "Falta de tempo para treinamento da equipe",
    description: "A equipe não tem disponibilidade para aprender novas ferramentas.",
  },
  {
    id: "b",
    emoji: "🔒",
    title: "Restrições de segurança / LGPD",
    description: "Preocupações com privacidade e segurança dos dados.",
  },
  {
    id: "c",
    emoji: "🔌",
    title: "Sistemas legados sem integração",
    description: "Dificuldade em conectar IA com sistemas existentes.",
  },
  {
    id: "d",
    emoji: "🧠",
    title: "Resistência cultural ao uso de IA",
    description: "Ceticismo ou resistência à adoção de novas tecnologias.",
  },
  {
    id: "e",
    emoji: "💰",
    title: "Orçamento limitado para tecnologia",
    description: "Restrições financeiras para investir em soluções de IA.",
  },
]

export default function BarriersStep({ data, updateData }: BarriersStepProps) {
  const [selectedBarrier, setSelectedBarrier] = useState<string>(data)

  const handleBarrierSelect = (id: string) => {
    setSelectedBarrier(id)
    updateData(id)
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-700/50 backdrop-blur-md border border-slate-600/50 p-4 rounded-lg mb-6">
        <p className="text-slate-300 text-sm">
          Qual obstáculo mais atrapalha a adoção de IA hoje no escritório? Escolha apenas um.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {barriers.map((barrier, index) => (
          <motion.div
            key={barrier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleBarrierSelect(barrier.id)}
            className={`
              relative p-4 md:p-6 rounded-lg border-2 cursor-pointer transition-all
              ${
                selectedBarrier === barrier.id
                  ? "border-amber-400 bg-amber-400/10 backdrop-blur-md shadow-lg"
                  : "border-slate-600/50 bg-slate-700/50 backdrop-blur-md hover:border-amber-400/50 hover:bg-amber-400/5"
              }
            `}
          >
            {selectedBarrier === barrier.id && (
              <div className="absolute top-2 right-2">
                <div className="bg-amber-400 text-slate-900 rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <div className="text-3xl">{barrier.emoji}</div>
              <h3 className="font-medium text-white text-sm md:text-base">{barrier.title}</h3>
              <p className="text-xs md:text-sm text-slate-400">{barrier.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedBarrier && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-lg"
        >
          <h3 className="font-semibold text-amber-400 mb-2">Estratégia Recomendada</h3>

          {selectedBarrier === "a" && (
            <div className="space-y-2">
              <p className="text-slate-300 text-sm md:text-base">
                Para superar a <strong className="text-amber-400">falta de tempo para treinamento</strong>,
                recomendamos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-sm">
                <li>Sessões curtas de treinamento (15-30 min) focadas em casos práticos</li>
                <li>Documentação visual e tutoriais em vídeo acessíveis a qualquer momento</li>
                <li>Implementação gradual com foco em quick-wins de alto impacto</li>
              </ul>
            </div>
          )}

          {selectedBarrier === "b" && (
            <div className="space-y-2">
              <p className="text-slate-300 text-sm md:text-base">
                Para superar as <strong className="text-amber-400">restrições de segurança/LGPD</strong>, recomendamos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-sm">
                <li>Workshop específico sobre IA e LGPD com a equipe jurídica</li>
                <li>Implementação de políticas claras de uso de IA e dados</li>
                <li>Priorização de soluções com processamento local de dados sensíveis</li>
              </ul>
            </div>
          )}

          {selectedBarrier === "c" && (
            <div className="space-y-2">
              <p className="text-slate-300 text-sm md:text-base">
                Para superar os <strong className="text-amber-400">sistemas legados sem integração</strong>,
                recomendamos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-sm">
                <li>Mapeamento dos principais fluxos de dados entre sistemas</li>
                <li>Desenvolvimento de conectores específicos para o ERP jurídico</li>
                <li>Implementação de soluções independentes para casos de uso prioritários</li>
              </ul>
            </div>
          )}

          {selectedBarrier === "d" && (
            <div className="space-y-2">
              <p className="text-slate-300 text-sm md:text-base">
                Para superar a <strong className="text-amber-400">resistência cultural ao uso de IA</strong>,
                recomendamos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-sm">
                <li>Programa de champions internos com advogados influentes</li>
                <li>Demonstrações práticas com casos reais do escritório</li>
                <li>Métricas claras de ganho de produtividade e qualidade</li>
              </ul>
            </div>
          )}

          {selectedBarrier === "e" && (
            <div className="space-y-2">
              <p className="text-slate-300 text-sm md:text-base">
                Para superar o <strong className="text-amber-400">orçamento limitado para tecnologia</strong>,
                recomendamos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-sm">
                <li>Priorização de soluções com maior ROI e menor custo de implementação</li>
                <li>Modelo de implementação em fases com validação de resultados</li>
                <li>Foco em soluções que reduzam custos operacionais rapidamente</li>
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
