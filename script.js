// script.js
const todovalue = document.getElementById("taskInput");
const listItems = document.getElementById("list-items");
const addUpdateClick = document.getElementById("AddUpdateClick");
const AlertMessage = document.getElementById("AlertMessage");
let todoData = JSON.parse(localStorage.getItem("todoData")) || [];

function createToDoData() {
    const task = todovalue.value.trim();
    if (!task) {
        setAlertMessage("Please enter a task!");
        return;
    }

    const todoItem = { task, status: false };
    todoData.push(todoItem);
    updateLocalStorage();

    todovalue.value = "";
    setAlertMessage("Todo item added successfully.");
    displayTodoList();
}

function completeTodoItem(index) {
    todoData[index].status = !todoData[index].status;
    updateLocalStorage();
    displayTodoList();
}

function updateTodoItem(index, updatedTask) {
    todoData[index].task = updatedTask.trim();
    updateLocalStorage();
    displayTodoList();
}

function deleteTodoItem(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        todoData.splice(index, 1);
        updateLocalStorage();
        setAlertMessage("Todo item deleted successfully.");
        displayTodoList();
    }
}

function displayTodoList() {
    listItems.innerHTML = "";
    todoData.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span style="text-decoration: ${item.status ? 'line-through' : 'none'}">${item.task}</span>
            <div>
                <img class="edit todo-controls" src="/images/pencil.png" onclick="updateTodoItem(${index}, prompt('Update task:', '${item.task}'))">
                <img class="delete todo-controls" src="/images/delete.png" onclick="deleteTodoItem(${index})">
                <img class="refresh todo-controls" src="/images/refresh.png" onclick="completeTodoItem(${index})">
            </div>
        `;
        listItems.appendChild(listItem);
    });
}

function setAlertMessage(message) {
    AlertMessage.textContent = message;
    AlertMessage.style.display = "block";
    setTimeout(() => {
        AlertMessage.style.display = "none";
    }, 3000);
}

function updateLocalStorage() {
    localStorage.setItem("todoData", JSON.stringify(todoData));
}

addUpdateClick.addEventListener("click", createToDoData);

window.onload = function () {
    displayTodoList();
};
