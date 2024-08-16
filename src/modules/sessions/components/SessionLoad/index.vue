<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <div>
      <span @click="studentModal = true">Select Student</span>
      <span>{{ selectStudent?.name }}</span>
    </div>
    <Modal :is-open="studentModal" @close="studentModal = false">
      <StudentSelect @select="getSelectedStudent" />
    </Modal>

    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSessionStore } from "../../store/session.store";

import Modal from "@/shared/components/Modal/index.vue";
import StudentSelect from "@/modules/students/components/StudentSelect/index.vue";
import type { Student } from "../../types/sessions.type";

export default defineComponent({
  name: "SessionLoad",
  components: {
    Modal,
    StudentSelect,
  },
  data() {
    return {
      file: null as File | null,
      selectStudent: null as Student | null,
      studentModal: false,
    };
  },
  emits: ["close"],
  methods: {
    handleFileUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        this.file = file;
      }
    },

    getSelectedStudent(student: Student) {
      this.selectStudent = student;
      this.studentModal = false;
    },

    async uploadFile() {
      if (!this.selectStudent) {
        console.error("Select a student");
        return;
      }
      if (this.file) {
        const sessionStore = useSessionStore();

        try {
          await sessionStore.loadSessionByDocx(
            this.file,
            this.selectStudent.id
          );
          this.$emit("close");
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
});
</script>
