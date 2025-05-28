-- Cria tabela usuarios
CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,                      -- PK auto-incrementável
    nome_usuario VARCHAR(50) UNIQUE NOT NULL,           -- Nome de usuário único
    senha_hash VARCHAR(255) NOT NULL,                   -- Pesqusiar bcrypt ou Argon2
    email_usuario VARCHAR(100) UNIQUE NOT NULL,         -- login ou recuperacao, implementar
    email_recuperacao VARCHAR(100),                     -- E-mail alternativo para recuperação (opcional).
    token_recuperacao_senha VARCHAR(255) UNIQUE,        -- token de recuperacao(com data/hora de expiração), conferir necessidade de tamanho
    data_ultima_alteracao_senha TIMESTAMP WITHOUT TIME ZONE,
    tentativas_login_falhas INT DEFAULT 0,              -- contator de tentativas falhas para bloquear login
    data_bloqueio TIMESTAMP WITHOUT TIME ZONE,          -- Data do bloqueio do usuario
    codigo_verificacao VARCHAR(6),                      -- código para verificacao de email ou telefone
    data_expiracao_codigo_verificacao TIMESTAMP WITHOUT TIME ZONE, -- data e hora para expirar codigo de verificacao
    data_cadastro TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    ultimo_login TIMESTAMP WITHOUT TIME ZONE,           -- Data do ultimo login
    ativo_usuario BOOLEAN DEFAULT TRUE NOT NULL,        -- se necessario ativação via email mudar.
    cliente_id INT REFERENCES clientes(cliente_id) UNIQUE, -- FK para vincular a tabela clientes (1:0 ou 1:1)
    primeiro_nome VARCHAR(50),                          -- Primeiro nome do usuario.
    ultimo_nome VARCHAR(50),                            -- Ultimo nome do usuario.
    foto_perfil VARCHAR(255)                            -- caminho para img de perfil do usuario.
);