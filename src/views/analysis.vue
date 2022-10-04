<script  setup>

import FirstChart from '../components/FirstChart.vue';
import PieChart from '../components/PieChart.vue';
import {  ref} from "vue";
import { useTodoStore } from "../stores/TodoLocalData";
const storeTodo = useTodoStore();

const ShowverificationBox = ref(false)

</script>
<template>
  <div class="p-3  md:p-14 pt-0 md:pt-0  lg:grid lg:grid-flow-col ">

    <FirstChart class="my-5 "></FirstChart>
    <div class="   lg:h-fit grid-flow-row  lg:grid-flow-col gap-10 my-5 mb-20 ">
      <PieChart class=" justify-self-center"></PieChart>
      <div @click="ShowverificationBox=true" class=" w-fit py-1 px-8 rounded-sm cursor-pointer bg-clearData inline-block">
        Clear Data!
      </div>
      <div v-show="ShowverificationBox">
        All Progress Will Reset, <br>
        Are You Sure 
        <span  class="  inline-flex gap-2">
          <span @click="storeTodo.resetData()" class="cursor-pointer border-2 px-1  hover:bg-blue-900   border-blue-900 rounded-md">Yes</span>
          <span  @click="ShowverificationBox=false" class="cursor-pointer border-2 px-1  hover:bg-blue-900   border-blue-900 rounded-md">No</span>
        </span>
      </div>
    </div>
  </div>

</template>

<style scoped>
.bg-clearData{
  background: blue;
}
</style>
