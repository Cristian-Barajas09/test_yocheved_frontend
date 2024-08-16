<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  components: {
    "router-view": RouterView,
  },
});
</script>
