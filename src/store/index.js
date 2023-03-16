import { defineStore } from "pinia";

export const VtunifyStore = defineStore("VtunifyId", {
  state: () => ({
    flag: true,
    token: null,
    uid: null,
    trackList: [],
  }),
  actions: {
    setUid(uid) {
      this.uid = uid;
      localStorage.setItem("uid", uid);
    },
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
