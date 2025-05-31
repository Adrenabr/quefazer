-- Cria tabela categorias para categorizar os anuncios
CREATE TABLE categorias (
    categoria_id SERIAL PRIMARY KEY,                            -- PK auto-incrementável.
    nome_categoria VARCHAR(100) UNIQUE NOT NULL,                -- Nome da categoria, único e obrigatório.
    descricao_categoria TEXT,                                   -- Descrição da categoria.
    data_cadastro_categoria TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW() -- Data de cadastro da categoria.
);