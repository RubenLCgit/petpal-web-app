<script setup lang="ts">
import AppHeader from '../layout/AppHeader.vue';
import AppFooter from '../layout/AppFooter.vue';
import { ref, watchEffect } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useAuthUser } from '../../stores/AuthStore';

const authUser = useAuthUser();

const isLoggedIn = ref<boolean>(false);
const role = ref<boolean>(false);

const { updateAuthStatus } = authUser;

watchEffect(() => {
  updateAuthStatus();
  isLoggedIn.value = !!authUser.jwtToken;
  role.value = authUser.userRole === 'Admin' ? true : false;
});
</script>

<template>
  <div class="mainLayout">
    <header>
      <AppHeader></AppHeader>
      <v-divider
      :thickness="1"
      class="border-opacity-25"
      color="#00447d"
      ></v-divider>
      <nav>
        <RouterLink to="/"><v-btn variant="outlined" color="#00447d">{{ $t("home") }}</v-btn></RouterLink>
        <RouterLink v-if="isLoggedIn" to="/dashboard"><v-btn variant="outlined" color="#00447d">{{ $t("account") }}</v-btn></RouterLink>
        <RouterLink v-if="role" to="/admin"><v-btn variant="outlined" color="#00447d">{{ $t("admin") }}</v-btn></RouterLink>
      </nav>
    </header>
   
    <div class="main">
      <RouterView></RouterView>
    </div>
    <footer>
      <AppFooter></AppFooter>
    </footer>
  </div>
  
</template>

<style scoped>

  .mainLayout {
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    width: 100%;
    min-height: 100vh;
  }

  nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 10px;
  }

  .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 80%;
  }
</style>