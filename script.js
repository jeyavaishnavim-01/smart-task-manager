const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');

let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let currentFilter = 'all';

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        if (currentFilter === 'pending' && task.done) return;
        if (currentFilter === 'completed' && !task.done) return;

        const li = document.createElement('li');
        li.className = `task-item ${task.done ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="task-content" onclick="toggleTask(${index})">
                <span class="category-badge">${task.category}</span>
                <span>${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
        `;
        taskList.appendChild(li);
    });
}

// Improved filter function
window.filterTasks = (status, btn) => {
    currentFilter = status;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks();
};

addBtn.onclick = () => {
    if (taskInput.value.trim() === "") return;

    const newTask = {
        text: taskInput.value,
        category: categorySelect.value,
        done: false
    };

    tasks.push(newTask);
    saveData();
    taskInput.value = "";
};

window.toggleTask = (index) => {
    tasks[index].done = !tasks[index].done;
    saveData();
};

window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveData();
};

function saveData() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? 
        '<i data-lucide="sun"></i> Light Mode' : 
        '<i data-lucide="moon"></i> Appearance';
    lucide.createIcons(); // Re-render icons
};

renderTasks();