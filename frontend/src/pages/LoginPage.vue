<template>
  <q-page class="row justify-center items-center">
    <div class="column">
      <div class="row justify-center">
        <h5 class="text-h5 q-my-md">Login to My App</h5>
      </div>
      <div class="row">
        <q-form ref="formEl" class="q-gutter-md" @submit.prevent="login">
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-input ref="emailInput" class="q-mb-lg" square filled v-model="form.email" label="Email" lazy-rules
                :error="errors.email != ''" :error-message="errors.email" :rules="[
                  (val) => validateEmail(val) || 'Must be a valid email.',
                ]" />
              <q-input square filled v-model="form.password" type="password" label="Password" lazy-rules :rules="[
                (val) => (val && val.length > 0) || 'Please enter password',
              ]" />
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn type="submit" unelevated color="primary" size="lg" class="full-width" label="Login" />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <p class="text-grey-6">
                Not reigistered?
                <router-link to="/register">Create an Account</router-link>
              </p>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useQuasar } from 'quasar';
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/auth-store";

const router = useRouter();
const authStore = useAuthStore();

defineOptions({
  name: "LoginPage",
});

const $q = useQuasar();
let formEl = ref(null);
let emailInput = ref(null);
let errors = ref({
  email: '',
  password: '',
})

let form = ref({
  email: '',
  password: '',
  remember: false,
});

onMounted(() => {
  authStore.getUser().then((user) => {
    if (user) {
      router.push('/dashboard');
    }
  });
})

async function login() {
  $q.loading.show({
    delay: 100 // ms
  })
  errors.value.email = '';
  errors.value.password = '';

  await authStore.getToken();
  await axios
    .post("/login", {
      email: form.value.email,
      password: form.value.password,
    })
    .then(function (response) {
      if (response.status == 200) {
        $q.notify({ message: 'Login Success!', color: 'green' });
        router.push('/dashboard');
      }
    })
    .catch(function (e) {
      $q.notify({ message: 'Login Failed!', color: 'red' });
      if (e.response) {
        errors.value.email = e.response.data.message
        emailInput.value.focus();
        emailInput.value.select();
      }
    })
    .finally(function () {
      $q.loading.hide();
    });
}

function validateEmail(email) {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

</script>

<style>
.q-card {
  width: 360px;
}
</style>
