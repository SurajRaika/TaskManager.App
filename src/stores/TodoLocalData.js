import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "TodoData",
  state: () => ({
    TodoData: JSON.parse(localStorage.getItem("Todo_LocalData")) || {
      categories: [],
      TodoList: [],
      TimeoutList: []
    },
  }),
  getters: {
    categories: (state) => state.categories,
    TodoList: (state) => state.TodoList,
  },
  actions: {
    AddTask(task) {

      this.TodoData.TodoList.sort(function (a, b) {
        return a.end_time - b.end_time
      });
      this.TodoData.TodoList = BinaryInsert(this.TodoData.TodoList, task, 0, this.TodoData.TodoList.length - 1);
      localStorage.setItem("Todo_LocalData", JSON.stringify(this.TodoData));
    },
    AddCategory(Category) {
      console.log('welcome cate');
      if (!this.TodoData.categories.includes(Category)) {
        console.log('categories is not included');
        this.TodoData.categories.unshift(Category);
      } else {
        for (let i = 0; i < this.TodoData.categories.length; i++) {
          console.log('categories is  included');
          const element = this.TodoData.categories[i];
          if (element.toLowerCase() === Category.toLowerCase()) {
            this.TodoData.categories = removeItemFromArray(this.TodoData.categories, i)
            this.TodoData.categories.unshift(Category);
            break
          }

        }
      }
      localStorage.setItem("Todo_LocalData", JSON.stringify(this.TodoData));
    },
    AddTimeoutList() {
      this.TodoData.TimeoutList.unshift(this.TodoData.TodoList[0])
      // this.TodoData.TimeoutList = BinaryInsert(this.TodoData.TimeoutList, this.TodoData.TodoList[0], 0, this.TodoData.TimeoutList.length - 1);

      this.TodoData.TodoList.splice(0, 1)
      localStorage.setItem("Todo_LocalData", JSON.stringify(this.TodoData));
    },
    save() {
      localStorage.setItem("Todo_LocalData", JSON.stringify(this.TodoData));
    },
    CategoriesStatus() {
      let active = 0;
      const Categories = [];

      this.TodoData.TodoList.forEach(task => {
        if (!Categories.includes(task.Category)) {
          active += 1
          Categories.push(task.Category)
          console.log(active);
        }
      });
      return { active: active, inactive: this.TodoData.categories.length - active }


    },
    AboutCategory(Category) {
      let T_Task = 0;


      let T_Completed = 0;
      let T_InCompleted = 0;


      let T_Time_Exceeded = 0;
      let T_Time_Exceeded_Completed = 0;
      let T_Time_Exceeded_InCompleted = 0;

      this.TodoData.TodoList.forEach(task => {
        console.log(task.Category, Category);
        if (task.Category.toLowerCase() === Category.toLowerCase()) {
          T_Task += 1
          if (task.completed) {
            T_Completed += 1
          } else {
            T_InCompleted += 1
          }
        }
      });
      this.TodoData.TimeoutList.forEach(task => {
        if (task.Category.toLowerCase() === Category.toLowerCase()) {
          T_Task += 1
          T_Time_Exceeded += 1
          if (task.completed) {
            T_Time_Exceeded_Completed += 1
            T_Completed += 1

          } else {
            T_Time_Exceeded_InCompleted += 1
            T_InCompleted += 1

          }


        }
      });
      return {
        T_Task: T_Task, T_Completed: T_Completed, T_InCompleted: T_InCompleted,
        T_Time_Exceeded: T_Time_Exceeded, T_Time_Exceeded_Completed: T_Time_Exceeded_Completed, T_Time_Exceeded_InCompleted: T_Time_Exceeded_InCompleted
      }

    }

  },
});




function removeItemFromArray(array, n) {
  const index = array.indexOf(n);

  // if the element is in the array, remove it
  if (index > -1) {

    // remove item
    array.splice(index, 1);
  }
  return array;
}



let BinaryInsert = function (arr, x, start, end) {
  if (!arr.length) {
    arr.push(x)
    return arr
  }
  if (arr[start].end_time > x.end_time) {
    arr.splice(start, 0, x)
    return arr
  }
  if (arr[end].end_time < x.end_time) {
    arr.splice(end + 1, 0, x)
    return arr
  }
  function recursiveFunction(arr, x, start, end) {
    if (start > end) return false;
    let mid = Math.floor((start + end) / 2);
    if (arr[mid].end_time < x.end_time & arr[mid + 1].end_time > x.end_time) {
      console.log(arr[mid].end_time, x.end_time, arr[mid + 1].end_time)
      arr.splice(mid + 1, 0, x)
      return arr
    };
    if (arr[mid].end_time > x.end_time)
      return recursiveFunction(arr, x, start, mid - 1);
    else
      return recursiveFunction(arr, x, mid + 1, end);
  }
  return recursiveFunction(arr, x, start, end)
}