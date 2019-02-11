const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListener();

function loadEventListener() {
  document.addEventListener('DOMContentLoaded', getTask);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', celarTasks);
  filter.addEventListener('keyup', filterTask);
}

function getTask() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    const li = document.createElement('li');

    li.className = 'collection-item';

    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    afg('Pleas Add a Task');
  } else {
    const li = document.createElement('li');

    li.className = 'collection-item';

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
    tasksInLocalStoreg(taskInput.value);
    taskInput.value = '';
  }
}

function tasksInLocalStoreg(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function celarTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTaskFromLocalStorrage();
}

function clearTaskFromLocalStorrage() {
  localStorage.clear();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function afg(warn) {
  const warning = document.createElement('div');

  var card = document.querySelector('.card');
  var title = document.querySelector('.card-content');

  warning.className = 'alert';

  warning.appendChild(document.createTextNode(warn));

  card.insertBefore(warning, title);

  setTimeout(timeOutTORemoveMasseg, 3000);
}

function timeOutTORemoveMasseg(){
  document.querySelector('.alert').remove();
}