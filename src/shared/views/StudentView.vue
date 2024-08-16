<template>
  <Layout>
    <template #header>
      <Navbar />
    </template>
    <template #main>
      <main>
        <LoadingComponent v-if="loading" />
        <StudentDetails v-else :student="student" />
      </main>
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// components
import Navbar from "@/shared/components/layout/Navbar.vue";
import Layout from "../components/layout/Layout.vue";
import StudentDetails from "@/modules/students/components/StudentDetails/index.vue";
import LoadingComponent from "@/shared/components/Loading/index.vue";

// types
import { type Student } from "@/modules/students/types/students.types";

// store
import { useStudentStore } from "@/modules/students/store/student";
import { useGlobalStore } from "@/shared/store/global";

export default defineComponent({
  name: "StudentView",
  data() {
    return {
      student: null as Student | null,
    };
  },
  components: {
    Layout,
    Navbar,
    StudentDetails,
    LoadingComponent,
  },

  methods: {
    async fetchStudent() {
      const studentStore = useStudentStore();
      const globalStore = useGlobalStore();
      const studentId = this.$route.params.id;

      try {
        await studentStore.fetchStudentById(studentId);
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.setLoading(false);
      }

      this.student = studentStore.student;
    },
  },

  async mounted() {
    await this.fetchStudent();
  },

  computed: {
    loading(): boolean {
      const globalStore = useGlobalStore();
      return globalStore.loading;
    },
  },
});
</script>
