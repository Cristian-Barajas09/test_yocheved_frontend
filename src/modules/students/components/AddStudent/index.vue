<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col gap-4 items-center justify-center"
  >
    <div class="flex gap-2">
      <div class="flex flex-col gap-2 items-start">
        <label for="name">Name</label>
        <input
          class="border border-gray-300 rounded p-1"
          type="text"
          id="name"
          v-model="student.name"
        />
      </div>
      <div class="flex flex-col gap-2 items-start">
        <label for="middle-name">Middle Name</label>
        <input
          class="border border-gray-300 rounded p-1"
          type="text"
          id="middle-name"
          v-model="student.middle_name"
        />
      </div>
    </div>

    <div class="flex gap-2">
      <div class="flex flex-col gap-2 items-start">
        <label for="last-name">Last name</label>
        <input
          class="border border-gray-300 rounded p-1"
          type="text"
          id="last-name"
          v-model="student.last_name"
        />
      </div>

      <div class="flex flex-col gap-2 items-start">
        <label for="email">Email</label>
        <input
          class="border border-gray-300 rounded p-1"
          type="email"
          id="email"
          v-model="student.email"
        />
      </div>
    </div>

    <div class="flex gap-2">
      <div class="flex flex-col gap-2 items-start">
        <label for="birth-date">Birth date</label>
        <input
          class="border border-gray-300 rounded p-1"
          type="date"
          id="birth-date"
          v-model="student.birth_date"
        />
      </div>
    </div>

    <div class="flex flex-col gap-2 items-start">
      <input type="submit" value="Save" class="bg-black text-white px-7 py-1" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useStudentStore } from "../../store/student";
import { useGlobalStore } from "@/shared/store/global";
import type { CreateStudent } from "../../types/students.types";

export default defineComponent({
  name: "AddStudent",
  data() {
    return {
      student: {
        name: "Cristian",
        middle_name: "Alenjandro",
        last_name: "Barajas",
        email: "cristianbarajasimasc@gmail.com",
        birth_date: "2004-08-30",
      } as CreateStudent,
    };
  },
  emits: ["close"],
  methods: {
    async onSubmit() {
      const studentStore = useStudentStore();
      const globalStore = useGlobalStore();

      try {
        globalStore.setLoading(true);
        await studentStore.addStudent(this.student);
        this.$emit("close");
      } catch (error) {
        console.log(error);
      } finally {
        globalStore.setLoading(false);
      }
    },
  },
});
</script>
