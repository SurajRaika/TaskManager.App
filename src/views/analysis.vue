<script  setup>

import FirstChart from '../components/FirstChart.vue';
import PieChart from '../components/PieChart.vue';


</script>
<template>
  <div class="p-3  md:p-14 pt-0 md:pt-0  lg:grid lg:grid-flow-col ">

    <FirstChart class="my-5"></FirstChart>
    <div class=" Wrapper  lg:h-fit grid-flow-row lg:grid-flow-col gap-10 my-5 mb-20 ">
      <PieChart class=" justify-self-center"></PieChart>
    </div>
  </div>

</template>

<style scoped>
.Wrapper {
  display: grid;
  /* grid-template-columns: 1fr; */
  align-items: center;
}
</style>
