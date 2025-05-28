@echo off
set DATABASE_NAME=seu_banco_de_dados
set DB_USER=seu_usuario_postgres
set PGPASSWORD=sua_senha_postgres

echo Criando o banco de dados: %DATABASE_NAME% (se não existir)
psql -U postgres -c "CREATE DATABASE %DATABASE_NAME%" 2>nul
echo Banco de dados criado (ou já existia).

echo Executando os scripts SQL na ordem correta:
psql -U "%DB_USER%" -d "%DATABASE_NAME%" -f ..\schema\clientes.sql
psql -U "%DB_USER%" -d "%DATABASE_NAME%" -f ..\schema\usuarios.sql
psql -U "%DB_USER%" -d "%DATABASE_NAME%" -f ..\schema\anunciantes.sql
psql -U "%DB_USER%" -d "%DATABASE_NAME%" -f ..\schema\categorias.sql
psql -U "%DB_USER%" -d "%DATABASE_NAME%" -f ..\schema\anuncios.sql
psql -U "%DB_USER%" -d "%DATABASE_NAME%" -f ..\schema\imagens_anuncios.sql
psql -U "%DB_USER%" -d "%DATABASE_NAME%" -f ..\schema\avaliacoes.sql
psql -U "%DB_USER%" -d "%DATABASE_NAME%" -f ..\schema\roles.sql
psql -U "%DB_USER%" -d "%DATABASE_NAME%" -f ..\schema\usuarios_roles.sql

echo Banco de dados configurado com sucesso!
pause