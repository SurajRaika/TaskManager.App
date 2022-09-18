<script setup>
import { ref } from 'vue'
import { useTodoStore } from "../stores/TodoLocalData";
import { useLayoutStore } from "../stores/Layout";
import TimeoutBox from "../components/timeoutBox.vue";

const storeLayout = useLayoutStore();
const storeTodo = useTodoStore();

const timeLeft = ref('')








 
setInterval(() => {
  if (storeTodo.TodoData.TodoList[0]) {
    timeLeft.value = storeLayout.toDaysMinutesSeconds(Math.floor((new Date(storeTodo.TodoData.TodoList[0].end_time) - new Date().getTime()) / 1000))
  }
}, 1000);


</script>
<template>
  <h1 class=" text-3xl   text-center overflow-hidden  lg:text-start  mt-2 font-style">
    What's Up Suraj
  </h1>

  <h1 class="text-lg font-semibold">Upcoming Task</h1>
  <div
    class=" border-8 border-darkBlue  background-lightBlue  flex flex-col w-full p-3 rounded-lg sticky sticky-task top-7  z-10"
    v-if="storeTodo.TodoData.TodoList[0]">
    <!-- Title and timeleft -->
    <div class="w-full  flex  items-center justify-between">
      <span class="flex gap-2 items-center">
        <input class="checkBox" @mouseout="storeTodo.save()" type="checkbox"
          v-model="storeTodo.TodoData.TodoList[0].completed" name="" id="">
        <h1 class="  font-semibold   text-xl lg:text-3xl text-darkBlue">{{storeTodo.TodoData.TodoList[0].Title}}</h1>
      </span>
      <h1 class="text-xl font-semibold text-center lg:text-3xl lg:font-bold">{{timeLeft.num}} <span
          class=" text-lg font-light opacity-60 lg:text-xl lg:font-semibold">{{timeLeft.unit}} left </span></h1>
    </div>
    <!-- decription -->
    <div class=" px-3 w-full truncate  font-thin text-sm  opacity-80">
      {{storeTodo.TodoData.TodoList[0].description}}
    </div>
    <!-- time limit info -->
    <div class="w-full  flex  items-center justify-between font-bold  capitalize  text-blue-500 text-base">

      <span class="flex flex-col justify-center items-center">
        Created on
        <span>{{storeLayout.Gettime(storeTodo.TodoData.TodoList[0].start_time)}} </span>
      </span>
      <span class="flex flex-col justify-center items-center">
        expire on
        <span>{{storeLayout.Gettime(storeTodo.TodoData.TodoList[0].end_time)}} </span>
      </span>
    </div>
    <!-- progress bar -->
    <div class="w-full h-2 bg-blue-900 rounded-2xl">
    </div>
  </div>
  <span class="  text-sm opacity-80 " v-if="!storeTodo.TodoData.TodoList[0]">Wating For Upcoming Task . . . . </span>








  <!-- Remaing task -->
  <div class=" capitalize ">
    <!-- wrapper  -->
    <h2 class=" text-lg font-semibold">Remaing Tasks</h2>
    <div class="  mt-1 flex  flex-wrap gap-3 mb-5" v-if="storeTodo.TodoData.TodoList[0]">
      <span class="border-4  border-darkBlue  rounded-md  background-lightBlue  p-2
      w-full h-fit  sm:w-96" v-for="task in storeTodo.TodoData.TodoList" :id="task">
        <!-- 1st -->
        <div class=" flex justify-between w-full items-center">
          <span class=" flex items-center gap-2 text-lg font-semibold  text-blue-200">
            <input @mouseout="storeTodo.save()" type="checkbox" v-model="task.completed" name="" id="">
            <h1>{{task.Title}}</h1>
          </span>
          <!-- category -->
          <span class="border px-1 border-orange-500 border-2  rounded-md font-bold bg-orange-500 ">
            {{task.Category}}
          </span>
        </div>
        <!-- 2nd -->
        <div class=" truncate  mx-2 opacity-50">
          {{task.description}}
        </div>
        <!-- 3rd -->
        <div class=" float-right   font-medium text-blue-500">
          <span>
            {{storeLayout.Gettime(task.end_time)}}
          </span>
        </div>
      </span>
    </div>

<!-- Timeout  -->
    <div class="  mt-1 flex  flex-wrap gap-3 mb-5" v-if="storeTodo.TodoData.TimeoutList[0]">
      <span class="border-4  border-darkBlue  rounded-md  background-lightBlue  p-2
w-full h-fit sm:w-96" v-for="task in storeTodo.TodoData.TimeoutList" :id="task">
        <TimeoutBox :task="task" ></TimeoutBox>
      </span>

    </div>
    <span class="  text-sm opacity-80 " v-if="!storeTodo.TodoData.TodoList[0]">Wating For Remaing Task . . . . </span>
  </div>







</template>

<style>
.font-style {
  font-family: CustomFont;
}
</style>
 