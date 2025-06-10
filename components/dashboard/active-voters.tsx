"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useDatabase } from "./database-context"
import { Users } from "lucide-react"

type ActiveVotersProps = {
  voterList?: any
}

export default function ActiveVoters({ voterList }: ActiveVotersProps) {
  const { voters } = useDatabase()

  return (
    <div>
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 flex items-center gap-2 text-slate-900">
        <Users className="h-4 w-4 md:h-5 md:w-5 text-cyan-600" />
        <span>Sócios Participantes</span>
      </h3>

      <div className="space-y-2 md:space-y-3 max-h-[200px] md:max-h-[280px] overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
        {voters.map((voter) => (
          <motion.div
            key={voter.id}
            layout
            className={`flex items-center justify-between p-2 md:p-3 rounded-lg ${
              voter.hasVoted ? "bg-slate-100/80" : "bg-slate-50"
            } border border-slate-200`}
          >
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br ${
                  voter.hasVoted ? "from-amber-500 to-cyan-600" : "from-slate-400 to-slate-500"
                } flex items-center justify-center text-white font-medium text-xs md:text-sm flex-shrink-0`}
              >
                {voter.avatar}
              </div>
              <span className="text-slate-700 text-sm md:text-base truncate">{voter.name}</span>
            </div>

            <AnimatePresence mode="wait">
              {voter.hasVoted ? (
                <motion.div
                  key="voted"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs border border-green-200 flex-shrink-0"
                >
                  Votou
                </motion.div>
              ) : (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs border border-amber-200 flex-shrink-0"
                >
                  Aguardando
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
