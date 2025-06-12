import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '@/views/InicioView.vue'
import ContatoView from '@/views/ContatoView.vue'
import SobreView from '@/views/SobreView.vue'
import CadastroView from '@/views/CadastroView.vue'  // Importa o componente de cadastro.
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: InicioView,
    },
    {
      path: '/contato',
      name: 'contato',
      component: ContatoView,
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: SobreView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Se a rota exige autenticação e o usuário não está logado, redireciona para a página de login.
    next({ name: 'login' });
  } else {
    // Caso contrário, permite o acesso.
    next();
  }
});

export default router