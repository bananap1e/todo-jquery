const todosArray = [];
let id = 0;
let $newTodoButton = $('#new-todo-button');

$newTodoButton.bind("click", () => {
    render();
});

const addTodo = () => {
    let $newTodo = $('#new-todo').val().trim();
    let toDo = {
        text: $newTodo,
        id: id,
        checked: false,
    };
    todosArray.push(toDo);
    $('#new-todo').val("");
    id += 1;
};

const render = () => {
    let content = '';
    const $listGroup = $('.list-group');
    addTodo();
    $listGroup.empty();
    todosArray.forEach((el) => {
    content +=
        `<li class='list-group-item row' id='${el.id}'>
            <div class='col-xs-4 col-md-1'>
                <input type='checkbox' class='toggle'>
            </div>
            <div class='col-xs-4 col-md-9'>
                <p class='todo-label' style='text-align: center'>${el.text}</p>
            </div>
            <div class='col-xs-4 col-md-2'>
                <span class='input-group-btn'>
                    <button class='destroy btn btn-danger' type='button'>Delete</button>
                </span>
            </div>
        </li>`;
    });
    $listGroup.append(content);
};

