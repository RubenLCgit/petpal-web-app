<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import GraphicsView from './GraphicsView.vue';

const colorButtonProduct = computed(() => router.currentRoute.value.path.includes('products') ? '#00447d' : '#cbcbcb');

const colorButtonService = computed(() => router.currentRoute.value.path.includes('services') ? '#00447d' : '#cbcbcb');
</script>

<template>
  <div class="mainContainer">
    <div class="homeImage">
      <h2 class="homeImage__title">
        {{ $t("wellbeing") }}
      </h2>
      <nav class="homeImage__nav">
        <RouterLink to="/home/products"><v-btn class="homeImage__btn" :color="colorButtonProduct">{{ $t("products") }}</v-btn></RouterLink>
        <RouterLink to="/home/services"><v-btn class="homeImage__btn" :color="colorButtonService">{{ $t("services") }}</v-btn></RouterLink>
      </nav>
    </div>
    <div class="homViews">
      <RouterView></RouterView>
    </div>
    <div class="graphics">
      <GraphicsView></GraphicsView>
    </div>
  </div>
  

</template>

<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Platypi:wght@600&display=swap');

  .mainContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
  }

  .homeImage{
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items: center;
    min-height: 500px;
    background: url('../assets/img/dog_font2.jpg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .homeImage__title{
    color: white;;
    font-family: 'Platypi', sans-serif;
    text-align: center;
    max-width: 80%;
  }

  .homeImage__nav{
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 10px;
  }

  .homeImage__btn{
    font-weight: bold;
  }

  .homViews{
    width: 100%;
  }

  .graphics{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }

</style>
