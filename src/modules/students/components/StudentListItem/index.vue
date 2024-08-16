<template>
  <div
    @click="() => redirectToStudentDetails(student.id)"
    class="cursor-pointer shadow p-2 m-2"
  >
    {{ fullName }}
  </div>
</template>

<script lang="ts">
import { type Student } from "@/modules/students/types/students.types";
import { type PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "StudentListItem",
  props: {
    student: {
      type: Object as PropType<Student>,
      required: true,
    },
    redirectToStudentDetails: {
      type: Function,
      required: true,
    },
  },

  computed: {
    fullName(): string {
      return `${this.student.name} ${this.student.last_name}`;
    },
  },
});
</script>
