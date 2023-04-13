import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export const VtunifyStore = defineStore("VtunifyId", {
  state: () => ({
    flag: true,
    token: null,
    uid: null,
    selectedBook: "",
    bookList: [],
    trackList: [],
  }),
  actions: {
    setBookList(list) {
      this.bookList = list;
    },
    selectBookHandler(book) {
      this.selectedBook = book;
    },
    toastSuccess(msg) {
      return toast.success(msg, {
        autoClose: 1000,
      });
    },
    toastError(msg) {
      return toast.error(msg, {
        autoClose: 1000,
      });
    },
    toastInfo(msg) {
      return toast.info(msg, {
        autoClose: 1000,
      });
    },

    setUid(uid) {
      this.uid = uid;
      localStorage.setItem("uid", uid);
    },
    flagHandler() {
      this.flag = !this.flag;
    },
    setHash(val) {
      this.token = val;
    },
    storeData(res) {
      this.trackList = res;
    },
  },
});
