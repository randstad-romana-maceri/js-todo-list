/*------------------
    VARIABLES
-------------------*/
const lists = ["Fare la spesa", "Preparare il pranzo", "Portare fuori il cane"];
const form = document.querySelector("#form-todo");
const listTodoElement = document.querySelector("#list-todo");
const inputElement = document.querySelector("#new-todo-field");
/*------------------
    FUNCTIONS
-------------------*/
function renderList() {
  listTodoElement.innerHTML = "";
  lists.forEach(function (elm) {
    const listItem = document.createElement("li");
    listItem.textContent = elm;
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
  lists.push(inputElement.value);
  renderList();
  // Resetto il valore del campo input
  form.reset();
});
