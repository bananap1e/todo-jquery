$(document).ready(() => {
    if (JSON.parse(localStorage.getItem('array'))) {
        todosArray = JSON.parse(localStorage.getItem('array'));
        pagination();
    } else {
        return false
    }

    $newTodoButton.bind("click", () => {
        addTodo();
    });

    $newTodo.keyup(() => {
        if(event.keyCode === 13) {
            addTodo();
        }
    });

    $body.on('change', '.toggle', function() {
        let currentID = $(this).parents('li').attr('id');
        todosArray.forEach((el) => {
            if (el.id == currentID) {
                el.checked = this.checked;
            }
        });
        pagination();
    });

    $body.on('click', '.destroy', function() {
        const currentID = $(this).parents('li').attr('id');
        todosArray.forEach((el, index) => {
            if (el.id == currentID) {
                todosArray.splice(index, 1);
            }
        });
        pagination();
    });

    $body.on('dblclick', '.todo-label', function() {
        let originalText = $(this).text();
        $(this)
                .addClass("editing")
                .html
                    (`<input type="text" id="edit" value="${originalText}"/>`)
                .children()
                .focus();
        const   currentID = $(this).parents('li').attr('id');
        let     newText = $(this).text();
        $(this).children().keyup(function (){
            if (event.keyCode === 13) {
                editTodo(newText, currentID);
            }
        });
        $(this).children().first().blur(function (){
            editTodo(newText, currentID);
        });
    });

    $body.on('click', '#pages .page', function() {
        $('#pages .page').removeClass('active');
        $(this).addClass('active');
        pagination();
    });

    $tab.click(function(){
        $tab.removeClass('active');
        $(this).addClass('active');
        pagination('first');
    });
});