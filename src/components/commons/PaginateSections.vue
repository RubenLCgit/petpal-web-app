<script setup lang="ts">
import { ref, computed, type PropType } from 'vue';

const props = defineProps({
    arrayElemenst : Array as PropType<Array<any>>
});

const emit = defineEmits (['nextElement', 'previusElement']);

const elementXPage = 3;
const initElement = ref(0);

const endElement = ref(elementXPage);

const statePrevius = computed (() => initElement.value === 0);

const stateNext = computed (() => endElement.value >= props.arrayElemenst!.length);

const nextElement = () => {
  if (endElement.value < props.arrayElemenst!.length) {
    initElement.value += elementXPage;
    endElement.value += elementXPage;
  }
  emit('nextElement', initElement.value, endElement.value);
};

const previusElement = () => {
  if (initElement.value > 0) {
    initElement.value -= elementXPage;
    endElement.value -= elementXPage;
  }
  emit('previusElement', initElement.value, endElement.value);
};
</script>

<template>
  <div class="button-group">
    <v-row justify="center">
      <v-btn @click="previusElement" :disabled="statePrevius" color="grey">{{ $t("previous") }}</v-btn>
      <v-btn @click="nextElement" :disabled="stateNext" color="#00447d">{{ $t("next") }}</v-btn>
    </v-row>
  </div>
</template>

<style scoped>
  
  .button-group {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
  
  .v-btn {
    max-width: 100px;
    margin: 10px;
  }
</style>