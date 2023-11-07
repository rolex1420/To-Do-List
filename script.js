let listDiv = document.querySelector("#task-list");
let addDiv = document.querySelector("#ask-add");
let textBox = document.querySelector("#task-input");
let addBtn = document.querySelector("#add-btn");
let clearBtn = document.querySelector("#remove-local");

let taskArr = [];

addBtn.addEventListener("click", () => {
    if (textBox.value.trim() !== "") {
        addtask(textBox.value);
    } else {
        textBox.value = "";
    }
});

function addtask(taskInfo) {
    let div = document.createElement("div");
    let inDiv = document.createElement("div");
    let checkbox = document.createElement("input");
    let para = document.createElement("p");
    let removeBtn = document.createElement("button");

    div.classList.add("dynamic-div");
    inDiv.classList.add("inner-div");
    checkbox.type = "checkbox";
    para.innerText = taskInfo;
    removeBtn.innerHTML = "&cross;";

    checkbox.addEventListener("change", function () {
        if (this.checked) {
            para.style.textDecoration = "line-through";
            para.style.color = "grey";
        } else {
            para.style.textDecoration = "";
            para.style.color = "";
        }
    });

    removeBtn.addEventListener("click", () => {
        let index = taskArr.indexOf(para.innerText);
        taskArr.splice(index, 1);
        localStorage.setItem("task", JSON.stringify(taskArr));

        listDiv.removeChild(div);
    });

    taskArr.push(para.innerText);
    localStorage.setItem("task", JSON.stringify(taskArr));

    inDiv.append(checkbox,para);
    div.append(inDiv, removeBtn);
    listDiv.appendChild(div);
    textBox.value = "";
}

window.addEventListener("load",localdata);

function localdata(){
    if(localStorage.getItem("task")){
        userArr =  JSON.parse(localStorage.getItem("task"));
        userArr.forEach((tasks)=>{
            addtask(tasks);
        })
    }
}

clearBtn.addEventListener("click", () => {
    localStorage.clear();
});
