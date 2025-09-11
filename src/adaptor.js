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

        addNewTaskButton.addEventListener("click", () => {
            addNewTaskDialog.returnValue = "";
            tasklist.appendChild(addNewTaskDialog);
            addNewTaskDialog.show();
        });
        
        addNewTaskDialog.addEventListener("close", (event) => {
            if (addNewTaskDialog.returnValue !== "cancel") {
                const inputFields = retrieveFormInputs(addNewTaskForm);
                const tagsOutputList = retrieveFormTagsOutputList(addNewTaskForm);
                const parsedInputs = parseFormInputs(inputFields, tagsOutputList);
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
                            || parsedInputs.tags.length !== 0))
                ) parsedInputs.name = "New Task";

                // if task name is not empty, make new task
                if (parsedInputs.name !== "") {
                    createTaskFromAddNewTaskFormInputs(parsedInputs);
                    for (let inputField of inputFields) inputField.value = "";
                }
                
                // otherwise, don't make new task and continue to default action 
                tagsOutputList.innerHTML = "";
            }
            tasklist.removeChild(addNewTaskDialog);
        })

        taskDiv.appendChild(addNewTaskButton);
        taskDiv.appendChild(tasklist);
    }

    const createTaskFromAddNewTaskFormInputs = function (inputs) {
        const name = inputs.name;
        const notes = inputs.notes;
        const dueDate = inputs.dueDate;
        const priority = inputs.priority;
        const tags = inputs.tags;

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

        // imbue functionalities to delete and edit buttons of task element
        const deleteButton = newTaskDiv.querySelector(".task-delete-button");
        deleteButton.addEventListener("click", () => {
            taskManager.deleteTask(taskID);
            newTaskDiv.remove();
        });

        const editButton = newTaskDiv.querySelector(".task-edit-button");
        editButton.addEventListener("click", () => {
            // open form and populate current task info
            const editTaskForm = taskDOMRenderer.initEditTaskForm();
            const inputFields = retrieveFormInputs(editTaskForm);
            const tagsOutputList = retrieveFormTagsOutputList(editTaskForm);
            for (let inputField of inputFields) {
                if (inputField.name === "name") inputField.value = taskManager.getTaskName(taskID);
                else if (inputField.name === "notes") inputField.value = taskManager.getTaskNotes(taskID);
                else if (inputField.name === "dueDate") inputField.value = taskManager.getTaskDueDate(taskID);
                else if (inputField.name === "priority") inputField.value = taskManager.getTaskPriority(taskID);
                else if (inputField.name === "tags") {
                    const taskTags = taskManager.getTaskTags(taskID);
                    for (let tag of taskTags) {
                        const tagLI = document.createElement("li");
                        tagLI.textContent = tag;
                        tagsOutputList.appendChild(tagLI);
                    }
                };
            }

            // imbue functionalities to cancel and submit buttons of edit form
            const newTaskDivInfoDiv = newTaskDiv.querySelector(".task-display-info");

            const editTaskCancelButton = editTaskForm.querySelector("#edit-task-cancel");
            editTaskCancelButton.addEventListener('click', event => {
                event.preventDefault();
                editTaskForm.replaceWith(newTaskDivInfoDiv);
            });

            const editTaskSubmitButton = editTaskForm.querySelector("#edit-task-submit");
            editTaskSubmitButton.addEventListener('click', event => {
                event.preventDefault();
                const parsedInputs = parseFormInputs(inputFields, tagsOutputList);
                if (parsedInputs.name === "") parsedInputs.name = "New Task";
                // when submitted, exited, etc., update task in backend and display edits
                editTaskFromEditTaskFormInputs(taskID, newTaskDivInfoDiv, parsedInputs);
                editTaskForm.replaceWith(newTaskDivInfoDiv);
            });

            newTaskDivInfoDiv.replaceWith(editTaskForm);
        });

        tasklist.appendChild(newTaskDiv);
    };

    const editTaskFromEditTaskFormInputs = function (taskID, taskInfoDiv, inputs) {
        const name = inputs.name;
        const notes = inputs.notes;
        const dueDate = inputs.dueDate;
        const priority = inputs.priority;
        const tags = inputs.tags;

        taskManager.editTask(
            taskID, 
            name, 
            notes, 
            dueDate, 
            priority, 
            tags
        );

        taskDOMRenderer.renderEditedTaskInfoDiv(
            taskInfoDiv, 
            taskID, 
            name, 
            notes, 
            dueDate, 
            priority, 
            tags
        );
    };

    const retrieveFormInputs = form => { return Array.from(form.querySelectorAll("section div .input-field")) }

    const retrieveFormTagsOutputList = form => { return form.querySelector("section div output ul") }

    const parseFormInputs = function (inputFields, tagsOutputList) {
        const tags = Array.from(tagsOutputList.querySelectorAll("li")).map(li => li.textContent).filter(tag => tag !== "");
        const parsedInputs = inputFields.reduce(
            (taskObj, inputField) => {
                if (inputField.name === "tags") {
                    if (inputField.value !== "") tags.push(inputField.value);
                    taskObj[inputField.name] = tags;
                } else {
                    taskObj[inputField.name] = inputField.value;
                }
                return taskObj;
            }, {});
        return parsedInputs;
    }

    return { init };

})();