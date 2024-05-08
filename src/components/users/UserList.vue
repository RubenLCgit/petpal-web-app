<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../stores/userStore';
import UserItem from './UserItem.vue';
import PaginateSections from '../commons/PaginateSections.vue';
import { usePagination } from '@/composables/usePagination';


const userStore = useUserStore();

const { getUsers } = userStore;
const { users } = storeToRefs(userStore);
const { updateToken } = userStore;

updateToken();

getUsers();

const { initElement, endElement, nextElement, previusElement } = usePagination();

</script>

<template>
  <div>
    <PaginateSections 
      class="mb-2"
      :arrayElemenst="users"
      @nextElement="nextElement"
      @previusElement="previusElement"
    ></PaginateSections>
  </div>
  <div>
    <ul>
      <li v-for="user in users.slice(initElement, endElement)" :key="user.userId">
        <UserItem 
          :id="user.userId" 
          :name="user.userName"
          :email="user.userEmail"
          :registerDate="user.userRegisterDate"
          :supplier="user.userSupplier"
          :rating="user.userRating"
          :productList="user.listIdProducts"
          :serviceList="user.listIdServices"
        ></UserItem>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>