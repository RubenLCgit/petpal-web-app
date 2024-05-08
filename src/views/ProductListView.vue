<script setup lang="ts">
import ProductList from '@/components/products/ProductList.vue';
</script>

<template>
  <div class="container">
    <h1>{{ $t("list_of_products") }}</h1>
    <ProductList></ProductList>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #00447d;
  font-family: roboto;
}

</style>