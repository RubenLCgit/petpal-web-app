import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/interfaces/user';

export const useUserStore = defineStore('userStore', () => {
  
  const users = ref<User[]>([]);
  const user = ref<User>();
  const numberOfUsers = ref<number>(0);

  const jwtToken = ref<string | null>();

  const getUsers = async () => {
    const res = await fetch('https://localhost:7207/User', {
      headers: {
        Authorization: `Bearer ${jwtToken.value}`
      }
    })
    const data = await res.json();
    users.value = data;
    numberOfUsers.value = data.length;
  }

    const getUser = async (idUser: string) => {
      const res = await fetch(`https://localhost:7207/User/${idUser}`, {
        headers: {
          Authorization: `Bearer ${jwtToken.value}`
        }
      })
      const data = await res.json()
      user.value = data
    } 

  const updateToken = () => {
    jwtToken.value = localStorage.getItem('token'); 
  }
  
  return {
    users,
    user,
    numberOfUsers,
    getUsers,
    getUser,
    jwtToken,
    updateToken
  };
});