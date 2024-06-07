
let todoList = [];


function renderTodoList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    todoList.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.name;
        if (task.completed) {
            listItem.classList.add('completed');
        }

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = task.completed;
        checkBox.addEventListener('change', () => {
            task.completed = checkBox.checked;
            renderTodoList();
        });

        const closeButton = document.createElement('span');
        closeButton.textContent = '❌';
        closeButton.classList.add('close');
        closeButton.addEventListener('click', () => {
            todoList = todoList.filter((item) => item.id !== task.id);
            renderTodoList();
        });

        listItem.appendChild(checkBox);
        listItem.appendChild(closeButton);
        taskList.appendChild(listItem);
    });
}


function addTask(name) {
    const firstChar = name.charAt(0).toUpperCase();
    if (name.trim() === '' || name.length <= 3) {
        alert('Task name must not be empty and must have more than three characters.');
        return;
    }
    const task = {
        id: Date.now(),
        name: firstChar + name.slice(1),
        createdDate: new Date().toLocaleDateString(),
        completed: false
    };
    todoList.push(task);
    renderTodoList();
}


function sortTasks() {
    todoList.sort((a, b) => a.name.localeCompare(b.name));
    renderTodoList();
}


document.getElementById('addItem').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    addTask(taskInput.value);
    taskInput.value = '';
});


document.getElementById('sortButton').addEventListener('click', () => {
    sortTasks();
});


renderTodoList();

