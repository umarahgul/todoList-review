import './style.css';

import options from './assets/options.png';
import bin from './assets/recyclebin.png';

const todoList = [
  {
    description: 'wash dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'wash clothes',
    completed: false,
    index: 1,
  },
];

const populateList = () => {
  const parent = document.getElementById('populate');
  parent.innerHTML = '';
  const ulList = document.createElement('ul');
  ulList.classList.add('ulList');
  for (let x = 0; x < todoList.length; x += 1) {
    if (todoList[x].completed === false) {
      const divContainer = document.createElement('div');
      divContainer.classList.add('divContainer');
      divContainer.setAttribute('id', `id${x}`);
      const divSmall = document.createElement('div');
      divSmall.classList.add('divSmall');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');

      const liList = document.createElement('li');
      liList.classList.add('liList');

      liList.textContent = todoList[x].description;
      const option = document.createElement('img');
      option.classList.add('three-dots');

      option.src = options;

      option.addEventListener('click', () => {
        option.style.display = 'none';
        const rbin = document.createElement('img');
        rbin.src = bin;

        divContainer.appendChild(rbin);

        rbin.addEventListener('click', () => {
          document.getElementById(`id${x}`).remove();
          rbin.style.display = 'none';
        });
      });
      divSmall.appendChild(checkbox);
      divSmall.appendChild(liList);
      divContainer.appendChild(divSmall);
      divContainer.appendChild(option);
      ulList.appendChild(divContainer);
    }
  }
  parent.appendChild(ulList);
};

document.addEventListener('DOMContentLoaded', populateList);

const val = document.getElementById('inputVal');
val.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const newItem = {
      description: val.value,
      completed: false,
      index: todoList.length, // Set the index to the next available index
    };
    todoList.push(newItem);
    val.value = '';
    populateList();
  }
});
import bin from './assets/recyclebin.png';

import options from './assets/options.png';

import { updateStatus } from './status.js';

export const todoList = [];

export const saveTodoListToLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

// Function to retrieve the todoList from local storage
export const retrieveTodoListFromLocalStorage = () => {
  const storedTodoList = localStorage.getItem('todoList');
  if (storedTodoList) {
    return JSON.parse(storedTodoList);
  }
  return [];
};

export const removeVal = (optionElement, divContainer, x) => {
  optionElement.addEventListener('click', () => {
    optionElement.style.display = 'none';
    const rbin = document.createElement('img');
    rbin.src = bin;

    divContainer.appendChild(rbin);

    rbin.addEventListener('click', () => {
      document.getElementById(`id${x}`).remove();
      rbin.style.display = 'none';
      todoList.splice(x, 1);

      for (let y = 0; y < todoList.length; y += 1) {
        todoList[y].index = y + 1;
      }

      saveTodoListToLocalStorage();
    });
  });
};

export const populateList = () => {
  const parent = document.getElementById('populate');
  parent.innerHTML = '';
  const ulList = document.createElement('ul');
  ulList.classList.add('ulList');

  for (let x = 0; x < todoList.length; x += 1) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('divContainer');
    divContainer.setAttribute('id', `id${x}`);
    const divSmall = document.createElement('div');
    divSmall.classList.add('divSmall');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    checkbox.setAttribute('data-index', x);

    checkbox.setAttribute('id', `chk${x}`);

    // add event listener to the check box change
    checkbox.addEventListener('change', (event) => {
      // Retrieve the value of 'data-index' attribute
      const dataIndex = event.target.getAttribute('data-index');

      // update item's object's value  for completed  key upon user actions
      // Do something with the dataIndex value
      updateStatus(todoList, saveTodoListToLocalStorage, dataIndex);
    });

    const liList = document.createElement('li');
    liList.classList.add('liList');
    liList.setAttribute('id', `descp${x}`);

    liList.textContent = todoList[x].description;
    liList.addEventListener('click', () => {
      const newDescription = prompt(`Enter a new description: ${x}`);

      if (newDescription !== null && newDescription !== '') {
        // Update the description in the todoList array
        todoList[x].description = newDescription;

        // Re-populate the list
        populateList();

        // Save the updated todoList to local storage
        saveTodoListToLocalStorage();
      }
    });

    const option = document.createElement('img');
    option.classList.add('three-dots');
    option.src = options;
    removeVal(option, divContainer, x);

    divSmall.appendChild(checkbox);
    divSmall.appendChild(liList);
    divContainer.appendChild(divSmall);
    divContainer.appendChild(option);
    ulList.appendChild(divContainer);
  }
  parent.appendChild(ulList);
};

export const curdFunctionality = () => {
  const val = document.getElementById('inputVal');

  const storedValue = localStorage.getItem('inputValue');
  if (storedValue) {
    val.value = storedValue;
  }

  val.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const newItem = {
        description: val.value,
        completed: false, // value of new object set to fasle by default
        index: todoList.length + 1, // Set the index to the next available index
      };

      todoList.push(newItem);

      saveTodoListToLocalStorage();
      populateList();
      val.value = '';
    }
  });
};