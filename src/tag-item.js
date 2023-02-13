export default (tag) => /* html */`
    <li class="tags__list-item tags__list-item--custom" id="tag">
        ${tag}
        <img class="dialog__cancel dialog__cancel--tag" src="./assets/cancel.svg" alt="" id="delete-custom-tag">
    </li>
`