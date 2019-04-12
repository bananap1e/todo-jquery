const addTodo = () => {
    let text = $newTodo.val().trim();
    if(!text){
        return false
    }
    do {
        id += 1
    } while (id < todosArray.length);
    let toDo = {
        text:       text,
        checked:    false,
        id:         id,
    };
    todosArray.push(toDo);
    $newTodo.val("");
    render();
};

const render = () => {
    let contentDone         = '';
    let contentActive = '';
    $listGroup.empty();
    const doneTasks         = _.filter(todosArray, 'checked');
    const activeTasks       = _.filter(todosArray, {'checked': false});
    doneTasks.forEach((el) => {
        const className = (el.checked)  ? 'list-group-item row list-group-item-success entity'
                                        : 'list-group-item row entity';
        contentDone +=
            `<li class='${className}' id='${el.id}'>
                <div class='col-xs-4 col-md-1'>
                    <input type='checkbox' class='toggle'>
                </div>
                <div class='col-xs-4 col-md-9'>
                    <p class='todo-label'>${el.text}</p>
                </div>
                <div class='col-xs-4 col-md-2'>
                    <span class='input-group-btn'>
                        <button class='destroy btn btn-danger default-style' type='button'>Delete</button>
                    </span>
                </div>
            </li>`;
    });
    activeTasks.forEach((el) => {
        const className = (el.checked)  ? 'list-group-item row list-group-item-success entity'
            : 'list-group-item row entity';
        contentActive +=
            `<li class='${className}' id='${el.id}'>
                <div class='col-xs-4 col-md-1'>
                    <input type='checkbox' class='toggle'>
                </div>
                <div class='col-xs-4 col-md-9'>
                    <p class='todo-label'>${el.text}</p>
                </div>
                <div class='col-xs-4 col-md-2'>
                    <span class='input-group-btn'>
                        <button class='destroy btn btn-danger default-style' type='button'>Delete</button>
                    </span>
                </div>
            </li>`;
    });
    $('#activeTasks').append(contentActive);
    $('#doneTasks').append(contentDone);
    $('li.list-group-item-success .toggle').prop('checked', true);
    storage();
    progressBar();
};

const editTodo = (newText, currentID) => {
    todosArray.forEach((el) => {
        if (el.id == currentID) {
            el.text = $('#edit').val();
        }
    });
    render();
};

const progressBar = () => {
    const doneTasks         = _.filter(todosArray, 'checked');
    const doneProgBar       = doneTasks.length / todosArray.length * 100;
    const doneWidthValue    = (`${doneProgBar}%`);
    const activeTasks       = _.filter(todosArray, {'checked': false});
    const activeProgBar     = activeTasks.length / todosArray.length * 100;
    const activeWidthValue  = (`${activeProgBar}%`);
    $doneBar    .css({width: doneWidthValue})
                .text(`${doneTasks.length} task done`);
    $currentBar .css({width: activeWidthValue})
                .text(`${activeTasks.length} task remaining`);
};