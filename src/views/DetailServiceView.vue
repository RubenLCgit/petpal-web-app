<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useServiceStore } from '../stores/serviceStore';
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const route = useRoute();


const serviceStore = useServiceStore();
const userStore = useUserStore();

const { getService } = serviceStore;
const { service } = storeToRefs(serviceStore);
const { updateToken } = userStore;

updateToken();

getService(route.params.id.toString());

const transformDate = computed(() => {
  if(service.value){
    const date = new Date(service.value.serviceAvailability)
    return date.toLocaleDateString()
  }
  return ''
})

const transformOnline = computed(() => {
  if(service.value){
    return service.value.serviceOnline ? 'yes' : 'no'
  }
  return ''
})
</script>

<template>
  <div class="containerDetails">
    <div class="containerDetails__description">
      <h1>{{ $t("description") }}</h1>
      <v-divider color="#00447d"></v-divider>
      <p>{{ service?.serviceDescription }}</p>
    </div>
    <div class="containerDetails__table">
      <h1>{{ $t("serviceFeatures") }}</h1>
      <v-divider color="#00447d"></v-divider>
      <table>
        <tr>
          <th class="text-left">{{ $t("type") }}</th>
          <td class="text-center">{{ service?.serviceType }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("name") }}</th>
          <td class="text-center">{{ service?.serviceName }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("price") }}</th>
          <td class="text-center">{{ service?.servicePrice }} €</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("date") }}</th>
          <td class="text-center">{{ transformDate }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("homeService") }}</th>
          <td class="text-center">{{ $t(transformOnline) }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("rating") }}</th>
          <td class="text-center">{{ service?.serviceRating }}</td>
        </tr>
      </table>
    </div>
    <div class="containerDetails__contact">
      <h1>{{ $t("contact") }}</h1>
      <v-divider color="#00447d"></v-divider>
      <h4>{{ service?.userEmail }}</h4>
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

  .containerDetails__description{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    padding: 20px;
    overflow: auto;
  }

  .containerDetails__table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #00447d;
    width: 80%;
    padding: 20px;
  }

  .containerDetails__contact{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    padding: 20px;
    text-align: center;
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