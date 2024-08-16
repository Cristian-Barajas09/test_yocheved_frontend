<template>
  <div class="flex justify-center items-center">
    <div class="w-1/2">
      Preview:
      <div v-html="content"></div>
    </div>
    <div
      contenteditable="true"
      @input="getInputText"
      @keyup="getInputText"
      class="bg-gray-100 p-2 w-1/2"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextEditor",
  data() {
    return {
      content: "",
      dirtyContent: this.value,
    };
  },
  props: {
    prefix: {
      type: String,
      default: "@",
    },
    shortCodes: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: "",
    },
  },
  watch: {
    value(newValue: string) {
      this.content = newValue;
    },
  },
  components: {},
  methods: {
    getPatterns() {
      return {
        shortcodes: new RegExp(`(${this.prefix}\\w+)`, "g"),
        text: new RegExp(`(?!${this.prefix}\\w+)(\\w+)`, "g"),
      };
    },

    useShortCodes(text: string) {
      const patterns = this.getPatterns();

      return {
        shortcodes: text.match(patterns.shortcodes) || [],
        text: this.content.match(patterns.text) || [],
      };
    },

    getInputText(e: Event) {
      const element = e.target as HTMLDivElement;

      this.dirtyContent = element.innerHTML;

      const { shortcodes } = this.useShortCodes(this.dirtyContent);
      for (const shortcode of shortcodes) {
        const shortCode = shortcode.replace(this.prefix, "");
        console.log(shortCode);

        if (!this.shortCodes.includes(shortCode)) {
          continue;
        }

        const regex = new RegExp(shortcode, "g");

        this.dirtyContent = this.dirtyContent.replace(
          regex,
          `<span style="color:green;">${shortcode}</span>`
        );
      }

      this.content = this.dirtyContent;

      this.$emit("input", this.content);
    },
  },
});
</script>
