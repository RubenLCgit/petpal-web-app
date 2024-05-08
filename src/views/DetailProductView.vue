<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthUser } from '@/stores/AuthStore';
import { useProductStore } from '../stores/productStore';
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { ProductUpdate } from '@/interfaces/product';

const route = useRoute();
const router = useRouter();
const authUser = useAuthUser();
const productStore = useProductStore();
const userStore = useUserStore();

const { userId } = storeToRefs(authUser);
const { getProduct } = productStore;
const { product } = storeToRefs(productStore);
const { modifyProduct } = productStore;
const { updateToken } = userStore;

updateToken();

getProduct(route.params.id.toString());

const transformDate = computed(() => {
  if(product.value){
    const date = new Date(product.value.productAvailability)
    return date.toLocaleDateString()
  }
  return ''
})

const transformOnline = computed(() => {
  if(product.value){
    return product.value.productOnline ? 'Yes' : 'No'
  }
  return ''
})

const productType = ref();
const productName = ref();
const productDescription = ref();
const productPrice = ref();
const productOnline = ref();
const productStock = ref();

const updateProduct = async () => {
  if (product.value) {
    const productUpdated : ProductUpdate = {
      productType: productType.value ?? product.value.productType,
      productName: productName.value ?? product.value.productName,
      productDescription: productDescription.value ?? product.value.productDescription,
      productPrice: productPrice.value ?? product.value.productPrice,
      productOnline: productOnline.value ?? product.value.productOnline,
      productStock: productStock.value ?? product.value.productStock
    }
    await modifyProduct(product.value.productId.toString(), productUpdated);
    router.go(-1);
  }
}

watch (product, () => {
  if (product.value) {
    productType.value = product.value.productType;
    productName.value = product.value.productName;
    productDescription.value = product.value.productDescription;
    productPrice.value = product.value.productPrice;
    productOnline.value = product.value.productOnline;
    productStock.value = product.value.productStock;
  }
})

const hasChanges = computed(() => {
  if (product.value) {
 
    if (productType.value === product.value.productType &&
      productName.value === product.value.productName &&
      productDescription.value === product.value.productDescription &&
      productPrice.value === product.value.productPrice &&
      productOnline.value === product.value.productOnline &&
      productStock.value === product.value.productStock) return true;
      else return false;
  }
  return false;
});

</script>

<template>
  <div class="containerDetails">
    <div class="containerDetails__description">
      <h1>{{ $t("description") }}</h1>
      <v-divider class="border-opacity-100" color="#00447d"></v-divider>
      <textarea name="" id="" cols="30" rows="5" v-model="productDescription" :placeholder="product?.productDescription"></textarea>
    </div>
    <div class="containerDetails__table">
      <h1>{{ $t("productFeatures") }}</h1>
      <v-divider class="border-opacity-100" color="#00447d"></v-divider>
      <table>
        <tr>
          <th class="text-left">{{ $t("type") }}</th>
          <td v-if="userId == product?.userId" class="text-center"><input type="text" v-model="productType" :placeholder="product?.productType"></td>
          <td v-else class="text-center">{{ product?.productType }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("name") }}</th>
          <td v-if="userId == product?.userId" class="text-center"><input type="text" v-model="productName" :placeholder="product?.productName"></td>
          <td v-else class="text-center">{{ product?.productName }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("price") }}</th>
          <td v-if="userId == product?.userId" class="text-center"><input type="number" v-model="productPrice" :placeholder="product?.productPrice.toString()"></td>
          <td v-else class="text-center">{{ product?.productPrice }} €</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("date") }}</th>
          <td class="text-center">{{ transformDate }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left inbox">{{ $t("send") }}</th>
          <td v-if="userId == product?.userId" class="text-center"><v-checkbox v-model="productOnline" :hide-details=true></v-checkbox></td>
          <td v-else class="text-center">{{ transformOnline }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("stock") }}</th>
          <td v-if="userId == product?.userId" class="text-center"><input type="number" v-model="productStock" :placeholder="product?.productStock.toString()"></td>
          <td v-else class="text-center">{{ product?.productStock }}</td>
        </tr>
        <v-divider color="#00447d"></v-divider>
        <tr>
          <th class="text-left">{{ $t("rating") }}</th>
          <td class="text-center">{{ product?.productRating }}</td>
        </tr>
      </table>
    </div>
    <div class="containerDetails__contact">
      <h1>{{ $t("contact") }}</h1>
      <v-divider color="#00447d"></v-divider>
      <h4>{{ product?.userEmail }}</h4>
    </div>
    <div v-if="userId == product?.userId" class="containerDetails__buttonModify">
      <v-btn @click="updateProduct" variant="tonal" color="green" rounded="xl" :disabled="hasChanges">{{ $t("modify") }}</v-btn>
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

  table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
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

  tr{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px;
  }

  td{
    display: flex;
    border-style: none;
    min-width: 120px;
    max-width: 120px;
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

  .text-left.inbox{
    min-width: 119px;
  }

  .v-input__control {
    display: flex;
  }

  .v-input--density-default {
    --v-input-control-height: 16px;
    --v-input-padding-top: 16px;
  }

</style>