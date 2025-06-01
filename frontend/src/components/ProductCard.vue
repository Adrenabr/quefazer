<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.title">
    <h3>{{ product.title }}</h3>
    <p class="price">R$ {{ product.price }}</p>
    <button @click="$emit('view-details', product.id)">Ver Detalhes</button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['view-details']
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 8px;
}

.product-card h3 {
  margin-top: 0;
  margin-bottom: 4px;
}

.product-card .price {
  font-weight: bold;
  color: green;
  margin-bottom: 8px;
}

.product-card button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.product-card button:hover {
  background-color: #0056b3;
}
</style>