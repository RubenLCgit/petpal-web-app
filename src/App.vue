<script setup lang="ts">
import { useUserStore } from './stores/userStore';
import { useServiceStore } from './stores/serviceStore';
import { useProductStore } from './stores/productStore';
import MainLayout from './components/main/MainLayout.vue';


const userStore = useUserStore();
const serviceStore = useServiceStore();
const productStore = useProductStore();

const { getUsers } = userStore;
const { getServices } = serviceStore;
const { getProducts } = productStore;

getUsers();
getServices();
getProducts();
</script>

<template>
  <div class="mainLayout">
    <MainLayout></MainLayout>
  </div>
</template>

<style scoped>

.mainLayout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

</style>
