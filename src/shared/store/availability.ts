import {
  addAvailitibyStudent,
  getAvailitibyStudent,
  removeAvailitibyStudent,
} from "@/modules/students/services/student.service";
import { type AvailabilityByStudent } from "@/modules/students/types/students.types";
import { defineStore } from "pinia";

export const useAvailabilityStore = defineStore({
  id: "availability",
  state: () => ({
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    } as AvailabilityByStudent,
  }),
  actions: {
    async getAvailability(id: string) {
      try {
        const resp = await getAvailitibyStudent(id);
        this.$patch({
          availability: resp.data,
        });

        return this.availability;
      } catch (error) {
        console.log(error);
      }
    },
    async removeAvailability(id: string, day: string) {
      try {
        await removeAvailitibyStudent(id, day);
        this.$patch({
          availability: {
            ...this.availability,
            [day]: false,
          },
        });
        console.log(this.availability);
      } catch (error) {
        console.log(error);
      }
    },
    async addAvailability(id: string, day: string) {
      try {
        await addAvailitibyStudent(id, day);
        this.$patch({
          availability: {
            ...this.availability,
            [day]: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    clearAvailability() {
      this.$reset();
    },
  },
});
