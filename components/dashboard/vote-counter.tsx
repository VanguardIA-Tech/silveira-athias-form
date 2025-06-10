"use client"

import { motion } from "framer-motion"
import { useDatabase } from "./database-context"
import { PieChart, CheckCircle2 } from "lucide-react"

type VoteCounterProps = {
  votingData: any
}

export default function VoteCounter({ votingData }: VoteCounterProps) {
  const { totalVotes, voters } = useDatabase()
  const totalVoters = voters.length
  const percentage = Math.round((totalVotes / totalVoters) * 100) || 0

  return (
    <div>
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2 text-slate-900">
        <PieChart className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
        <span>Participação</span>
      </h3>

      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-4">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-6 md:border-8 border-slate-200"></div>

          {/* Progress circle */}
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="progressGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#progressGradientLight)"
              strokeWidth="8"
              strokeDasharray={`${percentage * 2.89}, 289`}
              initial={{ strokeDasharray: "0, 289" }}
              animate={{ strokeDasharray: `${percentage * 2.89}, 289` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <span className="text-2xl md:text-3xl font-bold text-slate-900">{percentage}%</span>
            </motion.div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg md:text-xl font-bold text-slate-900">
            {totalVotes} <span className="text-slate-600">de</span> {totalVoters}
          </div>
          <div className="text-xs md:text-sm text-slate-600">sócios votaram</div>
        </div>

        {totalVotes === totalVoters && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 md:mt-4 flex items-center gap-2 bg-green-100 text-green-700 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm border border-green-200"
          >
            <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4" />
            <span>Votação completa</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
