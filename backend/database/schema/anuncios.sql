-- Cria tabela anuncios para armazenar informações dos anuncios
CREATE TABLE anuncios (
    anuncio_id SERIAL PRIMARY KEY,                                      -- PK auto-incrementável.
    anunciante_id INT NOT NULL REFERENCES anunciantes(anunciante_id) ON DELETE CASCADE,-- FK referenciando tabela anunciantes
    categoria_id INT NOT NULL REFERENCES categorias(categoria_id),      -- FK referenciando tabela anunciantes
    titulo_anuncio VARCHAR(255) NOT NULL,                               -- Título do anúncio.
    descricao TEXT NOT NULL,                                            -- Descrição do anúncio.
    preco DECIMAL(10, 2) NOT NULL,                                      -- Preço do anúncio.
    data_publicacao TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(), -- Data da publicação do anúncio.
    data_atualizacao TIMESTAMP WITHOUT TIME ZONE,                       -- Data da atualização do anúncio.
    status_anuncio VARCHAR(20) CHECK (status_anuncio IN ('ativo', 'inativo', 'vendido', 'reservado', 'expirado')) DEFAULT 'ativo',-- Status do anúncio.
    localizacao VARCHAR(255),                                           -- Localização geográfica do anúncio.
    destaque BOOLEAN DEFAULT FALSE,                                     -- Destaque do anúncio.
    visualizacoes INT DEFAULT 0                                         -- Número de visualizações do anúncio.
);
CREATE INDEX idx_anuncios_anunciante_id ON anuncios (anunciante_id);
CREATE INDEX idx_anuncios_categoria_id ON anuncios (categoria_id);
CREATE INDEX idx_anuncios_preco ON anuncios (preco);
CREATE INDEX idx_anuncios_data_publicacao ON anuncios (data_publicacao);
CREATE INDEX idx_anuncios_status_anuncio ON anuncios (status_anuncio);
CREATE INDEX idx_anuncios_destaque ON anuncios (destaque);
CREATE INDEX idx_anuncios_visualizacoes ON anuncios (visualizacoes); -- Remover futuramente
-- Considerar índices para titulo_anuncio e localizacao dependendo dos padrões de busca.