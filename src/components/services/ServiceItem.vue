<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps < {
  serviceId: number,
  userId: number,
  serviceType: string,
  serviceName: string,
  serviceDescription: string,
  servicePrice: number,
  serviceAvailability: string,
  serviceOnline: boolean,
  serviceRating: number
}>()
  
</script>

<template>
  <div class="servicesContainer">
    <div class="servicesContainer__service">
      <v-card variant="tonal">
        <div class="servicesContainer__image">
          <img src="../../assets/img/ServiceDefault.jpg" alt="Service image">
        </div>
        <div class="servicesContainer__info">
          <v-card>
            <v-card-title>{{ serviceName }}</v-card-title>
            <v-card-subtitle>{{ serviceType }}</v-card-subtitle>
            <div class="servicesContainer__ratingPrice">
              <div class="servicesContainer__price">
                <p>{{ servicePrice }} €</p>
              </div>
              <div class="servicesContainer__rating">
                <p>{{ serviceRating }}<img class="servicesContainer__imgRating" src="../../assets/icons/Icojam-Blue-Bits-Star-rating.256.png" alt="Rating symbol"></p>
              </div>
            </div>
            <v-divider :thickness="3" color="#00447d" inset></v-divider>
            <v-card-actions v-if=" router.currentRoute.value.name !== 'adminServices'">
              <div class="servicesContainer__groupButtons">
                <div class="servicesContainer__button">
                  <RouterLink :to="`/detailsService/${serviceId}`"><v-btn variant="tonal" color="#00447d" rounded="xl">{{ $t("details") }}</v-btn></RouterLink>
                </div>
                <div v-if=" router.currentRoute.value.name === 'dashboardServices'" class="servicesContainer__button">
                  <v-btn variant="tonal" color="green" rounded="xl">{{ $t("modify") }}</v-btn>
                </div>
                <div v-if=" router.currentRoute.value.name === 'dashboardServices'" class="servicesContainer__button">
                  <v-btn variant="tonal" color="#C62828" rounded="xl">{{ $t("delete") }}</v-btn>
                </div>
              </div>
            </v-card-actions>
            <v-card-text v-else>
              <div class="servicesContainer__groupIds">
                <div class="servicesContainer__group">
                  <h2>Service ID</h2>
                  <p>{{ serviceId }}</p>
                </div>
                <div class="servicesContainer__group">
                  <h2>User ID</h2>
                  <p>{{ userId }}</p>
                </div>
              </div>
              <div class="servicesContainer__groupButtons">
                <div class="servicesContainer__detailsButton">
                  <RouterLink :to="`/detailsService/${serviceId}`"><v-btn color="#00447d">{{ $t("details") }}</v-btn></RouterLink>
                </div>
                <div class="servicesContainer__deleteButton">
                  <v-btn color="#C62828">{{ $t("delete") }}</v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
          
        </div>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.servicesContainer {
  margin: 20px;

}

.servicesContainer__service {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #00447d;
  border-radius: 5px;
  max-width: 500px;
}

img {
  width: 50%;
  border: #00447d 1px solid;
  border-radius: 5px;
}

.servicesContainer__image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.servicesContainer__groupIds {
  display: flex;
  justify-content: space-around;
  gap: 40px;
}

.servicesContainer__group {
  display: flex;
  gap: 10px;
}

.servicesContainer__group p{
  font-family: kaushan script;
  font-size: 20px;
  font-weight: bold;
  color: #00447d;
}

.servicesContainer__info {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  gap: 20px;
}

.v-card{
  display: flex;
  flex-direction: column;
  border: 1px solid #00447d;
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

.servicesContainer__ratingPrice{
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding: 10px;
}

.servicesContainer__imgRating{
  width: 20px;
  border: none;
  margin-left: 5px;
}

.servicesContainer__ratingPrice h2{
  font-family: roboto;
  font-size: 20px;
  font-weight: bold;
  color: #00447d;
  line-height: 55px;
}

.servicesContainer__ratingPrice p{
  font-family: roboto;
  font-size: 30px;
  color: #00447d;
  font-weight: bold;
}

.servicesContainer__price, .servicesContainer__rating{
  display: flex;
  gap: 40px;
}

.servicesContainer__button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.v-card-actions{
  display: flex;
  justify-content: center;
  gap: 20px;
}

.servicesContainer__groupButtons{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
</style>