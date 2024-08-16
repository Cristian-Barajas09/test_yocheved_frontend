<template>
  <div v-if="student" class="flex justify-between">
    <section>
      <h1>Student: {{ studentFullName }}</h1>
      <p>{{ student.email }}</p>
      <p>{{ student.birth_date }}</p>
    </section>
    <section class="">
      <button class="bg-black p-1 rounded text-white" @click="toggleModal">
        show student's availability
      </button>
      <Modal :is-open="openModal" @close="openModal = false">
        <ShowStudentAvailability />
      </Modal>
    </section>
  </div>

  <div v-else>
    <p>Student not found</p>
  </div>
</template>

<script lang="ts">
import { type PropType } from "vue";
import { defineComponent } from "vue";
import { type Student } from "../../types/students.types";

import Modal from "@/shared/components/Modal/index.vue";
import ShowStudentAvailability from "../ShowStudentAvailability/index.vue";

export default defineComponent({
  name: "StudentDetails",
  data() {
    return {
      openModal: false,
    };
  },
  components: {
    Modal,
    ShowStudentAvailability,
  },
  props: {
    student: {
      type: Object as PropType<Student | null>,
    },
  },
  methods: {
    toggleModal() {
      this.openModal = true;
    },
  },
  computed: {
    studentFullName() {
      if (!this.student) return "";

      return `${this.student.name} ${this.student.middle_name} ${this.student.last_name} `;
    },
  },
});
</script>
