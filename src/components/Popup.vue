<script setup>
import { ref, computed } from 'vue'



import InputCategory from "./InputCategory.vue";
import { useLayoutStore } from "../stores/Layout";
import { useTodoStore } from "../stores/TodoLocalData";

const storeLayout = useLayoutStore()
const storeTodo = useTodoStore();

const Title = ref('');
const Category = ref('');
const Description = ref('');
const date = ref('');
const time = ref('');



function AddTask() {
  if (typeof (Category.value) == "string" & typeof (date.value) == "string" & typeof (time.value) == "string" & typeof (Title.value) == "string") {
    var Task = {
      Category: Category.value.toLowerCase(),
      Title: Title.value.toLowerCase(),
      description: Description.value,
      start_time: new Date().getTime(),
      end_time: (new Date(`${date.value} ${time.value}`)).getTime(),
      completed: false,
      timeout: false
    };

    storeTodo.AddCategory(Category.value)
    storeTodo.AddTask(Task)
    storeLayout.HidePopup()
    Title.value = ''
    Category.value = ''
    Description.value = ''
    date.value = ''
    time.value = ''

  }
}


function GetCategory(params) {
  Category.value = params
}


</script>
<template >
  <Teleport to="body">
    <div id="Popup" @click.self="storeLayout.HidePopup()"
      class="backdrop-blur-sx fixed top-0 left-0  w-full h-screen   z-50  flex justify-center items-center "
      v-show="storeLayout.Popup">



      <div class="PopupWidth bg-blue-800 flex flex-col items-center justify-center ">
        <!-- container -->
        <div class="w-full lg:w-3/4 flex flex-col justify-center items-center gap-3">
          <!-- first row -->
          <div class="lg:flex gap-5 w-full">
            <span class="flex flex-col w-full ">
              <Label for="Title">Title</Label>
              <input v-model="Title" id="Title" class="w-full" type="text" placeholder="Title..">
            </span>
            <InputCategory class="w-full" @Category-Data="GetCategory"></InputCategory>
          </div>

          <!-- 2nd row -->
          <div class="flex flex-col  w-full">
            <label for="Description">Description</label>
            <textarea v-model="Description" class="" id="Description"></textarea>
          </div>

          <!-- 3rd row -->
          <DIv class="w-full">
            <h1>Time Limit</h1>
            <div class="flex w-full gap-1">
              <span class="flex flex-col w-full">
                <Label for="time">Time Limit</Label>
                <input v-model="time" type="time" id="time">
              </span>
              <span class="flex flex-col w-full">
                <Label for="date">Time Limit</Label>
                <input v-model="date" type="date" id="date">
              </span>
            </div>
          </DIv>
          <input @click="AddTask" type="submit" value="Add Task" class=" bg-orange-500 p-1  text-lg">

        </div>

      </div>
    </div>
  </Teleport>

</template>
<style>
.PopupWidth {
  width: 50rem;
  max-width: 95%;
  padding: 1rem;
}

</style>

