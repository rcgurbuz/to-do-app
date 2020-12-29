//select all elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners(){   // All event listeners
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filtertodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Are you sure?")){
        //remove all values from interface
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }

        localStorage.removeItem("todos");
    }
    
    
}

function filtertodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //not find
            listItem.setAttribute("style","display: none !important");
        }
        else{
            listItem.setAttribute("style","display: block");
        }
    })
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage( e.target.parentElement.parentElement.textContent)
    showAlert("dark", "'todo' succesfully deleted")
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos =getTodosFromStorage();
    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // delete value from array
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo =todoInput.value.trim();


    if(newTodo === ""){
        /* <div class="alert alert-warning" role="alert">
            A simple warning alert—check it out!
          </div> */

        showAlert("danger","Please add 'todo'");
    }
    else{
        addTodoToUI(newTodo);
        showAlert("success","'todo' successfully added");
        addTodoToStorage(newTodo);
    }
    



    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    // set Timeout
    setTimeout(function(){
        alert.remove();
    },1000);
}


function addTodoToUI(newTodo){  // Add string value as list item to UI

    /* <li class="list-group-item d-flex justify-content-between">
    Todo 1
    <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
    </a>
    </li> */


    // Create a list item
    const listItem = document.createElement("li");
    // Create a link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";


    //Adding text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);


    //Adding list items to todo list
    todoList.appendChild(listItem);
    todoInput.value = "";


}