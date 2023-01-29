// TODO: Refactoring
import tagItem from "./tag-item.js"
import taskItem from "./task-item.js"

import { customTagListEl, taskListEl, newTagButtonEl, newTodoButtonEl, dialogEl, dialogEl2, dialogInputEl, dialogInputEl2, dialogButtonEl, dialogButtonEl2, dialogSelectEl, dialogCancelEl, dialogCancelEl2, dialogSelectedEl } from './selectors.js'

const customTagList = ["Example Tag 1", "Example Tag 2"]
let selectedTags = [];
let selectedTag = "All";
let shownTasks = [];

let taskList = [
    {
        id: 1,
        isFinished: false,
        title: "Example Task 1",
        tags: ["Example Tag 1", "Important"],
        date: new Date(),
    },
    {
        id: 2,
        isFinished: false,
        title: "Example Task 2",
        tags: ["Example Tag 2"],
        date: new Date(),
    },
]

shownTasks = taskList;

const hydrateTagList = () => {
    customTagListEl.innerHTML = ""
    for (let i = 0; i < customTagList.length; i++) {
        const element = customTagList[i];
        const elementToAppend = document.createElement('li')
        elementToAppend.innerHTML = tagItem(element)

        customTagListEl.append(elementToAppend)
    }
}

const hydrateTaskList = () => {
    taskListEl.innerHTML = ""
    for (let i = 0; i < shownTasks.length; i++) {
        const element = shownTasks[i];

        const elementToAppend = document.createElement('li')
        elementToAppend.innerHTML = taskItem(element)

        taskListEl.append(elementToAppend)
    }
}

const hydrateTagOptions = () => {
    dialogSelectEl.innerHTML = "";
    const elementToAppend = document.createElement('option');
    elementToAppend.innerHTML = "<option selected='selected' disabled>Select a tag</option>";
    dialogSelectEl.append(elementToAppend);
    for (let i = 0; i < customTagList.length; i++) {
        const element = customTagList[i];
        const elementToAppend = document.createElement('option');
        elementToAppend.innerHTML = element;
        dialogSelectEl.append(elementToAppend);
    }
}

const hydrateSelectedTags = () => {
    dialogSelectedEl.innerHTML = "";
    for (let i = 0; i < selectedTags.length; i++) {
        const element = selectedTags[i];
        const elementToAppend = document.createElement('li');
        elementToAppend.innerHTML = `<span>${element}</span> <span id="delete-selected-tag">DEL</span>`;
        dialogSelectedEl.append(elementToAppend);
    }
}

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}

const deleteTask = (id) => {
    taskList = taskList.filter(task => task.id !== id);
    shownTasks = shownTasks.filter(task => task.id !== id);
}

const addListenerToDeleteButtons = () => {
    const deleteTaskButtonsEl = document.querySelectorAll('#delete-task');
    for (let i = 0; i < deleteTaskButtonsEl.length; i++) {
        deleteTaskButtonsEl[i].addEventListener('click', (e) => {
            const taskId = e.target.parentElement.getAttribute('data-id');
            deleteTask(Number(taskId))
            hydrateTaskList()
        })
    }
}

// TODO: Find more elegent way to do this
const addListenerToDeleteSelectedTags = () => {
    const deleteSelectedTagsButtonsEl = document.querySelectorAll('#delete-selected-tag');
    for (let i = 0; i < deleteSelectedTagsButtonsEl.length; i++) {
        deleteSelectedTagsButtonsEl[i].addEventListener('click', (e) => {
            selectedTags = selectedTags.filter(tag => tag !== e.target.parentElement.children[0].innerHTML)
            hydrateSelectedTags()
        })
    }
}

// TODO: Find more elegent way to do this
const addListenerToTags = () => {
    const tagButtonsEl = document.querySelectorAll('#tag');
    for (let i = 0; i < tagButtonsEl.length; i++) {
        tagButtonsEl[i].addEventListener('click', (e) => {
            selectedTag = e.target.innerText;
            filterTaskList()
            hydrateTaskList()
            addListenerToDeleteButtons()
        })
    }
}

const filterTaskList = () => {
    shownTasks = taskList.filter(task => task.tags.includes(selectedTag))
}

hydrateTagList()
hydrateTaskList()
hydrateTagOptions()
addListenerToDeleteButtons()
addListenerToTags()

newTagButtonEl.addEventListener('click', () => {
    dialogEl.show();
})

newTodoButtonEl.addEventListener('click', () => {
    dialogEl2.show();
})

dialogCancelEl.addEventListener('click', () => {
    dialogEl.close()
})

dialogCancelEl2.addEventListener('click', () => {
    dialogEl2.close()
})

dialogButtonEl.addEventListener('click', (e) => {
    e.preventDefault()

    if (dialogInputEl.value) {
        customTagList.push(dialogInputEl.value);
        hydrateTagList()
        hydrateTagOptions()
        dialogEl.close()
        dialogInputEl.value = ''
        addListenerToTags()
    }
})

dialogButtonEl2.addEventListener('click', (e) => {
    e.preventDefault()
    if (dialogInputEl2.value) {
        taskList.push({
            id: generateId(),
            isFinished: false,
            title: dialogInputEl2.value,
            tags: selectedTags,
        })
        hydrateTaskList()
        dialogEl2.close()
        dialogInputEl2.value = ''
        selectedTags = []
        addListenerToDeleteButtons()
    }
})

dialogSelectEl.addEventListener('change', (e) => {
    selectedTags.push(e.target.value)
    hydrateSelectedTags();
    addListenerToDeleteSelectedTags()
})

