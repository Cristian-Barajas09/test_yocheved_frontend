<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
      <div class="flex">
        <div class="flex flex-col gap-2">
          <label>Student </label>
          <button
            class="border border-gray-400 rounded py-1 w-48"
            type="button"
            @click="openModal = true"
          >
            {{ student ? student.name : "Select student" }}
          </button>

          <Modal :is-open="openModal" @close="openModal = false">
            <student-select @select="selectedStudent" />
          </Modal>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <label for="">from date</label>
          <input
            class="border border-gray-400 rounded py-1 px-1 w-48"
            v-model="fromDate"
            type="date"
            placeholder="Choose date"
          />
        </div>
        <div class="flex flex-col">
          <label for="">to date</label>
          <input
            class="border border-gray-400 rounded py-1 px-1 w-48"
            v-model="toDate"
            type="date"
            placeholder="Choose date"
          />
        </div>
      </div>

      <div class="flex">
        <div class="flex flex-col">
          <label for="">Split session in minutes</label>
          <select
            class="border border-gray-400 rounded py-1 w-48 px-1"
            name=""
            id=""
            v-model="splitSessionInMinutes"
          >
            <option value="15">15</option>
            <option value="10">10</option>
            <option value="5">5</option>
            <option value="2">2</option>
          </select>
        </div>
        <div></div>
      </div>

      <div class="flex justify-end">
        <button type="submit" class="p-1 bg-black text-white rounded">
          Generate report
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/shared/components/Modal/index.vue";
import StudentSelect from "@/modules/students/components/StudentSelect/index.vue";
import type { Student } from "../../types/sessions.type";
import { useSessionStore } from "../../store/session.store";

export default defineComponent({
  name: "SessionsReport",
  components: {
    Modal,
    StudentSelect,
  },
  data() {
    return {
      student: null as Student | null,
      fromDate: "",
      toDate: "",
      splitSessionInMinutes: "15",
      openModal: false,
    };
  },
  methods: {
    selectedStudent(student: Student) {
      this.student = student;
      this.openModal = false;
    },
    handleSubmit() {
      if (!this.student) return;

      const sessionStore = useSessionStore();

      try {
        sessionStore.getReportsByStudent({
          student_id: this.student.id,
          start_date: this.fromDate,
          end_date: this.toDate,
          duration: Number(this.splitSessionInMinutes),
        });

        sessionStore.downloadReports();

      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>

<style></style>
