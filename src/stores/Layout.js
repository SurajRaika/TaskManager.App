import { defineStore } from "pinia";
export const useLayoutStore = defineStore({
    id:'LayoutData',
    state:()=>({
        Popup:false
    }),
    actions:{
        ShowPopup(){
            this.Popup=true;
        },
        HidePopup(){
            this.Popup=false;
        }
    }
});