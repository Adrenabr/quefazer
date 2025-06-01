import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '@/views/InicioView.vue'
import ContatoView from '@/views/ContatoView.vue'
import SobreView from '@/views/SobreView.vue'
import CadastroView from '../views/CadastroView.vue'  // Importa o componente de cadastro.

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
  ],
})

export default router
