## Configuração do Banco de Dados PostgreSQL

Este projeto utiliza o PostgreSQL como seu banco de dados. Para configurar o banco de dados localmente, siga os seguintes passos:


1.  Certifique-se de ter o PostgreSQL instalado e rodando na sua máquina.
2.  Crie um banco de dados com o nome especificado nas variáveis de ambiente (`.env`).
3.  Execute os seguintes arquivos SQL na ordem listada abaixo para criar as tabelas e os índices necessários:

    ```bash
    psql -U seu_usuario -d nome_do_banco -f database/schema/clientes.sql
    psql -U seu_usuario -d nome_do_banco -f database/schema/usuarios.sql
    psql -U seu_usuario -d nome_do_banco -f database/schema/anunciantes.sql
    psql -U seu_usuario -d nome_do_banco -f database/schema/categorias.sql
    psql -U seu_usuario -d nome_do_banco -f database/schema/anuncios.sql
    psql -U seu_usuario -d nome_do_banco -f database/schema/imagens_anuncios.sql
    psql -U seu_usuario -d nome_do_banco -f database/schema/avaliacoes.sql
    psql -U seu_usuario -d nome_do_banco -f database/schema/roles.sql
    psql -U seu_usuario -d nome_do_banco -f database/schema/usuarios_roles.sql
    ```

    Substitua `seu_usuario` e `nome_do_banco` pelas suas configurações locais.

2. Criar um script setup_db.sh:

#!/bin/bash

DATABASE_NAME="${DATABASE_NAME:-seu_banco_de_dados}"
DB_USER="${DB_USER:-seu_usuario}"

echo "Criando o banco de dados: $DATABASE_NAME (se não existir)"
psql -U postgres -c "CREATE DATABASE $DATABASE_NAME" || echo "Banco de dados já existe."

echo "Executando os scripts SQL na ordem correta:"
psql -U "$DB_USER" -d "$DATABASE_NAME" -f database/schema/clientes.sql
psql -U "$DB_USER" -d "$DATABASE_NAME" -f database/schema/usuarios.sql
psql -U "$DB_USER" -d "$DATABASE_NAME" -f database/schema/anunciantes.sql
psql -U "$DB_USER" -d "$DATABASE_NAME" -f database/schema/categorias.sql
psql -U "$DB_USER" -d "$DATABASE_NAME" -f database/schema/anuncios.sql
psql -U "$DB_USER" -d "$DATABASE_NAME" -f database/schema/imagens_anuncios.sql
psql -U "$DB_USER" -d "$DATABASE_NAME" -f database/schema/avaliacoes.sql
psql -U "$DB_USER" -d "$DATABASE_NAME" -f database/schema/roles.sql
psql -U "$DB_USER" -d "$DATABASE_NAME" -f database/schema/usuarios_roles.sql

echo "Banco de dados configurado com sucesso!"

3. Execute o script de setup do banco de dados:
   ```bash
   chmod +x setup_db.sh
   ./setup_db.sh
   ```
   Certifique-se de ter as variáveis de ambiente `DATABASE_NAME` e `DB_USER` configuradas no seu `.env` ou defina os valores padrão no script.

4. Script Power Shell:

param(
    [string]$DatabaseName = "seu_banco_de_dados",
    [string]$DbUser = "seu_usuario_postgres",
    [string]$DbPassword = "sua_senha_postgres"
)

Write-Host "Criando o banco de dados: $DatabaseName (se não existir)"
try {
    Invoke-Expression "psql -U postgres -c ""CREATE DATABASE $DatabaseName"""
}
catch {
    Write-Host "Banco de dados já existe."
}

Write-Host "Executando os scripts SQL na ordem correta:"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "database\schema\clientes.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "database\schema\usuarios.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "database\schema\anunciantes.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "database\schema\categorias.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "database\schema\anuncios.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "database\schema\imagens_anuncios.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "database\schema\avaliacoes.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "database\schema\roles.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "database\schema\usuarios_roles.sql"

Write-Host "Banco de dados configurado com sucesso!"
Read-Host -Prompt "Pressione Enter para sair"