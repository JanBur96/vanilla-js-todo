export default (task) => /* html */`
    <li class="tasks__list-item" data-id="${task.id}">
        <div class="tasks__list-item-details">
            <img src="./assets/empty-circle.svg" alt="An empty circle which means a todo is unfinished" class="icon" id="finish-todo">
            <div class="tasks__list-item-main">
                <h2 class="tasks__list-item-headline">
                    ${task.title}
                </h2>
                <ul class="tasks__list-item-tags">
                    ${task.tags.map((tag) => `<li>${tag}</li>`).join('')}
                </ul>
            </div>
        </div>
        <img src="./assets/trash.svg" alt="A trash can as a delete icon" class="icon" id="delete-task">
    </li>
`