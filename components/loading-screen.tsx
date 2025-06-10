"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Sparkles, CheckCircle } from "lucide-react";
import Image from "next/image";
import LogoSilveira from "./LogoSilveira";
import LogoVanguardia from "./LogoVanguardia";

const loadingSteps = [
  "Inicializando sistema de IA...",
  "Carregando módulos de análise jurídica...",
  "Configurando ambiente seguro...",
  "Preparando experiência personalizada...",
  "Desbloqueando acesso exclusivo...",
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2;
        }
        return prev;
      });
    }, 60);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />

          {/* Matrix-like effect */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-600/20 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Logo - Aumentada */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <LogoSilveira />
          </motion.div>

          {/* Lock Animation */}
          <motion.div
            className="mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className="w-32 h-32 mx-auto bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center border-4 border-amber-400/30 backdrop-blur-md"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.3)",
                    "0 0 40px rgba(251, 191, 36, 0.6)",
                    "0 0 20px rgba(251, 191, 36, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {progress < 100 ? (
                    <Lock className="h-12 w-12 text-amber-400" />
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Unlock className="h-12 w-12 text-cyan-400" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* Floating Sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${20 + Math.sin(i * 60) * 30}%`,
                    left: `${20 + Math.cos(i * 60) * 30}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                >
                  <Sparkles className="h-4 w-4 text-amber-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-8"
          >
            Desbloqueando Experiência
          </motion.h2>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="bg-white/50 backdrop-blur-md rounded-full p-2 border border-slate-200">
              <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-cyan-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-300/50 to-transparent rounded-full"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{ width: "30%" }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-slate-600">
              <span>0%</span>
              <span className="font-medium text-amber-600">{progress}%</span>
              <span>100%</span>
            </div>
          </motion.div>

          {/* Loading Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="space-y-4"
          >
            {loadingSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-white/70 backdrop-blur-md border border-slate-200"
                    : "opacity-40"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0.4,
                  x: 0,
                }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  {index < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="h-5 w-5 text-cyan-600" />
                    </motion.div>
                  ) : index === currentStep ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full"
                    />
                  ) : (
                    <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
                  )}
                </div>
                <span
                  className={`text-left ${
                    index <= currentStep ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  {step}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-12 text-slate-600 text-sm"
          >
            <p>Preparando uma experiência única para o Silveira Athias...</p>
          </motion.div>
        </div>
      </div>

      {/* Footer VanguardIA */}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="p-6 border-t border-slate-200 bg-white/30 backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-3">
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
