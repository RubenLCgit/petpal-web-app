import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Service } from '@/interfaces/service'

export const useServiceStore = defineStore('serviceStore', () => {

  const services = ref<Service[]>([]);
  const service = ref<Service>();
  const numberOfServices = ref<number>(0);

  const getServices = async () => {
    if (services.value.length > 0) {
      return
    }
    const res = await fetch('https://localhost:7207/Service')
    const data = await res.json()
    services.value = data
    numberOfServices.value = data.length
  }

  const getService = async (idService: string) => {
    const res = await fetch(`https://localhost:7207/Service/${idService}`)
    const data = await res.json()
    service.value = data
  }

  return {
    services,
    service,
    numberOfServices,
    getServices,
    getService
  }
})
