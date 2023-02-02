// TODO: Refactoring
// IMPORTS //
import tagItem from "./tag-item.js"
import taskItem from "./task-item.js"
import { customTagListEl, taskListEl, newTagButtonEl, newTodoButtonEl, dialogTagEl, dialogTaskEl, dialogInputTagEl, dialogInputTaskEl, dialogButtonTagEl, dialogButtonTaskEl, dialogSelectEl, dialogCancelTagEl, dialogCancelTaskEl, dialogSelectedEl, tagAllEl, tagImportantEl, finishTodoEl } from './selectors.js'

// DATA //
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

// FUNCTIONS //
const hydrateList = (listEl, list, view) => {
    listEl.innerHTML = ""

    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        const elementToAppend = document.createElement('li')
        elementToAppend.innerHTML = view(element)
        listEl.append(elementToAppend)
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
    hydrateList(taskListEl, shownTasks, taskItem)
    addListenerToDeleteButtons();
}

const addListenerToDeleteButtons = () => {
    const deleteTaskButtonsEl = document.querySelectorAll('#delete-task');

    for (let i = 0; i < deleteTaskButtonsEl.length; i++) {
        deleteTaskButtonsEl[i].addEventListener('click', (e) => {
            const taskId = e.target.parentElement.getAttribute('data-id');
            deleteTask(Number(taskId))
        })
    }
}

const addListenerToDeleteSelectedTags = () => {
    const deleteSelectedTagsButtonsEl = document.querySelectorAll('#delete-selected-tag');

    for (let i = 0; i < deleteSelectedTagsButtonsEl.length; i++) {
        deleteSelectedTagsButtonsEl[i].addEventListener('click', (e) => {
            selectedTags = selectedTags.filter(tag => tag !== e.target.parentElement.children[0].innerHTML)
            hydrateSelectedTags()
        })
    }
}

const addListenerToFinishTodo = () => {
    const finishTodoButtonsEl = document.querySelectorAll('#finish-todo');
    console.log(finishTodoButtonsEl)

    for (let i = 0; i < finishTodoButtonsEl.length; i++) {
        finishTodoButtonsEl[i].addEventListener('click', (e) => {
            const taskId = e.target.parentElement.parentElement.getAttribute('data-id')
            console.log(e.target.parentElement.parentElement.classList.add("task__list-item--finished"))
            taskList[taskId].isFinished = true;
        })
    }
}

const addListenerToTags = () => {
    const tagButtonsEl = document.querySelectorAll('#tag');

    for (let i = 0; i < tagButtonsEl.length; i++) {
        tagButtonsEl[i].addEventListener('click', (e) => {
            selectedTag = e.target.innerText;
            filterTaskList()
            hydrateList(taskListEl, shownTasks, taskItem)
            addListenerToDeleteButtons()
        })
    }
}

const filterTaskList = (filterImportant) => {
    if (filterImportant) {
        shownTasks = taskList.filter(task => task.tags.includes("Important"))
    } else {
        shownTasks = taskList.filter(task => task.tags.includes(selectedTag))
    }
}

const addNewTask = (e) => {
    if (dialogInputTaskEl.value) {
        taskList.push({
            id: generateId(),
            isFinished: false,
            title: dialogInputTaskEl.value,
            tags: selectedTags,
        })
        shownTasks = taskList;
        hydrateList(taskListEl, shownTasks, taskItem)
        dialogTaskEl.close()
        dialogInputTaskEl.value = ''
        selectedTags = []
        addListenerToDeleteButtons()
    }
}

const addNewTag = () => {
    if (dialogInputTagEl.value) {
        customTagList.push(dialogInputTagEl.value);
        hydrateList(customTagListEl, customTagList, tagItem)
        hydrateTagOptions()
        dialogTagEl.close()
        dialogInputTagEl.value = ''
        addListenerToTags()
    }
}

// EVENTS //
newTagButtonEl.addEventListener('click', () => {
    dialogTagEl.show();
})

newTodoButtonEl.addEventListener('click', () => {
    dialogTaskEl.show();
})

dialogCancelTagEl.addEventListener('click', () => {
    dialogTagEl.close()
})

dialogCancelTaskEl.addEventListener('click', () => {
    dialogTaskEl.close()
})

dialogButtonTagEl.addEventListener('click', (e) => {
    e.preventDefault()
    addNewTag()
})

dialogButtonTaskEl.addEventListener('click', (e) => {
    e.preventDefault()
    addNewTask()
})

dialogSelectEl.addEventListener('change', (e) => {
    selectedTags.push(e.target.value)
    hydrateSelectedTags();
    addListenerToDeleteSelectedTags()
})

tagAllEl.addEventListener('click', () => {
    shownTasks = taskList;
    hydrateList(taskListEl, shownTasks, taskItem)
    addListenerToDeleteButtons();
})

tagImportantEl.addEventListener('click', () => {
    filterTaskList(true)
    hydrateList(taskListEl, shownTasks, taskItem)
    addListenerToDeleteButtons()
})

// Initialization //
hydrateList(customTagListEl, customTagList, tagItem)
hydrateList(taskListEl, shownTasks, taskItem)
hydrateTagOptions()
addListenerToDeleteButtons()
addListenerToTags()
addListenerToFinishTodo()