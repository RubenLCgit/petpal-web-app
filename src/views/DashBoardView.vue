<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import { useAuthUser } from '@/stores/AuthStore';


const authUser = useAuthUser();
const userStore = useUserStore();
const { updateToken } = userStore;

updateToken();

const { userId } = storeToRefs(authUser);
</script>

<template>
  <div class="mainContainer">
  <h1>{{ $t("account") }}</h1>
  <div class="menuUser">
    <router-link :to="`/detailsUser/${userId}`">
      <v-btn color="#00447d">{{ $t("user_data") }}</v-btn>
    </router-link>
    <router-link :to="`/dashboard/products/${userId}`">
      <v-btn color="#00447d">{{ $t("products") }}</v-btn>
    </router-link>
    <router-link :to="`/dashboard/services/${userId}`">
      <v-btn color="#00447d">{{ $t("services") }}</v-btn>
    </router-link>
  </div>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
}

.menuUser {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 20px;
  gap: 20px;
  border: 2px solid #00447d;
}

h1 {
  color: #00447d;
  font-family: roboto;
}

</style>