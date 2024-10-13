<template>
  <q-page class="row justify-center items-center">
    <div class="column">
      <div class="row justify-center">
        <h5 class="text-h5 q-my-md">Register to My App</h5>
      </div>
      <div class="row">
        <q-form ref="formEl" class="q-gutter-md" @submit.prevent="register">
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-input ref="nameInput" autofocus class="q-mb-lg" square filled v-model="form.name" label="Name" lazy-rules
                :error="errors.name != ''" :error-message="errors.name" :rules="[
                  (val) => (val && val.length > 0) || 'Please enter your name.',
                ]" />
              <q-input ref="emailInput" class="q-mb-lg" square filled v-model="form.email" label="Email" lazy-rules
                :error="errors.email != ''" :error-message="errors.email" :rules="[
                  (val) => validateEmail(val) || 'Must be a valid email.',
                ]" />
              <q-input ref="passwordInput" square filled v-model="form.password" type="password" :error-message="errors.password" label="Password" lazy-rules :rules="[
                (val) => (val && val.length >= 8) || 'Please enter password at least 8 character',
              ]" />
              <q-input square filled v-model="form.password_confirmation" type="password" label="Confirm Password" :error-message="errors.password_confirmation"  lazy-rules :rules="[
                () => validatePassword() || 'The password that you confirmed did not match',
              ]" />
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn type="submit" unelevated color="primary" size="lg" class="full-width" label="Register" />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <p class="text-grey-6">
                Already reigistered?
                <router-link to="/login">Login</router-link>
              </p>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from 'quasar';
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/auth-store";

const router = useRouter();
const authStore = useAuthStore();

const $q = useQuasar();
let formEl = ref(null);
let emailInput = ref(null);

let errors = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

let form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

async function register() {
  $q.loading.show({
    delay: 100 // ms
  })
  errors.value.email = '';
  errors.value.password = '';

  await authStore.getToken();
  await axios
    .post("/register", {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation,
    })
    .then(function (response) {
      if (response.status == 200) {
        $q.notify({ message: 'Registration success!', color: 'green' });
        router.push('/dashboard');
      }
    })
    .catch(function (e) {
      $q.notify({ message: 'Registration failed!', color: 'red' });
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

function validatePassword() {
  return form.value.password == form.value.password_confirmation;
}

</script>

<style>
.q-card {
  width: 360px;
}
</style>
