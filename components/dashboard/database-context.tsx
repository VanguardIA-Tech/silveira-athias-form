"use client"

// Corrigir o nome do contexto e adicionar logs para depuração
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

type DatabaseContextType = {
  votes: VoteData
  totalVotes: number
  dashboardState: DashboardState
  setDashboardState: (state: DashboardState) => void
  startVoting: () => Promise<void>
  endVoting: () => Promise<void>
  resetVoting: () => void
  voters: VoterStatus[]
  finalVotes: VoteData | null
  currentSessionId: number | null
  onboardingStats: any
  isLoading: boolean
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined)

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [votes, setVotes] = useState<VoteData>({ optionA: 0, optionB: 0, optionC: 0 })
  const [finalVotes, setFinalVotes] = useState<VoteData | null>(null)
  const [dashboardState, setDashboardState] = useState<DashboardState>("waiting")
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null)
  const [onboardingStats, setOnboardingStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
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

  // Carregar estatísticas do onboarding na inicialização
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true)

        // Carregar estatísticas do onboarding
        const onboardingResponse = await fetch("/api/onboarding")
        const onboardingResult = await onboardingResponse.json()

        if (onboardingResult.success !== false) {
          setOnboardingStats(onboardingResult.data)
        }
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Atualizar dados de votação em tempo real quando em modo voting
  useEffect(() => {
    if (dashboardState === "voting" && currentSessionId) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/voting?sessionId=${currentSessionId}`)
          const result = await response.json()

          if (result.success) {
            setVotes(result.data.votes)

            // Atualizar status dos votantes baseado nos votos reais
            const updatedVoters = voters.map((voter) => {
              const hasVoted = result.data.voterList.some((vote: any) =>
                vote.voter_name.includes(voter.name.split(" ")[0]),
              )
              return { ...voter, hasVoted }
            })
            setVoters(updatedVoters)
          }
        } catch (error) {
          console.error("Erro ao atualizar dados de votação:", error)
        }
      }, 2000) // Atualizar a cada 2 segundos

      return () => clearInterval(interval)
    }
  }, [dashboardState, currentSessionId, voters])

  const startVoting = async () => {
    console.log("Iniciando votação...")
    try {
      // Criar nova sessão de votação
      const createResponse = await fetch("/api/voting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create_session" }),
      })

      const createResult = await createResponse.json()
      console.log("Resultado da criação da sessão:", createResult)

      if (createResult.success) {
        setCurrentSessionId(createResult.sessionId)

        // Iniciar votação
        await fetch("/api/voting", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "start_voting",
            sessionId: createResult.sessionId,
          }),
        })

        setDashboardState("voting")
        setVotes({ optionA: 0, optionB: 0, optionC: 0 })
        setVoters((prev) => prev.map((voter) => ({ ...voter, hasVoted: false })))
        setFinalVotes(null)

        console.log("Votação iniciada com sucesso!")
      }
    } catch (error) {
      console.error("Erro ao iniciar votação:", error)
    }
  }

  const endVoting = async () => {
    console.log("Encerrando votação...")
    if (currentSessionId) {
      try {
        await fetch("/api/voting", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "end_voting",
            sessionId: currentSessionId,
          }),
        })

        setFinalVotes({ ...votes })
        console.log("Votação encerrada com sucesso!")
      } catch (error) {
        console.error("Erro ao finalizar votação:", error)
      }
    }
  }

  const resetVoting = () => {
    console.log("Reiniciando votação...")
    setVotes({ optionA: 0, optionB: 0, optionC: 0 })
    setVoters((prev) => prev.map((voter) => ({ ...voter, hasVoted: false })))
    setFinalVotes(null)
    setCurrentSessionId(null)
  }

  return (
    <DatabaseContext.Provider
      value={{
        votes,
        totalVotes,
        dashboardState,
        setDashboardState,
        startVoting,
        endVoting,
        resetVoting,
        voters,
        finalVotes,
        currentSessionId,
        onboardingStats,
        isLoading,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export function useDatabase() {
  const context = useContext(DatabaseContext)
  if (context === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider")
  }
  return context
}
