<script setup lang="ts">
import { ref } from 'vue';
import { useAuthUser } from '../stores/AuthStore';
import { storeToRefs } from 'pinia';
import type { UserRegister } from '@/interfaces/user';
import { useRouter } from 'vue-router';

const variant = 'elevated';
const color = ref('indigo');
const authUser = useAuthUser();
const router = useRouter();

const { registerUser } = authUser;
const { loginUser } = authUser;

const { emailError } = storeToRefs(authUser);
const { registrationSuccess } = storeToRefs(authUser);

const user = ref<UserRegister>({
  userName: '',
  userEmail: '',
  userPassword: '',
  userSupplier: false
});

const valid = ref(false);

const rules = {
  required: (value: string) => !!value || 'Required.',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || 'Invalid e-mail.';
  }
};

const registerAndRedirect = async (user: UserRegister) => {
  try {
    await registerUser(user);
    var user1 = {
      userName: user.userName,
      userPassword: user.userPassword
    };
    await loginUser(user1);
    router.push('/');
  } catch (error) {
    console.error("Error during registration or login:", error);
  }
};

</script>

<template>
  <div class="FormContainer">
    <v-app>
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          title="Formulario de registro"
          :color="color"
          :variant="variant"
          class="mx-auto"
        >
        <v-divider color="white"></v-divider>
          <v-card-item>
            <v-container>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="user.userName"
                  label="Name"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="user.userEmail"
                  label="Email"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-text-field
                  v-model="user.userPassword"
                  label="Password"
                  :rules="[rules.required]"
                  type="password"
                ></v-text-field>
                <v-checkbox
                  v-model="user.userSupplier"
                  label="Are you a supplier?"
                ></v-checkbox>
              </v-form>
            </v-container>
          </v-card-item>

          <v-card-actions>
            <v-btn variant="tonal" :disabled="!valid" @click="registerAndRedirect(user)">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-snackbar
        class="center-snackbar"
        v-model="emailError"
        :timeout="3000"
        color="info"
      >
        Email already in use
      </v-snackbar>

      <v-snackbar
        class="center-snackbar"
        v-model="registrationSuccess"
        :timeout="3000"
        color="success"
      >
        Successful registration
      </v-snackbar>
    </v-app>
  </div>
</template>

<style scoped>
  .v-card {
    text-align: center;
  }

  .v-card-actions {
    justify-content: center;
    margin-bottom: 20px;
  }

  .center-snackbar {
    position: fixed;
    bottom: 80%;
    left: 50%;
    transform: translate(-50%, 50%);
  }
</style>