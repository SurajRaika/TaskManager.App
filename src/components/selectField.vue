
<script>
export default {
props:{
    categoryList:Array
},
    data() {
        return {
            categories: this.categoryList,
            Text: '',
            ShowSuggestion: false
        }
    },
    methods: {
        Suggestion_sort_based_on_input() {
            var array = [];
            for (let i = this.categories.length - 1; i >=0 ; i--) {

                const element = this.categories[i];
                if (element.toLowerCase().includes(this.Text.toLowerCase())) {
                    if (array.length > 5) {
                        break
                    }
                    array.push(element);

                };

            };

            return array
        },

    },
    computed: {

        suggestion() {


            return this.Suggestion_sort_based_on_input()

        }
    },
    watch: {
        Text(newText) {
            this.$emit('GetData', newText)
        }
    },
    mounted() {

    },


}
</script>
<template >
    <div class="selectField_category">
        <label for="categories">Categories</label>
        <div class="main">
            <input v-model="Text" id="categories" name="categories" placeholder="Category.."
                @blur="ShowSuggestion = false" @focus.self="ShowSuggestion = true">
        </div>
        <div class="suggestion flex flex-col" v-show="ShowSuggestion">
            <span v-for="item in suggestion" class=" block " :id='item' @mousedown="Text = item">{{ item }}</span>
        </div>
    </div>

</template>
<style scoped>
#categories {
    height: var(--form-input-height);
}

.selectField_category {
    width: fit-content;
    position: relative;
}

input {
    font-size: var(--form-text-size);
    border: 0;
    background-color: transparent;
    padding: 2px;

}

.suggestion {
    border: 1px solid rgba(255, 247, 247, 0.445);
    position: absolute;
    z-index: 1;
    width: 100%;
    height: min-content;
    max-height: calc(3 * var(--form-input-height));
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 0.1rem;
    background-color: #0e6eaa;

}
.suggestion::-webkit-scrollbar {
    background-color: transparent;
}


label {
    color: black;
}

.sugg-box {
    font-size: calc(var(--form-text-size) - 0.1rem);
    width: 100%;
    display: inline-block;
    cursor: pointer;
    margin: 1px;
    color: black;
}

.sugg-box:hover {
    background-color: rgba(240, 248, 255, 0.473);
}

.main {
    border-radius: 0.3rem;
    background: white;
    padding: 0.1rem;
    height: var(--form-input-height);

}

button {
    font-size: calc(var(--form-text-size) - 0.1rem);
    padding: 0.01rem 1rem;
    font-weight: 900;
    height: 100%;
    background-color: transparent;
    cursor: pointer;
    border-radius: 0.3rem;
    border-color: rgba(0, 0, 0, 0.418);

}

button:hover {
    background-color: rgba(0, 0, 0, 0.192);

}
</style>