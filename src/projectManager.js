export const projectManager = (function () {

    let projectList = [];

    const createProject = function (name) {
        let id = Date.now().toString();
        let taskList = [];
        return { id, name, taskList };
    }

    const addProject = function (name) {
        const project = createProject(name);
        projectList.push(project);
        return project.id;
    }

    const deleteProject = function (projectID) {
        const projectIndex = getProjectIndex(projectID);
        projectList.splice(projectID, 1);
    }

    const getProject = id => { return projectList.find(project => project.id === id) }

    const getProjectIndex = id => { return projectList.findIndex(project => project.id === id) }

    return { createProject, addProject, deleteProject }

})();