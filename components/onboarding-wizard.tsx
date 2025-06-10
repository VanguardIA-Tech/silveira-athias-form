"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight, Unlock } from "lucide-react";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import CompletionStep from "@/steps/completion-step";
import LogoSilveira from "./LogoSilveira";
import LogoVanguardia from "./LogoVanguardia";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const steps = [
  {
    id: "welcome",
    title: "Diagnóstico & Prioridades de IA",
    description: "10 minutos para preencher",
  },
  {
    id: "adoption",
    title: "Nível Atual de Adoção de IA",
    description:
      "Marque 1 número por item (0 = nunca testamos | 5 = integrado aos KPIs)",
  },
  {
    id: "prioritization",
    title: "Priorização de Soluções",
    description: "Marque ✅ se faz sentido e dê nota de Impacto 0-5",
  },
  {
    id: "completion",
    title: "Diagnóstico Concluído",
    description: "Seu plano de 15 dias está pronto",
  },
];

const parte1Perguntas = [
  {
    id: "prioridade_andamentos_processuais",
    pergunta:
      "Quanto você considera prioritário automatizar o acompanhamento de andamentos processuais (notificações, alertas, movimentações)?",
  },
  {
    id: "prioridade_gravacoes_audiencias",
    pergunta:
      "Quanto seria importante automatizar ou facilitar o acesso a gravações de audiências e resumos automatizados dessas audiências?",
  },
  {
    id: "prioridade_extracao_decisoes",
    pergunta:
      "Quanta prioridade você dá para automatizar a extração de informações relevantes de decisões judiciais (ex: valor da condenação, resultado, fundamentos)?",
  },
  {
    id: "prioridade_dashboards_jurimetria",
    pergunta:
      "Quanto seria relevante ter painéis ou dashboards de jurimetria para suporte a decisões estratégicas e planejamento?",
  },
  {
    id: "prioridade_monitoramento_prazos",
    pergunta:
      "Qual o nível de necessidade que você enxerga para automação no processo de monitoramento de prazos e controle de SLA interno?",
  },
  {
    id: "prioridade_tarefas_repetitivas",
    pergunta:
      "Quanta prioridade você vê em automatizar tarefas repetitivas do dia a dia jurídico (ex: emissão de documentos padrão, minutas, relatórios internos)?",
  },
  {
    id: "prioridade_integracao_fontes_externas",
    pergunta:
      "O quanto seria importante melhorar a integração entre o sistema jurídico atual (software interno) e fontes externas (PJe, DataJud, etc)?",
  },
  {
    id: "prioridade_assistente_ia",
    pergunta:
      "O quanto você vê valor em ter um assistente de IA que auxilie no resumo de jurisprudência e pesquisa jurídica?",
  },
  {
    id: "prioridade_fluxo_contratos",
    pergunta:
      "O quanto você considera importante otimizar ou automatizar o fluxo de produção e controle de contratos?",
  },
  {
    id: "prioridade_visibilidade_processos",
    pergunta:
      "O quanto você sente que falta visibilidade em tempo real do status dos processos e indicadores de performance jurídica?",
  },
];
const parte2Perguntas = [
  {
    id: "gargalos_operacionais",
    pergunta:
      "Na sua visão, quais são hoje as maiores ineficiências ou gargalos operacionais no fluxo de trabalho jurídico do Silveira Athias?",
  },
  {
    id: "automacao_desejada",
    pergunta:
      "Se você pudesse escolher uma automação ou ferramenta que economizasse tempo de verdade para seu trabalho ou equipe, qual seria?",
  },
  {
    id: "informacao_dificil_acesso",
    pergunta:
      "Que tipo de informação ou dado você gostaria de acessar de forma mais rápida e fácil, mas hoje é difícil ou demorado?",
  },
  {
    id: "sistemas_mais_utilizados",
    pergunta:
      'Quais são os sistemas PJe ou outros sistemas judiciais que você mais utiliza no seu dia a dia (informe o Estado e a jurisdição se possivel)?',
  },
];
const escala = [0, 1, 2, 3, 4, 5];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    parte1: Object.fromEntries(parte1Perguntas.map((q) => [q.id, 0])),
    parte2: Object.fromEntries(parte2Perguntas.map((q) => [q.id, ""])),
    adoption: {
      knowledge: 0,
      tools: 0,
      integration: 0,
      automation: 0,
      measurement: 0,
    },
    prioritization: {
      A: { selected: false, impact: 0 },
      B: { selected: false, impact: 0 },
      C: { selected: false, impact: 0 },
      D: { selected: false, impact: 0 },
      E: { selected: false, impact: 0 },
      F: { selected: false, impact: 0 },
    },
  });

  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("onboardingSessionId");
      if (!id) {
        id = Math.random().toString(36).substring(2, 15);
        localStorage.setItem("onboardingSessionId", id);
      }
      return id;
    }
    return "";
  });

  const [lastRespostaId, setLastRespostaId] = useState<number | null>(null);

  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [section]: data };
      // Não envia para API aqui, só envia ao avançar para próxima página
      return updated;
    });
  };

  const nextStep = async () => {
    // Se estiver no passo de priorização, envia para a API de voting apenas as prioridades
    if (currentStep === 1) {
      try {
        const res = await fetch(`${BASE_PATH}/api/voting`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData.parte1),
        });
        const result = await res.json();
        if (result.success && result.id) {
          setLastRespostaId(result.id);
        }
      } catch (err) {
        console.error("Erro ao salvar dados de priorização:", err);
      }
    }
    // Se estiver no passo das discursivas, envia PATCH para atualizar a linha criada na parte 1
    if (currentStep === 2 && lastRespostaId) {
      try {
        await fetch(`${BASE_PATH}/api/voting`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: lastRespostaId, ...formData.parte2 }),
        });
      } catch (err) {
        console.error("Erro ao salvar respostas discursivas:", err);
      }
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return (
          <Parte1PriorizacaoStep
            data={formData.parte1}
            updateData={(data) => updateFormData("parte1", data)}
          />
        );
      case 2:
        return (
          <Parte2DiscursivasStep
            data={formData.parte2}
            updateData={(data) => updateFormData("parte2", data)}
          />
        );
      case 3:
        return <CompletionStep formData={formData} />;
      default:
        return null;
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return Object.values(formData.parte1).every(
          (v) => typeof v === "number"
        );
      case 2:
        return Object.values(formData.parte2).every(
          (v) => typeof v === "string" && v.trim().length > 0
        );
      case 3:
        return Object.values(formData.prioritization).some(
          (item) => item.selected && item.impact > 0
        );
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Logo - Aumentada */}
        <div className="flex justify-center mb-6">
          <LogoSilveira />
        </div>

        <div className="mb-6 md:mb-8">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={steps.length - 1}
          />
        </div>

        <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-2xl rounded-xl overflow-hidden">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
                {steps[currentStep].title}
              </h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-6 md:mb-8"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-6 md:mt-8 gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:border-slate-400 px-4 py-2 md:px-6 md:py-3"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Anterior</span>
              </Button>

              <Button
                onClick={nextStep}
                disabled={!isStepComplete()}
                className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 ${
                  currentStep === steps.length - 1
                    ? "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500"
                } border-0 shadow-lg text-white`}
              >
                <span className="hidden sm:inline">
                  {currentStep === steps.length - 1 ? "Concluir" : "Próximo"}
                </span>
                <span className="sm:hidden">
                  {currentStep === steps.length - 1 ? "✓" : "→"}
                </span>
                {currentStep === steps.length - 1 ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer VanguardIA */}
        <Footer />
      </div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="py-6">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center border-4 border-amber-400/30 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Unlock className="h-12 w-12 md:h-16 md:w-16 text-amber-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="text-lg md:text-xl font-semibold text-center mb-4 text-slate-900">
          📋 Formulário Rápido — Diagnóstico & Prioridades de IA
        </h3>

        <p className="text-slate-700 text-center mb-6 text-sm md:text-base">
          <strong className="text-amber-600">10 minutos para preencher</strong>
        </p>

        <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-amber-600 mb-3">
            O que faremos com suas respostas:
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">🎯</span>
              <span className="text-slate-700 text-sm md:text-base">
                <strong className="text-slate-900">Prioridades</strong> –
                somaremos o impacto dos itens e selecionaremos os mais
                prioritários
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">📅</span>
              <span className="text-slate-700 text-sm md:text-base">
                <strong className="text-slate-900">Próximos Passos</strong> –
                apresentaremos um plano nos próximos dias com responsáveis e
                cronograma
              </span>
            </li>
          </ul>
        </div>

        <p className="text-center text-slate-600 text-sm md:text-base">
          Clique em "Próximo" para começar o diagnóstico rápido de IA.
        </p>
      </motion.div>
    </div>
  );
}

function ProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="relative pt-1">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 bg-white/80 backdrop-blur-md border border-slate-200">
            Progresso
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-amber-600">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-white/80 backdrop-blur-md border border-slate-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-amber-500 to-cyan-600"
        />
      </div>
      <div className="flex justify-between">
        {Array.from({ length: totalSteps + 1 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                index <= currentStep
                  ? "bg-gradient-to-r from-amber-500 to-cyan-600 border-amber-500 text-white"
                  : "bg-white/80 border-slate-300 text-slate-600"
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </div>
            {index < totalSteps && (
              <div className="hidden sm:block text-xs mt-1 text-slate-600">
                {steps[index + 1].title.split(" ")[0]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="mt-12 pt-8 border-t border-slate-200"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Logo VanguardIA aumentada em 2x */}
          <LogoVanguardia />
        </div>
        <div className="text-center">
          <p className="text-slate-600 text-sm">
            Desenvolvido com 💙 pela{" "}
            <strong className="text-blue-600">VanguardIA</strong>
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Transformando o futuro jurídico com Inteligência Artificial
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

// Novo componente para o passo de priorização (Parte 1)
function Parte1PriorizacaoStep({
  data,
  updateData,
}: {
  data: { [key: string]: number };
  updateData: (data: { [key: string]: number }) => void;
}) {
  const handleChange = (id: string, value: number) => {
    updateData({ ...data, [id]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200 p-4 rounded-lg mb-6">
        <p className="text-slate-700 text-sm mb-2">
          <strong className="text-amber-600">Avalie de 0 a 5</strong> cada item
          abaixo conforme a prioridade para o escritório.
        </p>
        <p className="text-slate-700 text-sm">
          <span className="text-cyan-600">
            (0 = nada prioritário | 5 = prioridade máxima)
          </span>
        </p>
      </div>
      <div className="space-y-6">
        {parte1Perguntas.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-lg p-4"
          >
            <div className="mb-2 text-slate-900 font-medium">{q.pergunta}</div>
            <div className="flex gap-2">
              {escala.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => handleChange(q.id, n)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    data[q.id] === n
                      ? "bg-gradient-to-r from-amber-500 to-cyan-600 text-white shadow-lg scale-105"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Novo componente para perguntas discursivas
function Parte2DiscursivasStep({
  data,
  updateData,
}: {
  data: { [key: string]: string };
  updateData: (data: { [key: string]: string }) => void;
}) {
  const handleChange = (id: string, value: string) => {
    updateData({ ...data, [id]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200 p-4 rounded-lg mb-6">
        <p className="text-slate-700 text-sm mb-2">
          <strong className="text-amber-600">Responda brevemente</strong> às
          perguntas abaixo para entendermos melhor os desafios e oportunidades
          do escritório.
        </p>
      </div>
      <div className="space-y-6">
        {parte2Perguntas.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-lg p-4"
          >
            <div className="mb-2 text-slate-900 font-medium">{q.pergunta}</div>
            <textarea
              value={data[q.id]}
              onChange={(e) => handleChange(q.id, e.target.value)}
              rows={3}
              className="w-full border border-slate-300 rounded-lg p-2 text-slate-800 bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              placeholder="Digite sua resposta..."
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
