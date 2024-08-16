import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    isModalOpen: false,
  }),
  actions: {
    openModal() {
      this.$patch({ isModalOpen: true });
    },
    closeModal() {
      this.$patch({ isModalOpen: false });
    },
  },
});
