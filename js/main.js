let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let completedTaskList = document.getElementById("completedTaskList");
let timeHtml = document.querySelector("#time");


console.log( new Date().getMonth() + 1 )

// Date start
function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Notice that Javascript Started Months with index 0
  let month = new Date().getMonth() + 1
  let date = now.getDate() + " - " +  month  + " - " + now.getFullYear();

  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;

  let currentTime = hours + ":" + minutes;

  timeHtml.innerHTML = `
  ${date}
     <br> 
     ${currentTime}
  `;
}


setInterval(updateTime, 1000);

updateTime();
// Date End

// Task Start
let tasks = [];

function addTask() {
  let task = taskInput.value;
  if (task != "") {
    tasks.push({ task: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    taskInput.value = "";
  }
}

function displayTasks() {
  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";
  if (localStorage.tasks != null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  } else {
    tasks = [];
  }

  tasks.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = item.task;
    if (item.completed) {
      completedTaskList.appendChild(li);
    } else {
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.completed;
      checkbox.addEventListener("click", () => {
        tasks[index].completed = checkbox.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
      });
      li.appendChild(checkbox);
      taskList.appendChild(li);
    }
  });
}
displayTasks();
// Task End

// Clear Task
function clearTask(){
  localStorage.clear();
  displayTasks()
}