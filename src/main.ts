import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'

import App from './App.vue'
import { createI18n } from 'vue-i18n'
import en from './locale/en.json'
import es from './locale/es.json'
import router from './router'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(createPinia())

import { useStatusAppStore } from './stores/StatusApp';

const statusAppStore = useStatusAppStore();

const { locale } = storeToRefs(statusAppStore);

const i18n = createI18n({
  legacy: false,
  locale: locale.value,
  fallbackLocale: 'es',
  messages: {
    en: en,
    es: es
  }
})


app.use(router)
app.use(vuetify)
app.use(i18n)
app.mount('#app')
