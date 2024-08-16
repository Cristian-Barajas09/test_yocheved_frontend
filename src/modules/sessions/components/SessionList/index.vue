<template>
  <ul>
    <li
      v-for="session of sessions"
      :key="session.id"
      class="bg-white border border-gray-200 p-4 rounded-lg shadow-sm mb-4"
    >
      <router-link
        :to="{ name: 'session', params: { id: session.id.toString() } }"
      >
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span>
              Student: <strong>{{ session.student.name }}</strong>
            </span>
            <span>
              User: <strong>{{ session.user.name }}</strong>
            </span>
          </div>
        </div>
        <div>
          will be repeated during:
          <strong>{{ repeatedDuring(session.schedule_sessions) }}</strong>
          {{ repeatedDuring(session.schedule_sessions) > 1 ? "times" : "time" }}
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ScheduleSession, Session } from "../../types/sessions.type";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "SessionList",
  components: {
    RouterLink,
  },
  props: {
    sessions: {
      type: Array as PropType<Session[]>,
      required: true,
    },
  },
  computed: {
    repeatedDuring() {
      return (scheduleSessions: ScheduleSession[]): number => {
        return parseInt(scheduleSessions.length.toString());
      };
    },
  },
});
</script>
