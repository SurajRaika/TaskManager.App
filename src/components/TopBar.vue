<script setup>
import HelpLogoVue from "./icons/HelpLogo.vue";
import Bell from "./icons/Bell.vue";
import DownArroy from "./icons/DownArroy.vue";
</script>
<template>
  <div class=" w-full max-h-8 flex justify-between">
    <div class="flex w-full h-full items-center">
      <span class="text-xl font-bold">Todo.app</span>
    </div>

    <div
      class="flex w-5/6 md:w-1/3 lg:w-1/4 justify-around items-center h-full"
    >
      <HelpLogoVue></HelpLogoVue>
      <Bell></Bell>
      <DownArroy></DownArroy>
      <span class="text-base">Suraj raika</span>
      <img class="h-full rounded-full" src="../assets/profile-picture.webp" />
    </div>
  </div>
</template>
