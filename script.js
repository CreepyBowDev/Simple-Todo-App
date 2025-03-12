const button = document.querySelector(".agregar");
const display = document.querySelector(".display");
const lista = document.querySelector("ul");

document.addEventListener("DOMContentLoaded", loadTasks);

button.addEventListener("click", () => {
    if (display.value.trim() !== "") {
        addTask(display.value, false);
        saveTask(display.value, false);
        display.value = "";
    }
});

function addTask(text, isChecked) {
    let temp = document.createElement("li");
    let tick = document.createElement("input");
    let removeBtn = document.createElement("span");

    tick.setAttribute("type", "checkbox");
    tick.checked = isChecked;

    removeBtn.textContent = "✖";
    removeBtn.style.cursor = "pointer";

    temp.appendChild(tick);
    temp.appendChild(document.createTextNode(text));
    temp.appendChild(removeBtn);
    lista.appendChild(temp);

    removeBtn.addEventListener("click", () => {
        lista.removeChild(temp);
        deleteTask(text);
    });

    tick.addEventListener("change", () => {
        updateTask(text, tick.checked);
    });
}

function saveTask(text, isChecked) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, isChecked });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.isChecked));
}

function deleteTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(text, isChecked) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (task.text === text) {
            task.isChecked = isChecked;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
