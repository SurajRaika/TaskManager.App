<script setup>
import Category from "./icons/Category.vue";
import Todo from "./icons/Todo.vue";
import analysis from "./icons/analysis.vue";
import Menu from "./icons/Menu.vue";
</script>
<template>
  <nav class="w-full  lg:w-auto h-10 bg-navbar px-2 flex items-center lg:h-full lg:items-start">
    <div
      class="flex flex-row w-full min-w-min justify-around items-center md:justify-center md:gap-x-5 lg:justify-between lg:flex-col lg:h-60">
      <span class="cursor-pointer hidden lg:flex lg:h-9 lg:items-center">
        <Menu></Menu>
      </span>
      <router-link :to="{name:'todo'}">
        <Todo class="cursor-pointer" />
      </router-link>
      <router-link :to="{name:'categories'}">
        <Category class="cursor-pointer" />
      </router-link>
      <router-link :to="{name:'analysis'}">
        <analysis class="cursor-pointer" />
      </router-link>
    </div>
  </nav>
</template>
<script setup></script>
<style>

</style>
