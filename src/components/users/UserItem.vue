<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  id: number,
  name: string,
  email: string,
  registerDate: string,
  supplier: boolean,
  rating: number,
  productList: number[],
  serviceList: number[]
}>()

const isSupplier = computed(() => (props.supplier ? 'yes' : 'no'))

const transformDate = computed(() => {
  const date = new Date(props.registerDate)
  return date.toLocaleDateString()
})
</script>

<template>
  <div class="mainContainer">
    <div class="usersContainer">
      <v-card class="principalCard">
        <div class="principalCard__title1">
          <v-card-title>
            <h6>ID: {{ id }}</h6>
          </v-card-title>
          <v-card-title>
            <h6>{{ $t("name") }}: {{ name }}</h6>
          </v-card-title>
        </div>
        <div class="principalCard__title2">
          <v-card-title>
            <h6>{{ $t("email") }}: {{ email }}</h6>
          </v-card-title>
          <v-divider class="border-opacity-50" color="#00447d"></v-divider>
          <v-card-title>
            <h6>{{ $t("supplier") }}: {{ $t(isSupplier) }}</h6>
          </v-card-title>
          <v-divider class="border-opacity-50" color="#00447d"></v-divider>
          <v-card-title>
            <h6>{{ $t("account_creation_date") }}: {{ transformDate }}</h6>
          </v-card-title>
        </div>
        <v-card-text>
          <div class="principalCard__supplier">
            <div class="principalCard__group">
              <h2>{{ $t("products") }}</h2>
              <p>{{ productList.length }}</p>
            </div>
            <div class="principalCard__group">
              <h2>{{ $t("services") }}</h2>
              <p>{{ serviceList.length }}</p>
            </div>
          </div>
        </v-card-text>
        <v-card-title>
          <h6 class="principalCard__rating">{{ $t("rating") }}: {{ rating }}</h6>
        </v-card-title>
          <div class="principalCard__groupButtons">
            <div class="principalCard__detailsButton">
              <RouterLink :to="`/detailsUser/${id}`"><v-btn color="#00447d">{{ $t("details") }}</v-btn></RouterLink>
            </div>
            <div class="principalCard__deleteButton">
              <v-btn color="#C62828">{{ $t("delete") }}</v-btn>
            </div>
          </div>
      </v-card>
    </div>
  </div>
  
</template>

<style scoped>

.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}

.usersContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 80%;
  min-width: 400px;
}

.principalCard {
  width: 80%;
  margin: 10px;
}

.principalCard__title1 {
  display: flex;
  justify-content: space-between;
  background-color: #00447d;
  color: white;
}

.principalCard__title2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #cbcbcb;
  color: #00447d;
}

.principalCard__supplier {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.principalCard__group {
  display: flex;
  justify-content: space-between;
  border: #00447d 1px solid;
  padding: 5px;
}

.principalCard__group p {
  font-family: kaushan script;
  font-size: 20px;
  margin-right: 5px;
}

.principalCard__rating {
  font-family: roboto;
  font-size: 20px;
  text-align: center;
}

.principalCard__groupButtons {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin: 10px;
}
</style>
