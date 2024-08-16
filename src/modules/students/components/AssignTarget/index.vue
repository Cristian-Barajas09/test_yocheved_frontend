<template>
  <div>
    <button @click="handlerAssign">Assign target</button>
    <form @submit.prevent="handleSubmit" v-show="showAssignForm">
      <input type="text" placeholder="Target" v-model="target" />
      <button>Assign</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "AssignTarget",
  data() {
    return {
      showAssignForm: false,
      target: this.initialTarget,
    };
  },
  props: {
    scheduleSessionId: {
      type: Number as PropType<number>,
      required: true,
    },
    initialTarget: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  emits: ["handlerSubmit"],
  methods: {
    async handleSubmit() {
      this.$emit("handlerSubmit", {
        scheduleSessionId: this.scheduleSessionId,
        target: Number(this.target),
      });
      this.showAssignForm = false;
    },
    handlerAssign() {
      this.showAssignForm = !this.showAssignForm;
    },
  },
});
</script>
