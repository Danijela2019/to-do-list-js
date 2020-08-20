let todoItemsArray = [];
const form = document.querySelector('#task');
const title = document.querySelector('#task-title');
const description = document.querySelector('#task-description');
const list = document.querySelector('#todo-list');
let task = {};
let textTitle = title.value.trim();
let textDescription = description.value.trim();

const addTasksInTodo = () => {
  task = {
    textTitle,
    textDescription,
    checked: false,
    id: Date.now(),
  };
  todoItemsArray.push(task);
};

const renderTask = (newTask) => {
  list.insertAdjacentHTML('beforeend',
    `<li class="todo-task-card hide-show-tasks" data-key="${newTask.id}"
      <label for=${newTask.id} class=" hide-show-task"></label>
      <h1 class="todo-task-header hide-show-task">${newTask.textTitle}</h1>
      <p class="todo-task-paragraph hide-show-task">${newTask.textDescription}</p>
      <button class="todo-task-delete-button  delete-task" type="button">Remove</button>
    </li>`);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  textTitle = title.value.trim();
  textDescription = description.value.trim();
  if (textTitle !== '' && textDescription !== '') {
    addTasksInTodo(textTitle, textDescription);
    renderTask(task);
    title.value = '';
    description.value = '';
  }
});

const toggleTaskStatus = (key) => {
  const index = todoItemsArray.findIndex((item) => item.id === Number(key));
  todoItemsArray[index].checked = !todoItemsArray[index].checked;
  const item = document.querySelector(`[data-key='${key}']`);
  if (todoItemsArray[index].checked) {
    item.classList.add('done');
    item.parentElement.appendChild(item);
    todoItemsArray.push(todoItemsArray.splice(index, 1)[0]);
  } else {
    item.classList.remove('done');
  }
};

const deleteTask = (key) => {
  const item = document.querySelector(`[data-key='${key}']`);
  todoItemsArray.splice(todoItemsArray.indexOf(item), 1);
  item.remove();
};

list.addEventListener('click', (event) => {
  if (event.target.classList.contains('hide-show-task')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleTaskStatus(itemKey);
  }
  if (event.target.classList.contains('delete-task')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTask(itemKey);
  }
});
