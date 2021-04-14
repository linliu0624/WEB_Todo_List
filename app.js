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
      // remove from local storage
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });

      todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  todo.appendChild(completeButton);
  todo.appendChild(trashButton);
  todo.style.animation = "scaleUp 0.3s forwards";
  section.appendChild(todo);

  // create an object for localstorage
  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };

  // store data into an array of objects
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  // 清空輸入欄位
  form.children[0].value = "";
  form.children[1].value = "";
  form.children[2].value = "";
});

// load data
let myList = localStorage.getItem("list");
if (myList != null) {
  let myListArray = JSON.parse(myList);
  myListArray.forEach((item) => {
    // create a todo
    let todo = document.createElement("div");
    todo.classList.add("todo");

    let text = document.createElement("p");
    text.classList.add("todoText");
    text.innerText = item.todoText;
    let time = document.createElement("p");
    time.classList.add("todoTime");
    time.innerText = item.todoMonth + " / " + item.todoDate;

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
        // remove from local storage
        let text = todoItem.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
          if (item.todoText == text) {
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });

        todoItem.remove();
      });
      todoItem.style.animation = "scaleDown 0.3s forwards";
    });

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    section.appendChild(todo);
  });
}

function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
      if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
  }
}
