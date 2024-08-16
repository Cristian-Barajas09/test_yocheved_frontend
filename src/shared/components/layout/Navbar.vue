<template>
  <nav class="">
    <div class="flex gap-2">
      <nav-item v-for="item of navItems" :to="item.path" :key="item.path">
        {{ item.name }}
      </nav-item>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavItem from "@/shared/components/layout/NavbarItem/index.vue";

export default defineComponent({
  name: "NavbarComponent",
  components: {
    NavItem,
  },
  data() {
    return {
      navItems: [
        {
          name: "Dashboard",
          path: "/",
        },
        {
          name: "Students",
          path: "/students",
        },
        {
          name: "Sessions",
          path: "/sessions",
        },
        {
          name: "Templates",
          path: "/templates",
        },
      ],
    };
  },
});
</script>
