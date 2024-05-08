<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const route = useRoute();

const userStore = useUserStore();

const { getUser } = userStore;
const { user } = storeToRefs(userStore);
const { updateToken } = userStore;

updateToken();

getUser(route.params.id.toString());

const transformDate = computed(() => {
  if(user.value){
    const date = new Date(user.value.userRegisterDate)
    return date.toLocaleDateString()
  }
  return ''
})

const transformSupplier = computed(() => {
  if(user.value){
    return user.value.userSupplier ? 'yes' : 'no'
  }
  return ''
})
</script>

<template>
  <div class="containerDetails">
    <div class="containerDetails__table">
      <h1>{{ $t("userInformation") }}</h1>
      <v-divider class="border-opacity-100" color="#00447d"></v-divider>
      <table>
        <tr>
          <th class="text-left">{{ $t("name") }}</th>
          <td class="text-center">{{ user?.userName }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("email") }}</th>
          <td class="text-center">{{ user?.userEmail }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">Id</th>
          <td class="text-center">{{ user?.userId }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("suplier") }}</th>
          <td class="text-center">{{ $t(transformSupplier) }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("account_creation_date") }}</th>
          <td class="text-center">{{ transformDate }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("rating") }}</th>
          <td class="text-center">{{ user?.userRating }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("products") }}</th>
          <td class="text-center">{{ user?.listIdProducts.length }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("services") }}</th>
          <td class="text-center">{{ user?.listIdServices.length }}</td>
        </tr>
      </table>
    </div>
    <div class="containerDetails__buttonBack">
      <v-btn color="#00447d" @click="$router.go(-1)">{{ $t("back") }}</v-btn>
    </div>
  </div>
  
</template>

<style scoped>

  .containerDetails{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
  }

  .containerDetails__table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #00447d;
    width: 80%;
    padding: 20px;
  }

  table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  tr{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
  }

  td{
    display: flex;
    justify-self: center;
    border-style: none;
    min-width: 120px;
    max-width: 120px;
    margin-left: 5px;
    margin-right: 40px;
    overflow: auto;
  }

  th{
    display: flex;
    justify-self: flex-start;
    min-width: 130px;
  }

  input{
    display: flex;
    min-width: 120px;
    max-width: 120px;
  }

  .containerDetails__buttonBack{
    margin: 20px;
  }

  h1{
    color: #00447d;
    text-align: center;
  }

  p{
    text-align: justify;
    margin-top: 10px;
  }

</style>