"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type DashboardState = "waiting" | "voting" | "results" | "decision"

type VoteData = {
  optionA: number
  optionB: number
  optionC: number
}

type VoterStatus = {
  id: string
  name: string
  hasVoted: boolean
  avatar: string
}

type DashboardContextType = {
  votes: VoteData
  totalVotes: number
  dashboardState: DashboardState
  setDashboardState: (state: DashboardState) => void
  addVote: (option: keyof VoteData) => void
  startVoting: () => void
  endVoting: () => void
  resetVoting: () => void
  voters: VoterStatus[]
  finalVotes: VoteData | null
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [votes, setVotes] = useState<VoteData>({ optionA: 0, optionB: 0, optionC: 0 })
  const [finalVotes, setFinalVotes] = useState<VoteData | null>(null)
  const [dashboardState, setDashboardState] = useState<DashboardState>("waiting")
  const [voters, setVoters] = useState<VoterStatus[]>([
    { id: "1", name: "Ana Silveira", hasVoted: false, avatar: "AS" },
    { id: "2", name: "Bruno Athias", hasVoted: false, avatar: "BA" },
    { id: "3", name: "Carlos Mendes", hasVoted: false, avatar: "CM" },
    { id: "4", name: "Daniela Costa", hasVoted: false, avatar: "DC" },
    { id: "5", name: "Eduardo Santos", hasVoted: false, avatar: "ES" },
    { id: "6", name: "Fernanda Lima", hasVoted: false, avatar: "FL" },
    { id: "7", name: "Gabriel Rocha", hasVoted: false, avatar: "GR" },
    { id: "8", name: "Helena Martins", hasVoted: false, avatar: "HM" },
  ])

  const totalVotes = votes.optionA + votes.optionB + votes.optionC

  useEffect(() => {
    if (dashboardState === "voting") {
      // Simular votos chegando em intervalos aleatórios
      const voteInterval = setInterval(
        () => {
          const nonVoters = voters.filter((v) => !v.hasVoted)
          if (nonVoters.length > 0) {
            const randomVoterIndex = Math.floor(Math.random() * nonVoters.length)
            const voterId = nonVoters[randomVoterIndex].id

            setVoters((prev) => prev.map((voter) => (voter.id === voterId ? { ...voter, hasVoted: true } : voter)))

            const options: (keyof VoteData)[] = ["optionA", "optionB", "optionC"]
            const randomOption = options[Math.floor(Math.random() * options.length)]

            setVotes((prev) => ({
              ...prev,
              [randomOption]: prev[randomOption] + 1,
            }))
          } else {
            clearInterval(voteInterval)
          }
        },
        1500 + Math.random() * 2000,
      ) // Intervalo entre 1.5 e 3.5 segundos

      return () => clearInterval(voteInterval)
    }
  }, [dashboardState, voters])

  const addVote = (option: keyof VoteData) => {
    setVotes((prev) => ({
      ...prev,
      [option]: prev[option] + 1,
    }))
  }

  const startVoting = () => {
    setDashboardState("voting")
    setVotes({ optionA: 0, optionB: 0, optionC: 0 })
    setVoters((prev) => prev.map((voter) => ({ ...voter, hasVoted: false })))
    setFinalVotes(null)
  }

  const endVoting = () => {
    setFinalVotes({ ...votes })
  }

  const resetVoting = () => {
    setVotes({ optionA: 0, optionB: 0, optionC: 0 })
    setVoters((prev) => prev.map((voter) => ({ ...voter, hasVoted: false })))
    setFinalVotes(null)
  }

  return (
    <DashboardContext.Provider
      value={{
        votes,
        totalVotes,
        dashboardState,
        setDashboardState,
        addVote,
        startVoting,
        endVoting,
        resetVoting,
        voters,
        finalVotes,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
