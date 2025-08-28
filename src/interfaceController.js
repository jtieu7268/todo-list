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
                const taskNotesTextArea = document.createElement("textarea");
                const taskPriorityLabel = document.createElement("label");
                const taskPrioritySelect = document.createElement("select");
                const taskTagsInput = document.createElement("input");
                const taskDueDateInput = document.createElement("input");
        
                taskIsCompleteInput.type = "checkbox";
                taskNameInput.type = "text";
                taskTagsInput.type = "text";
                taskDueDateInput.type = "datetime-local";

                taskIsCompleteInput.name = "taskIsComplete";
                taskNameInput.name = "taskName";
                taskNotesTextArea.name = "taskNotes";
                taskPrioritySelect.name = "taskPriority";
                taskTagsInput.name = "taskTags";
                taskDueDateInput.name = "taskDueDate";

                taskNameInput.placeholder = "New Task Name";
                taskNotesTextArea.placeholder = "Notes";
                taskTagsInput.placeholder = "Tags";
                taskPriorityLabel.textContent = "Priority: ";
                for (let level of ["None", "High", "Medium", "Low"]) {
                    const opt = document.createElement("option");
                    opt.value = level;
                    opt.textContent = level;
                    taskPrioritySelect.appendChild(opt);
                }
                
                taskManager.printTaskList();
                taskLI.id = taskManager.createTask();
                taskManager.printTaskList();
                
                taskLI.appendChild(taskIsCompleteInput);
                taskLI.appendChild(taskNameInput);
                taskLI.appendChild(taskNotesTextArea);
                taskPriorityLabel.appendChild(taskPrioritySelect);
                taskLI.appendChild(taskPriorityLabel);
                taskLI.appendChild(taskTagsInput);
                taskLI.appendChild(taskDueDateInput);

                list.appendChild(taskLI);
            });
        
            listDiv.appendChild(addTaskButton);
            listDiv.appendChild(list);
    }

    return { init };

})();