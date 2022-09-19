function getYesterdayDate(No_Previous_day) {
    return new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * No_Previous_day).getDate();
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

let all = [
    {
        "Category": "sdasd",
        "Title": "asd",
        "description": "",
        "start_time": 1663500132244,
        "end_time": 1663845960000,
        "completed": false,
        "timeout": false,
        "Last_Modification_At": 1663501180318
    },
    {
        "Category": "sd",
        "Title": "sd",
        "description": "sd",
        "start_time": 1663500122029,
        "end_time": 1664554860000,
        "completed": false,
        "timeout": false
    },
    {
        "Category": "dfg",
        "Title": "gf",
        "description": "dg",
        "start_time": 1663501337517,
        "end_time": 1663508520000,
        "completed": true,
        "timeout": false,
        "Last_Modification_At": 1663501374526
    },
    {
        "Category": "ujik",
        "Title": "hjkjhk",
        "description": "jhk",
        "start_time": 1663501082647,
        "end_time": 1663501020000,
        "completed": true,
        "timeout": false
    },
    {
        "Category": "surja",
        "Title": "asdgoogle",
        "description": "adsf",
        "start_time": 1663500532922,
        "end_time": 1663500480000,
        "completed": true,
        "timeout": false
    },
    {
        "Category": "sdasd",
        "Title": "asd",
        "description": "asd",
        "start_time": 1663500205422,
        "end_time": 1663417380000,
        "completed": true,
        "timeout": false
    },
    {
        "Category": "sdasd",
        "Title": "asd",
        "description": "asd",
        "start_time": 1663500237669,
        "end_time": 1663414080000,
        "completed": true,
        "timeout": false
    },
    {
        "Category": "dsfsdf",
        "Title": "df",
        "description": "dsfsdf",
        "start_time": 1663500287219,
        "end_time": 1663500240000,
        "completed": false,
        "timeout": false
    },
    {
        "Category": "dsf",
        "Title": "as",
        "description": "sd",
        "start_time": 1663500262764,
        "end_time": 1663500360000,
        "completed": true,
        "timeout": false
    },
    {
        "Category": "sdasd",
        "Title": "sad",
        "description": "asd",
        "start_time": 1663500433941,
        "end_time": 1663500420000,
        "completed": true,
        "timeout": false
    }
];


//    const gpdata=groupBy(all,task=>{
//      return  new Date(task.end_time).getDate();
//    })
//    console.log(gpdata.get(17));








const gpdata=all.reduce((gpCategorys,task)=>{
    
    const ct=task.Category
    if (gpCategorys[ct] == null) {
        gpCategorys[ct]=[]
    }
    gpCategorys[ct].push(task)
    return gpCategorys
},[])
console.log(gpdata);
   