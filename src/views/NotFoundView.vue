<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter();

const backHome = () => {
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="container">
    <div class="container__button">
      <v-btn @click="backHome" color="#00447d">Back to Home</v-btn>
    </div>
    <div class="container__images"></div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/img/notFoundPage.jpg');
  background-size:cover;
  background-repeat: no-repeat;
  background-position: center;
}

.container__button {
  margin-top: 80px;
}
</style>