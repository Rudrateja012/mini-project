let currentEditId = null;

function getProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}

function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function createProject(name, description) {
    const projects = getProjects();
    const newProject = {
        id: Date.now(),
        name: name,
        description: description
    };
    projects.push(newProject);
    saveProjects(projects);
}

function readProjects() {
    return getProjects();
}

function updateProject(id, updatedData) {
    const projects = getProjects();
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex > -1) {
        projects[projectIndex] = { ...projects[projectIndex], ...updatedData };
        saveProjects(projects);
    }
}

function deleteProject(id) {
    const projects = getProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    saveProjects(updatedProjects);
}

function renderProjects() {
    const projects = getProjects();
    const projectsList = document.getElementById('projects');
    projectsList.innerHTML = '';

    projects.forEach(project => {
        const li = document.createElement('li');
        li.className = 'project-item';
        li.textContent = `${project.name}: ${project.description}`;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.style.marginLeft = '10px';
        editBtn.onclick = function () {
            document.getElementById('project-name').value = project.name;
            document.getElementById('project-description').value = project.description;
            currentEditId = project.id;
            document.getElementById('save-project').textContent = 'Update Project';
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.onclick = function () {
            deleteProject(project.id);
            renderProjects();
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        projectsList.appendChild(li);
    });
}

document.getElementById('save-project').addEventListener('click', function () {
    const name = document.getElementById('project-name').value.trim();
    const description = document.getElementById('project-description').value.trim();

    if (name && description) {
        if (currentEditId) {
            updateProject(currentEditId, { name, description });
            currentEditId = null;
            this.textContent = 'Save Project';
        } else {
            createProject(name, description);
        }
        renderProjects();
        document.getElementById('project-name').value = '';
        document.getElementById('project-description').value = '';
    }
});

renderProjects();
