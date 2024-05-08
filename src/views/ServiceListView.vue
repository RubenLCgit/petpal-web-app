<script setup lang="ts">
import ServiceList from '@/components/services/ServiceList.vue';
</script>

<template>
  <div class="container">
    <h1>{{ $t("list_of_services") }}</h1>
    <ServiceList></ServiceList>
  </div>
</template>

<style scoped>
  .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}

h1 {
  color: #00447d;
  font-family: roboto;
}
</style>