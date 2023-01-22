const customTagListEl = document.querySelector('.tags__list--custom')
const taskListEl = document.querySelector('.tasks__list')
const newTagButtonEl = document.querySelector('.tags__new-tag')
const newTodoButtonEl = document.querySelector('.tasks__button')
const dialogEl = document.querySelector('.dialog')
const dialogInputEl = document.querySelector('.dialog__input')
const dialogButtonEl = document.querySelector('.dialog__button')

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

newTagButtonEl.addEventListener('click', () => {
    dialogEl.show();
})

dialogButtonEl.addEventListener('click', (e) => {
    e.preventDefault()
    customTagList.push(dialogInputEl.value);
})