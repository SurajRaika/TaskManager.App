<script  setup>

import FirstChart from '../components/FirstChart.vue';
import SecoundChart from '../components/SecoundChart.vue';
import PieChart from '../components/PieChart.vue';


</script>
<template>
  <FirstChart class="my-5"></FirstChart>
  <div class=" Wrapper  lg:h-fit grid-flow-row lg:grid-flow-col gap-10 my-5 ">
    <PieChart class=" justify-self-center"></PieChart>
    <SecoundChart class="   justify-self-center w-full  h-full"></SecoundChart>
  </div>
</template>

<style scoped>
.Wrapper {
  display: grid;
  /* grid-template-columns: 1fr; */
  align-items: center;
}
</style>
