<script setup>


import { ref, computed, watch } from 'vue'
import { useTodoStore } from "../stores/TodoLocalData";


const emit = defineEmits(['CategoryData'])

const storeTodo = useTodoStore();

const Text = ref('')
const ShowSuggestion = ref(false)
const categories = storeTodo.TodoData.categories || ["googel"]
const suggestion = computed(() => {
    return Suggestion_sort_based_on_input()
})


watch(Text, async (newText) => {
    emit('CategoryData', newText)
})




function Suggestion_sort_based_on_input() {
    var array = [];
    for (let i = categories.length - 1; i >= 0; i--) {

        const element = categories[i];
        if (element.toLowerCase().includes(Text.value.toLowerCase())) {
            array.push(element);

        };

    };

    return array
}


</script>
<template >
    <div class=" ">
        <label for="categories">Categories</label>
        <div class=" relative w-full">
            <input type="text" v-model="Text" class="w-full" id="categories"  placeholder="Category.."
                @blur="ShowSuggestion = false" @focus.self="ShowSuggestion = true">
            <div class=" absolute " v-show="ShowSuggestion">
                <span v-for="item in suggestion" class="sugg-box" @mousedown="Text = item">{{ item }}</span>
            </div>
        </div>
    </div>

</template>
