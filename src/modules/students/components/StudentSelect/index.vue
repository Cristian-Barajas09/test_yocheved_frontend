<template>
  <!--I am using tailwind-->
  <div class="flex flex-col items-start justify-center">
    <h1 class="text-2xl font-bold mb-4">Students</h1>
    <ul class="flex flex-col items-center justify-center">
      <li
        v-for="student of students"
        :key="student.id"
        class="flex flex-row items-center justify-between gap-4 p-2 bg-gray-100 rounded-md mb-2"
      >
        <span class="text-lg">{{ student.name }} {{ student.last_name }}</span>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
          @click="() => selectStudent(student)"
        >
          Select
        </button>
      </li>
    </ul>
    <Pagination
      :page="page"
      :limit="limit"
      :total-page="total"
      @change="changePage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStudentStore } from "../../store/student";
import { useGlobalStore } from "@/shared/store/global";
import { type Student } from "../../types/students.types";
import Pagination from "@/shared/components/Pagination/index.vue";
export default defineComponent({
  name: "StudentSelect",
  data() {
    return {
      students: [] as Student[],
      total: 0,
      limit: 5,
      page: 1,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    async changePage(page: number) {
      this.page = page;
      await this.getStudents();
    },

    selectStudent(student: Student) {
      this.$emit("select", student);
    },
    async getStudents() {
      const studentStore = useStudentStore();
      const globalStore = useGlobalStore();

      try {
        studentStore.setModalLimit(this.limit);
        studentStore.setModalPage(this.page);
        await studentStore.fetchModalStudents();

        this.total = studentStore.modalTotalPages;
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.setLoading(false);
      }

      this.students = studentStore.modalStudents;
    },
  },
  emits: ["select"],
  async mounted() {
    await this.getStudents();
  },
});
</script>
