<template>
    <!-- INICIO FORMULARIO DE CADASTRO -->
    <form @submit.prevent="cadastrarUsuario">
        <div class="container">
            <hr>
            <h1>Cadastro de Usuário</h1>
            <p>Os campos marcados com * são obrigatórios.</p>

            <div>
                <label for="usuario">Usuário:*</label>
                <input type="text" id="usuario" placeholder="Digite seu nome de usuário." v-model="formData.cadastroUsuario" required @blur="validarUsuario">
                <div v-if="errors.cadastroUsuario" class="text-danger">{{ errors.cadastroUsuario }}</div>
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
                <input type="email" id="email" placeholder="Digite seu email." v-model="formData.cadastroEmail" required>
                <div v-if="errors.cadastroEmail" class="text-danger">{{ errors.cadastroEmail }}</div>
            </div>
            <div>
                <label for="senha">Senha:*</label>
                <input type="password" id="senha" placeholder="Digite sua senha." v-model="formData.cadastroSenha" required>
                <div v-if="errors.cadastroSenha" class="text-danger">{{ errors.cadastroSenha }}</div>
            </div>
            <div>
                <label for="confirmar-senha">Confirmar senha:*</label>
                <input type="password" id="confirmar-senha" placeholder="Digite novamente sua senha." v-model="formData.confirmarSenha" required>
                <div v-if="errors.confirmarSenha" class="text-danger">{{ errors.confirmarSenha }}</div>
            </div>
            <p>Ao clicar em cadastrar-se você estará concordando com nossos <RouterLink to="">Termos de uso</RouterLink>.</p>
            <button type="submit" class="registerbtn" :disabled="passwordMismatchError || !isValidForm">Cadastrar-se</button>
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

import { ref, computed, watch } from 'vue';
import axios from 'axios';

const formData = ref({
    cadastroUsuario: '',
    primeiroNome: '',
    ultimoNome: '',
    cadastroEmail: '',
    cadastroSenha: '',
    confirmarSenha: '',
});

const mensagem = ref('');
const sucesso = ref(false);
const passwordMismatchError = ref(false);
// Objeto reativo para armazenar erros específicos por campo
const errors = ref({ 
    cadastroUsuario: '',
    cadastroEmail: '',
    cadastroSenha: '',
    confirmarSenha: '',
 });

// Função para validar nome de usuário no frontend.
const validarUsuario = () => {
    if (formData.value.cadastroUsuario.includes(' ')) {
        errors.value.cadastroUsuario = "O nome de usuário não pode conter espaços em branco.";
        return false;
    }
    errors.value.cadastroUsuario = '';  // Limpa o erro se for válido.
    return true;
};

// Computed property para verificar se as senhas coincidem.
const passwordMatch = computed(() => {
    // Só verifica se ambas as senhas foram preenchidas para evitar erro desnecessário no início.
    return formData.value.cadastroSenha === formData.value.confirmarSenha && 
           formData.value.cadastroSenha !== '' && formData.value.confirmarSenha !== '';
});

// Watcher para monitorar as senhas e atualizar o erro de não correspondência.
watch([() => formData.value.cadastroSenha, () => formData.value.confirmarSenha], ([newPassword, newConfirmPassword]) => {
    // Só compara se ambos não estiverem vazios.
    if (newPassword !== '' && newConfirmPassword !== '') {
        passwordMismatchError.value = newPassword !== newConfirmPassword;
        if (passwordMismatchError.value) {
            errors.value.confirmarSenha = 'As senhas não coincidem.';
        } else {
            errors.value.confirmarSenha = '';   // Limpa o erro se as senhas coincidirem.
        }
    } else {
        passwordMismatchError.value = false;    // Não mostra erro se um ou ambos os campos estiverem vazios.
        errors.value.confirmarSenha = '';       // Limpa o erro.
    }
}, { immediate: true });    // Executa a validação uma vez ao carregar o componente.

// Computed property para desabilitar o botão de submit caso as senhas não coincidirem.
const isValidForm = computed(() => {
    // Verifica se não há erros em nenhum dos campos e se as senhas coincidem.
    const noFieldErrors = !Object.values(errors.value).some(error => error !== '');
    const isPasswordValid = !passwordMismatchError.value && formData.value.cadastroSenha !== '' && formData.value.confirmarSenha !== '';
    const isRequiredFieldsFilled = formData.value.cadastroUsuario !== '' && formData.value.cadastroEmail !== '';

    return noFieldErrors && isPasswordValid && isRequiredFieldsFilled;
});

const cadastrarUsuario = async () => {
    mensagem.value = '';    // Limpa mensagens anteriores.
    sucesso.value = false;
    errors.value = { cadastroUsuario: '', cadastroEmail: '', cadastroSenha: '', confirmarSenha: '' }; // Limpa erros anteriores.
    // Chama a validação do nome de usuário no frontend antes do envio.
    if (!validarUsuario()) {
        // Se a validação do nome de usuário falhar no frontend, não envia a requisição
        return;
    }

    // Verifica se as senhas não coincidem antes de enviar
    if (passwordMismatchError.value) {
        mensagem.value = 'As senhas digitadas não coincidem.';
        sucesso.value = false;
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/api/usuarios/cadastro', formData.value);
        mensagem.value = response.data.message || 'Cadastro realizado com sucesso!';
        sucesso.value = true;
        // Limpar o formulário após o sucesso (opcional)
        formData.value = { cadastroUsuario: '', primeiroNome: '', ultimoNome: '', cadastroEmail: '', cadastroSenha: '', confirmarSenha: '' };
    } catch (error: any) {
        //mensagem.value = error.response?.data?.message || 'Erro ao cadastrar usuário.';
        sucesso.value = false;
        console.error('Erro ao cadastrar:', error);

        if (error.response && error.response.data && error.response.data.errors) {
            // Se houver erros de validação do express-validator.
            error.response.data.errors.forEach((err: any) => {
                // Verifica se o campo existe no objeto de erros.
                if (errors.value.hasOwnProperty(err.param)) {
                    (errors.value as any)[err.param] = err.msg;
                } else {
                    // Se for um erro não mapeado a um campo específico, adiciona à mensagem geral.
                    mensagem.value = err.msg;
                }
            });
        } else if (error.response && error.response.data && error.response.data.message) {
            // Para outros erros do backend que retornam 'message' (como email já cadastrado).
            mensagem.value = error.response.data.message;
        } else {
            // Mensagem genérica para erros desconhecidos.
            mensagem.value = 'Erro ao cadastrar usuário. Tente novamente.';
        }
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
input[type=text], input[type=password], input[type=email] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}
input[type=text]:focus, input[type=password]:focus, input[type=email]:focus {
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