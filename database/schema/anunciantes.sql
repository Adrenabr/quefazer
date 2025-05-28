-- Cria tabela anunciantes
CREATE TABLE anunciantes (
    anunciante_id SERIAL PRIMARY KEY,
    usuario_id INT UNIQUE NOT NULL REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    nome_loja VARCHAR(100),                         -- Se os anunciantes podem ter um nome de loja ou marca diferente do nome de usuário.
    logo_loja VARCHAR(255),                         -- Caminho para a imagem do logo da loja do anunciante.
    website_loja VARCHAR(255),                      -- URL do website da loja (opcional, desativado de inicio).
    descricao_anunciante TEXT                       -- Descrição do anunciante.
    termos_serviço TEXT,                            -- Termos e condições específicos do anunciante para seus anúncios.
    politica_de_devolucao TEXT,                     -- Política de devolução específica do anunciante.
    reputacao DECIMAL(3, 2),                        -- Uma pontuação de reputação do anunciante, calculada com base em avaliações (pode ser gerenciada por triggers ou na lógica da aplicação).
    ativo_anunciante BOOLEAN DEFAULT TRUE NOT NULL, -- Se o perfil de anunciante está ativo ou inativo (separado do status de ativo do usuário).
);
-- Adiciona um índice na chave estrangeira para otimizar consultas
CREATE INDEX idx_anunciantes_usuario_id ON anunciantes (usuario_id);