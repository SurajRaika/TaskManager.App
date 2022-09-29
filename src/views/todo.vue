<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from "../stores/TodoLocalData";
import { useLayoutStore } from "../stores/Layout";

import DeleteIcon from "../components/icons/DeleteIcon.vue";

const storeLayout = useLayoutStore();
const storeTodo = useTodoStore();

const timeLeft = ref(0)

const timeLeftPersentage = ref(0)
const HideUpcomingTask = ref(true)



onMounted(() => {
  console.log('mounted');
  var PreviousClickedTask = null;
  var AllTask = document.getElementsByClassName('taskItem')
  Array.prototype.forEach.call(AllTask, task => {

    task.onclick = function () {
      const firstRow = task.firstElementChild
      const childlelements = firstRow.children
      childlelements[1].classList.add("right-6");
      childlelements[1].classList.remove("right-0");
      childlelements[2].classList.add("right-0");
      childlelements[2].classList.remove("-right-6");

      setTimeout(() => {

        const firstRow = task.firstElementChild
        const childlelements = firstRow.children
        childlelements[1].classList.remove("right-6");
        childlelements[1].classList.add("right-0");
        childlelements[2].classList.remove("right-0");
        childlelements[2].classList.add("-right-6");
      }, 3000);
      if (PreviousClickedTask) {
        const firstRow = PreviousClickedTask.firstElementChild
        const childlelements = firstRow.children
        childlelements[1].classList.remove("right-6");
        childlelements[1].classList.add("right-0");
        childlelements[2].classList.remove("right-0");
        childlelements[2].classList.add("-right-6");
      }

      PreviousClickedTask = task
    }
  });
}),




setInterval(() => {
  if (storeTodo.TodoData.TodoList[0]) {
    timeLeft.value = storeLayout.toDaysMinutesSeconds(Math.floor((new Date(storeTodo.TodoData.TodoList[0].end_time) - new Date().getTime()) / 1000)) || { num: 0, unit: '' }
    const Total = storeTodo.TodoData.TodoList[0].end_time - storeTodo.TodoData.TodoList[0].start_time;
    const timeCompleted = - new Date(storeTodo.TodoData.TodoList[0].start_time) + new Date().getTime(); // 
    timeLeftPersentage.value = Math.floor((timeCompleted / Total) * 100)

  }
}, 1000);













</script>
<template>
  <div class="p-3  md:p-14 pt-0 md:pt-0  ">

    <h1 class=" text-3xl   text-center overflow-hidden  lg:text-start  mt-2 font-style">
      What's Up Suraj
    </h1>






    <!-- Popup Task / Upcoming Task -->
    <label class="text-xl font-bold" for="UpcomingTask">UpcomingTask</label>
    <div @click="HideUpcomingTask=!HideUpcomingTask" :class="[HideUpcomingTask ? 'h-20' : ' h-36']"
      class="w-full p-3 rounded-lg  transition-height  sticky top-8   overflow-hidden bg-PopupTask z-20"
      v-if="storeTodo.TodoData.TodoList[0]">

      <!-- title -->
      <div class="w-full  flex  items-center justify-between">
        <span class="flex gap-2 items-center">

          <input :checked="storeTodo.TodoData.TodoList[0].completed"
            @click="storeTodo.TodoData.TodoList[0].completed=!storeTodo.TodoData.TodoList[0].completed; storeTodo.save();HideUpcomingTask=!HideUpcomingTask; "
            type="checkbox">

          <h1 class="  font-semibold   text-xl lg:text-3xl  text-purple-600 capitalize ">
            {{storeTodo.TodoData.TodoList[0].Title}}</h1>
        </span>
        <h1 class="text-xl font-semibold text-center lg:text-3xl lg:font-bold">{{timeLeft.num}} <span
            class=" text-lg font-light opacity-60 lg:text-xl lg:font-semibold">{{timeLeft.unit}} left </span></h1>
      </div>
      <!-- info and desc wrapper -->
      <div :class="{' opacity-0':HideUpcomingTask}" class=" mb-2 transition-opacity duration-150 overflow-hidden">

        <!-- decription -->
        <div class=" px-3 w-full truncate  font-thin text-sm  opacity-80">
          {{storeTodo.TodoData.TodoList[0].description}}
        </div>
        <!-- time limit info -->
        <div class="  w-full  flex  items-center justify-between font-bold  capitalize  text-blue-500 text-base">

          <span class="flex flex-col justify-center items-center">
            Created on
            <span>{{storeLayout.Gettime(storeTodo.TodoData.TodoList[0].start_time)}} </span>
          </span>
          <span class="flex flex-col justify-center items-center">
            expire on
            <span>{{storeLayout.Gettime(storeTodo.TodoData.TodoList[0].end_time)}} </span>
          </span>
        </div>
      </div>

      <!-- progress bar -->
      <div class=" absolute  my-3 w-full h-2 bg-blue-900  overflow-hidden   bottom-0 left-0 ">
        <span class=" rounded-r-3xl bg-red-200 h-2  block  transition-all ease-linear duration-1000 "
          :style="`width:${timeLeftPersentage}%;`">
          .
        </span>
      </div>
    </div>














    <!-- Remaing task -->
    <div class=" capitalize ">
      <!-- wrapper  -->
      <h2 class=" text-xl font-bold">Remaing Tasks</h2>
      <div class=" RemaingTaskItem mt-1 flex  flex-wrap gap-3 mb-5" v-if="storeTodo.TodoData.TodoList[0]">



        <span class="taskItem startingAnimation      border-darkBlue  rounded-sm  bg-task-item  p-2 w-full h-fit  sm:w-96"
          v-for="task in storeTodo.TodoData.TodoList" :id="task">
          <!-- 1st -->

          <div class=" flex overflow-hidden justify-between w-full items-center relative">
            <span class=" flex items-center gap-2 text-lg font-semibold  text-blue-200">
              <input :checked="task.completed"
                @click="task.completed=!task.completed; storeTodo.save(); "
                type="checkbox">
              <h1>{{task.Title}}</h1>
            </span>
            <!-- category -->

            <span
              class=" Category w-max h-min absolute right-0 px-1 border-orange-500 border-2  rounded-md font-bold bg-orange-500 ">
              {{task.Category}}
            </span>
            <span class="Delete absolute -right-6" @click="storeTodo.DeleteTask(task,'TodoList')">
              <DeleteIcon />
            </span>
          </div>
          <!-- 2nd -->
          <div class=" truncate  mx-2 opacity-50">
            {{task.description}}
          </div>
          <!-- 3rd -->
          <div class="   w-full  font-medium text-blue-500">
            <span class="float-right">
              {{storeLayout.Gettime(task.start_time)}}
            </span>
            <span class="float-left  text-green-600">
              <!-- <TimeoutBox :Expected_time="task.end_time" ></TimeoutBox> -->
              {{(timeO=storeLayout.toDaysMinutesSeconds(Math.floor(( new Date(task.end_time) - new Date().getTime()) /
              1000))).num}}
              {{timeO.unit}}
            </span>
          </div>
        </span>

      </div>


      <span class="  text-sm opacity-80 " v-if="!storeTodo.TodoData.TodoList[0]">Wating For Remaing Task . . . . </span>
    </div>









    <!-- remainig Task -->
    <div class="RemaingTaskItem  mt-1  grid grid-cols-1 sm:grid-cols-2  lg:flex lg:flex-wrap  gap-3 mb-5" v-if="storeTodo.TodoData.TimeoutList[0]">
      <span class="taskItem startingAnimation     rounded-sm  bg-task-item  p-2
w-full h-fit lg:w-96" v-for="task in storeTodo.TodoData.TimeoutList" :id="task" v-show="!task.completed">

        <div class="relative overflow-hidden flex justify-between w-full items-center">
          <span class=" flex items-center gap-2 text-lg font-semibold  text-blue-200">
            <input :checked="task.completed" @click="task.completed=!task.completed; storeTodo.save();" type="checkbox">
            <h1>{{task.Title}}</h1>
          </span>
          <!-- category -->
          <span
            class="Category  w-max h-min absolute right-0 px-1 border-orange-500   rounded-md font-bold bg-orange-500 ">
            {{task.Category}}
          </span>
          <span class="Delete absolute -right-6" @click="storeTodo.DeleteTask(task,'TimeoutList')">
            <DeleteIcon />
          </span>

        </div>
        <!-- 2nd -->
        <div class=" truncate  mx-2 opacity-50">
          {{task.description}}
        </div>
        <!-- 3rd -->
        <div class="   w-full  font-medium text-blue-500">
          <span class="float-right">
            {{storeLayout.Gettime(task.start_time)}}
          </span>
          <span class="float-left  text-red-600">
            <!-- <TimeoutBox :Expected_time="task.end_time" ></TimeoutBox> -->
            <span class="text-xl font-black">-</span>
            {{(timeO=storeLayout.toDaysMinutesSeconds(Math.floor(( new
            Date().getTime() - new Date(task.end_time)) / 1000))).num}}
            {{timeO.unit}}
          </span>
        </div>
      </span>

    </div>








    <h2 class="  text-xl font-bold  ">Completed Task</h2>
    <div class="  RemaingTaskItem  mt-1 flex  flex-wrap gap-3 mb-5" v-if="storeTodo.TodoData.TimeoutList[0]">
      <span class="taskItem startingAnimation   rounded-sm  bg-task-item  p-2
w-full h-fit sm:w-96" v-for="task in storeTodo.TodoData.TimeoutList" :id="task" v-show="task.completed">

        <div class="relative overflow-hidden flex justify-between w-full items-center">
          <span class=" flex items-center gap-2 text-lg font-semibold  text-blue-200">
            <input :checked="task.completed" @click="task.completed=!task.completed; storeTodo.save();" type="checkbox">
            <h1>{{task.Title}}</h1>
          </span>
          <!-- category -->
          <span
            class="w-max h-min Category absolute  top-0 right-0 px-1 border-orange-500   rounded-md font-bold bg-orange-500 ">
            {{task.Category}}
          </span>
          <span class="Delete absolute -right-6" @click="storeTodo.DeleteTask(task,'TimeoutList')">
            <DeleteIcon />
          </span>

        </div>
        <!-- 2nd -->
        <div class=" truncate  mx-2 opacity-50">
          {{task.description}}
        </div>
        <!-- 3rd -->
        <div class="   w-full  font-medium text-blue-500">
          <span class="float-right">
            {{storeLayout.Gettime(task.start_time)}}
          </span>
          <span class="float-left  text-red-600">
            <!-- <TimeoutBox :Expected_time="task.end_time" ></TimeoutBox> -->
            <span class="text-xl font-black">-</span>
            {{(timeO=storeLayout.toDaysMinutesSeconds(Math.floor(( new
            Date().getTime() - new Date(task.end_time)) / 1000))).num}}
            {{timeO.unit}}
          </span>
        </div>
      </span>

    </div>






  </div>

</template>

<style >
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


.startingAnimation{
  animation: scaleUP  0.5s cubic-bezier(0.075, 0.82, 0.165, 1) 1;
}


.font-style {
  font-family: CustomFont;
}

.Delete {
  transition: right .1s ease;
}

.Category {
  transition: right .1s ease;
}



.RemaingTaskItem :hover .Category {
  right: 1.5rem
}

.RemaingTaskItem :hover .Delete {
  right: 0rem
}
</style>
 