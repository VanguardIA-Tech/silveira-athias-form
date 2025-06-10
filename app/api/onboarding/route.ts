import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { sessionId, adoption, prioritization, respondentInfo } = data

    // Exemplo de inserção correta:
    await sql`
      INSERT INTO onboarding_responses (
        session_id,
        adoption_knowledge,
        adoption_tools,
        adoption_integration,
        adoption_automation,
        adoption_measurement,
        priority_a_selected,
        priority_a_impact,
        priority_b_selected,
        priority_b_impact,
        priority_c_selected,
        priority_c_impact,
        priority_d_selected,
        priority_d_impact,
        priority_e_selected,
        priority_e_impact,
        priority_f_selected,
        priority_f_impact
      ) VALUES (
        ${sessionId},
        ${adoption.knowledge},
        ${adoption.tools},
        ${adoption.integration},
        ${adoption.automation},
        ${adoption.measurement},
        ${prioritization.A.selected},
        ${prioritization.A.impact},
        ${prioritization.B.selected},
        ${prioritization.B.impact},
        ${prioritization.C.selected},
        ${prioritization.C.impact},
        ${prioritization.D.selected},
        ${prioritization.D.impact},
        ${prioritization.E.selected},
        ${prioritization.E.impact},
        ${prioritization.F.selected},
        ${prioritization.F.impact}
      )
      ON CONFLICT (session_id) DO UPDATE SET
        adoption_knowledge = EXCLUDED.adoption_knowledge,
        adoption_tools = EXCLUDED.adoption_tools,
        adoption_integration = EXCLUDED.adoption_integration,
        adoption_automation = EXCLUDED.adoption_automation,
        adoption_measurement = EXCLUDED.adoption_measurement,
        priority_a_selected = EXCLUDED.priority_a_selected,
        priority_a_impact = EXCLUDED.priority_a_impact,
        priority_b_selected = EXCLUDED.priority_b_selected,
        priority_b_impact = EXCLUDED.priority_b_impact,
        priority_c_selected = EXCLUDED.priority_c_selected,
        priority_c_impact = EXCLUDED.priority_c_impact,
        priority_d_selected = EXCLUDED.priority_d_selected,
        priority_d_impact = EXCLUDED.priority_d_impact,
        priority_e_selected = EXCLUDED.priority_e_selected,
        priority_e_impact = EXCLUDED.priority_e_impact,
        priority_f_selected = EXCLUDED.priority_f_selected,
        priority_f_impact = EXCLUDED.priority_f_impact
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao salvar dados do onboarding:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")

    if (sessionId) {
      // Buscar resposta específica
      const result = await sql`
        SELECT * FROM onboarding_responses 
        WHERE session_id = ${sessionId}
      `
      return NextResponse.json({ data: result[0] || null })
    } else {
      // Buscar estatísticas gerais
      const stats = await sql`
        SELECT 
          COUNT(*) as total_responses,
          AVG(adoption_knowledge) as avg_knowledge,
          AVG(adoption_tools) as avg_tools,
          AVG(adoption_integration) as avg_integration,
          AVG(adoption_automation) as avg_automation,
          AVG(adoption_measurement) as avg_measurement,
          SUM(CASE WHEN priority_a_selected THEN 1 ELSE 0 END) as priority_a_count,
          SUM(CASE WHEN priority_b_selected THEN 1 ELSE 0 END) as priority_b_count,
          SUM(CASE WHEN priority_c_selected THEN 1 ELSE 0 END) as priority_c_count,
          AVG(CASE WHEN priority_a_selected THEN priority_a_impact ELSE NULL END) as avg_impact_a,
          AVG(CASE WHEN priority_b_selected THEN priority_b_impact ELSE NULL END) as avg_impact_b,
          AVG(CASE WHEN priority_c_selected THEN priority_c_impact ELSE NULL END) as avg_impact_c
        FROM onboarding_responses 
        WHERE completed_at IS NOT NULL
      `

      return NextResponse.json({ data: stats[0] })
    }
  } catch (error) {
    console.error("Erro ao buscar dados do onboarding:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
