<template>
  <div>
    <div
      class="border border-black w-full flex flex-col items-center justify-between"
    >
      <table class="w-2/3">
        <thead>
          <tr>
            <th>Days</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in days" :key="day">
            <td>{{ day }}</td>
            <td class="p-2">
              <button
                class="border text-sm text-center p-2 cursor-pointer"
                @click="handleClick(day)"
              >
                {{ showAvailability(day) }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex gap-2 mt-2">
      <div class="flex flex-col gap-2">
        <span class="border text-sm text-center">✓</span>
        <span class="border p-2"> </span>
      </div>
      <div class="flex flex-col">
        <span>This indicating available</span>
        <span>This indicating not-available</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { type AvailabilityByStudent } from "@/modules/students/types/students.types";
import { useAvailabilityStore } from "@/shared/store/availability";
export default defineComponent({
  name: "ShowStudentAvailability",
  data() {
    return {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
  created() {
    this.getAvailitiby();
  },
  methods: {
    async getAvailitiby() {
      const id = this.$route.params.id;
      const avaliableStore = useAvailabilityStore();

      await avaliableStore.getAvailability(id);
    },

    removeAvailability(day: string) {
      const id = this.$route.params.id;
      const avaliableStore = useAvailabilityStore();

      avaliableStore
        .removeAvailability(id, day)
        .then(() => console.log("removed"));
    },

    addAvailability(day: string) {
      const id = this.$route.params.id;

      const avaliableStore = useAvailabilityStore();

      avaliableStore.addAvailability(id, day).then(() => console.log("added"));
    },

    handleClick(day: string) {
      if (this.availability(day.toLowerCase())) {
        this.removeAvailability(day.toLowerCase());
      } else {
        this.addAvailability(day.toLowerCase());
      }
    },
  },
  computed: {
    showAvailability() {
      return (day: string) => {
        if (this.availability(day.toLowerCase())) {
          return "✓";
        }

        return " ";
      };
    },
    availability() {
      const avaliableStore = useAvailabilityStore();
      return (day: string) => {
        return avaliableStore.availability[day.toLowerCase()];
      };
    },
  },
  destroyed() {
    const avaliableStore = useAvailabilityStore();
    avaliableStore.clearAvailability();
  },
});
</script>

<style scoped>
.table-fixed {
  table-layout: fixed;
}
th,
td {
  text-align: left;
  padding: 8px;
}
</style>
