<script setup>
import Category from "./icons/Category.vue";
import Todo from "./icons/Todo.vue";
import analysis from "./icons/analysis.vue";
import Menu from "./icons/Menu.vue";
import { ref} from 'vue'

const MenuToggle=ref(false)


</script>
<template>
  <nav
  :class="[MenuToggle ? 'lg:w-44'  :'lg:w-12']"
    class="TheNavbar transition-all  fixed   bottom-0 w-full  z-40   min-h-fit lg:top-0 lg:left-0  h-10 bg-navbar px-2 flex items-center lg:h-full lg:items-start">
    <div
      class="flex flex-row w-full min-w-min justify-around items-center md:justify-center md:gap-x-5 lg:justify-between lg:flex-col lg:h-60">
      <span @click="MenuToggle=!MenuToggle" class="w-full cursor-pointer hidden lg:flex lg:h-9 lg:items-center">
        <Menu></Menu>
      </span>
      <router-link :to="{name:'todo'}" class=" lg:flex    lg:w-full  lg:gap-3">
        <Todo class="cursor-pointer" /><h1 class=" text-xl font-bold" v-show="MenuToggle">Todo</h1>
      </router-link>
      <router-link :to="{name:'categories'}" class=" lg:flex    lg:w-full  lg:gap-3">
        <Category class="cursor-pointer" /><h1 class=" text-xl font-bold" v-show="MenuToggle">Category</h1>
      </router-link>
      <router-link :to="{name:'analysis'}" class=" lg:flex    lg:w-full  lg:gap-3">
        <analysis class="  cursor-pointer" /><h1 class=" text-xl font-bold" v-show="MenuToggle">Analysis</h1>
      </router-link>
    </div>
  </nav>
</template>
<script setup></script>
<style>
.transition-width {
    transition-property: width;
    transition-timing-function:  ease-in-out;
    transition-duration: 150ms;
}
</style>
