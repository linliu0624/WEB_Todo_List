let add = document.querySelector("form button");
let section = document.querySelector("section");

add.addEventListener("click", (e) => {
  // prevent form from begin submitted
//   e.preventDefault();

  // get the input value
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  if (todoText == "") {
    alert("Please Enter some Text.");
    return;
  } else if (todoMonth == "" || todoDate == "") {
    alert("Please Enter month and date.");
    return;
  }
  console.log(typeof todoMonth);
  if (Number(todoMonth) < 1 || Number(todoMonth) > 12) {
    alert("Please Enter the month between 1-12.");
    form.children[1].value = "";
    return;
  } else if (Number(todoDate) < 1 || Number(todoDate) > 31) {
    alert("Please Enter the date between 1-31.");
    form.children[2].value = "";
    return;
  }
  // create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");

  let text = document.createElement("p");
  text.classList.add("todoText");
  text.innerText = todoText;

  let time = document.createElement("p");
  time.classList.add("todoTime");
  time.innerText = todoMonth + " / " + todoDate;

  todo.appendChild(text);
  todo.appendChild(time);

  // create green check and red trash can
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';

  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    // 如果沒有這個addEventListener, 直接放remove, 則按下trashButtom的時候, 動畫來不及結束, 就會把todoItem給刪除, 也就是會看不到效果.
    todoItem.addEventListener("animationend", () => {
      todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  todo.appendChild(completeButton);
  todo.appendChild(trashButton);
  todo.style.animation = "scaleUp 0.3s forwards";
  section.appendChild(todo);

  // 清空輸入欄位
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";
});
