<script setup lang="ts">
import { ref } from 'vue';
import { useAuthUser } from '../stores/AuthStore';
import { storeToRefs } from 'pinia';
import type { UserLogin } from '@/interfaces/user';
import { useRouter } from 'vue-router';

const variant = 'elevated';
const color = ref('indigo');
const authUser = useAuthUser();
const router = useRouter();

const { loginUser } = authUser;

const { accountError } = storeToRefs(authUser);
const { loginSuccess } = storeToRefs(authUser);

const user = ref<UserLogin>({
  userName: '',
  userPassword: ''
});

const valid = ref(false);

const rules = {
  required: (value: string) => !!value || 'Required.',
  password: (value: string) => {
    const pattern = /^.{4,}$/;
    return pattern.test(value) || 'The password must contain at least 4 or more characters.';
  }
};

const loginAndRedirect = async (user: UserLogin) => {
  try {
    await loginUser(user);
  } catch (error) {
    console.error('User or password incorrect!');
  }
  finally {
    if (!accountError.value) {
      router.push('/');
    }
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
          :title="$t('login')"
          :color="color"
          :variant="variant"
          class="card-title"
        >
        <v-divider color="white"></v-divider>
          <v-card-item>
            <v-container>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="user.userName"
                  :label="$t('name')"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="user.userPassword"
                  :label="$t('password')"
                  :rules="[rules.required, rules.password]"
                  type="password"
                ></v-text-field>
                <div class="button-loggin">
                  <v-btn
                    @click="loginAndRedirect(user)"
                    :disabled="!valid"
                  >
                    {{ $t("login") }}
                  </v-btn>
                </div>
              </v-form>
            </v-container>
          </v-card-item>
        </v-card>
      </v-col>
      <v-snackbar
        class="center-snackbar"
        v-model="loginSuccess"
        color="success"
        top="true"
      >
        {{ $t("login_successful") }}
      </v-snackbar>
      <v-snackbar
        class="center-snackbar"
        v-model="accountError"
        color="error"
        top="true"
      >
        {{ $t("login_error") }}
      </v-snackbar>
    </v-app>
  </div>
</template>

<style scoped>

  

  .button-loggin {
    display: flex;
    justify-content: center;
  }

  .card-title {
    margin-top: 10%;
    text-align: center;
  }

  .center-snackbar {
    position: fixed;
    bottom: 80%;
    left: 50%;
    transform: translate(-50%, 50%);
  }
</style>