<script setup>
  
import TheNavbar from "./components/TheNavbar.vue";
import TopBar from "./components/TopBar.vue";
import { useTodoStore } from "./stores/TodoLocalData";
import AddTask from "./components/AddTask.vue";
import Popup from "./components/Popup.vue";
import { useLayoutStore } from "./stores/Layout";

const storeLayout= useLayoutStore();
const storeTodo = useTodoStore();


setInterval(() => {
  if (storeTodo.TodoData.TodoList.length) {
    if (new Date().getTime() > storeTodo.TodoData.TodoList[0].end_time) {
      Notify(storeTodo.TodoData.TodoList[0])
      storeTodo.AddTimeoutList(storeTodo.TodoData.TodoList[0].end_time)
    }
  }
}, 2000);


function Notify(About_Task) {
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {

      const notification = new Notification(About_Task.Title, {
        body: `TimeOut-${storeLayout.Gettime(About_Task.end_time)}`,
        icon:"timeout-clock.png"
      })
      notification.addEventListener('click',e=>{
      })
    }
  })
}



</script>

<template>
  <!-- unscrollable  -->
  <div  class=" min-w-screen  min-h-screen   Content-bg lg:flex lg:flex-row-reverse  ">
    <!-- content -->
    <div    class=" width_content">

      <TopBar 
        class="header width_content max-h-8 fixed top-0"></TopBar>
      <div class="Content   py-8  lg:pb-0 ">
        <Popup></Popup>
        <AddTask></AddTask>
        <router-view id="ScrollSection" class=" overflow-y-scroll  h-screen" ></router-view>
      </div>

    </div>
    <TheNavbar class=" TheNavbar  fixed   bottom-0  min-h-fit lg:top-0 lg:left-0"></TheNavbar>
  </div>



  <!-- scrollable  -->


</template>
<style>

</style>


