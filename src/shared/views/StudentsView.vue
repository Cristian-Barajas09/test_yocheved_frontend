<style>
.student-link {
  cursor: pointer;
}
</style>
<template>
  <Layout>
    <template #header>
      <Navbar />
    </template>
    <template #main>
      <main>
        <div class="flex mb-3 justify-between items-center">
          <h1>Students</h1>
          <button class="bg-black text-white p-1 rounded" @click="toggleModal">
            Add Student
          </button>
        </div>
        <Modal :is-open="openModal" @close="openModal = false">
          <add-student @close="openModal = false" />
        </Modal>

        <students-list
          v-if="!loading"
          :students="students"
          :redirectToStudentDetails="redirectToStudentDetails"
        >
          <div v-if="students.length > 0">
            <students-list-item
              v-for="student of students"
              :key="student.id"
              :student="student"
              :redirect-to-student-details="redirectToStudentDetails"
            />
          </div>
          <div v-else>
            <div>
              <p>No students found</p>
            </div>
          </div>
        </students-list>
        <Loading v-else />
      </main>
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { type Student } from "@/modules/students/types/students.types";

// Components
import Navbar from "@/shared/components/layout/Navbar.vue";
import Modal from "@/shared/components/Modal/index.vue";
import StudentsList from "../../modules/students/components/StudentsList/StudentsList.vue";
import AddStudent from "@/modules/students/components/AddStudent/index.vue";
import StudentsListItem from "../../modules/students/components/StudentListItem/index.vue";
import Loading from "@/shared/components/Loading/index.vue";

import { useStudentStore } from "@/modules/students/store/student";
import { useGlobalStore } from "../store/global";

export default defineComponent({
  data() {
    return {
      students: [] as Student[],
      openModal: false,
    };
  },

  components: {
    Layout: () => import("@/shared/components/layout/Layout.vue"),
    Navbar,
    StudentsList,
    Modal,
    AddStudent,
    StudentsListItem,
    Loading,
  },

  async mounted() {
    await this.getStudents();
  },

  methods: {
    redirectToStudentDetails(studentId: number | undefined) {
      this.$router.push({
        name: "student",
        params: { id: String(studentId) },
      });
    },
    async getStudents() {
      const studentStore = useStudentStore();
      const globalStore = useGlobalStore();

      try {
        globalStore.setLoading(true);
        await studentStore.fetchStudents();
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.setLoading(false);
      }

      this.students = studentStore.students;
    },
    toggleModal() {
      this.openModal = true;
    },
  },
  computed: {
    loading() {
      const globalStore = useGlobalStore();
      return globalStore.loading;
    },
  },
});
</script>
