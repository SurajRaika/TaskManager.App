<script setup>
import { ref } from 'vue'
import { useTodoStore } from "../stores/TodoLocalData";
import { useLayoutStore } from "../stores/Layout";

const storeLayout = useLayoutStore();
const storeTodo = useTodoStore();

const timeLeft = ref({ num: 0, unit: '' })
const timeLeftPersentage = ref(0)
const HideUpcomingTask=ref(true)








setInterval(() => {
  if (storeTodo.TodoData.TodoList[0]) {
    timeLeft.value = storeLayout.toDaysMinutesSeconds(Math.floor((new Date(storeTodo.TodoData.TodoList[0].end_time) - new Date().getTime()) / 1000))
    const Total = storeTodo.TodoData.TodoList[0].end_time - storeTodo.TodoData.TodoList[0].start_time;
    const timeCompleted = - new Date(storeTodo.TodoData.TodoList[0].start_time) + new Date().getTime(); // 
    timeLeftPersentage.value = Math.floor((timeCompleted / Total) * 100)

  }
}, 1000);


</script>
<template>
  <div class="p-3  md:p-14 pt-0 md:pt-0 ">

    <h1 class=" text-3xl   text-center overflow-hidden  lg:text-start  mt-2 font-style">
      What's Up Suraj
    </h1>

    <h1 class="text-lg font-semibold">Upcoming Task</h1>

    <div class="w-full sticky sticky-task top-7  z-10  min-h-min 
     
     border-4 border-darkBlue
                  background-lightBlue    p-3  lg:rounded-lg " v-if="storeTodo.TodoData.TodoList[0]">
      <!-- Title and timeleft -->
      <div class="w-full  flex  items-center justify-between">
        <span class="flex gap-2 items-center">

          <input :checked="storeTodo.TodoData.TodoList[0].completed"
            @click="storeTodo.TodoData.TodoList[0].completed=!storeTodo.TodoData.TodoList[0].completed; storeTodo.save(); storeTodo.TodoData.TodoList[0].Last_Modification_At=new Date().getTime();"
            type="checkbox">

          <h1 class="  font-semibold   text-xl lg:text-3xl  text-purple-600 capitalize ">
            {{storeTodo.TodoData.TodoList[0].Title}}</h1>
        </span>
        <h1 class="text-xl font-semibold text-center lg:text-3xl lg:font-bold">{{timeLeft.num}} <span
            class=" text-lg font-light opacity-60 lg:text-xl lg:font-semibold">{{timeLeft.unit}} left </span></h1>
      </div>
      <!-- decription -->
      <div class=" px-3 w-full truncate  font-thin text-sm  opacity-80">
        {{storeTodo.TodoData.TodoList[0].description}}
      </div>
      <!-- time limit info -->
      <div v-show="HideUpcomingTask" :class="{'scale-0':HideUpcomingTask}" class="  w-full  flex  items-center justify-between font-bold  capitalize  text-blue-500 text-base">

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
      <div class="w-full h-2 bg-blue-900 rounded-2xl overflow-hidden sticky top-4 ">
        <span class=" bg-red-200 h-2  block  transition-all ease-linear duration-1000 " :style="`width:${timeLeftPersentage}%;`">
          .
        </span>
      </div>

    </div>

    <span class="  text-sm opacity-80 " v-if="!storeTodo.TodoData.TodoList[0]">Wating For Upcoming Task . . . . </span>








    <!-- Remaing task -->
    <div class=" capitalize ">
      <!-- wrapper  -->
      <h2 class=" text-xl font-bold">Remaing Tasks</h2>
      <div class="  mt-1 flex  flex-wrap gap-3 mb-5" v-if="storeTodo.TodoData.TodoList[0]">
        <span class="  border-darkBlue  rounded-sm  bg-task-item  p-2 w-full h-fit  sm:w-96"
          v-for="task in storeTodo.TodoData.TodoList" :id="task">
          <!-- 1st -->

          <div class=" flex justify-between w-full items-center">
            <span class=" flex items-center gap-2 text-lg font-semibold  text-blue-200">
              <input :checked="task.completed"
                @click="task.completed=!task.completed; storeTodo.save(); task.Last_Modification_At=new Date().getTime();"
                type="checkbox">
              <h1>{{task.Title}}</h1>
            </span>
            <!-- category -->
            <span class=" px-1 border-orange-500 border-2  rounded-md font-bold bg-orange-500 ">
              {{task.Category}}
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










    <h2 class=" text-xl font-bold">Tasks Which Exceeded the Expected time set by you guys </h2>
    <div class="  mt-1 flex  flex-wrap gap-3 mb-5" v-if="storeTodo.TodoData.TimeoutList[0]">
      <span class="  rounded-sm  bg-task-item  p-2
w-full h-fit sm:w-96" v-for="task in storeTodo.TodoData.TimeoutList" :id="task" v-show="!task.completed">

        <div class=" flex justify-between w-full items-center">
          <span class=" flex items-center gap-2 text-lg font-semibold  text-blue-200">
            <input :checked="task.completed" @click="task.completed=!task.completed; storeTodo.save();" type="checkbox">
            <h1>{{task.Title}}</h1>
          </span>
          <!-- category -->
          <span class=" px-1 border-orange-500   rounded-md font-bold bg-orange-500 ">
            {{task.Category}}
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
    <div class="  mt-1 flex  flex-wrap gap-3 mb-5" v-if="storeTodo.TodoData.TimeoutList[0]">
      <span class="  rounded-sm  bg-task-item  p-2
w-full h-fit sm:w-96" v-for="task in storeTodo.TodoData.TimeoutList" :id="task" v-show="task.completed">

        <div class=" flex justify-between w-full items-center">
          <span class=" flex items-center gap-2 text-lg font-semibold  text-blue-200">
            <input :checked="task.completed" @click="task.completed=!task.completed; storeTodo.save();" type="checkbox">
            <h1>{{task.Title}}</h1>
          </span>
          <!-- category -->
          <span class=" px-1 border-orange-500   rounded-md font-bold bg-orange-500 ">
            {{task.Category}}
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

<style>
.font-style {
  font-family: CustomFont;
}
</style>
 