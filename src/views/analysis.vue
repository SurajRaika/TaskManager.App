<script  setup>
    
  // import 
  import { useTodoStore } from '../stores/TodoLocalData';



  // declaration
  const storeTodo = useTodoStore();
  const allTask=storeTodo.TodoData.TodoList.concat(storeTodo.TodoData.TimeoutList)
  const GroupByDate = allTask.reduce((gpdate, task) => {
      const date = getFullDate(task.end_time)
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
  function getFullDate(Sec=new Date().getTime()){
      const GetDateObj=new Date(Sec);
      return `${GetDateObj.getDate()}-${GetDateObj.getMonth() + 1}-${GetDateObj.getFullYear()}`
  }

  function Get_Nth_Last_Dates(No_Previous_day=0) {
    return getFullDate(new Date().getTime() - 24 * 60 * 60 * 1000 * No_Previous_day);
  }

  function GetLast7Days(days=7) {
    const LastDays=[]
    
    for (let i = 0; i < days; i++) {
      LastDays.push(Get_Nth_Last_Dates(i))
    }
    return LastDays
  }

 
  // Data For graph 1
  //  Recent Last 
  // console.log(GetLast7Days());
  console.log(GroupByDate);


  // Data For Graph2
  // Top Days By Created
  var keysSortedByTotal = Object.keys(GroupByDate).sort(function(a,b){ return GroupByDate[a].Total -GroupByDate[b].Total})
  // console.log(keysSortedByTotal);



  // Data For Graph3
  // Top Days By completed
  var keysSortedByCompleted = Object.keys(GroupByDate).sort(function(a,b){ return GroupByDate[a].Completed -GroupByDate[b].Completed})
  console.log(keysSortedByCompleted);











    
  </script>
  <template>
  </template>

  <style>

  </style>
