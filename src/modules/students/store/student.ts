import { defineStore } from "pinia";
import {
  getStudents,
  getStudentById,
  createStudent,
} from "../services/student.service";
import type { CreateStudent, Student } from "../types/students.types";

export const useStudentStore = defineStore("studentsStore", {
  state: () => ({
    students: [] as Student[],
    student: {} as Student,
    modalStudents: [] as Student[], // Estado para los estudiantes del modal
    modalPage: 1, // Página actual del modal
    modalTotalPages: 1, // Total de páginas del modal
    modalLimit: 10, // Límite de estudiantes por página
  }),
  actions: {
    async fetchStudents() {
      const resp = await getStudents();

      if (resp) {
        this.$patch({ students: resp.data.data });
      }
    },
    async fetchStudentById(id: string) {
      const resp = await getStudentById(id);

      if (resp) {
        this.$patch({ student: resp.data });
      }
    },
    async addStudent(student: CreateStudent) {
      const resp = await createStudent(student);

      if (!resp) return;
    },

    setModalLimit(limit: number) {
      this.$patch({ modalLimit: limit });
    },

    setModalPage(page: number) {
      this.$patch({ modalPage: page });
    },

    async fetchModalStudents() {
      const resp = await getStudents(this.modalPage, this.modalLimit); // Asumiendo que getStudents acepta un parámetro de página

      if (resp) {
        this.$patch({
          modalStudents: resp.data.data,
          modalPage: resp.data.current_page,
          modalTotalPages: resp.data.last_page,
        });
      }
    },
  },
});
