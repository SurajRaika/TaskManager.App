<script setup>
import TheNavbar from "./components/TheNavbar.vue";
import TopBar from "./components/TopBar.vue";
import Content from "./components/Content.vue";
import { useTodoStore } from "./stores/TodoLocalData";
const storeTodo = useTodoStore();

</script>

<template>
  <div class=" flex w-full h-full flex-col-reverse lg:flex-row  bg-orange-400">
    <TheNavbar />
    <div class="flex-1  flex flex-col   bg-LightBlue " >
      <TopBar ></TopBar>
      <Content />
    </div>
  </div>


</template>
<style>
  
</style>


