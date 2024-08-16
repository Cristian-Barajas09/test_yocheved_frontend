<template>
  <div>
    <text-editor :short-codes="shortCodes" v-model="content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextEditor from "@/shared/components/TextEditor/index.vue";

export default defineComponent({
  name: "TemplateAdd",
  data() {
    return {
      content: "",
      shortCodes: ["student_full_name"],
    };
  },
  components: {
    TextEditor,
  },
  methods: {},
});
</script>
<style scoped>
.highlight {
  color: green;
}
</style>
