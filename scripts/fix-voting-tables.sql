-- Verificar se as tabelas existem e criar se necessário
CREATE TABLE IF NOT EXISTS voting_sessions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'waiting', -- waiting, voting, completed
  total_voters INTEGER DEFAULT 8,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES voting_sessions(id),
  voter_name VARCHAR(255) NOT NULL,
  voter_email VARCHAR(255),
  option_id VARCHAR(10) NOT NULL, -- optionA, optionB, optionC
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS voting_options (
  id VARCHAR(10) PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  example TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir opções padrão de votação se não existirem
INSERT INTO voting_options (id, title, description, example) VALUES
('optionA', 'Pesquisa de Jurisprudência automática', 'Sistema automatizado para busca de jurisprudência', '1 h ➜ 3 min por busca'),
('optionB', 'Triagem de Novos Casos por área/risco', 'Classificação automática de casos por área jurídica e nível de risco', '70% menos trabalho manual'),
('optionC', 'Gerador de Minutas de petições/contratos', 'Ferramenta de IA para geração automática de documentos jurídicos', 'Primeira versão em 5 min')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  example = EXCLUDED.example;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_votes_session_id ON votes(session_id);
CREATE INDEX IF NOT EXISTS idx_voting_sessions_status ON voting_sessions(status);

-- Verificar se há sessões existentes
SELECT COUNT(*) FROM voting_sessions;
