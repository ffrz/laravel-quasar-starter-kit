<template>
  <q-page class="row ">
    <div class="column full-width">
      <div class="q-ma-lg">
        <div v-if="authStore.user">
          <h4 class="full-width">Hello, {{ authStore.user.email }}</h4>
          <q-btn class="full-width" color="primary" label="Logout" @click="logout()" />
        </div>
        <div v-else>
          <router-link to="/login">Please Login</router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";

defineOptions({
  name: "DashboardPage",
});

const $q = useQuasar();
const authStore = useAuthStore()
const router = useRouter();

onMounted(() => {
  authStore.getUser();
});

const logout = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to log out?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    $q.loading.show({
      delay: 100 // ms
    });
    authStore.logout();
    $q.notify({ message: 'Logout success!', color: 'green' });
    $q.loading.hide();
    router.push('/login');
  });
}

</script>
