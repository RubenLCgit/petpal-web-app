<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="container">
    <div class="container__navLists">
      <v-tabs
        bg-color="#00447d"
        fixed-tabs
      >
        <RouterLink to="/admin/users">
          <v-tab :text="$t('user')"></v-tab>
        </RouterLink>

        <RouterLink to="/admin/products">
          <v-tab :text="$t('products')"></v-tab>
        </RouterLink>

        <RouterLink to="/admin/services">
          <v-tab :text="$t('services')"></v-tab>
        </RouterLink>
      </v-tabs>
    </div>
    <div class="container_viewList">
      <RouterView></RouterView>
    </div>
  </div>

</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  
}

.container__navLists {
  width: 90%;
  align-self: center;
}

a{
  color: white; /* Cambia esto al color que prefieras */
  text-decoration: none;
}
</style>