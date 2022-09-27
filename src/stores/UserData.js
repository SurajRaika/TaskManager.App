import { defineStore } from "pinia";
export const useLayoutStore = defineStore({
    id:'UserData',
    state:()=>({
        Name:'User1',
        
    }),
    actions:{
        ShowPopup(){
            this.Popup=true;
        },
       
        
         
    }
});


