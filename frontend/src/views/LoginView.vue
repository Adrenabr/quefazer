<template>
    <!-- INICIO FORMULARIO DE LOGIN -->
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="loginEmail" required>
            </div>
            <div>
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="loginSenha" required>
            </div>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <button type="submit">Entrar</button>
        </form>
    </div>
    <!-- FIM FORMULARIO DE LOGIN -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'; // Biblioteca para requisições HTTP.
import { useAuthStore } from '@/stores/authStore';  // Importa a função login do store.

const loginEmail = ref('');
const loginSenha = ref('');
const errorMessage = ref('');

const { login } = useAuthStore();   // Pega a função login do store.

const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email: loginEmail.value,
            senha: loginSenha.value,
        });

        // Chama a função 'login' do store, passando o token.
        login(response.data.accessToken);

    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            errorMessage.value = 'Email ou senha inválidos.';
        } else {
            errorMessage.value = 'Ocorreu um erro. Tente novamente mais tarde.';
        }
        console.error('Falha no login:', error);
    }
};
</script>

<style scoped>
.error {
  color: red;
}
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>