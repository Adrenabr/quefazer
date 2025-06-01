<template>
    <!-- HTML BRABO COM TUDO QUE TEM DIREITO -->
     <form action="">
        <div class="container">
            <h1>Cadastro</h1>
            <p>Preencha os seguintes campos.</p>

            <hr>

            <label for="email"></label>
            <input type="text" placeholder="Digite seu email" name="email" id="email" required>

            <label for="senha"></label>
            <input type="password" placeholder="Digite sua senha" name="senha" id="senha" required>

            <label for="senha-repita"></label>
            <input type="password" placeholder="Digite novamente sua senha" name="senha-repita" id="senha-repita" required>

            <hr>

            <p>Ao clicar em cadastrar-se você estará concordando com nossos <RouterLink to="">Termos de uso</RouterLink>.</p>
            <button type="submit" class="registerbtn">Cadastrar-se</button>
        </div>

        <div class="container signin">
            <p>Já possui uma conta? <router-link to="/login">Entre</router-link></p>
        </div>
     </form>
</template>

<script setup lang="ts">

</script>
<style scoped>

* {box-sizing: border-box}
/* Espaçamento entre containers */
.container {
    padding: 16px;
}
/* Campos de texto */
input[type=text], input[type=password] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}
input[type=text]:focus, input[type=password]:focus {
    background-color: #ddd;
    outline: none;
}
/* Estilo da linha horizontal hr */
hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}
/* Estilo do botão de cadastro */
.registerbtn {
    background-color: #04AA6D;
    color: white;
    padding: 16px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
}
.registerbtn:hover {
    opacity: 1;
}
/* Set a grey background color and center the text of the "sign in" section */
.signin {
    background-color: #f1f1f1;
    text-align: center;
}
</style>