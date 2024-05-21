import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Composer } from 'vue-i18n'
import Cookies from 'js-cookie'


export const useStatusAppStore = defineStore('statusAppStore', () => {
  const locale = ref<string>(Cookies.get('locale') || 'en')

   const deleteLocaleCookies = () => {
     const paths = [
       '/admin',
       '/dashboard',
       '/home',
       '/home/products',
       '/home/services',
       '/dashboard',
       '/dashboard/products/:id',
       '/dashboard/services',
       '/admin',
       '/admin/users',
       '/admin/products',
       '/admin/services',
       '/detailsUser',
       '/detailsUser',
       '/detailsProduct',
       '/detailsService',
       '/register',
       '/login',
       '/notFound',
       '/:pathMatch(.*)*'
     ]

     paths.forEach((path) => {
       Cookies.remove('locale', { path })
     })
   }

  const setLocale = (newLocale: string, i18n: Composer) => {
    locale.value = newLocale;
    i18n.locale.value = locale.value;
    deleteLocaleCookies();
    Cookies.set('locale', locale.value, { path: '/' });
    console.log('Locale:', locale.value);
  }

  return {
    locale,
    setLocale
  }
})