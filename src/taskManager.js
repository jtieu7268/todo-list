export const taskManager = (function () {
    
    let masterTaskList = {
        all: [],
        completed: []
    };

    const createTaskObj = function (name = "", notes = "", dueDate = null, priority = null, tags = []) {
        let id = Date.now().toString();
        let isComplete = false;
        return { id, name, notes, dueDate, isComplete, priority, tags };
    };

    // returns task id for creating and interfacing with task-related DOM elements
    const createTask = function (name = "", notes = "", dueDate = null, priority = null, tags = []) {
        const task = createTaskObj(name, notes, dueDate, priority, tags);
        masterTaskList.all.push(task);
        return task.id;
    };

    const editTask = function (taskID, newName, newNotes, newDueDate, newPriority, newTags) {
        const task = getTask(taskID);
        task.name = newName;
        task.notes = newNotes;
        task.dueDate = newDueDate;
        task.priority = newPriority;
        task.tags = newTags;
    }

    const deleteTask = function (taskID) {
        const taskIndex = getTaskIndex(taskID);
        masterTaskList.all.splice(taskIndex, 1);
        // TODO: check for or ensure valid task to delete, might punt this to form verification/adapter
    }

    const toggleTaskComplete = function (taskID) {
        const task = getTask(taskID);
        task.isComplete = !task.isComplete;
        if (task.isComplete) masterTaskList.completed.push(task);
        else removeTaskFromCompleted(taskID);
    }

    /* 
    const updateTask = function (taskID, fieldName, newData) {
        const task = getTask(taskID);
        if (fieldName === "isComplete") {
            if (newData === true) {
                masterTaskList.completed.push(task);
            } else {
                 removeTaskFromCompleted(taskID);
            }
        }

        task[fieldName] = newData;
    };

    const updateTaskTags = function (taskID, newTag) {
        const task = getTask(taskID);
        const trimmedTag = newTag.trim();
        if (trimmedTag !== "" && !task.tags.find(tag => tag === trimmedTag)) {
            task.tags.push(trimmedTag);
            return trimmedTag;
        }
        return "";
    }
    */

    const getTask = id => { return masterTaskList.all.find(task => task.id === id) }

    const getTaskIndex = id => { return masterTaskList.all.findIndex(task => task.id === id) }

    const removeTaskFromCompleted = id => masterTaskList.completed = masterTaskList.completed.filter(task => {return task.id !== id});

    const printTaskList = () => console.log(masterTaskList);

    return { createTask, editTask, deleteTask, toggleTaskComplete, printTaskList };
})();