<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/shared/components/layout/Layout.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Layout,
  },
});
</script>

<template>
  <Layout>
    <template #main>
      <p>Welcome to the Home page</p>
    </template>
  </Layout>
</template>
