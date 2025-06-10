"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import { useDatabase } from "@/dashboard/database-context";
import VoteCounter from "@/dashboard/vote-counter";
import ResultsChart from "@/dashboard/results-chart";
import DecisionDisplay from "@/dashboard/decision-display";
import ActiveVoters from "@/dashboard/active-voters";
import { ArrowRight, BarChart3, Users, CheckCircle, Clock } from "lucide-react";
import { Card } from "@/ui/card";
import OnboardingStats from "@/dashboard/onboarding-stats";
import LogoSilveira from "./LogoSilveira";

type DashboardState = "waiting" | "voting" | "results" | "decision";

export default function RealTimeDashboard() {
  const {
    totalVotes,
    startVoting,
    endVoting,
    resetVoting,
    dashboardState,
    setDashboardState,
    currentSessionId,
  } = useDatabase();

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const [showCountdown, setShowCountdown] = useState(false);

  // Adicione estados para os dados da votação
  const [votingData, setVotingData] = useState<any>(null);
  const [loadingVoting, setLoadingVoting] = useState(true);

  // Defina o sessionId da votação (pode ser fixo ou dinâmico)
  // Buscar dados da votação em tempo real
  useEffect(() => {
    if (!currentSessionId) return;
    setLoadingVoting(true);
    fetch(`/api/voting?sessionId=${currentSessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setVotingData(data.data);
        setLoadingVoting(false);
      })
      .catch(() => setLoadingVoting(false));
  }, [dashboardState, currentSessionId, totalVotes]);

  useEffect(() => {
    if (dashboardState === "voting" && showCountdown) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowCountdown(false);
            setDashboardState("results");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [dashboardState, showCountdown, setDashboardState]);

  const handleStartVoting = async () => {
    console.log("Botão Iniciar Votação clicado");
    try {
      await startVoting();
      setTimeLeft(300); // 5 minutos
      setShowCountdown(true);
      console.log("Função startVoting executada com sucesso");
    } catch (error) {
      console.error("Erro ao iniciar votação:", error);
    }
  };

  const handleShowResults = async () => {
    console.log("Botão Encerrar Votação clicado");
    try {
      await endVoting();
      setDashboardState("results");
      console.log("Função endVoting executada com sucesso");
    } catch (error) {
      console.error("Erro ao encerrar votação:", error);
    }
  };

  const handleShowDecision = () => {
    console.log("Botão Mostrar Decisão clicado");
    setDashboardState("decision");
  };

  const handleReset = () => {
    console.log("Botão Reiniciar clicado");
    resetVoting();
    setDashboardState("waiting");
  };

  // Passe os dados reais para os componentes
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Status Bar - Fully Responsive */}
      <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-3 md:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
              <span className="text-slate-700 text-sm md:text-base">
                Sócios conectados:
              </span>
              <span className="font-bold text-slate-900">
                {dashboardState === "waiting" ? "0" : "8"}
              </span>
            </div>

            <div className="hidden sm:block h-6 w-px bg-slate-300"></div>

            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-cyan-600" />
              <span className="text-slate-700 text-sm md:text-base">
                Votos registrados:
              </span>
              <span className="font-bold text-slate-900">{totalVotes}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {showCountdown && (
              <div className="flex items-center gap-2 bg-slate-100/80 backdrop-blur-md rounded-full px-3 md:px-4 py-1.5 border border-slate-200">
                <Clock className="h-3 w-3 md:h-4 md:w-4 text-amber-600" />
                <span className="font-mono font-bold text-slate-900 text-sm md:text-base">
                  {timeLeft}s
                </span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {dashboardState === "waiting" && (
                <motion.button
                  key="start"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleStartVoting}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-3 md:px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-all shadow-lg text-sm md:text-base"
                >
                  <span className="hidden sm:inline">Iniciar Votação</span>
                  <span className="sm:hidden">Iniciar</span>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </motion.button>
              )}

              {dashboardState === "voting" && (
                <motion.button
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleShowResults}
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-3 md:px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-all shadow-lg text-sm md:text-base"
                >
                  <span className="hidden sm:inline">Encerrar Votação</span>
                  <span className="sm:hidden">Encerrar</span>
                  <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                </motion.button>
              )}

              {dashboardState === "results" && (
                <motion.button
                  key="decision"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleShowDecision}
                  className="bg-gradient-to-r from-amber-500 to-cyan-600 hover:from-amber-400 hover:to-cyan-500 text-white px-3 md:px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-all shadow-lg text-sm md:text-base"
                >
                  <span className="hidden sm:inline">Mostrar Decisão</span>
                  <span className="sm:hidden">Decisão</span>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </motion.button>
              )}

              {dashboardState === "decision" && (
                <motion.button
                  key="reset"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleReset}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-3 md:px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-all text-sm md:text-base"
                >
                  <span>Reiniciar</span>
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>

      {/* Main Content - Responsive Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        <div className="xl:col-span-2">
          <AnimatePresence mode="wait">
            {dashboardState === "waiting" && <WaitingScreen key="waiting" />}

            {dashboardState === "voting" && (
              <motion.div
                key="voting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6 h-[400px] md:h-[500px]">
                  <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 text-slate-900">
                    <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
                    <span>Resultados em Tempo Real</span>
                  </h2>
                  {loadingVoting ? (
                    <div className="text-center text-slate-500">
                      Carregando votos...
                    </div>
                  ) : (
                    <ResultsChart votingData={votingData} />
                  )}
                </Card>
              </motion.div>
            )}

            {dashboardState === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6 h-[400px] md:h-[500px]">
                  <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2 text-slate-900">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-cyan-600" />
                    <span>Resultados Finais</span>
                  </h2>
                  {loadingVoting ? (
                    <div className="text-center text-slate-500">
                      Carregando votos...
                    </div>
                  ) : (
                    <ResultsChart votingData={votingData} showFinalResults />
                  )}
                </Card>
              </motion.div>
            )}

            {dashboardState === "decision" && (
              <motion.div
                key="decision"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6 h-[400px] md:h-[500px]">
                  <DecisionDisplay votingData={votingData} />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar - Responsive */}
        <div className="space-y-6 md:space-y-8">
          <AnimatePresence mode="wait">
            {dashboardState === "waiting" && (
              <motion.div
                key="instructions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6 h-[400px] md:h-[500px]">
                  <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-slate-900">
                    Instruções
                  </h2>
                  <div className="space-y-4">
                    <p className="text-slate-700 text-sm md:text-base">
                      Aguardando o início da votação. Os sócios podem se
                      conectar usando o QR code abaixo:
                    </p>

                    <div className="flex justify-center my-6 md:my-8">
                      <div className="bg-white p-3 md:p-4 rounded-lg border border-slate-200">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-[url('/placeholder.svg?height=200&width=200')] bg-contain"></div>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs md:text-sm">
                      Ou acessando:{" "}
                      <span className="text-amber-600 font-mono break-all">
                        silveira-athias.ai/votar
                      </span>
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

            {(dashboardState === "voting" ||
              dashboardState === "results" ||
              dashboardState === "decision") && (
              <>
                <motion.div
                  key="onboarding-stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <OnboardingStats />
                </motion.div>

                <motion.div
                  key="counter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6">
                    <VoteCounter votingData={votingData} />
                  </Card>
                </motion.div>

                <motion.div
                  key="voters"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6">
                    <ActiveVoters voterList={votingData?.voterList} />
                  </Card>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function WaitingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6 h-[400px] md:h-[500px] flex flex-col items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="mb-6 md:mb-8"
        >
          <LogoSilveira />
        </motion.div>

        <h2 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-4 bg-gradient-to-r from-amber-600 to-cyan-600 bg-clip-text text-transparent px-4">
          Aguardando Início da Votação
        </h2>

        <p className="text-slate-700 text-center max-w-md text-sm md:text-base px-4">
          Clique em "Iniciar Votação" quando todos os sócios estiverem
          conectados e prontos para participar.
        </p>

        <div className="mt-8 md:mt-12 flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="h-2 w-2 md:h-3 md:w-3 bg-amber-500 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="h-2 w-2 md:h-3 md:w-3 bg-amber-500 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            className="h-2 w-2 md:h-3 md:w-3 bg-amber-500 rounded-full"
          />
        </div>
      </Card>
    </motion.div>
  );
}
