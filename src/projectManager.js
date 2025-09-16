import { taskManager } from "./taskManager.js";

export const projectManager = (function () {

    let projectList = [];

    const createProject = function (name, init = false) {
        let id = init ? "0" : Date.now().toString();
        // let taskList = [];
        // let completedList = [];
        return { id, name };
    }

    const addProject = function (name, init = false) {
        const project = init ? createProject(name, init) : createProject(name);
        projectList.push(project);
        return project.id;
    }

    const deleteProject = function (projectID) {
        const projectIndex = getProjectIndex(projectID);
        taskManager.deleteProjectTasks(projectID);
        projectList.splice(projectIndex, 1);
    }

    const getProjectTaskList = id => { return projectList.find(project => project.id === id).taskList }

    const getProjectIndex = id => { return projectList.findIndex(project => project.id === id) }

    addProject("Home", true);

    return { createProject, addProject, deleteProject, getProjectTaskList }

})();