<template>
  <div class="flex">
    <div v-for="item in totalPage" :key="item" class="">
      <button
        @click="() => changePage(item)"
        class="w-full py-1 px-3 border"
        :class="{
          'bg-blue-300': page === item,
          'rounded-l-lg': item === 1,
          'rounded-r-lg': item === totalPage,
        }"
        type="button"
      >
        <span>{{ item }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "PaginationComponent",
  props: {
    page: {
      type: Number as PropType<number>,
      required: true,
    },
    totalPage: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  emits: ["change-page"],

  methods: {
    changePage(page: number) {
      this.$emit("change-page", page);
    },
  },
});
</script>
