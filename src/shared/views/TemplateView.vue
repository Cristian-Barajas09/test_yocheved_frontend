<template>
  <Layout>
    <template #header>
      <Navbar />
    </template>

    <template #main>
      <div>
        <h1>{{ template?.name }}</h1>
        <h2>{{ template?.title }}</h2>
        <div class="template-content" v-html="formattedContent"></div>
      </div>
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/shared/components/layout/Layout.vue";
import Navbar from "../components/layout/Navbar.vue";
import { useTemplateStore } from "@/modules/templates/store/template.store";
import { useGlobalStore } from "../store/global";
import type { Template } from "@/modules/templates/types/template.type";

export default defineComponent({
  name: "TemplateView",
  components: {
    Layout,
    Navbar,
  },
  data() {
    return {
      template: null as Template | null,
    };
  },
  async mounted() {
    await this.getTemplate();
  },

  methods: {
    async getTemplate() {
      const globalStore = useGlobalStore();
      const templateStore = useTemplateStore();
      const { id } = this.$route.params;
      try {
        globalStore.setLoading(true);
        await templateStore.fetchTemplate(id);
        this.template = templateStore.template;
      } catch (error) {
        console.error(error);
      } finally {
        globalStore.setLoading(false);
      }
    },
  },
  computed: {
    formattedContent() {
      if (!this.template) return "";
      // Reemplaza los saltos de línea y tabulaciones con HTML correspondiente
      return this.template.content
        .replace(/\n/g, "<br/>")
        .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    },
  },
});
</script>

<style scoped>
.template-content {
  white-space: pre-wrap;
  /* Preserva los espacios en blanco y los saltos de línea */
}
</style>
