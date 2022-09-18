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
        },
        Gettime(TotalSec) {
            const mounth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
            let time = `${new Date(TotalSec).getHours()}:${new Date(TotalSec).getMinutes()}`
          
            if (new Date().getDate() === new Date(TotalSec).getDate()) {
              return `Today, ${time}`
            }
            if (new Date().getDate() === new Date(TotalSec).getDate() - 1) {
              return `Tomorrow, ${time}`
            }
            if (new Date().getDate() === new Date(TotalSec).getDate() + 1) {
              return `Yesterday, ${time}`
            }
            return `${new Date(TotalSec).getDate()} ${mounth[new Date(TotalSec).getMonth()]}, ${time}`
          },
          toDaysMinutesSeconds(totalSeconds) {
            function makeHumanReadable(num, singular) {
              return { num: num, unit: `${singular}` }
            }
            const seconds = Math.floor(totalSeconds % 60);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const days = Math.floor(totalSeconds / (3600 * 24));
            if (days) {
              return makeHumanReadable(days, 'day')
            }
            if (hours) {
              return makeHumanReadable(hours, 'hr')
            }
            if (minutes) {
              return makeHumanReadable(minutes, 'min')
            }
            if (seconds) {
              return makeHumanReadable(seconds, 'sec')
            }
          
          }
    }
});