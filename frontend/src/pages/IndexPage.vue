<template>
  <q-page class="row justify-center items-center">
    <div class="column">
      <div class="row justify-center">
        <h5 class="text-h5 q-my-md">Index Page</h5>
      </div>
      <div class="row">

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

onMounted(() => {
  if (!authStore.user) {
    router.push('/login')
  }
  else {
    router.push('/dashboard')
  }
})

</script>
