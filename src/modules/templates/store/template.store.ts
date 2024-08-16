import { defineStore } from "pinia";
import type { Template } from "../types/templates.type";
import type { Template as TemplateById } from "../types/template.type";
import { getTemplate, getTemplates } from "../services/template.service";
export const useTemplateStore = defineStore("template", {
  state: () => ({
    templates: [] as Template[],
    template: null as TemplateById | null,
  }),
  actions: {
    async fetchTemplates() {
      const templates = await getTemplates();

      const { data } = templates;

      this.$patch({
        templates: data.data,
      });
    },

    async fetchTemplate(id: string) {
      try {
        const template = await getTemplate(id);
        this.$patch({
          template: template.data,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
