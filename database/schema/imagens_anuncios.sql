-- Cria tabela imagens_anuncios para armazenar multiplas imagens dos anuncios
CREATE TABLE imagens_anuncios (
    imagem_id SERIAL PRIMARY KEY,                                               -- PK auto-incrementável.
    anuncio_id INT NOT NULL REFERENCES anuncios(anuncio_id) ON DELETE CASCADE,  -- FK referenciando tabela anuncios.
    url_imagem VARCHAR(255) NOT NULL,                                           -- URL da imagem.
    descricao_imagem VARCHAR(255),                                              -- Descrição da imagem(acessibilidade).
    ordem INT DEFAULT 1                                                         -- Define a ordem de exibição das imagens.
);
CREATE INDEX idx_imagens_anuncios_anuncio_id ON imagens_anuncios (anuncio_id);
CREATE INDEX idx_imagens_anuncios_ordem ON imagens_anuncios (anuncio_id, ordem); -- Índice composto útil para buscar e ordenar