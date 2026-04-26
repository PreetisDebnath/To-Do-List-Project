let taskInput = document.getElementById("taskInput")
let addBtn = document.getElementById("addBtn")
let taskList = document.getElementById("taskList")
let count = document.getElementById("count")
let date = document.getElementById("date")
let time = document.getElementById("time")
let filterDate = document.getElementById("filterDate")
let showAll = document.getElementById("showAll")

let total = 0

setToday()
showTasksForDate()
showTime()

setInterval(showTime, 1000)

addBtn.addEventListener("click", addTask)

taskInput.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        addTask()
    }
})

filterDate.addEventListener("change", function(){
    updateButtonText()
    showTasksForDate()
})

updateButtonText()

function setToday(){

    let now = new Date()

    let today = now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2,"0") + "-" +
    String(now.getDate()).padStart(2,"0")

    filterDate.value = today
}

function updateButtonText(){

    let selected = filterDate.value

    if(selected == ""){
        addBtn.innerText = "Add"
        showAll.innerText = "Show Tasks"
    }
    else{
        let text = new Date(selected).toDateString()
        showAll.innerText = "Current Tasks" 
    }
}

function addTask(){

    let text = taskInput.value.trim()

    if(text == ""){
        return
    }

    let selectedDate = filterDate.value
    let now = new Date()

    let task = {
        name: text,
        done: false,
        realDate: selectedDate,
        date: new Date(selectedDate).toDateString(),
        time: now.toLocaleTimeString()
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    tasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(tasks))

    showTasksForDate()

    taskInput.value = ""
}

function createTask(task){

    let li = document.createElement("li")

    let topDiv = document.createElement("div")
    topDiv.classList.add("taskTop")

    let span = document.createElement("span")
    span.innerText = task.name
    span.classList.add("taskText")

    if(task.done){
        span.classList.add("done")
    }

    let btnBox = document.createElement("div")
    btnBox.classList.add("btns")

    let completeBtn = document.createElement("button")
    completeBtn.innerText = "Done"
    completeBtn.classList.add("complete")

    let deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Delete"
    deleteBtn.classList.add("delete")

    btnBox.appendChild(completeBtn)
    btnBox.appendChild(deleteBtn)

    topDiv.appendChild(span)
    topDiv.appendChild(btnBox)

    let small = document.createElement("p")
    small.classList.add("taskDate")
    small.innerText = task.date + " , " + task.time

    li.appendChild(topDiv)
    li.appendChild(small)

    taskList.appendChild(li)

    total++
    count.innerText = total + " Tasks"

    completeBtn.addEventListener("click", function(){
        task.done = !task.done
        saveUpdated(task)
    })

    deleteBtn.addEventListener("click", function(){
        removeTask(task)
    })
}

function showTasksForDate(){

    let selected = filterDate.value

    taskList.innerHTML = ""
    total = 0

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    for(let i = 0; i < tasks.length; i++){

        if(tasks[i].realDate == selected){
            createTask(tasks[i])
        }
    }

    count.innerText = total + " Tasks"
}

function saveUpdated(task){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []

    for(let i = 0; i < tasks.length; i++){

        if(
            tasks[i].name == task.name &&
            tasks[i].date == task.date &&
            tasks[i].time == task.time
        ){
            tasks[i] = task
        }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks))

    showTasksForDate()
}

function removeTask(task){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    let newTasks = []

    for(let i = 0; i < tasks.length; i++){

        if(
            tasks[i].name == task.name &&
            tasks[i].date == task.date &&
            tasks[i].time == task.time
        ){
        }
        else{
            newTasks.push(tasks[i])
        }
    }

    localStorage.setItem("tasks", JSON.stringify(newTasks))

    showTasksForDate()
}

function showTime(){

    let now = new Date()

    date.innerText = now.toDateString()
    time.innerText = now.toLocaleTimeString()
}