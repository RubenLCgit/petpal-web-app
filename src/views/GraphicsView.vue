<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useServiceStore } from '../stores/serviceStore'
import { useProductStore } from '../stores/productStore';
import { Chart, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';

const { t, locale } = useI18n();
const serviceStore = useServiceStore();
const productStore = useProductStore();

const { numberOfServices } = storeToRefs(serviceStore);
const { numberOfProducts } = storeToRefs(productStore);

const { getServices } = serviceStore;
const { getProducts } = productStore;

let translationProducts = computed(() => t('products'));

let translationServices = computed(() => t('services'));

Chart.register(BarController, CategoryScale, LinearScale, BarElement);
  
const chart = ref<HTMLCanvasElement | null>(null);

let myChart: Chart | null = null

const countAll = async () => {
  await getServices();
  await getProducts();
  if (chart.value) {
    const ctx = chart.value.getContext('2d');
    if (ctx) {
      if (myChart) {
        myChart.destroy();
      }
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [translationProducts.value, translationServices.value],
          datasets: [{
            label: '# de elementos',
            data: [numberOfProducts.value, numberOfServices.value],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}

countAll();

watch(locale, () => {
  translationProducts = computed(() => t('products'));
  translationServices = computed(() => t('services'));
  countAll();
});
  
</script>

<template>
  <div class="graphContainer">
    <h1>{{ $t("graphicMessage") }}</h1>
    <canvas ref="chart" ></canvas>
  </div>
</template>

<style scoped>
  .graphContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 50px;
  }

  canvas {
    width: 100%;
    margin: 20px;
    padding: 20px;
    border: #00447d 2px solid;
    max-width: 800px;
    max-height: 500px
  }

  h1 {
    color: #00447d;
    font-family: roboto;
    text-align: center;
  }
</style>