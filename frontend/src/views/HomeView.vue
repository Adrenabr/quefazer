<template>
  <div>
    <h1>Lista de Produtos</h1>
    <div v-for="prod in products" :key="prod.id">
      <ProductCard :product="prod" @view-details="showProductDetails" />
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';

export default {
  name: 'HomeView',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [
        { id: 1, title: 'Produto A', imageUrl: '...', price: 25.99 },
        { id: 2, title: 'Produto B', imageUrl: '...', price: 49.99 },
        // ... mais produtos
      ]
    };
  },
  methods: {
    showProductDetails(productId) {
      console.log(`Detalhes do produto com ID: ${productId}`);
      // Aqui você implementaria a lógica para exibir os detalhes do produto
    }
  }
};
</script>