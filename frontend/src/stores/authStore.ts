import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// 'ref' cria uma variável reativa.
// Inicializa o estado verificando se o token já existe no localStorage.
// O '!!' converte o valor (string ou null) para um boolean (true or false);
const isAuthenticated = ref(!!localStorage.getItem('accessToken'));

// Esta função agrupa e exporta o estado e ações.
export function useAuthStore() {
    const router = useRouter();

    // Ação para realizar login.
    const login = (token: string) => {
        localStorage.setItem('accessToken', token);
        isAuthenticated.value = true;
        router.push('/dashboard');  // Onde o usuario sera redirecionado após o login.
    };

    // Ação para realizar logout.
    const logout = () => {
        localStorage.removeItem('accessToken');
        isAuthenticated.value = false;
        router.push('/login');      // Redireciona para a página de login após sair.
    };

    return {
        // Utilizando 'computed' para expor o valor de forma segura(read-only) para evitar modificações acidentais fora do store.
        isAuthenticated: computed(() => isAuthenticated.value),
        login,
        logout,
    };
}