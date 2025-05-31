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
& "psql" -U "$DbUser" -d "$DatabaseName" -f "..\schema\clientes.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "..\schema\usuarios.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "..\schema\anunciantes.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "..\schema\categorias.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "..\schema\anuncios.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "..\schema\imagens_anuncios.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "..\schema\avaliacoes.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "..\schema\roles.sql"
& "psql" -U "$DbUser" -d "$DatabaseName" -f "..\schema\usuarios_roles.sql"

Write-Host "Banco de dados configurado com sucesso!"
Read-Host -Prompt "Pressione Enter para sair"