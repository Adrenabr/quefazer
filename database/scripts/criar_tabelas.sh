#!/bin/bash

DATABASE_NAME="${DATABASE_NAME:-quefazer}"
DB_USER="${DB_USER:-postgres}"

echo "Criando o banco de dados: $DATABASE_NAME (se não existir)"
psql -U postgres -c "CREATE DATABASE $DATABASE_NAME" || echo "Banco de dados já existe."

echo "Executando os scripts SQL na ordem correta:"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "../schema/clientes.sql"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "../schema/usuarios.sql"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "../schema/anunciantes.sql"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "../schema/categorias.sql"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "../schema/anuncios.sql"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "../schema/imagens_anuncios.sql"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "../schema/avaliacoes.sql"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "../schema/roles.sql"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f "../schema/usuarios_roles.sql"

echo "Banco de dados configurado com sucesso!"