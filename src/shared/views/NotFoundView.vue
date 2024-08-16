<script lang="ts">
import Layout from "@/shared/components/layout/Layout.vue";
import Navbar from "@/shared/components/layout/Navbar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFoundView",
  components: {
    Layout,
    Navbar,
  },
});
</script>

<template>
  <Layout>
    <template #header>
      <Navbar />
    </template>
    <template #main>
      <p>Page not found</p>
    </template>
  </Layout>
</template>
