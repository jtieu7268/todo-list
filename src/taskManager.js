export const taskManager = (function () {
    
    // let masterTaskList = {
    //     all: [],
    //     completed: []
    // };
    let taskList = [];

    const createTask = function (name = "", notes = "", dueDate = null, priority = null, tags = [], projectID = "0") {
        let id = Date.now().toString();
        let isComplete = false;
        return { id, name, notes, dueDate, isComplete, priority, tags, projectID };
    };

    // returns task id for creating and interfacing with task-related DOM elements
    const addTask = function (name = "", notes = "", dueDate = null, priority = null, tags = [], projectID = "0") {
        const task = createTask(name, notes, dueDate, priority, tags, projectID);
        // masterTaskList.all.push(task);
        taskList.push(task);
        // projectManager.getProjectTaskList(projectID).push(task);
        // console.log(projectManager.getProjectTaskList(projectID));
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
        // masterTaskList.all.splice(taskIndex, 1);
        taskList.splice(taskIndex, 1);
    }

    const deleteProjectTasks = function (projectID) {
        taskList = taskList.filter(task => task.projectID !== projectID);
    }

    const toggleTaskComplete = function (taskID) {
        const task = getTask(taskID);
        task.isComplete = !task.isComplete;
        // if (task.isComplete) masterTaskList.completed.push(task);
        // else removeTaskFromCompleted(taskID);
    }

    const getTaskName = id => { return getTask(id).name }

    const getTaskNotes = id => { return getTask(id).notes }

    const getTaskDueDate = id => { return getTask(id).dueDate }

    const getTaskPriority = id => { return getTask(id).priority }

    const getTaskTags = id => { return getTask(id).tags }

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

    const getTask = id => { 
        // return masterTaskList.all.find(task => task.id === id) 
        return taskList.find(task => task.id === id);
    }

    const getTaskIndex = id => { 
        // return masterTaskList.all.findIndex(task => task.id === id) 
        return taskList.findIndex(task => task.id === id);
    }

    // const removeTaskFromCompleted = id => masterTaskList.completed = masterTaskList.completed.filter(task => {return task.id !== id});

    const printTaskList = () => console.log(taskList);

    return { addTask, editTask, deleteTask, deleteProjectTasks, toggleTaskComplete, printTaskList, getTaskName, getTaskNotes, getTaskDueDate, getTaskPriority, getTaskTags };
})();