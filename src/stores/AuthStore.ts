import { ref } from 'vue';
import { defineStore } from 'pinia';
import { jwtDecode, type JwtPayload as DefaultJwtPayload } from 'jwt-decode';

export type JwtPayload = DefaultJwtPayload & {
  role: string
  unique_name: string
  nameid: string
}

export const useAuthUser = defineStore('authStore', () => {
  const jwtToken = ref<string | null | undefined>(null);
  const userRole = ref<string | null | undefined>(null);
  const userName = ref<string | null | undefined>(null);
  const userId = ref<string | null | undefined>(null);

  const errorMessages = ref<string | null | undefined>('');
  const emailError = ref<boolean>(false);
  const registrationSuccess = ref<boolean>(false);
  const accountError = ref<boolean>(false);
  const loginSuccess = ref<boolean>(false);

  const registerUser = async (userData: {
    userName: string
    userEmail: string
    userPassword: string
    userSupplier: boolean
  }) => {
    errorMessages.value = ''
    emailError.value = false
    registrationSuccess.value = false
    try {
      const response = await fetch('http://localhost:7216/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        if (response.status === 400) {
          emailError.value = true
          errorMessages.value = 'Email already exists'
        } else {
          errorMessages.value = 'Registration failed'
        }
        throw new Error('Registration failed')
      }

      const data = await response.json()
      registrationSuccess.value = true
      return data
    } catch (error) {
      errorMessages.value = (error as Error).message
      throw error
    }
  };

  const loginUser = async (userData: {
    userName: string
    userPassword: string
  }) => {
    errorMessages.value = '';
    accountError.value = false;
    loginSuccess.value = false;
    try {
      const response = await fetch('http://localhost:7216/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        accountError.value = true
        if (response.status === 400) {
          errorMessages.value = 'Invalid name or password'
        } else {
          errorMessages.value = 'Login failed'
        }
        throw new Error('Login failed')
      }

      const data = await response.json()
      loginSuccess.value = true;
      jwtToken.value = data.token;
      const decoded = jwtDecode<JwtPayload>(data.token);
      userRole.value = decoded.role;
      userName.value = decoded.unique_name;
      userId.value = decoded.nameid;
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', decoded.role);
      localStorage.setItem('userName', decoded.unique_name);
      localStorage.setItem('nameid', decoded.nameid)
      
      return data
    } catch (error) {
      accountError.value = true;
      errorMessages.value = (error as Error).message
      throw error
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    localStorage.removeItem('nameid')
    jwtToken.value = null
    userRole.value = null
    userName.value = null
    userId.value = null
    loginSuccess.value = false
    userName.value = null
  };

  const updateAuthStatus = () => {
    jwtToken.value = localStorage.getItem('token')
    const decoded = jwtToken.value ? jwtDecode<JwtPayload>(jwtToken.value) : null
    userRole.value = decoded?.role
    userName.value = decoded?.unique_name
    userId.value = decoded?.nameid
    if (jwtToken.value) {
      loginSuccess.value = true
    }
  };

  return {
    errorMessages,
    emailError,
    accountError,
    registrationSuccess,
    loginSuccess,
    jwtToken,
    userRole,
    userName,
    userId,
    registerUser,
    loginUser,
    logoutUser,
    updateAuthStatus
    }
})
