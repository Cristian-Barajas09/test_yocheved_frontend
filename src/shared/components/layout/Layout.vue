<template>
  <div class="w-full h-screen">
    <header class="bg-[#36aecf] p-2 flex text-white w-full justify-between">
      <div class="flex justify-center items-center gap-10">
        <h1 class="text-center">Student Dashboard</h1>
        <div class="p-2 flex">
          <Navbar />
          <button @click="logout">Logout</button>
        </div>
      </div>
    </header>

    <main class="m-4 p-5">
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/shared/components/layout/Navbar.vue";
import { logout } from "@/shared/services/auth.service";
export default defineComponent({
  name: "layout-component",
  components: {
    Navbar,
  },
  methods: {
    logout() {
      logout();
      this.$router.push({ name: "login" });
    },
  },
});
</script>
