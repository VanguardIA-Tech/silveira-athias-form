"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LandingPage from "@/components/landing-page"
import LoadingScreen from "@/components/loading-screen"
import OnboardingWizard from "@/components/onboarding-wizard"

type AppState = "landing" | "loading" | "wizard"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing")

  const handleUnlock = () => {
    setAppState("loading")
    // Simulate loading time
    setTimeout(() => {
      setAppState("wizard")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <AnimatePresence mode="wait">
        {appState === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onUnlock={handleUnlock} />
          </motion.div>
        )}

        {appState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen />
          </motion.div>
        )}

        {appState === "wizard" && (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OnboardingWizard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
