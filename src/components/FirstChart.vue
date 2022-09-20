<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref, computed } from 'vue'
import { useTodoStore } from '../stores/TodoLocalData';







// SortBy Button Varible
const Drop = ref(false);
const SortBy = ref('')


// declaration
const storeTodo = useTodoStore();
const allTask = storeTodo.TodoData.TodoList.concat(storeTodo.TodoData.TimeoutList)
const GroupByDate = allTask.reduce((gpdate, task) => {
    const date = getFullDate(task.start_time)
    if (gpdate[date] == null) {
        gpdate[date] = { Total: 0, Completed: 0, InCompleted: 0 }
    }

    var NoInCompleted = 0;
    var NoCompleted = 0;
    if (task.completed) {
        NoCompleted = 1
    }
    else {
        NoInCompleted = 1

    }
    gpdate[date] = { Total: gpdate[date].Total + 1, Completed: gpdate[date].Completed + NoCompleted, InCompleted: gpdate[date].InCompleted + NoInCompleted }

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



//  Sort By Data 4

// Recent Week
function GetLast7Days(days = 7) {
    const LastDays = []

    for (let i = 0; i < days; i++) {
        LastDays.push(Get_Nth_Last_Dates(i))
    }
    return LastDays.reverse()
}

// Top  Day Created By 
const keysSortedByTotal = Object.keys(GroupByDate).sort(function (a, b) { return GroupByDate[a].Total - GroupByDate[b].Total })

console.log(keysSortedByTotal);






let Extract_Data_from_Gp_by_date_using_input_list = function (List) {
    var GroupByDateCopy = GroupByDate
    console.log(GroupByDateCopy);
    var list = [];
    var lastWeekDates = List
    for (let i = 0; i < lastWeekDates.length; i++) {
        const element = lastWeekDates[i];
        console.log(element);
        if (GroupByDateCopy[element]) {
            list.push({ x: element, Total: GroupByDateCopy[element].Total, Completed: GroupByDateCopy[element].Completed, InCompleted: GroupByDateCopy[element].InCompleted })
        } else {
            list.push({ x: element, Total: 0, Completed: 0, InCompleted: 0 })
        }

    }
    return list
}

const LabelsList = ref([]);
const data = computed(() => {
    if (SortBy === 'Recent') {
        return Extract_Data_from_Gp_by_date_using_input_list(GetLast7Days());
        LabelsList.value = GetLast7Days();
    } else if (SortBy === 'Created') {
        console.log('created');
        return Extract_Data_from_Gp_by_date_using_input_list(keysSortedByTotal);
        LabelsList.value = keysSortedByTotal;
    }
    return Extract_Data_from_Gp_by_date_using_input_list(GetLast7Days());
    LabelsList.value = GetLast7Days();
});





console.log(GetLast7Days());

// const data = [{ x: 'Jan', net: 100, cogs: 50, gm: 50 }, { x: 'Feb', net: 120, cogs: 55, gm: 75 }];
// const data = [{x: '20-9-2022', Total: 5, Completed: 1, InCompleted: 5}, {x: '19-9-2022', Total: 2, Completed: 4, InCompleted: 8}];

console.log(data.value);
onMounted(() => {
    const ctx = document.getElementById('myChart');
    ctx.width = ctx.parentElement.offsetWidth;
    ctx.height = ctx.parentElement.offsetHeight;

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: LabelsList.value,
            datasets: [{
                label: 'Total Task',
                data: data.value,
                parsing: {
                    yAxisKey: 'Total'
                },
                backgroundColor: 'purple '
            }, {
                label: 'Completed Task',
                data: data.value,
                parsing: {
                    yAxisKey: 'Completed'
                },
                backgroundColor: 'blue'
            }, {
                label: 'Pending Task',
                data: data.value,
                parsing: {
                    yAxisKey: 'InCompleted'
                },
                backgroundColor: 'red'
            }]
        },
    });

})
</script>
<template>
    <div class=" w-full  h-fit border relative  ">
        <!-- This example requires Tailwind CSS v2.0+ -->
        <span class="  float-right mt-2 mr-2">
            <div class="   relative inline-block text-left">
                <div>
                    <button type="button" @click="Drop=!Drop"
                        class="inline-flex w-full justify-center rounded-md border-0  bg-green-600 font-semibold  items-center  px-3 py-1  text-xs font-medium text-gray-700 shadow-sm  hover:scale-105 focus:outline-none "
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
                            @click="Drop=false;SortBy='Created'" id="menu-item-1">Top Created</a>
                        <a class=" cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                            @click="Drop=false;SortBy='Completed'" id="menu-item-2">Top Completed</a>
                        <a class=" cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                            @click="Drop=false;SortBy='InCompleted'" id="menu-item-2">Top InCompleted</a>

                    </div>
                </div>
            </div>
        </span>
        <div clas="w-full h-60 sm:h-96">
            <canvas id="myChart"></canvas>
        </div>
    </div>

</template>
<style>

</style>