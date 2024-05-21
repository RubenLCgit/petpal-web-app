<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useServiceStore } from '../../stores/serviceStore'
import ServiceItem from './ServiceItem.vue';
import PaginateSections from '../commons/PaginateSections.vue';
import { usePagination } from '@/composables/usePagination';
import { useAuthUser } from '@/stores/AuthStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Service } from '@/interfaces/service';

const authUser = useAuthUser();
const serviceStore = useServiceStore();
const router = useRouter();

const { getServices } = serviceStore;
const { services } = storeToRefs(serviceStore);

const { userId } = storeToRefs(authUser);

const servicesUser = ref<Service[]>([]);

const getServicesUser = async () => {
  await getServices();
  if (services.value) {
    console.log(`userId: ${userId.value}`);
    servicesUser.value = await services.value.filter((service) => service.userId.toString() === userId.value);
    console.log(services.value);
    console.log(servicesUser.value);
  }
};

getServicesUser();

const { initElement, endElement, nextElement, previusElement } = usePagination();

</script>

<template>
  <div class="pagination">
    <PaginateSections 
      class="mb-2"
      :arrayElemenst="services"
      @nextElement="nextElement"
      @previusElement="previusElement"
    ></PaginateSections>
  </div>
  <div v-if=" router.currentRoute.value.name !== 'dashboardServices'" class="listServices">
    <ul class="listServices__list">
      <li v-for="service in services.slice(initElement, endElement)" :key="service.serviceId">
        <ServiceItem 
          :serviceId="service.serviceId" 
          :userId="service.userId"
          :serviceType="service.serviceType"
          :serviceName="service.serviceName"
          :serviceDescription="service.serviceDescription"
          :servicePrice="service.servicePrice"
          :serviceAvailability="service.serviceAvailability"
          :serviceOnline="service.serviceOnline"
          :serviceRating="service.serviceRating"
        ></ServiceItem>
      </li>
    </ul>
  </div>
  <div v-else>
    <ul>
      <li v-for="service in servicesUser.slice(initElement, endElement)" :key="service.serviceId">
        <ServiceItem 
          :serviceId="service.serviceId" 
          :userId="service.userId"
          :serviceType="service.serviceType"
          :serviceName="service.serviceName"
          :serviceDescription="service.serviceDescription"
          :servicePrice="service.servicePrice"
          :serviceAvailability="service.serviceAvailability"
          :serviceOnline="service.serviceOnline"
          :serviceRating="service.serviceRating"
        ></ServiceItem>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.listServices{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.listServices__list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

</style>