-- Cria tabela avaliacoes para armazenar as avaliações dos produtos ou anunciantes
CREATE TABLE avaliacoes (
    avaliacao_id SERIAL PRIMARY KEY,                                            -- PK auto-incrementável.
    usuario_avaliador_id INT NOT NULL REFERENCES usuarios(usuario_id) ON DELETE CASCADE,-- FK referenciando tabela usuarios.
    anunciante_avaliado_id INT NOT NULL REFERENCES anunciantes(anunciante_id),  -- avalia o anunciante(testar função)
    anuncio_id INT REFERENCES anuncios(anuncio_id),                             -- Avalia um produto específico (opcional, pode ser avaliação do anunciante em geral)
    nota DECIMAL(3, 2) NOT NULL CHECK (nota >= 1 AND nota <= 5),                -- Nota de avaliação, definida entre 1 e 5.
    comentario TEXT,                                                            -- Comentário da avliação.
    data_avaliacao TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    -- restrição para evitar que um unico usuario avalie o mesmo produto ou anunciante varias vezes
    UNIQUE (usuario_avaliador_id, anunciante_avaliado_id, anuncio_id)           -- verificar possibilidade de alterar para cada aquisição
);
-- adicionando indice para otimizar consultas na tabela avaliacoes
CREATE INDEX idx_anunciante_avaliado_id ON avaliacoes (anunciante_avaliado_id); -- Indice para filtrar avaliações por ID de anunciante.
CREATE INDEX idx_anuncio_id ON avaliacoes (anuncio_id);                         -- Indice para filtrar avaliações por ID de anúncio.
CREATE INDEX idx_avaliacoes_nota ON avaliacoes (nota);                          -- Indice para filtrar avaliações por nota.
