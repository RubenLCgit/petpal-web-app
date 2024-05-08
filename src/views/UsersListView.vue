<script setup lang="ts">
import UserList from '@/components/users/UserList.vue';
</script>

<template>
  <div class="container">
    <h1>{{ $t("list_of_users") }}</h1>
    <UserList></UserList>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #00447d;
  font-family: roboto;
}

</style>