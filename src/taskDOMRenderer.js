export const taskDOMRenderer = (function () {

    const initAddNewTask = function () {
        const addNewTaskButton = document.createElement("button");
        const addNewTaskDialog = document.createElement("dialog");
        const addNewTaskForm = initAddNewTaskForm();

        addNewTaskDialog.setAttribute("closedby", "any")
        addNewTaskDialog.appendChild(addNewTaskForm);
        
        addNewTaskForm.setAttribute("method", "dialog");

        addNewTaskButton.textContent = "+";

        const addNewTaskCancel = addNewTaskForm.querySelector("#add-new-task-cancel");
        addNewTaskCancel.addEventListener("click", () => {
            addNewTaskDialog.close(addNewTaskCancel.value);
        })

        return [addNewTaskButton, addNewTaskDialog, addNewTaskForm];
    }

    /* html for add new task form
        <form id="add-new-task-form">
            <section>
                <div>
                    <label for="task-name">Task</label>
                    <input type="text" id="task-name" name="name" placeholder="New Task Name...">
                </div>

                <div>
                    <label for="task-notes">Notes</label>
                    <textarea id="task-notes" name="notes" placeholder="Notes..."></textarea>
                </div>
                
                <div>
                    <label for="task-duedate">Due Date</label>
                    <input type="datetime-local" id="task-duedate" name="dueDate">
                </div>

                <div>
                    <label for="task-priority">Priority</label>
                    <select id="task-priority" name="priority">
                        <option value="None">None</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div>
                    <label for="task-tags">Tags</label>
                    <input type="text" id="task-tags" name="tags" placeholder="Add Tag...">
                </div>
            </section>

            <section>
                <button type="submit" id="add-new-task-task-submit">Create Task</button>
                <button type="reset" id="add-new-task-cancel">Cancel</button>
            </section>
        </form>
     */
    const initAddNewTaskForm = function () {
        const form = document.createElement("form");
        form.setAttribute("id", "add-new-task-form");

        // form fields
        const fieldsSection = document.createElement("section");

        // name
        const nameDiv = document.createElement("div");

        const nameInputLabel = document.createElement("label");
        nameInputLabel.setAttribute("for", "task-name");
        nameInputLabel.textContent = "Task";

        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("id", "task-name");
        nameInput.setAttribute("name", "name");
        nameInput.setAttribute("placeholder", "New Task Name...");
        nameInput.setAttribute("autocomplete", "off");
        nameInput.classList.add("input-field");

        // notes
        const notesDiv = document.createElement("div");

        const notesTextAreaLabel = document.createElement("label");
        notesTextAreaLabel.setAttribute("for", "task-notes");
        notesTextAreaLabel.textContent = "Notes";

        const notesTextArea = document.createElement("textarea");
        notesTextArea.setAttribute("id", "task-notes");
        notesTextArea.setAttribute("name", "notes");
        notesTextArea.setAttribute("placeholder", "Notes...");
        notesTextArea.classList.add("input-field");

        // due date
        const dueDateDiv = document.createElement("div");

        const dueDateInputLabel = document.createElement("label");
        dueDateInputLabel.setAttribute("for", "task-duedate");
        dueDateInputLabel.textContent = "Due Date";

        const dueDateInput = document.createElement("input");
        dueDateInput.setAttribute("type", "datetime-local");
        dueDateInput.setAttribute("id", "task-duedate");
        dueDateInput.setAttribute("name", "dueDate");
        dueDateInput.classList.add("input-field");

        // priority
        const priorityDiv = document.createElement("div");

        const prioritySelectLabel = document.createElement("label");
        prioritySelectLabel.setAttribute("for", "task-priority");
        prioritySelectLabel.textContent = "Priority";

        const prioritySelect = document.createElement("select");
        prioritySelect.setAttribute("id", "task-priority");
        prioritySelect.setAttribute("name", "priority");
        prioritySelect.classList.add("input-field");
        for (let level of ["", "Low", "Medium", "High"]) {
            const opt = document.createElement("option");
            opt.value = level;
            opt.textContent = level;
            prioritySelect.appendChild(opt);
        }

        // tags
        const tagsDiv = document.createElement("div");

        const tagsInputLabel = document.createElement("label");
        tagsInputLabel.setAttribute("for", "task-tags");
        tagsInputLabel.textContent = "Tags";

        const tagsInput = document.createElement("input");
        tagsInput.setAttribute("type", "text");
        tagsInput.setAttribute("id", "task-tags");
        tagsInput.setAttribute("name", "tags");
        tagsInput.setAttribute("placeholder", "Add a tag separated by a space or comma...");
        tagsInput.setAttribute("autocomplete", "off");
        tagsInput.classList.add("input-field");

        const tagsOutput = document.createElement("output");
        tagsOutput.setAttribute("name", "tags-list");
        tagsOutput.setAttribute("for", "task-tags");
        
        const tagsOutputList = document.createElement("ul");
        tagsInput.addEventListener("keyup", event => {
            if (["Space", "Comma"].includes(event.code)) {
                let tag = tagsInput.value.trim();
                if (event.code === "Comma") {
                    tag = tag.slice(0,-1);
                }
                if (tag !== "") {
                    const tagLI = document.createElement("li");
                    tagLI.textContent = tag.replaceAll(" ", "");
                    tagsOutputList.appendChild(tagLI);
                }
                tagsInput.value = "";
            }
        });

        // buttons
        const buttonsSection = document.createElement("section");

        const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("id", "add-new-task-submit");
        submitButton.setAttribute("form", "add-new-task-form");
        submitButton.setAttribute("value", "submit");
        submitButton.textContent = "Create Task";

        const cancelButton = document.createElement("button");
        cancelButton.setAttribute("type", "reset");
        cancelButton.setAttribute("id", "add-new-task-cancel");
        cancelButton.setAttribute("form", "add-new-task-form");
        cancelButton.setAttribute("value", "cancel");
        cancelButton.textContent = "Cancel";

        // attach elements to form
        form.appendChild(fieldsSection);
        form.appendChild(buttonsSection);

        fieldsSection.appendChild(nameDiv);
        fieldsSection.appendChild(notesDiv);
        fieldsSection.appendChild(dueDateDiv);
        fieldsSection.appendChild(priorityDiv);
        fieldsSection.appendChild(tagsDiv);

        nameDiv.appendChild(nameInputLabel);
        nameDiv.appendChild(nameInput);

        notesDiv.appendChild(notesTextAreaLabel);
        notesDiv.appendChild(notesTextArea);

        dueDateDiv.appendChild(dueDateInputLabel);
        dueDateDiv.appendChild(dueDateInput);

        priorityDiv.appendChild(prioritySelectLabel);
        priorityDiv.appendChild(prioritySelect);

        tagsDiv.appendChild(tagsInputLabel);
        tagsOutput.appendChild(tagsOutputList);
        tagsDiv.appendChild(tagsOutput);
        tagsDiv.appendChild(tagsInput);

        buttonsSection.appendChild(submitButton);
        buttonsSection.appendChild(cancelButton);

        return form;

    };

    const renderNewTask = function (id, name, notes, dueDate, priority, tags) {
        const newTaskDiv = document.createElement("div");
        newTaskDiv.setAttribute("id", id);

        const newTaskCheckbox = document.createElement("input");
        newTaskCheckbox.setAttribute("type", "checkbox");

        const newTaskName = document.createElement("p");
        newTaskName.textContent = name;

        const newTaskNotes = document.createElement("p");
        newTaskNotes.textContent = notes;

        const newTaskDueDate = document.createElement("p");
        newTaskDueDate.textContent = dueDate;

        const newTaskPriority = document.createElement("p");
        newTaskPriority.textContent = priority;

        const newTaskTags = document.createElement("ul");
        for (let tag of tags) {
            const tagLI = document.createElement("li");
            tagLI.textContent = tag;
            newTaskTags.appendChild(tagLI);
        }

        const buttonsDiv = document.createElement("div");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("task-delete-button");
        deleteButton.textContent = "Delete";

        const editButton = document.createElement("button");
        editButton.classList.add("task-edit-button");
        editButton.textContent = "Edit";

        buttonsDiv.appendChild(deleteButton);
        buttonsDiv.appendChild(editButton);

        newTaskDiv.appendChild(newTaskCheckbox);
        newTaskDiv.appendChild(newTaskName);
        newTaskDiv.appendChild(newTaskNotes);
        newTaskDiv.appendChild(newTaskDueDate);
        newTaskDiv.appendChild(newTaskPriority);
        newTaskDiv.appendChild(newTaskTags);
        newTaskDiv.appendChild(buttonsDiv);

        return newTaskDiv;

    };

    return { initAddNewTask, renderNewTask };

})();