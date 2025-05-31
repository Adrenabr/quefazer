-- Cria tabela clientes
CREATE TABLE clientes (
    cliente_id SERIAL PRIMARY KEY,      -- PK auto-incrementável
    nome_cliente VARCHAR(100),          -- O responsável no caso de PJ
    tipo_cliente VARCHAR(2) CHECK (tipo_cliente IN ('PF', 'PJ')) NOT NULL,  -- Tipo de cliente (Pessoa Física ou Jurídica), com constraint CHECK para garantir valores válidos e NOT NULL para garantir que seja sempre especificado.
    cpf VARCHAR(14) UNIQUE,             -- CPF do cliente (apenas para PF), com índice único condicional para permitir nulos mas garantir unicidade quando preenchido.
    cnpj VARCHAR(18) UNIQUE,            -- CNPJ do cliente (apenas para PJ), com índice único condicional semelhante ao CPF.
    data_nascimento DATE,               -- Data de nascimento (apenas para PF).
    inscricao_estadual VARCHAR(20),     -- Inscrição estadual (apenas para PJ).
    razao_social VARCHAR(100),          -- Razão social (apenas para PJ).
    nome_fantasia VARCHAR(100),         -- Nome fantasia (apenas para PJ).
    telefone VARCHAR(20),               -- Telefone de contato do cliente.
    cep VARCHAR(10),                    -- Código de Endereçamento Postal.
    endereco VARCHAR(255),              -- Endereço do cliente.
    complemento_endereco VARCHAR(50),   -- Complemento do endereço (opcional).
    bairro VARCHAR(50),                 -- Bairro do cliente.
    cidade VARCHAR(50),                 -- Cidade do cliente.
    estado VARCHAR(2),                  -- Estado do cliente (sigla).
    observacoes TEXT,                   -- Observações adicionais sobre o cliente.
    status_cliente VARCHAR(20) CHECK (status_cliente IN ('ativo', 'inativo', 'pendente', 'bloqueado')),
    data_cadastro TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),   -- Data de cadastro do cliente.
    -- Constraint garantindo que apenas um dos dois (CPF para PF, CNPJ para PJ) seja preenchido e não nulo, de acordo com o tipo_cliente.
    CHECK (
        (tipo_cliente = 'PF' AND cpf IS NOT NULL AND cnpj IS NULL) OR
        (tipo_cliente = 'PJ' AND cnpj IS NOT NULL AND cpf IS NULL)
    ),
    -- Constraint para garantir que se um valor for inserido, ele tenha o formato correto (opcional, pode ser feito na aplicação)
    CHECK (tipo_cliente = 'PF' OR (cnpj IS NULL OR LENGTH(cnpj) = 18)),
    CHECK (tipo_cliente = 'PJ' OR (cpf IS NULL OR LENGTH(cpf) = 14))
);
-- Cria indices para busca por CPF e CNPJ e garantem a unicidade dos valores não nulos.
CREATE UNIQUE INDEX idx_clientes_cpf ON clientes (cpf) WHERE cpf IS NOT NULL;
CREATE UNIQUE INDEX idx_clientes_cnpj ON clientes (cnpj) WHERE cnpj IS NOT NULL;