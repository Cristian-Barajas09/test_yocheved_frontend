<template>
  <router-link :to="to" class="p-2">
    <slot></slot>
    <slot name="submenu"></slot>
  </router-link>
</template>
<script lang="ts">
import { type PropType } from "vue";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "NavbarItemComponent",
  components: {
    RouterLink,
  },
  props: {
    to: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>
