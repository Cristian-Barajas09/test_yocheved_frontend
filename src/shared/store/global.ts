import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
