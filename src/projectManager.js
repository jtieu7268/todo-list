export const projectManager = (function () {

    let projectList = [];
    addProject("Home", true);

    const createProject = function (name, init = false) {
        let id = init ? "0" : Date.now().toString();
        let taskList = [];
        let completedList = [];
        return { id, name, taskList, completedList };
    }

    const addProject = function (name, init = false) {
        const project = init ? createProject(name, init) : createProject(name);
        projectList.push(project);
        return project.id;
    }

    const deleteProject = function (projectID) {
        const projectIndex = getProjectIndex(projectID);
        projectList.splice(projectIndex, 1);
    }

    const getProject = id => { return projectList.find(project => project.id === id) }

    const getProjectIndex = id => { return projectList.findIndex(project => project.id === id) }

    return { createProject, addProject, deleteProject }

})();