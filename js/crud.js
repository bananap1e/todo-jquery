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
    pagination('last');
};

const render = (page) => {
    const start         = page * postPerPage;
    let currentArray    = detectArray();
    let activeArray     = currentArray.slice(start - postPerPage, start);
    let content         = '';
    $listGroup.empty();
    activeArray.forEach((el) => {
        const className = (el.checked)  ? 'list-group-item row list-group-item-success entity'
                                        : 'list-group-item row entity';
        content +=
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
    $listGroup.append(content);
    $('li.list-group-item-success .toggle').prop('checked', true);
};

const editTodo = (newText, currentID) => {
    todosArray.forEach((el) => {
        if (el.id == currentID) {
            el.text = $('#edit').val();
        }
    });
    pagination();
};

const detectArray = () => {
    const activeTab = $('.tab.active').attr('id');
     if (activeTab == 'tab_checked') {
        return _.filter(todosArray, 'checked');
    } else if (activeTab == 'tab_active') {
        return _.filter(todosArray, {'checked': false})
    }
    pagination();
};

const pagination = (flagPage) => {
    const numberOfItems     = todosArray.length;
    const pageCount         = Math.ceil(numberOfItems / postPerPage);
    const pagesContainer    = $('#pages');
    let pages               = '';
    let currentPage         = $('.page.active a').attr('id') || 1;
    if (currentPage > pageCount || flagPage == 'last') {
        currentPage = pageCount;
    }
    if (flagPage == 'first') {
        currentPage = 1;
    }
    pagesContainer.empty();
    for (let i = 1; i <= pageCount; i++) {
        const className = (currentPage == i) ? 'page active' : 'page';
        pages += `<li class="${className}"><a href="#" id="${i}">${i}</a></li>`
    }
    pagesContainer.append(pages);
    storage();
    progressBar();
    render(currentPage);
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