export const taskManager = (function () {
    
    let masterTaskList = {
        all: [],
        done: []
    };

    const createTaskObj = function (taskName = "", taskNotes = "", taskDueDate = null, taskIsCompleted = false, taskPriority = null, taskTags = []) {
        let id = crypto.randomUUID();
        let name = taskName;
        let notes = taskNotes;
        let dueDate = taskDueDate;
        let isComplete = taskIsCompleted;
        let priority = taskPriority;
        let tags = taskTags;

        return { id, name, notes, dueDate, isComplete, priority, tags };
    };

    const createTask = function (taskName = "", taskNotes = "", taskDueDate = null, taskIsCompleted = false, taskPriority = null, taskTags = []) {
        masterTaskList.all.push(createTaskObj(taskName, taskNotes, taskDueDate, taskIsCompleted, taskPriority, taskTags));
    };

    const printTaskList = () => console.log(masterTaskList);

    return { createTask, printTaskList };
})();