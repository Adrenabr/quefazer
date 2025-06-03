<template>
    <!-- INICIO FORMULARIO DE CADASTRO -->
    <form @submit.prevent="cadastrarUsuario">
        <div class="container">
            <hr>
            <h1>Cadastro de Usuário</h1>
            <p>Os campos marcados com * são obrigatórios.</p>

            <div>
                <label for="usuario">Usuário:*</label>
                <input type="text" id="usuario" placeholder="Digite seu nome de usuário." v-model="formData.nome" required>
            </div>
            <div>
                <label for="primeiro-nome">Primeiro nome:</label>
                <input type="text" id="primeiro-nome" placeholder="Digite seu primeiro nome." v-model="formData.primeiroNome">
            </div>
            <div>
                <label for="ultimo-nome">Último nome:</label>
                <input type="text" id="ultimo-nome" placeholder="Digite seu último nome." v-model="formData.ultimoNome">
            </div>
            <div>
                <label for="email">Email:*</label>
                <input type="email" id="email" placeholder="Digite seu email." v-model="formData.email" required>
            </div>
            <div>
                <label for="senha">Senha:*</label>
                <input type="password" id="senha" placeholder="Digite sua senha." v-model="formData.senha" required>
            </div>
            <div>
                <label for="confirmar-senha">Confirmar senha:*</label>
                <input type="password" id="confirmar-senha" placeholder="Digite novamente sua senha." v-model="formData.confirmarSenha" required>
            </div>
            <p>Ao clicar em cadastrar-se você estará concordando com nossos <RouterLink to="">Termos de uso</RouterLink>.</p>
            <button type="submit" class="registerbtn">Cadastrar-se</button>
            <div v-if="mensagem" class="mt-3 alert" :class="{'alert-success': sucesso, 'alert-danger': !sucesso}">
                {{ mensagem }}
            </div>
            <hr>
            <div class="container signin">
                <p>Já possui uma conta? <router-link to="/login">Entre</router-link></p>
            </div>  
        </div>
    </form>
    <!-- FIM FORMULARIO DE CADASTRO -->
</template>

<script setup lang="ts">

import { ref } from 'vue';
import axios from 'axios';

const formData = ref({
    nome: '',
    primeiroNome: '',
    ultimoNome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
});

const mensagem = ref('');
const sucesso = ref(false);

const cadastrarUsuario = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/usuarios/cadastro', formData.value);
    mensagem.value = response.data.message || 'Cadastro realizado com sucesso!';
    sucesso.value = true;
    // Limpar o formulário após o sucesso (opcional)
    formData.value = { nome: '', primeiroNome: '', ultimoNome: '', email: '', senha: '', confirmarSenha: '' };
  } catch (error: any) {
    mensagem.value = error.response?.data?.message || 'Erro ao cadastrar usuário.';
    sucesso.value = false;
    console.error('Erro ao cadastrar:', error);
  }
};

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
/* Define background da area de login */
.signin {
    background-color: #f1f1f1;
    text-align: center;
}
</style>