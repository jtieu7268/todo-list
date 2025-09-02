import { taskManager as tm  } from "./taskManager.js";
import { taskDOMRenderer as tmr } from "./taskDOMRenderer.js";

export const adaptor = (function () {
    const taskManager = tm;
    const taskDOMRenderer = tmr;

    const projDiv = document.querySelector("#proj-container");
    const taskDiv = document.querySelector("#task-container");
    const tasklist = document.createElement("ul");

    const init = function () {
        const [addNewTaskButton, addNewTaskDialog, addNewTaskForm] = taskDOMRenderer.initAddNewTask();
        
        addNewTaskDialog.addEventListener("close", (event) => {
            if (addNewTaskDialog.returnValue !== "cancel") {
                const inputFields = Array.from(addNewTaskForm.querySelectorAll("section div .input-field"));
                const tagsOutputList = addNewTaskForm.querySelector("section div output ul");
                const tags = Array.from(tagsOutputList.querySelectorAll("li")).reduce((acc, li) => acc += li.textContent + " ", "");
                const parsedInputs = inputFields.reduce(
                        (taskObj, inputField) => {
                            if (inputField.name === "tags") {
                                taskObj[inputField.name] = tags + inputField.value;
                            } else {
                                taskObj[inputField.name] = inputField.value;
                            }
                            return taskObj;
                        }, {});     
                /* special cases for empty task name
                 * if the submit button is clicked and the task name is empty or
                 * if the new task form is lightly dismissed and the task name is empty but another field is filled out, 
                 * fill in task name with a default task name so a task is still created
                 */
                if (
                    (addNewTaskDialog.returnValue === "submit" && parsedInputs.name === "")
                    || (addNewTaskDialog.returnValue === "" && parsedInputs.name === "" && (
                            parsedInputs.notes !== "" 
                            || parsedInputs.dueDate !== "" 
                            || parsedInputs.priority !== "" 
                            || parsedInputs.tags !== ""))
                ) parsedInputs.name = "New Task";

                // if task name is empty otherwise, continue to default action without making new task
                tagsOutputList.innerHTML = "";
                if (parsedInputs.name === "") return;

                createTaskFromAddNewTaskFormInputs(parsedInputs);
                for (let inputField of inputFields) inputField.value = "";
            }
        })

        taskDiv.appendChild(addNewTaskButton);
        taskDiv.appendChild(tasklist);
        taskDiv.appendChild(addNewTaskDialog);
        
    }

    const createTaskFromAddNewTaskFormInputs = function (inputs) {
        // process inputs here
        const name = inputs.name;
        const notes = inputs.notes;
        const dueDate = inputs.dueDate;
        const priority = inputs.priority;
        const tags = inputs.tags !== "" ? inputs.tags.trim().split(" ") : [];

        // use processed inputs to create task and task element
        const taskID = taskManager.createTask(
            name, 
            notes, 
            dueDate, 
            priority, 
            tags
        );
        const newTaskDiv = taskDOMRenderer.renderNewTask(
            taskID,
            name, 
            notes, 
            dueDate, 
            priority, 
            tags
        );
        const deleteButton = newTaskDiv.querySelector(".task-delete-button");
        deleteButton.addEventListener("click", () => {
            taskManager.deleteTask(taskID);
            newTaskDiv.remove();
        })
        tasklist.appendChild(newTaskDiv);
    };

    return { init };

})();