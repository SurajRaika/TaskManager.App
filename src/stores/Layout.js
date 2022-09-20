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
          
            if (getFullDate() === getFullDate(TotalSec)) {
              return `Today, ${time}`
            }
            if (getFullDate() === getFullDate(TotalSec - 24 * 60 * 60 * 1000)) {
              return `Tomorrow, ${time}`
            }
            if (getFullDate() === getFullDate(TotalSec + 24 * 60 * 60 * 1000)) {
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



function getFullDate(Sec=new Date().getTime()){
  const GetDateObj=new Date(Sec);
  return `${GetDateObj.getDate()}-${GetDateObj.getMonth() + 1}-${GetDateObj.getFullYear()}`
}