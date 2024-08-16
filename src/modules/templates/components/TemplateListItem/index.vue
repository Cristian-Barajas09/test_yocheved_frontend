<template>
  <li @click="() => redirectToTemplate(template)">
    {{ template.name }}
  </li>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { Template } from "../../types/templates.type";

export default defineComponent({
  name: "TemplateListItem",
  props: {
    template: {
      type: Object as PropType<Template>,
      required: true,
    },
  },
  methods: {
    redirectToTemplate(template: Template) {
      this.$router.push({
        name: "template",
        params: { id: String(template.id) },
      });
    },
  },
});
</script>
