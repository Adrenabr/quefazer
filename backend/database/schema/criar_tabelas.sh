#!/bin/bash

DATABASE_NAME="${DATABASE_NAME:-quefazer}"
DB_USER="${DB_USER:-postgres}"

echo "Criando o banco de dados: $DATABASE_NAME (se não existir)"
psql -U postgres -c "CREATE DATABASE $DATABASE_NAME" || echo "Banco de dados já existe."

echo "Executando os scripts SQL na ordem correta:"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "clientes.sql" -f "usuarios.sql" -f "anunciantes.sql" -f "categorias.sql" -f "anuncios.sql" -f "imagens_anuncios.sql" -f "avaliacoes.sql" -f "roles.sql" -f "usuarios_roles.sql"

echo "Banco de dados configurado com sucesso!"