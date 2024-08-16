<template>
  <Layout>
    <template #main>
      <section>
        <div>
          <h3>Student: {{ studentFullName }}</h3>
          <h4>Schedule Sessions:</h4>
          <section class="grid grid-cols-1 gap-4 mt-2">
            <article
              class="border border-gray-200 p-4"
              v-for="scheduleSession of session.schedule_sessions"
              :key="scheduleSession.id"
            >
              <p>{{ scheduleSession.start }}</p>
              <p>{{ scheduleSession.duration }}</p>
              <p>{{ scheduleSession.target }}</p>

              <assign-target
                :scheduleSessionId="scheduleSession.id"
                @handlerSubmit="handlerAssignSubmit"
                :initialTarget="scheduleSession.target"
              />
            </article>
          </section>
        </div>
      </section>
    </template>
  </Layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import Layout from "../components/layout/Layout.vue";
import AssignTarget from "@/modules/students/components/AssignTarget/index.vue";

import { useSessionStore } from "@/modules/sessions/store/session.store";
import type { Session } from "@/modules/sessions/types/session.type";
export default defineComponent({
  name: "SessionView",
  components: {
    Layout,
    AssignTarget,
  },
  data() {
    return {
      showAssignForm: false,
      session: {} as Session,
    };
  },
  async mounted() {
    await this.getSession();
  },
  methods: {
    async getSession() {
      const sessionStore = useSessionStore();
      const sessionId = parseInt(this.$route.params.id);
      try {
        await sessionStore.getSessionById(sessionId);
        this.session = sessionStore.session;
      } catch (error) {
        console.log(error);
      }
    },
    handlerAssignSubmit(payload: {
      scheduleSessionId: number;
      target: number;
    }) {
      const sessionStore = useSessionStore();

      sessionStore.assingTargetToSession(
        payload.scheduleSessionId,
        payload.target
      );
    },
    handlerAssign() {
      this.showAssignForm = !this.showAssignForm;
    },
  },
  computed: {
    studentFullName() {
      return `${this.session.student?.name} ${this.session.student?.last_name}`;
    },
  },
});
</script>
