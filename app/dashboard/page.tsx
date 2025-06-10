"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import RealTimeDashboard from "@/real-time-dashboard";
import { DatabaseProvider } from "@/dashboard/database-context";
import LogoSilveira from "@/LogoSilveira";
import LogoVanguardia from "@/LogoVanguardia";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DatabaseProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 text-slate-900 relative overflow-hidden">
        {/* Background effects - matching questionnaire style */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-500/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-6 md:py-8 max-w-7xl"
              >
                {/* Header - Responsive */}
                <div className="flex justify-center mb-4 md:mb-6">
                  <LogoSilveira />
                </div>

                <div className="text-center mb-6 md:mb-8">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                    Dashboard de Resultados
                  </h1>
                  <p className="text-slate-700 text-sm md:text-base">
                    Acompanhe as votações em tempo real
                  </p>
                </div>

                <RealTimeDashboard />

                {/* Footer - Responsive */}
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DatabaseProvider>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <LogoSilveira />

      <motion.div
        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-slate-300 border-t-amber-500 border-r-cyan-500"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 md:mt-8 text-slate-600 text-sm md:text-base text-center"
      >
        Carregando dashboard de resultados...
      </motion.p>
    </motion.div>
  );
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-200"
    >
      <div className="flex flex-col items-center gap-3 md:gap-4">
        <div className="flex items-center gap-3">
          <LogoVanguardia />
        </div>
        <div className="text-center">
          <p className="text-slate-600 text-xs md:text-sm">
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
