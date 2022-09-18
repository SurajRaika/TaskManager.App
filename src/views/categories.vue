<script  setup>
import { useTodoStore } from '../stores/TodoLocalData';

const storeTodo = useTodoStore();

</script>
<template>
  <h1 class="text-3xl font-bold font-serif ">Total Category: {{storeTodo.TodoData.categories.length}}</h1>
  <h1> Active : {{storeTodo.CategoriesStatus().active}}</h1>
  <h1> InActive : {{storeTodo.CategoriesStatus().inactive}}</h1>

  <h1 class="font-semibold text-lg">Categories</h1>
  <div class="flex flex-wrap gap-5 mb-5">
    <span class="p-2 w-full sm:w-96 bg-blue-900 rounded-md flex flex-col" v-for="Category in storeTodo.TodoData.categories"
      :id="Category">
      <!-- 1st row -->
      <div class="flex justify-between">
        <!-- category -->
        <span class="px-1 border-orange-500  cursor-pointer rounded-md font-bold bg-orange-500 ">
          {{Category}}
        </span>
        
        <span class=" text-lg font-medium  ">{{(Category=storeTodo.AboutCategory(Category)).T_Task}} <span class=" text-base  opacity-80">Total Task </span></span>
      </div>
      <!-- 2nd row -->
      <div class="flex flex-col my-2 gap-1">
        <span class="flex justify-around">

          <span class="flex gap-2 text-lg font-medium  items-center "><img class="w-6 h-6 select-none" src="/check-mark-box-icon.png" alt=""> <h1>{{Category.T_Completed}} <span class="text-base  opacity-90" >Total Task</span> </h1></span>
          <span class="flex gap-2 text-lg font-medium    items-center "><img class="w-6 h-6 select-none" src="/check-mark-incompleted-box-icon.png" alt=""> <h1>{{Category.T_InCompleted}} <span class="text-base  opacity-90" >Total Task</span></h1></span>
        </span>
      </div>
      <!-- 3nd row -->
      <div class="flex flex-col gap-1">
        <h1 class=" text-sm  font-semibold text-red-100">  <span class=" opacity-60 "> In Which  </span>Time Exceeded Task : {{Category.T_Time_Exceeded}}  </h1>
        <span class="flex justify-around ">
        
          <span class="flex gap-2 text-lg font-medium   items-center "><img class="w-5 h-5 select-none" src="/check-mark-box-icon.png" alt=""> <h1>{{Category.T_Time_Exceeded_Completed}} <span class="text-base  opacity-90" >Task</span> </h1></span>
          <span class="flex gap-2 text-lg font-medium   items-center "><img class="w-5 h-5 select-none" src="/check-mark-incompleted-box-icon.png" alt=""> <h1>{{Category.T_Time_Exceeded_InCompleted}} <span class="text-base  opacity-90" >Task</span></h1></span>
        </span>
      </div>

    </span>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
