<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const router = useRouter();
const productStore = useProductStore();

const { deleteProduct } = productStore;

const props = defineProps <{
  productId: number,
  userId: number,
  productType: string,
  productName: string,
  productDescription: string,
  productPrice: number,
  productAvailability: string,
  productOnline: boolean,
  productStock: number,
  productRating: number
}>()

const deleteProductAndRedirect = async (productId: string) => {
  await deleteProduct(productId);
  if(router.currentRoute.value.name === 'dashboardProducts'){
    router.push(`/dashboard/products/${props.userId}`);
  } else if(router.currentRoute.value.name === 'adminProducts'){
    router.push('/admin');
  } else {
    router.push('/');
  }
}


</script>

<template>
  <div class="productsContainer">
    <div class="productsContainer__product">
      <div class="productsContainer__image">
        <img src="../../assets/img/ProductDefault.jpg" alt="Product image">
      </div>
      <div class="productsContainer__info">
        <v-card>
          <v-card-title>{{ productName }}</v-card-title>
          <v-card-subtitle>{{ productType }}</v-card-subtitle>
          <div class="productsContainer__ratingPrice">
            <div class="productsContainer__price">
              <p>{{ productPrice }} €</p>
            </div>
            <div class="productsContainer__rating">
              <p>{{ productRating }}<img class="productsContainer__imgRating" src="../../assets/icons/Icojam-Blue-Bits-Star-rating.256.png" alt="Rating symbol"></p>
            </div>
          </div>
          <v-divider :thickness="3" color="#00447d" inset></v-divider>
          <v-card-actions v-if=" router.currentRoute.value.name !== 'adminProducts'">
            <div class="productsContainer__groupButtons">
              <div class="productsContainer__button">
                <RouterLink :to="`/detailsProduct/${productId}`"><v-btn variant="tonal" color="#00447d" rounded="xl">{{ $t("details") }}</v-btn></RouterLink>
              </div>
              <div v-if=" router.currentRoute.value.name === 'dashboardProducts'" class="productsContainer__button">
                <v-btn @click="deleteProductAndRedirect(productId.toString())" variant="tonal" color="#C62828" rounded="xl">{{ $t("delete") }}</v-btn>
              </div>
            </div>
            
          </v-card-actions>
          <v-card-text v-else>
            <div class="productsContainer__groupIds">
              <div class="productsContainer__group">
                <h2>{{ $t("productId") }}</h2>
                <p>{{ productId }}</p>
              </div>
              <div class="productsContainer__group">
                <h2>{{ $t("userId") }}</h2>
                <p>{{ userId }}</p>
              </div>
            </div>
            <div class="productsContainer__groupButtons">
              <div class="productsContainer__detailsButton">
                <RouterLink :to="`/detailsProduct/${productId}`"><v-btn color="#00447d">{{ $t("details") }}</v-btn></RouterLink>
              </div>
              <div class="productsContainer__deteButton">
                <v-btn @click="deleteProductAndRedirect(productId.toString())" color="#C62828">{{ $t("delete") }}</v-btn>
              </div>
            </div>

          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped>

.productsContainer {
  margin: 20px;
}

.productsContainer__product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 1rem;
  background-color: #00447d;
  border-radius: 5px;
  max-width: 500px;
}

img {
  width: 60%;
  border: #00447d 1px solid;
  border-radius: 5px;
}

.productsContainer__image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.productsContainer__groupIds {
  display: flex;
  gap: 40px;
}

.productsContainer__group {
  display: flex;
  gap: 10px;
}

.productsContainer__group p{
  font-family: kaushan script;
  font-size: 20px;
  font-weight: bold;
  color: #00447d;
}

.productsContainer__info {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  gap: 20px;
}
.v-card{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.v-card-title {
  color: #00447d;
  font-family: Roboto;
  font-size: 30px;
  font-weight: bold;
  text-decoration: underline;
}

.v-card-subtitle {
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
}

.productsContainer__ratingPrice{
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding: 10px;
}

.productsContainer__imgRating{
  width: 20px;
  border: none;
  margin-left: 5px;
}

.productsContainer__ratingPrice h2{
  font-family: roboto;
  font-size: 20px;
  font-weight: bold;
  color: #00447d;
  line-height: 55px;
}

.productsContainer__ratingPrice p{
  font-family: roboto;
  font-size: 30px;
  color: #00447d;
  font-weight: bold;
}

.productsContainer__button{
  display: flex;
  justify-content: center;
  align-items: center;
 
}

.v-card-actions{
  display: flex;
  justify-content: center;
  gap: 20px;
}

.productsContainer__groupButtons{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

</style>