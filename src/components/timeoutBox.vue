<script setup>
    import { useTodoStore } from "../stores/TodoLocalData";
import { useLayoutStore } from "../stores/Layout";
const storeLayout = useLayoutStore();
const storeTodo = useTodoStore();

defineProps({
    task:Object
})


</script>
<template>
        <!-- 1st -->
        <div class=" flex justify-between w-full items-center">
          <span class=" flex items-center gap-2 text-lg font-semibold  text-blue-200">
            <input disabled="true" @mouseout="storeTodo.save()" type="checkbox" v-model="task.completed" name="" id="">
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
        <div class="   w-full  font-medium text-blue-500">
          <span class="float-right">
            {{storeLayout.Gettime(task.end_time)}}
          </span>
          <span class="float-left  text-red-600">
            {{storeLayout.Gettime(task.end_time)}}
            - 3 hr
          </span>
        </div>
</template>