<template>
  <div>
    <h1>Session Add</h1>
    <div>
      <!--
        inputs
        {
    "session_start": "2024-08-11",
    "time": "11:00",
    "duration": 15,
    "student_id": 1
}
        -->

      <form @submit.prevent="onSubmit">
        <label for="session_start">Session Start</label>
        <input
          type="date"
          id="session_start"
          name="session_start"
          v-model="session_start"
        />

        <label for="time">Time</label>
        <input type="time" id="time" name="time" v-model="time" />

        <label for="duration">Duration</label>
        <input
          type="number"
          id="duration"
          name="duration"
          v-model="duration"
          min="5"
          max="15"
        />

        <div>
          <span @click="toggleStudents">Select Student</span>
          <span>{{ selectStudent?.name }}</span>
          <Modal :is-open="studentModal" @close="studentModal = false">
            <student-select @select="getSelectedStudent" />
          </Modal>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/shared/components/Modal/index.vue";
import StudentSelect from "@/modules/students/components/StudentSelect/index.vue";

import { type Student } from "../../types/sessions.type";
import { useSessionStore } from "../../store/session.store";
import { useGlobalStore } from "@/shared/store/global";
export default defineComponent({
  name: "SessionAdd",
  components: {
    Modal,
    StudentSelect,
  },
  data() {
    return {
      session_start: "",
      time: "",
      duration: "0",
      selectStudent: null as Student | null,
      studentModal: false,
    };
  },
  emits: ["session-added"],
  methods: {
    getSelectedStudent(student: Student) {
      this.selectStudent = student;
      this.studentModal = false;
    },

    toggleStudents() {
      this.studentModal = true;
    },

    async onSubmit() {
      if (!this.selectStudent) {
        console.error("Select a student");
        return;
      }

      const sessionStore = useSessionStore();
      const globalStore = useGlobalStore();

      try {
        globalStore.setLoading(true);
        await sessionStore.createSession({
          session_start: this.session_start,
          time: this.time,
          duration: parseInt(this.duration),
          student_id: this.selectStudent.id,
        });

        this.$emit("session-added");
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.setLoading(false);
      }
    },
  },
});
</script>
