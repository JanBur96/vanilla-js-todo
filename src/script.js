// IMPORTS //
import tagItem from "./tag-item.js";
import taskItem from "./task-item.js";
import newTaskSelectedTag from "./new-task-selected-tag.js";
import { customTagListEl, taskListEl, newTagButtonEl, newTaskButtonEl, dialogTagEl, dialogTaskEl, dialogInputTagEl, dialogInputTaskEl, newTagDialogButtonEl, newTaskDialogButtonEl, newTaskDialogSelectEl, newTagDialogCancelEl, newTaskDialogCancelEl, dialogSelectedEl, tagAllEl, tagImportantEl, newTaskDialogCheckboxEl } from './selectors.js';

// DATA //
let taskList = [];
let customTagList = [];
let selectedTags = [];
let selectedTag = "All";

if (localStorage.getItem("tasks")) {
    taskList = JSON.parse(localStorage.getItem("tasks"));
};

if (localStorage.getItem("tags")) {
    customTagList = JSON.parse(localStorage.getItem("tags"));
};

let shownTasks = [];
shownTasks = taskList;

// FUNCTIONS //
const hydrateList = (listEl, list, view) => {
    listEl.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        const elementToAppend = document.createElement('li');
        elementToAppend.innerHTML = view(element);
        listEl.append(elementToAppend);
    };

    addListenerToElements('#delete-task', deleteTask);
};

const hydrateTagOptions = () => {
    newTaskDialogSelectEl.innerHTML = "";

    const elementToAppend = document.createElement('option');
    elementToAppend.innerHTML = "<option selected='selected' disabled>Select a tag</option>";

    newTaskDialogSelectEl.append(elementToAppend);

    for (let i = 0; i < customTagList.length; i++) {
        const element = customTagList[i];
        const elementToAppend = document.createElement('option');
        elementToAppend.innerHTML = element;
        newTaskDialogSelectEl.append(elementToAppend);
    };
};

const hydrateSelectedTags = () => {
    dialogSelectedEl.innerHTML = "";

    for (let i = 0; i < selectedTags.length; i++) {
        const element = selectedTags[i];
        const elementToAppend = document.createElement('li');
        elementToAppend.classList.add("dialog__list-item");
        elementToAppend.innerHTML = newTaskSelectedTag(element);
        dialogSelectedEl.append(elementToAppend);
    };
};

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
};

const addNewTask = () => {
    if (dialogInputTaskEl.value) {
        newTaskDialogCheckboxEl.value === 'on' ? selectedTags.push("Important") : '';
        taskList.push({
            id: generateId(),
            isFinished: false,
            title: dialogInputTaskEl.value,
            tags: selectedTags,
        });
        shownTasks = taskList;
        hydrateList(taskListEl, shownTasks, taskItem);
        dialogTaskEl.close();
        dialogInputTaskEl.value = '';
        selectedTags = [];
        hydrateSelectedTags();
        addTaskListToLocalStorage();
    };
};

const deleteTask = (e) => {
    const id = Number(e.target.parentElement.getAttribute('data-id'));
    taskList = taskList.filter(task => task.id !== id);
    shownTasks = shownTasks.filter(task => task.id !== id);
    hydrateList(taskListEl, shownTasks, taskItem);
    addTaskListToLocalStorage();
};

const finishTask = (e) => {
    const taskId = e.target.parentElement.parentElement.getAttribute('data-id');
    const taskToToggle = taskList.find((task) => task.id === Number(taskId));

    if (!taskToToggle.isFinished) {
        e.target.parentElement.parentElement.classList.add("task__list-item--finished");
        e.target.src = "./assets/check-circle.svg";
        taskToToggle.isFinished = true;
    } else {
        e.target.parentElement.parentElement.classList.remove("task__list-item--finished");
        e.target.src = "./assets/empty-circle.svg";
        taskToToggle.isFinished = false;
    };
    addTaskListToLocalStorage();
};

const filterTaskList = (filterImportant) => {
    if (filterImportant) {
        shownTasks = taskList.filter(task => task.tags.includes("Important"));
    } else {
        shownTasks = taskList.filter(task => task.tags.includes(selectedTag));
    };
};

const addNewTag = () => {
    if (dialogInputTagEl.value) {
        customTagList.push(dialogInputTagEl.value);
        dialogTagEl.close();
        dialogInputTagEl.value = '';
        hydrateList(customTagListEl, customTagList, tagItem);
        hydrateTagOptions();
        addListenerToElements('#tag', selectTag);
        addTagsToLocalStorage()
    };
};

const selectTag = (e) => {
    if (e.target.id === "tag") {
        selectedTag = e.target.innerText;
        filterTaskList();
        hydrateList(taskListEl, shownTasks, taskItem);
    }
};

const deleteSelectedTag = (e) => {
    selectedTags = selectedTags.filter(tag => tag !== e.target.parentElement.children[0].innerHTML);
    hydrateSelectedTags();
};

const deleteCustomTag = (e) => {
    const tagToDelete = e.target.parentElement.textContent.trim();
    customTagList = customTagList.filter(tag => tag !== tagToDelete);
    hydrateList(customTagListEl, customTagList, tagItem);
    localStorage.setItem("tags", JSON.stringify(customTagList));
}

const addTaskListToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
};

const addTagsToLocalStorage = () => {
    localStorage.setItem("tags", JSON.stringify(customTagList));
};

const addListenerToElements = (elementsToSelect, functionToRun) => {
    const elementsEl = document.querySelectorAll(elementsToSelect);

    for (let i = 0; i < elementsEl.length; i++) {
        elementsEl[i].addEventListener('click', (e) => {
            functionToRun(e);
        });
    };
};

// EVENTS //
newTagButtonEl.addEventListener('click', () => {
    dialogTagEl.show();;
});

newTagDialogButtonEl.addEventListener('click', (e) => {
    e.preventDefault();
    addNewTag();
});

newTagDialogCancelEl.addEventListener('click', () => {
    dialogTagEl.close();
});

newTaskButtonEl.addEventListener('click', () => {
    dialogTaskEl.show();
});

newTaskDialogCancelEl.addEventListener('click', () => {
    dialogTaskEl.close();
});

newTaskDialogButtonEl.addEventListener('click', (e) => {
    e.preventDefault();
    addNewTask();
});

newTaskDialogSelectEl.addEventListener('change', (e) => {
    if (!selectedTags.includes(e.target.value) && e.target.value !== "Select a tag") {
        selectedTags.push(e.target.value);
        hydrateSelectedTags();
        addListenerToElements('#delete-selected-tag', deleteSelectedTag);
    };
});

tagAllEl.addEventListener('click', () => {
    shownTasks = taskList;
    hydrateList(taskListEl, shownTasks, taskItem);
});

tagImportantEl.addEventListener('click', () => {
    filterTaskList(true);
    hydrateList(taskListEl, shownTasks, taskItem);
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        dialogTagEl.close();
        dialogTaskEl.close();
    };
});

// Initialization //
hydrateList(customTagListEl, customTagList, tagItem);
hydrateList(taskListEl, shownTasks, taskItem);
hydrateTagOptions();
addListenerToElements('#tag', selectTag);
addListenerToElements('#delete-custom-tag', deleteCustomTag);
addListenerToElements('#finish-task', finishTask);
addListenerToElements('#delete-task', deleteTask);