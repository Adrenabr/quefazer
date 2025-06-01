<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <header>
    <!-- INICIO NAVBAR -->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Quefazer</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Contato</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Sobre</router-link>
            </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Categorias</a>
                <ul class="dropdown-menu">
                  <li><router-link class="dropdown-item" to="">Alimentação</router-link></li>
                  <li><router-link class="dropdown-item" to="">Delivery</router-link></li>
                  <li><router-link class="dropdown-item" to="">Financeiro</router-link></li>
                  <li><router-link class="dropdown-item" to="">Logística</router-link></li>
                  <li><router-link class="dropdown-item" to="">Terraplanagem</router-link></li>
                </ul>
              </li>
          </ul>
          <form class="d-flex" action="">
              <input class="form-control me-2" type="text" placeholder="O que você procura?">
              <button class="btn btn-primary" type="button">Buscar</button>
          </form>
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
    <div class="row">
      <div class="col-sm-4">
        <p><router-link class="link-footer" to="">Contato</router-link></p>
        <p><router-link class="link-footer" to="">Quem somos</router-link></p>
        <p><router-link class="link-footer" to="">Trabalhe conosco</router-link></p>
      </div>
      <div class="col-sm-4">
        <p><RouterLink class="link-footer" to="">Produtos</RouterLink></p>
        <p><RouterLink class="link-footer" to="">Institucional</RouterLink></p>
        <p><RouterLink class="link-footer" to="">Parcerias</RouterLink></p>
      </div>
      <div class="col-sm-4">
        <p>Siga-nos:</p>
        <RouterLink class="fa fa-facebook" to="#"></RouterLink>
        <RouterLink class="fa fa-twitter" to=""></RouterLink>
        <RouterLink class="fa fa-linkedin" to=""></RouterLink>
        <RouterLink class="fa fa-instagram" to=""></RouterLink>
      </div>
    </div>
    <hr>
    <div class="trade-mark">
      <p>&copy; Quefazer 2025</p>
    </div>
  </footer>
  <!-- FIM FOOTER -->
</template>

<script setup>

</script>

<style scoped>

</style>