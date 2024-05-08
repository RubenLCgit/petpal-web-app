<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductStore } from '../../stores/productStore';
import ProductItem from './ProductItem.vue';
import PaginateSections from '../commons/PaginateSections.vue';
import { usePagination } from '@/composables/usePagination';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const router = useRouter();

const { getProducts, getProductsUser } = productStore;
const { products, productsUser } = storeToRefs(productStore);

getProductsUser();
getProducts();


const { initElement, endElement, nextElement, previusElement } = usePagination();

</script>

<template>
  <div class="pagination">
    <PaginateSections 
      class="mb-2"
      :arrayElemenst="products"
      @nextElement="nextElement"
      @previusElement="previusElement"
    ></PaginateSections>
  </div>
  <div v-if=" router.currentRoute.value.name !== 'dashboardProducts'" class="listProducts">
    <ul class="listProducts__list">
      <li  v-for="product in products.slice(initElement, endElement)" :key="product.productId">
        <ProductItem 
          :productId="product.productId" 
          :userId="product.userId"
          :productType="product.productType"
          :productName="product.productName"
          :productDescription="product.productDescription"
          :productPrice="product.productPrice"
          :productAvailability="product.productAvailability"
          :productOnline="product.productOnline"
          :productStock="product.productStock"
          :productRating="product.productRating"
        ></ProductItem>
      </li>
    </ul>
  </div>
  <div v-else>
    <ul class="listProducts__list">
      <li  v-for="product in productsUser.slice(initElement, endElement)" :key="product.productId">
        <ProductItem 
          :productId="product.productId" 
          :userId="product.userId"
          :productType="product.productType"
          :productName="product.productName"
          :productDescription="product.productDescription"
          :productPrice="product.productPrice"
          :productAvailability="product.productAvailability"
          :productOnline="product.productOnline"
          :productStock="product.productStock"
          :productRating="product.productRating"
        ></ProductItem>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.listProducts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.listProducts__list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

</style>