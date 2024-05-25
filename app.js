    const firebaseConfig = {
    apiKey: "AIzaSyDJkM00RdH5baIoJhyTwJ4Mzn2skF9i644",
    authDomain: "todo-app-de139.firebaseapp.com",
    projectId: "todo-app-de139",
    databaseURL: "https://todo-app-de139-default-rtdb.firebaseio.com",
    storageBucket: "todo-app-de139.appspot.com",
    messagingSenderId: "1063135500800",
    appId: "1:1063135500800:web:0f5249c5292aa1b6d2d6e5",
    measurementId: "G-J2D2NYKJ25"
  };

  var app = firebase.initializeApp(firebaseConfig);

  var list = document.getElementById("list");

firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    var liElement = document.createElement("li");

    var liText = document.createTextNode(data.val().todoVal);

    liElement.appendChild(liText);

    list.appendChild(liElement);

    var EditBtnELement = document.createElement("button");

    var EditBtnText = document.createTextNode("Edit");

    EditBtnELement.appendChild(EditBtnText);

    var DeleteBtnELement = document.createElement("button");

    var DeleteBtnText = document.createTextNode("Delete");

    DeleteBtnELement.appendChild(DeleteBtnText);

    liElement.appendChild(EditBtnELement);

    liElement.appendChild(DeleteBtnELement);

    EditBtnELement.setAttribute("class", "Editbtn");
    DeleteBtnELement.style.backgroundColor = "lightcoral";

    DeleteBtnELement.setAttribute("onclick", "deleteItem(this)");

    DeleteBtnELement.setAttribute("id", data.val().key);

    EditBtnELement.setAttribute("onclick", "EditItem(this)");

    EditBtnELement.setAttribute("id", data.val().key);
  });

function addTodo() {
  var input = document.getElementById("todoInput");

  var id = Date.now().toString(25);

  var todoObj = {
    todoVal: input.value,
    key: id,
  };

  firebase
    .database()
    .ref("todos/" + id)
    .set(todoObj);
}

function deleteAll() {
  firebase.database().ref("todos").remove();
  list.innerHTML = "";
}

function deleteItem(e) {
  firebase.database().ref(`todos/${e.id}`).remove();
  e.parentNode.remove();
}

function EditItem(e) {
  var updateValue = prompt(
    "Enter updated value",
    e.parentNode.firstChild.nodeValue
  );

  firebase.database().ref(`todos/${e.id}`).set({
    key: e.id,
    todoVal: updateValue,
  });

  e.parentNode.firstChild.nodeValue = updateValue;
}



// const addBtn = document.querySelector
// ("#add-btn");
// const newTaskInput = document.querySelector
// ("#wrapper input");
// const tasksContainer = document.querySelector
// ("#tasks");
// const error = document.getElementById
// ("error");
// const countValue = document.querySelector(".count-value");
// let taskCount = 0;

// const displaycount = (taskCount) => {
//     countValue.innerText = taskCount;
// };

// const addTask = () => {
//     const taskName = newTaskInput.value.trim();
//     error.style.display = "none";
//     if(!taskName) {
//        setTimeout(() => {
//         error.style.display = "block";
//        }, 200);
//        return;
//     }
//      const task = `<div class="task">
//      <input type="checkbox"class="task-check">

//      <span class="taskname">${taskName}</span>

//       <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>

//       <button class="delete"><i class="fa-solid fa-trash"></i></button>
//      </div>`;

//      tasksContainer.insertAdjacentHTML("beforeend",task);

//      const deleteButtons = document.querySelectorAll(".delete");
//      deleteButtons.forEach(button => {
//         button.onclick = () => {
//             button.parentNode.remove();
//             taskCount -= 1;
//             displaycount(taskCount); 
//         };
//      });

//      const editButtons = document.querySelectorAll(".edit");
//      editButtons.forEach((editBtn) => {
//         editBtn.onclick = (e) => {
//             let targetElement = e.target;
//             if(
//                 !(e.target.className == "edit")){
//                     targetElement = e.target.parentElement;
//                 }
//             newTaskInput.value = targetElement.previousElementSibling?.innerText;
//             targetElement.parentNode.remove();
//             taskCount-= 1;
//             displaycount(taskCount);
//         };
//      });
//      const taskcheck = document.querySelectorAll(".task-check");
//      taskcheck.forEach((checkBox) => {
//         checkBox.onchange = () => {
//             checkBox.nextElementSibling.classList.toggle("completed");
//             if(checkBox.checked){
//                 taskCount -=1;

//             }
//             else{
//                 taskCount += 1;   
//             }
//             displaycount(taskCount);
//         };  
//      });
//      taskCount += 1;
//      displaycount(taskCount);
//      newTaskInput.value = "";
// };

// addBtn.addEventListener("click",addTask);

// window.onload = () => {
//     taskCount =0;
//     displaycount(taskCount);
//     newTaskInput.value= "";
// };