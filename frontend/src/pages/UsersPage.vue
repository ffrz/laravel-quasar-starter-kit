<template>
  <q-page class="row ">
    <div class="column full-width">
      <div class="q-ma-lg">
        <div>
          <h4 class="full-width q-my-xs">Users</h4>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth-store';
import { onMounted, ref } from 'vue';

defineOptions({
  name: "DashboardPage",
});

const authStore = useAuthStore()

onMounted(() => {
  authStore.getUser();
});

</script>
