-- Cria tabela roles(cargos de usuarios)
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,             -- PK auto-incrementável.
    nome_role VARCHAR(50) UNIQUE NOT NULL,  -- Nome do cargo.
    descricao TEXT                          -- Descrição do cargo.
);