import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  // getters: {
  //   user: (state) => state.user,
  // },
  actions: {
    async logout() {
      await axios.post('/logout');
      this.user = null;
    },
    async getUser() {
      await axios.get('/api/user')
      .then((response) => {
        if (response.data) {
          this.user = response.data;
        }
      });
      return this.user;
    },
    async getToken() {
      await axios.get("/sanctum/csrf-cookie");
    },
  },
});
