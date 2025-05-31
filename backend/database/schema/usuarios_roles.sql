-- Cria tabela de junção usuarios x roles
CREATE TABLE usuarios_roles (
    usuario_id INT NOT NULL REFERENCES usuarios(usuario_id) ON DELETE CASCADE,  -- FK referenciando tabela usuarios.
    role_id INT NOT NULL REFERENCES roles(role_id) ON DELETE CASCADE,           -- FK referenciando tabela roles.
    PRIMARY KEY (usuario_id, role_id)                                           -- PK composta, garantindo que o mesmo usuário não tenha a mesma role atribuída várias vezes.
);