var submitbutton = document.getElementById('submit');
var inputtask = document.getElementById('task')
var form = document.getElementById('form')
var maindiv = document.getElementById('main')
var taskdiv = document.getElementById('tasks')
var ul = document.getElementById('taskitems')
var tasks = []


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js"

const dataset = {
    databaseURL : "https://sample-project-1-16ac6-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const initdatabase = initializeApp(dataset)
const database = getDatabase(initdatabase)
const link = ref(database, "todolist")

onValue(link,function(list){
    if(list.exists()){
    ul.innerHTML = ''
    tasks = Object.entries(list.val())
    for (let i of tasks){
        addtasks(i)
    }
}
})




submitbutton.addEventListener('click',()=>{
    let inval = inputtask.value
    inval = toTitleCase(inval)
    if (inval != ""){
        //add code to check if the task is already in the list or not
        push(link,inval)
    }
})





function clearinputbox(){
    inputtask.innerHTML = ''
}

function addtasks(value){
    let li = document.createElement('li')
    li.id = value[0]
    li.className = 'taskitems'
    li.textContent = value[1]
    ul.appendChild(li)
}

function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

form.addEventListener('submit',(event)=>{
    event.preventDefault()
})

document.addEventListener('click',(event)=>{
    let ids = []
    ids = ul.querySelectorAll('li')
    for (let i of ids){
        if(i.id == event.target.id){
            console.log(event.target.textContent)
            let temp = ref(database, `todolist/${i.id}`)
            remove(temp)
        }

}
})