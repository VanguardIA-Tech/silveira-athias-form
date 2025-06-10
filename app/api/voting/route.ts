import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const {
      prioridade_andamentos_processuais,
      prioridade_gravacoes_audiencias,
      prioridade_extracao_decisoes,
      prioridade_dashboards_jurimetria,
      prioridade_monitoramento_prazos,
      prioridade_tarefas_repetitivas,
      prioridade_integracao_fontes_externas,
      prioridade_assistente_ia,
      prioridade_fluxo_contratos,
      prioridade_visibilidade_processos,
    } = data

    // Insere apenas a parte 1 (priorização)
    const result = await sql`
      INSERT INTO respostas_silveira_athias (
        prioridade_andamentos_processuais,
        prioridade_gravacoes_audiencias,
        prioridade_extracao_decisoes,
        prioridade_dashboards_jurimetria,
        prioridade_monitoramento_prazos,
        prioridade_tarefas_repetitivas,
        prioridade_integracao_fontes_externas,
        prioridade_assistente_ia,
        prioridade_fluxo_contratos,
        prioridade_visibilidade_processos
      ) VALUES (
        ${prioridade_andamentos_processuais},
        ${prioridade_gravacoes_audiencias},
        ${prioridade_extracao_decisoes},
        ${prioridade_dashboards_jurimetria},
        ${prioridade_monitoramento_prazos},
        ${prioridade_tarefas_repetitivas},
        ${prioridade_integracao_fontes_externas},
        ${prioridade_assistente_ia},
        ${prioridade_fluxo_contratos},
        ${prioridade_visibilidade_processos}
      )
      RETURNING id
    `
    // Retorna o id da linha criada para ser usado no PATCH
    return NextResponse.json({ success: true, id: result[0]?.id })
  } catch (error) {
    console.error("Erro ao salvar dados de votação:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json()
    const {
      id,
      gargalos_operacionais,
      automacao_desejada,
      informacao_dificil_acesso,
      sistemas_mais_utilizados,
    } = data

    // Atualiza a linha existente com as respostas discursivas
    await sql`
      UPDATE respostas_silveira_athias
      SET
        gargalos_operacionais = ${gargalos_operacionais},
        automacao_desejada = ${automacao_desejada},
        informacao_dificil_acesso = ${informacao_dificil_acesso},
        sistemas_mais_utilizados = ${sistemas_mais_utilizados}
      WHERE id = ${id}
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao atualizar respostas discursivas:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      // Retrieve specific response by ID
      const result = await sql`
        SELECT * FROM respostas_silveira_athias 
        WHERE id = ${id}
      `
      return NextResponse.json({ data: result[0] || null })
    } else {
      // Retrieve all responses
      const results = await sql`
        SELECT * FROM respostas_silveira_athias
      `
      return NextResponse.json({ data: results })
    }
  } catch (error) {
    console.error("Erro ao buscar dados de votação:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
