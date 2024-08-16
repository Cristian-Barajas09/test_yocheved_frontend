<template>
  <div>
    <section>
      <slot></slot>
    </section>
  </div>
</template>

<script lang="ts">
import { type Student } from "@/modules/students/types/students.types";
import { type PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    loading: Boolean,
    students: {
      type: Array as PropType<Student[]>,
      default: () => [],
    },
    redirectToStudentDetails: {
      type: Function,
      required: true,
    },
  },
});
</script>
