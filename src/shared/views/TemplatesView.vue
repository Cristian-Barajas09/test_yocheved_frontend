<template>
  <Layout>
    <template #header>
      <Navbar />
    </template>
    <template #main>
      <div>
        <h1>Template View</h1>
      </div>
      <button @click="toggleModal">Create template</button>

      <Modal :is-open="openModal" @close="openModal = false">
        <template-add />
      </Modal>

      <template-list>
        <template-list-item
          v-for="template of templates"
          :template="template"
          :key="template.id"
        />
      </template-list>
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/shared/components/layout/Layout.vue";
import Navbar from "../components/layout/Navbar.vue";
import Modal from "@/shared/components/Modal/index.vue";
import TemplateAdd from "@/modules/templates/components/TemplateAdd/index.vue";
import TemplateList from "@/modules/templates/components/TemplateList/index.vue";
import TemplateListItem from "@/modules/templates/components/TemplateListItem/index.vue";

import { useTemplateStore } from "@/modules/templates/store/template.store";
import { useGlobalStore } from "../store/global";
import type { Template } from "@/modules/templates/types/templates.type";
export default defineComponent({
  name: "TemplateView",
  components: {
    Layout,
    Navbar,
    Modal,
    TemplateAdd,
    TemplateList,
    TemplateListItem,
  },
  data() {
    return {
      templates: [] as Template[],
      openModal: false,
    };
  },
  async mounted() {
    await this.getTemplates();
  },

  methods: {
    async getTemplates() {
      const globalStore = useGlobalStore();
      const templateStore = useTemplateStore();

      try {
        globalStore.setLoading(true);
        await templateStore.fetchTemplates();
        this.templates = templateStore.templates;
      } catch (error) {
        console.log(error);
      } finally {
        globalStore.setLoading(false);
      }
    },

    toggleModal() {
      this.openModal = true;
    },
  },
});
</script>
