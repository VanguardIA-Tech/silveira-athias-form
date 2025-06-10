"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Calendar, Users, ArrowRight } from "lucide-react";
import NextImage from "next/image";
import { useDatabase } from "./database-context";
import LogoVanguardia from "../LogoVanguardia";

interface DecisionDisplayProps {
  votingData: any;
}

export default function DecisionDisplay({ votingData }: DecisionDisplayProps) {
  const { finalVotes } = useDatabase();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Determinar a opção vencedora
  const totalVotes = finalVotes
    ? finalVotes.optionA + finalVotes.optionB + finalVotes.optionC
    : 0;

  let winningOption = {
    id: "optionA",
    label: "Pesquisa de Jurisprudência automática",
    description: "1 h ➜ 3 min por busca",
    percentage: 0,
  };

  if (finalVotes) {
    const percentageA =
      Math.round((finalVotes.optionA / totalVotes) * 100) || 0;
    const percentageB =
      Math.round((finalVotes.optionB / totalVotes) * 100) || 0;
    const percentageC =
      Math.round((finalVotes.optionC / totalVotes) * 100) || 0;

    if (percentageB > percentageA && percentageB > percentageC) {
      winningOption = {
        id: "optionB",
        label: "Triagem de Novos Casos por área/risco",
        description: "70% menos trabalho manual",
        percentage: percentageB,
      };
    } else if (percentageC > percentageA && percentageC > percentageB) {
      winningOption = {
        id: "optionC",
        label: "Gerador de Minutas de petições/contratos",
        description: "Primeira versão em 5 min",
        percentage: percentageC,
      };
    } else {
      winningOption.percentage = percentageA;
    }
  }

  return (
    <div className="h-full flex flex-col">
      {showConfetti && <Confetti />}

      <div className="text-center mb-6 md:mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg"
        >
          <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-bold text-slate-900 mb-2"
        >
          Decisão Final
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-amber-600 to-cyan-600 bg-clip-text text-transparent text-base md:text-lg"
        >
          Prioridade escolhida pelos sócios
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 rounded-lg p-4 md:p-6 mb-6 md:mb-8 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-amber-500 to-cyan-600 rounded-full p-2 md:p-3 flex-shrink-0">
            <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2 leading-tight">
              {winningOption.label}
            </h3>
            <p className="text-slate-700 mb-3 md:mb-4 text-sm md:text-base">
              {winningOption.description}
            </p>

            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 mb-3 md:mb-4">
              <Users className="h-3 w-3 md:h-4 md:w-4" />
              <span>Aprovado com {winningOption.percentage}% dos votos</span>
            </div>

            <div className="h-2 md:h-2.5 bg-slate-300 rounded-full overflow-hidden w-full">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-cyan-600"
                initial={{ width: 0 }}
                animate={{ width: `${winningOption.percentage}%` }}
                transition={{ delay: 1, duration: 1.5 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4"
      >
        <div className="bg-slate-100/80 border border-slate-200 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <Calendar className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
            <h4 className="font-medium text-slate-900 text-sm md:text-base">
              Próximos Passos
            </h4>
          </div>

          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
            <li className="flex items-center gap-2">
              <span className="text-amber-600">•</span>
              <span className="text-slate-700">
                Definição de equipe responsável
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-600">•</span>
              <span className="text-slate-700">
                Mapeamento de requisitos técnicos
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-600">•</span>
              <span className="text-slate-700">
                Desenvolvimento de MVP em 15 dias
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-100/80 border border-slate-200 rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-cyan-600" />
            <h4 className="font-medium text-slate-900 text-sm md:text-base">
              Cronograma
            </h4>
          </div>

          <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
            <li className="flex items-center gap-2">
              <span className="text-cyan-600">•</span>
              <span className="text-slate-700">Início: 10/06/2025</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-600">•</span>
              <span className="text-slate-700">
                Primeira entrega: 25/06/2025
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-600">•</span>
              <span className="text-slate-700">
                Implementação completa: 15/07/2025
              </span>
            </li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-auto pt-4 md:pt-6 flex justify-center"
      >
        <div className="flex flex-col sm:flex-row items-center gap-1 md:gap-2 text-slate-600 text-xs md:text-sm">
          <LogoVanguardia />
          <span className="text-center sm:text-left">
            Implementação técnica por VanguardIA
          </span>
          <ArrowRight className="h-3 w-3 md:h-4 md:w-4 hidden sm:block" />
        </div>
      </motion.div>
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full`}
          style={{
            backgroundColor:
              i % 3 === 0
                ? "#f59e0b"
                : // amber
                i % 3 === 1
                ? "#0ea5e9"
                : // cyan
                  "#10b981", // emerald
            top: "-10px",
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeOut",
            delay: Math.random() * 1,
          }}
        />
      ))}
    </div>
  );
}
