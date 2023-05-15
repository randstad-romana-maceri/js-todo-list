/*------------------
    VARIABLES
-------------------*/
let lists = [];
const form = document.querySelector("#form-todo");
const listTodoElement = document.querySelector("#list-todo");
const inputElement = document.querySelector("#new-todo-field");
/*------------------
    FUNCTIONS
-------------------*/
function onClickTodo() {
  const todoClicked = lists.find(
    (elm) => elm.id == this.parentElement.getAttribute("data-id")
  );

  const todoUpdated = { ...todoClicked };
  todoUpdated.completed = !todoUpdated.completed;

  fetch(
    `http://localhost:3000/todos/${this.parentElement.getAttribute("data-id")}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoUpdated),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const index = lists.findIndex((elm) => elm.id == data.id);
      lists.splice(index, 1, data);

      this.parentElement.classList.toggle("done");
    });
}

function onClickTodoDelete() {
  const index = lists.findIndex(
    (elm) => elm.id == this.parentElement.getAttribute("data-id")
  );

  fetch(
    `http://localhost:3000/todos/${this.parentElement.getAttribute("data-id")}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      lists.splice(index, 1);
      listTodoElement
        .querySelector(
          `[data-id="${this.parentElement.getAttribute("data-id")}"`
        )
        .remove();
    });
}

function renderList() {
  listTodoElement.innerHTML = "";
  lists.forEach(function (elm) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<span>${elm.title}</span> <i class="fa-solid fa-trash"></i>`;
    listItem.setAttribute("data-id", elm.id);
    if (elm.completed) {
      listItem.classList.add("done");
    }
    listTodoElement.append(listItem);
  });

  listTodoElement
    .querySelectorAll("li span")
    .forEach((elm) => elm.addEventListener("click", onClickTodo));
  listTodoElement
    .querySelectorAll("li i")
    .forEach((elm) => elm.addEventListener("click", onClickTodoDelete));
}
/*------------------
    INIT - PAGE LOAD
-------------------*/
fetch(`http://localhost:3000/todos`) // GET
  .then((response) => response.json())
  .then((data) => {
    lists = data;
    renderList();
  });

/*------------------
    EVENTS
-------------------*/
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Aggiungo un listItem alla lista
  const newTodo = {
    title: inputElement.value,
    completed: false,
  };

  fetch(`http://localhost:3000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lists.push(data);
      renderList();
    });
  // Resetto il valore del campo input
  form.reset();
});
