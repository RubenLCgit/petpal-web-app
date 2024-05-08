<script setup lang="ts">
import AppLogo from '../commons/AppLogo.vue';
import RegisterLogin from '../commons/RegisterLogin.vue';
import LanguajeApp from '../commons/LanguajeApp.vue';
</script>

<template>
  <div class="header">
    <div class="header__appLogo">
      <AppLogo></AppLogo>
    </div>
    <div class="header__registerLoginLanguaje">
      <LanguajeApp></LanguajeApp>
      <RegisterLogin></RegisterLogin>
    </div>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
  }

  .header__appLogo {
    margin-left: 1rem;
  }

  .header__registerLoginLanguaje {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem;
    margin-top: 5px;
  }
</style>