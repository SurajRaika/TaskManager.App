<script  setup>
  import {  onMounted} from "vue";
import { useTodoStore } from '../stores/TodoLocalData';

const storeTodo = useTodoStore();



</script>
<template>
  <div class="p-3  md:p-14 pt-0 md:pt-0  ">

  <h1 class="text-3xl font-bold font-serif ">Total Category: {{storeTodo.TodoData.categories.length}}</h1>
  <h1> Active : {{storeTodo.CategoriesStatus().active}}</h1>
  <h1> InActive : {{storeTodo.CategoriesStatus().inactive}}</h1>

  <h1 class="font-semibold text-lg">Categories</h1>
  <div class="flex flex-wrap gap-5 mb-5">
    <span class=" startingAnimation p-2 w-full sm:w-96 catrgoriesBox rounded-md flex flex-col" v-for="Category in storeTodo.TodoData.categories"
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

          <span class="flex gap-2 text-lg font-medium  items-center "><img class="w-6 h-6 select-none " src="/check-mark-box-icon.png" alt=""> <h1>{{Category.T_Completed}} <span class="text-base  opacity-90" >Total Task</span> </h1></span>
          <span class="flex gap-2 text-lg font-medium    items-center "><img class="w-6 h-6 select-none" src="/check-mark-incompleted-box-icon.png" alt=""> <h1>{{Category.T_InCompleted}} <span class="text-base  opacity-90" >Total Task</span></h1></span>
        </span>
      </div>
      <!-- 3nd row -->
    

    </span>
  </div>
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
.catrgoriesBox{

  background: rgb(0,0,0);
background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(12,6,157,1) 0%, rgba(12,6,157,1) 91%, rgba(8,0,195,1) 96%, rgba(0,0,0,0) 100%);

}
</style>
