<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <header>
    <!-- INICIO NAVBAR -->
    <nav>
      <div>
        <router-link to="/">Quefazer</router-link>
        <button>
          <span></span>
        </button>
        <div>
          <li>
            <router-link to="/">Inicio</router-link>
          </li>
          <li>
            <router-link to="/">Contato</router-link>
          </li>
          <li>
            <router-link to="/">Sobre</router-link>
          </li>
          <li>
            <a href="#" role="button">Categorias</a>
            <ul>
              <li><router-link to="">Alimentação</router-link></li>
              <li><router-link to="">Delivery</router-link></li>
              <li><router-link to="">Financeiro</router-link></li>
              <li><router-link to="">Logística</router-link></li>
              <li><router-link to="">Terraplanagem</router-link></li>
            </ul>
            <form action="">
              <input type="text">
              <button type="button">Buscar</button>
            </form>
          </li>
        </div>
      </div>
    </nav>
    <!-- FIM NAVBAR -->
  </header>

  <main>
    <router-view></router-view>
  </main>
  
  <!-- INICIO FOOTER -->
  <footer>
    <hr>
    <div>
      <div>
        <router-link to="">Contato</router-link>
        <router-link to="">Quem somos</router-link>
        <router-link to="">Trabalhe conosco</router-link>
      </div>
      <div>
        <RouterLink to="">Produtos</RouterLink>
        <RouterLink to="">Institucional</RouterLink>
        <RouterLink to="">Parcerias</RouterLink>
      </div>
      <div>
        <p>Siga-nos:</p>
        <RouterLink to=""></RouterLink>
        <RouterLink to=""></RouterLink>
        <RouterLink to=""></RouterLink>
      </div>
    </div>
    <hr>
    <div>
      <p>&copy; Quefazer 2025</p>
    </div>
  </footer>
  <!-- FIM FOOTER -->
</template>

<script setup>

</script>

<style scoped>

</style>