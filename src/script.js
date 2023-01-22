import tagItem from "./tag-item.js"
import taskItem from "./task-item.js"

const customTagListEl = document.querySelector('.tags__list--custom')
const taskListEl = document.querySelector('.tasks__list')
const newTagButtonEl = document.querySelector('.tags__new-tag')
const newTodoButtonEl = document.querySelector('.tasks__button')
const dialogEl = document.querySelector('.dialog')
const dialogEl2 = document.querySelector('.dialog2')
const dialogInputEl = document.querySelector('.dialog__input')
const dialogButtonEl = document.querySelector('.dialog__button')
const dialogButtonEl2 = document.querySelector('.dialog__button2')

const customTagList = ["Example Tag 1", "Example Tag 2"]

const taskList = [
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

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}

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
    for (let i = 0; i < taskList.length; i++) {
        const element = taskList[i];


        const elementToAppend = document.createElement('li')
        elementToAppend.innerHTML = taskItem(element)

        taskListEl.append(elementToAppend)
    }
}

hydrateTagList()
hydrateTaskList()

newTagButtonEl.addEventListener('click', () => {
    dialogEl.show();
})

newTodoButtonEl.addEventListener('click', () => {
    dialogEl2.show();
})

dialogButtonEl.addEventListener('click', (e) => {
    e.preventDefault()

    if (dialogInputEl.value) {
        customTagList.push(dialogInputEl.value);
        hydrateTagList()
    }
})

dialogButtonEl2.addEventListener('click', (e) => {
    e.preventDefault()
    if (dialogInputEl.value) {
        taskList.push({
            id: generateId(),
            isFinished: false,
            title: dialogInputEl.value,
            tags: ["hey"]
        })
        hydrateTaskList()
    }
})