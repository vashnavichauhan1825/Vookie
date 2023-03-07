import { defineStore } from "pinia";

export const VtunifyStore = defineStore("VtunifyId", {
  state: () => ({
    flag: true,
    token: null,
    trackList: [],
  }),
  actions: {
    flagHandler() {
      this.flag = !this.flag;
    },
    setHash(val) {
      this.token = val;
      console.log(this.token);
    },
    storeData(res) {
      this.trackList = res;
    },
  },
});
