// import { createTask } from "./task.js";

export default function () {
    const listDiv = document.querySelector("#list");
    const list = document.createElement("ul");
    const addTaskButton = document.createElement("button");

    addTaskButton.textContent = "+";
    addTaskButton.addEventListener('click', () => {
        // form
        // create task from form
        const item = document.createElement("li");
        item.textContent = "create task";
        list.appendChild(item);
        console.log("create task");
    });

    listDiv.appendChild(addTaskButton);
    listDiv.appendChild(list);
};