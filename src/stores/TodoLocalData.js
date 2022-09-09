import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "TodoData",
  state: () => ({
    TodoData: JSON.parse(localStorage.getItem("Todo_LocalData")) || {
      categories: [],
      TodoList: [],
    },
  }),
  getters: {
    categories: (state) => state.categories,
    TodoList: (state) => state.TodoList,
  },
  actions: {
    AddTask(task) {
      this.TodoData.TodoList.push(task);
      localStorage.setItem("Todo_LocalData", JSON.stringify(this.TodoData));
    },
  },
});
