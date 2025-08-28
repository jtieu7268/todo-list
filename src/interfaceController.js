import { taskManager as tm  } from "./taskManager.js";

export const interfaceController = (function () {
    const taskManager = tm;
    const sideDiv = document.querySelector("#sidebar");
    const listDiv = document.querySelector("#list-container");

    const init = function () {
        const list = document.createElement("ul");
        const addTaskButton = document.createElement("button");

        addTaskButton.textContent = "+";
        addTaskButton.addEventListener('click', () => {
                // solicit information
                // create task from information
                const taskLI = document.createElement("li");
                const taskIsCompleteInput = document.createElement("input");
                const taskNameInput = document.createElement("input");
        
                taskIsCompleteInput.type = "checkbox";
                taskNameInput.type = "text";
        
                taskNameInput.addEventListener('input', (event) => {
        
                });
                taskIsCompleteInput.addEventListener('change', (event) => {
        
                });
        
                taskLI.appendChild(taskIsCompleteInput);
                taskLI.appendChild(taskNameInput);
        
                taskManager.printTaskList();
                taskLI.id = taskManager.createTask();
                taskManager.printTaskList();
                
                list.appendChild(taskLI);
            });
        
            listDiv.appendChild(addTaskButton);
            listDiv.appendChild(list);
    }

    return { init };

})();