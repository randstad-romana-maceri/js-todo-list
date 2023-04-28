/*------------------
    VARIABLES
-------------------*/
const lists = ["Fare la spesa", "Preparare il pranzo", "Portare fuori il cane"];
const form = document.querySelector("#form-todo");

/*------------------
    FUNCTIONS
-------------------*/
function renderList() {
  document.querySelector("#list-todo").innerHTML = "";
  lists.forEach(function (elm) {
    const listItem = document.createElement("li");
    listItem.textContent = elm;
    document.querySelector("#list-todo").append(listItem);
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
  // Leggo il valore del campo input
  const inputElement = document.querySelector("#new-todo-field");
  // Aggiungo un listItem alla lista
  lists.push(inputElement.value);
  renderList();
  // Resetto il valore del campo input
  form.reset();
});
