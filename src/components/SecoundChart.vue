<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref, computed, watch } from 'vue'
import { useTodoStore } from '../stores/TodoLocalData';
import { useLayoutStore } from "../stores/Layout";



// SortBy Button Varible
const Drop = ref(false);
const SortBy = ref('')
const storeTodo = useTodoStore();
const storeLayout = useLayoutStore();
const allTask = storeTodo.TodoData.TodoList.concat(storeTodo.TodoData.TimeoutList)
const GroupByDate = allTask.reduce((gpdate, task) => {
    const date = getFullDate(task.start_time)
    if (gpdate[date] == null) {
        gpdate[date] = { Completed: 0, completed_time: 0, Expected_time: 0, AvgCompletedTime: 0, AvgExpectedTime: 0 }
    }

    var Completed = 0;
    var completed_time = 0;
    var Expected_time = 0;
    if (task.completed) {
        Completed = 1;
        if (task.Last_Modification_At) {
            completed_time = task.Last_Modification_At - task.start_time;
        }
        Expected_time = task.end_time - task.start_time;
    }

    gpdate[date] = {
        Completed: gpdate[date].Completed + Completed,
        completed_time: gpdate[date].completed_time + completed_time,
        Expected_time: gpdate[date].Expected_time + Expected_time,
        AvgCompletedTime: gpdate[date].completed_time / gpdate[date].Completed,
        AvgExpectedTime: gpdate[date].Expected_time / gpdate[date].Completed,
    }

    return gpdate
}, {})




// Methods
function getFullDate(Sec = new Date().getTime()) {
    const GetDateObj = new Date(Sec);
    return `${GetDateObj.getDate()}-${GetDateObj.getMonth() + 1}-${GetDateObj.getFullYear()}`
}

function Get_Nth_Last_Dates(No_Previous_day = 0) {
    return getFullDate(new Date().getTime() - 24 * 60 * 60 * 1000 * No_Previous_day);
}

function ConvertToHour(microSec) {
    const Sec = Math.floor((microSec) / 1000);
    const hours = Sec / 3600;
    return hours
}



function Extract_Data_from_Gp_by_date_using_input_list(List) {
    var GroupByDateCopy = GroupByDate
    var list = [];
    var lastWeekDates = List
    for (let i = 0; i < lastWeekDates.length; i++) {
        const element = lastWeekDates[i];
        if (GroupByDateCopy[element]) {
            list.push({
                x: element,
                // storeLayout.toDaysMinutesSeconds(Math.floor((new Date(storeTodo.TodoData.TodoList[0].end_time) - new Date().getTime()) / 1000))
                // AvgCompletedTime: GroupByDateCopy[element].AvgCompletedTime
                // , AvgExpectedTime:  GroupByDateCopy[element].AvgExpectedTime
                AvgCompletedTime: ConvertToHour(GroupByDateCopy[element].AvgCompletedTime)
                , AvgExpectedTime: ConvertToHour(GroupByDateCopy[element].AvgExpectedTime)

                , Completed: GroupByDateCopy[element].Completed
            })
        } else {
            list.push({ x: element, AvgCompletedTime: 0, Completed: 0, AvgExpectedTime: 0 })
        }

    }
    return list
}



//  Sort By Data 
const GetLast7Days = function (days = 7) {
    const LastDays = []

    for (let i = 0; i < days; i++) {
        LastDays.push(Get_Nth_Last_Dates(i))
    }
    return LastDays.reverse()
}

const keysSortedByCompleted = Object.keys(GroupByDate).sort(function (a, b) { return GroupByDate[b].Completed - GroupByDate[a].Completed })

const keysSortedByAvgCompleted = Object.keys(GroupByDate).sort(function (a, b) { return GroupByDate[b].AvgCompletedTime - GroupByDate[a].AvgCompletedTime })

const keysSortedByAvgExpected = Object.keys(GroupByDate).sort(function (a, b) { return GroupByDate[b].AvgExpectedTime - GroupByDate[a].AvgExpectedTime })















onMounted(() => {
    const intialData = Extract_Data_from_Gp_by_date_using_input_list(GetLast7Days());
    const intialLabelList = GetLast7Days();

    const ctx = document.getElementById('myChart2');
    ctx.width = ctx.parentElement.offsetWidth;
    ctx.height = ctx.parentElement.offsetHeight;
    Chart.defaults.color = 'white';

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: intialLabelList,
            datasets: [{
                label: 'Avg Completed Time',
                data: intialData,
                parsing: {
                    yAxisKey: 'AvgCompletedTime'
                },
                backgroundColor: 'Cyan',
                color: '#0bf8f8',
                tension: 0.1, borderWidth: 10, borderColor: 'Cyan'
            }, {
                label: 'Avg Expected Time',
                data: intialData,
                parsing: {
                    yAxisKey: 'AvgExpectedTime'
                },
                backgroundColor: 'darkgreen',

                color: '#0bf8f8',
                tension: 0.1, borderWidth: 6, borderColor: 'darkgreen'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks: { color: 'white', beginAtZero: true  , text:'Hr' },

                },
                x: {
                    ticks: { color: 'white', beginAtZero: true }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Time Duration Status(hr)',
                    font: {
                        size: 30,
                        weight: '900'
                    },
                    color: '#041955'
                }
            }
        }
    });

    watch(SortBy, async (newQuestion) => {
        if (SortBy.value === 'Recent') {


            myChart.data.labels = GetLast7Days();
            myChart.data.datasets.forEach((dataset) => {
                dataset.data = Extract_Data_from_Gp_by_date_using_input_list(GetLast7Days());
            });
            myChart.update()

        } else if (SortBy.value === 'Expected') {
            myChart.data.labels = keysSortedByAvgExpected;
            myChart.data.datasets.forEach((dataset) => {
                dataset.data = Extract_Data_from_Gp_by_date_using_input_list(keysSortedByAvgExpected);
            });
            myChart.update()
        }
        else if (SortBy.value === 'Completed') {
            myChart.data.labels = keysSortedByCompleted;
            myChart.data.datasets.forEach((dataset) => {
                dataset.data = Extract_Data_from_Gp_by_date_using_input_list(keysSortedByCompleted);
            });
            myChart.update()
        }
        else {
            myChart.data.labels = keysSortedByAvgCompleted;
            myChart.data.datasets.forEach((dataset) => {
                dataset.data = Extract_Data_from_Gp_by_date_using_input_list(keysSortedByAvgCompleted);
            });
            myChart.update()
        }
    })

})
</script>
<template>
    <div class=" w-full h-fit  justify-center   relative  my-5 ">
        <!-- This example requires Tailwind CSS v2.0+ -->
        <span class="  float-right mt-2 mr-2">
            <div class="   relative inline-block text-left">
                <div>
                    <button type="button" @click="Drop=!Drop"
                        class="inline-flex w-full justify-center rounded-md border-0  bg-green-600   items-center  px-3 py-1  text-xs font-medium text-gray-700 shadow-sm  hover:scale-105 focus:outline-none "
                        id="menu-button" aria-expanded="true" aria-haspopup="true">
                        Short By
                        <!-- Heroicon name: mini/chevron-down -->
                        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>


                <div v-show="Drop"
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                        <a class=" cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                            @click="Drop=false;SortBy='Recent'" id="menu-item-0">Recent Week</a>
                        <a class=" cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                            @click="Drop=false;SortBy='Expected'" id="menu-item-1">Top Avg Expected Time</a>
                        <a class=" cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                            @click="Drop=false;SortBy='Completed'" id="menu-item-2">Top Completed</a>
                        <a class=" cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                            @click="Drop=false;SortBy='AvgCompleted'" id="menu-item-2">Top Avg Completed Time</a>

                    </div>
                </div>
            </div>
        </span>
        <div class=" h-80  lg:h-full">

            <div style=" width:100%; height: 100%;">
                <canvas id="myChart2"></canvas>
            </div>
        </div>
    </div>

</template>
<style>
:root {
    color: #0bf8f8;
}
</style>