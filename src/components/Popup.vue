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
const date = ref(getFullDate());
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
function getFullDate(Sec = new Date().getTime()) {
    var GetDateObj = new Date(Sec);
    var year=GetDateObj.getFullYear()
    var Mounth=GetDateObj.getMonth() + 1
    var date=GetDateObj.getDate()
    // console.log(Mounth);
    if (Mounth<10) {
      Mounth=`0${Mounth}`
    }
    if (date<10) {
      date=`0${date}`
    }
    return `${year}-${Mounth}-${date}`
}
</script>
<template >
  <Teleport to="body">
    <div id="Popup" @click.self="storeLayout.HidePopup()"
      class="  lg:backdrop-blur-sx fixed top-0 left-0  w-full h-screen   z-50  flex justify-center items-center "
      v-show="storeLayout.Popup" >



      <div class="PopupWidth startingAnimationOfPopup  bg-Popup-Container flex flex-col items-center justify-center rounded-lg ">
        <!-- container -->
        <div class="  font-semibold text-lg w-full  lg:w-3/4 flex flex-col justify-center items-center gap-3">
          <!-- first row -->
          <div class="lg:flex gap-5 w-full">
            <span class=" flex flex-col w-full ">
              <Label class=" font-semibold" for="Title">Title</Label>
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
            <div class=" text-base  font-medium  flex w-full gap-1">
              <span class="flex flex-col w-full">
                <Label for="time">Time Limit</Label>
                <input v-model="time" type="time" id="time">
              </span>
              <span class="flex flex-col w-full">
                <Label for="date">Time Limit</Label>
                <input v-model="date" type="date" id="date" >
              </span>
            </div>
          </DIv>
          <input @click="AddTask" type="submit" value="Add Task" class=" bg-orange-500 p-1  text-lg">

        </div>

      </div>
    </div>
  </Teleport>

</template>
<style scoped>
.PopupWidth {
  width: 50rem;
  max-width: 95%;
  padding: 1rem;
}

@keyframes scaleUP {
    0%{
      transform: scale(0);
      opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}


.startingAnimationOfPopup{
  animation: scaleUP  0.5s cubic-bezier(0.075, 0.82, 0.165, 1) 1;
}
.bg-Popup-Container{
  background: #457fca;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #5691c8, #457fca);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #5691c8, #457fca); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
*{
  color: black;
}
</style>

