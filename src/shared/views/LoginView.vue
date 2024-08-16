<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="flex gap-2 flex-col items-center justify-center shadow p-2">
      <h1>Login</h1>
      <form @submit.prevent="login" class="flex flex-col gap-4">
        <input
          class="border border-b-black p-1"
          type="email"
          v-model="username"
          placeholder="Email"
        />
        <input
          class="border border-b-black outline-none p-1"
          type="password"
          v-model="password"
          placeholder="Password"
        />
        <button class="bg-black text-white p-1 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { login } from "@/shared/services/auth.service";

export default defineComponent({
  components: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      login(this.username, this.password)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
</script>
