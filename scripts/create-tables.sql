-- Criar tabela para armazenar respostas do questionário
CREATE TABLE IF NOT EXISTS onboarding_responses (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  respondent_name VARCHAR(255),
  respondent_email VARCHAR(255),
  
  -- Dados de adoção de IA
  adoption_knowledge INTEGER DEFAULT 0,
  adoption_tools INTEGER DEFAULT 0,
  adoption_integration INTEGER DEFAULT 0,
  adoption_automation INTEGER DEFAULT 0,
  adoption_measurement INTEGER DEFAULT 0,
  
  -- Dados de priorização
  priority_a_selected BOOLEAN DEFAULT FALSE,
  priority_a_impact INTEGER DEFAULT 0,
  priority_b_selected BOOLEAN DEFAULT FALSE,
  priority_b_impact INTEGER DEFAULT 0,
  priority_c_selected BOOLEAN DEFAULT FALSE,
  priority_c_impact INTEGER DEFAULT 0,
  priority_d_selected BOOLEAN DEFAULT FALSE,
  priority_d_impact INTEGER DEFAULT 0,
  priority_e_selected BOOLEAN DEFAULT FALSE,
  priority_e_impact INTEGER DEFAULT 0,
  priority_f_selected BOOLEAN DEFAULT FALSE,
  priority_f_impact INTEGER DEFAULT 0,
  
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela para votações em tempo real
CREATE TABLE IF NOT EXISTS voting_sessions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'waiting', -- waiting, voting, completed
  total_voters INTEGER DEFAULT 8,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela para votos individuais
CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES voting_sessions(id),
  voter_name VARCHAR(255) NOT NULL,
  voter_email VARCHAR(255),
  option_id VARCHAR(10) NOT NULL, -- optionA, optionB, optionC
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela para opções de votação
CREATE TABLE IF NOT EXISTS voting_options (
  id VARCHAR(10) PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  example TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir opções padrão de votação
INSERT INTO voting_options (id, title, description, example) VALUES
('optionA', 'Pesquisa de Jurisprudência automática', 'Sistema automatizado para busca de jurisprudência', '1 h ➜ 3 min por busca'),
('optionB', 'Triagem de Novos Casos por área/risco', 'Classificação automática de casos por área jurídica e nível de risco', '70% menos trabalho manual'),
('optionC', 'Gerador de Minutas de petições/contratos', 'Ferramenta de IA para geração automática de documentos jurídicos', 'Primeira versão em 5 min')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  example = EXCLUDED.example;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_onboarding_session_id ON onboarding_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_votes_session_id ON votes(session_id);
CREATE INDEX IF NOT EXISTS idx_voting_sessions_status ON voting_sessions(status);
