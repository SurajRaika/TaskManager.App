<script setup>
import AddTask from "./AddTask.vue";
import Todo from "../views/todo.vue";
import Popup from "./Popup.vue";
</script>
<template>
  <div class=" w-full  flex-1 border overflow-hidden relative">
    <Popup/>
    <!-- <router-view class="ScrollStyle_Router w-full min-h-full  overflow-y-scroll"></router-view> -->
    <div class="container">
      <span>ds</span>
    </div>
    <AddTask class="  absolute bottom-5 right-5 lg:bottom-10 lg:right-10"></AddTask>
  </div>
</template>
<style>

.container{
  width: 100%;
  min-height:100% ;
  border: violet 3rem dotted;
}
.container span{
  width: 10rem ;
  height: 3rem ;
  background-color: aqua;
}
 
</style>
