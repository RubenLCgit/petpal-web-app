<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthUser } from '../../stores/AuthStore';
import { storeToRefs } from 'pinia';

const authUser = useAuthUser();
const router = useRouter();

const { logoutUser, updateAuthStatus } = authUser;

const { loginSuccess } = storeToRefs(authUser);


const Name = ref<string | null | undefined>('');

watchEffect(() => {
  updateAuthStatus();
  Name.value = authUser.userName;
});

const logoutAndRedirect = () => {
  logoutUser();
  router.push('/');
};


</script>

<template>
  <div v-if="!loginSuccess" class="groupButtons">
    <RouterLink to="/register">
      <v-btn density="compact" color="#00447d">{{ $t("register") }}</v-btn>
    </RouterLink>
    <RouterLink to="/login">
      <v-btn density="compact" color="#00447d">{{ $t("login") }}</v-btn>
    </RouterLink>
  </div>
  <div class="logued" v-else>
    <h3>{{ $t("welcome") }} {{ Name }}</h3>
    <v-btn @click="logoutAndRedirect" density="compact" color="#00447d">{{ $t("logout") }}</v-btn>
  </div>
</template>

<style scoped>
.groupButtons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 10px;
}

.logued {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 10px;
}
</style>