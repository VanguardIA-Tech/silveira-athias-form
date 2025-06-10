"use client"
import { useDatabase } from "./database-context"
import { BarChart3, Users, Target, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function OnboardingStats() {
  const { onboardingStats, isLoading } = useDatabase()

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded w-2/3"></div>
          </div>
        </div>
      </Card>
    )
  }

  if (!onboardingStats) {
    return (
      <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6">
        <div className="text-center text-slate-600">
          <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Nenhuma resposta registrada ainda</p>
        </div>
      </Card>
    )
  }

  const avgAdoption =
    [
      onboardingStats.avg_knowledge,
      onboardingStats.avg_tools,
      onboardingStats.avg_integration,
      onboardingStats.avg_automation,
      onboardingStats.avg_measurement,
    ].reduce((sum, val) => sum + (Number.parseFloat(val) || 0), 0) / 5

  return (
    <Card className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-xl p-4 md:p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
        <BarChart3 className="h-5 w-5 text-amber-600" />
        Estatísticas do Onboarding
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-100/80 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-cyan-600" />
              <span className="text-sm font-medium text-slate-700">Respostas</span>
            </div>
            <span className="text-xl font-bold text-slate-900">{onboardingStats.total_responses}</span>
          </div>

          <div className="bg-slate-100/80 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-slate-700">Média Adoção</span>
            </div>
            <span className="text-xl font-bold text-slate-900">{avgAdoption.toFixed(1)}/5</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-cyan-600" />
            Prioridades Mais Votadas
          </h4>

          <div className="space-y-2">
            {[
              {
                id: "A",
                count: onboardingStats.priority_a_count,
                impact: onboardingStats.avg_impact_a,
                title: "Pesquisa Jurisprudência",
              },
              {
                id: "B",
                count: onboardingStats.priority_b_count,
                impact: onboardingStats.avg_impact_b,
                title: "Triagem de Casos",
              },
              {
                id: "C",
                count: onboardingStats.priority_c_count,
                impact: onboardingStats.avg_impact_c,
                title: "Gerador de Minutas",
              },
            ]
              .sort((a, b) => (Number.parseInt(b.count) || 0) - (Number.parseInt(a.count) || 0))
              .slice(0, 3)
              .map((priority, index) => (
                <div key={priority.id} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">
                    {index + 1}. {priority.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">{priority.count} votos</span>
                    {priority.impact && (
                      <span className="text-amber-600">{Number.parseFloat(priority.impact).toFixed(1)}/5</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
