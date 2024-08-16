<template>
  <Layout>
    <template #header>
      <Navbar />
    </template>
    <template #main>
      <h1>Sessions</h1>
      <div class="flex justify-end gap-3 m-2">
        <button @click="toggleModal" class="p-1 bg-black text-white rounded">
          Add session
        </button>

        <button
          class="p-1 bg-black text-white rounded"
          @click="toggleLoadSession"
        >
          Load sessions
        </button>

        <button
          @click="toggleModalReport"
          class="p-1 bg-black text-white rounded"
        >
          Generate Report
        </button>
      </div>

      <Modal :is-open="openModal" @close="openModal = false">
        <session-add @session-added="sessionAdded" />
      </Modal>

      <Modal :is-open="loadSessionModal" @close="loadSessionModal = false">
        <session-load @close="loadSessionModal = false" />
      </Modal>

      <Modal :is-open="openModalReport" @close="openModalReport = false">
        <sessions-report />
      </Modal>

      <sessions-list :sessions="sessions" />
      <Pagination
        :page="page"
        :totalPage="totalPage"
        @change-page="changePage"
      />
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// types
import { type Session } from "@/modules/sessions/types/sessions.type";

// store
import { useSessionStore } from "@/modules/sessions/store/session.store";
import { useGlobalStore } from "../store/global";

// components
import Layout from "@/shared/components/layout/Layout.vue";
import SessionsList from "@/modules/sessions/components/SessionList/index.vue";
import Navbar from "../components/layout/Navbar.vue";
import Modal from "../components/Modal/index.vue";
import Pagination from "@/shared/components/Pagination/index.vue";
import SessionAdd from "@/modules/sessions/components/SessionAdd/index.vue";
import SessionsReport from "@/modules/sessions/components/SessionsReport/index.vue";
import SessionLoad from "@/modules/sessions/components/SessionLoad/index.vue";

export default defineComponent({
  name: "SessionsView",
  components: {
    Layout,
    Navbar,
    SessionsList,
    SessionAdd,
    Modal,
    SessionsReport,
    SessionLoad,
    Pagination,
  },
  data() {
    return {
      sessions: [] as Session[],
      openModal: false,
      openModalReport: false,
      loadSessionModal: false,
      page: 1,
      totalPage: 1,
    };
  },
  async mounted() {
    await this.getSessions();
  },
  methods: {
    async getSessions() {
      const sessionStore = useSessionStore();
      const globalStore = useGlobalStore();
      try {
        await sessionStore.getSessions();
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.setLoading(false);
      }

      this.sessions = sessionStore.sessions;
      this.page = sessionStore.page;
      this.totalPage = sessionStore.totalPage;
    },

    async changePage(page: number) {
      const globalStore = useGlobalStore();
      const sessionStore = useSessionStore();
      sessionStore.page = page;

      try {
        globalStore.setLoading(true);
        await this.getSessions();
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.setLoading(false);
      }
    },

    sessionAdded() {
      this.openModal = false;
      this.getSessions();
    },

    toggleLoadSession() {
      this.loadSessionModal = true;
    },

    toggleModal() {
      this.openModal = true;
    },
    toggleModalReport() {
      this.openModalReport = true;
    },
  },
});
</script>
