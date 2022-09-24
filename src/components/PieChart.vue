<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref, computed, watch } from 'vue'
import { useTodoStore } from '../stores/TodoLocalData';







const storeTodo = useTodoStore();
const allTask = storeTodo.TodoData.TodoList.concat(storeTodo.TodoData.TimeoutList)



const Data = allTask.reduce((gpdate, task) => {
    if (task.completed) {
        gpdate[0] += 1
    } else {
        gpdate[1] += 1
    }

    return gpdate
}, [0, 0])






onMounted(() => {

    const ctx = document.getElementById('PieChart');
    ctx.width = ctx.parentElement.offsetWidth;
    ctx.height = ctx.parentElement.offsetHeight;
    Chart.defaults.color = 'white';

    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'Completed',
                'Incompleted'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: Data,
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4,
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Task Status',font: {
                        size: 30,
                        weight:'900'
                    },
                    color:'#041955'
                }
            }
        }

    });


})
</script>
<template>
    <div class="w-full  md:w-96  h-fit  relative   ">
        <canvas id="PieChart" width="200" height="100"></canvas>
    </div>

</template>
<style>
:root {
    color: #0bf8f8;
}
</style>