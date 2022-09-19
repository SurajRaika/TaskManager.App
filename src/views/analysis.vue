<script  setup>
import { useTodoStore } from '../stores/TodoLocalData';
const storeTodo = useTodoStore();
const allTask=storeTodo.TodoData.TodoList.concat(storeTodo.TodoData.TimeoutList)
console.log(allTask);
console.log(storeTodo.TodoData);
function data() {
  const graphData = [{Date:'',taskCreated:[ ]},];
  
}
  
</script>
<template>

</template>

<style>

</style>
