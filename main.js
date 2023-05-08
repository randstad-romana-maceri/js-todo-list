/*------------------
    VARIABLES
-------------------*/
const lists = [
  {
    title: "Fare la spesa",
    completed: false,
  },
  {
    title: "Preparare il pranzo",
    completed: false,
  },
  {
    title: "Portare fuori il cane",
    completed: true,
  },
];
const form = document.querySelector("#form-todo");
const listTodoElement = document.querySelector("#list-todo");
const inputElement = document.querySelector("#new-todo-field");
/*------------------
    FUNCTIONS
-------------------*/
function onClickTodo() {
  lists[this.id].completed = !lists[this.id].completed;
  this.classList.toggle("done");
}

function renderList() {
  listTodoElement.innerHTML = "";
  lists.forEach(function (elm, index) {
    const listItem = document.createElement("li");
    listItem.textContent = elm.title;
    listItem.id = index;
    if (elm.completed) {
      listItem.classList.add("done");
    }
    listItem.addEventListener("click", onClickTodo);
    listTodoElement.append(listItem);
  });
}
/*------------------
    INIT - PAGE LOAD
-------------------*/
renderList();

/*------------------
    EVENTS
-------------------*/
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Aggiungo un listItem alla lista
  lists.push({
    title: inputElement.value,
    completed: false,
  });
  renderList();
  // Resetto il valore del campo input
  form.reset();
});
