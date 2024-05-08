<script setup lang="ts">
import { useStatusAppStore } from '@/stores/StatusApp';
import { useI18n } from 'vue-i18n'

const { setLocale } = useStatusAppStore();
const i18n = useI18n({ useScope: 'global' });

const setLocaleWithI18n = (locale: string) => setLocale(locale, i18n);



</script>

<template>
  <div class="groupButtons">
    <v-btn size="x-small" color="#00447d" @click="setLocaleWithI18n('en')">EN</v-btn>
    <v-btn size="x-small" color="#00447d" @click="setLocaleWithI18n('es')">ES</v-btn>
  </div>
</template>

<style scoped>
.groupButtons {
  display: flex;
  gap: 5px;
}
</style>