let todosArray = [];
let id = 0;
let $newTodoButton = $('#new-todo-button');
let $newTodo = $('#new-todo');
let $listGroup = $('.list-group');
const postPerPage = 5;

$(document).ready(function() {
    if (JSON.parse(localStorage.getItem('array'))) {
        todosArray = JSON.parse(localStorage.getItem('array'));
        pagination();
    } else {
        return false
    }
});

const storage = () => {
    localStorage.setItem('array', JSON.stringify(todosArray));
};

const addTodo = () => {
    let text = $("#new-todo").val().trim();
    if(!text){
        return false
    }
    do {
        id += 1
    } while (id < todosArray.length);
    let toDo = {
        text: text,
        checked: false,
        id: id,
    };
    todosArray.push(toDo);
    $('#new-todo').val("");
    pagination('last');
};

const render = (page) => {
    const start = page * postPerPage;
    let currentArray = detectArray();
    let activeArray = currentArray.slice(start - postPerPage, start);
    let content = '';
    $listGroup.empty();
    activeArray.forEach((el) => {
        const className = (el.checked) ? 'list-group-item row list-group-item-success' : 'list-group-item row';
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
                        <button class='destroy btn btn-danger' type='button'>Delete</button>
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
    const numberOfItems = todosArray.length;
    const pageCount = Math.ceil(numberOfItems / postPerPage);
    const pagesContainer = $('#pages');
    let pages = '';
    let currentPage = $('.page.active a').attr('id') || 1;
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
    render(currentPage);
};

$newTodoButton.bind("click", () => {
    addTodo();
});

$newTodo.keyup(() => {
    if(event.keyCode === 13) {
        addTodo();
    }
});

$("body").on('change', '.toggle', function() {
    let currentID = $(this).parents('li').attr('id');
    todosArray.forEach((el) => {
        if (el.id == currentID) {
            el.checked = this.checked;
        }
    });
    pagination();
});

$("body").on('click', '.destroy', function() {
    const currentID = $(this).parents('li').attr('id');
    todosArray.forEach((el, index) => {
        if (el.id == currentID) {
            todosArray.splice(index, 1);
        }
    });
    pagination();
});

$("body").on('dblclick', '.todo-label', function() {
    let originalText = $(this).text();
    $(this).addClass("editing");
    $(this).html(`<input type="text" id="edit" value="${originalText}"/>`);
    $(this).children().focus();
    const currentID = $(this).parents('li').attr('id');
    let newText = $(this).text();
    $(this).children().keyup(function (){
        if (event.keyCode === 13) {
            editTodo(newText, currentID);
        }
    });
    $(this).children().first().blur(function (){
        editTodo(newText, currentID);
    });
});

$('body').on('click', '#pages .page', function() {
    $('#pages .page').removeClass('active');
    $(this).addClass('active');
    pagination();
});

$('.tab').click(function(){
    $('.tab').removeClass('active');
    $(this).addClass('active');
    pagination('first');
});