const inputName = document.getElementById('input-name-goal');
const inputTimes = document.getElementById('input-times-goal');
const inputDateStart = document.getElementById('input-date-start');
const inputDateEnd = document.getElementById('input-date-end');
const btnCreate = document.getElementById('create-btn');
const divBox = document.querySelector('.box');
const windowsEdit = document.querySelector('.windowsEdit');
const btnClose = document.querySelector('#close-btn');
const editName = document.querySelector('#editName');
const editTimes = document.querySelector('#editTimes');
const editDateStart = document.querySelector('#edit-date-start');
const editDateEnd = document.querySelector('#edit-date-end');
const btnUpdate = document.querySelector('#update-btn');
let id = 0;

btnCreate.addEventListener('click', () => {
    let goal = {
        id: createId(),
        name: inputName.value,
        times: inputTimes.value,
        dateStart: inputDateStart.value,
        dateEnd: inputDateEnd.value
    }
    let idGoal = goal.id;
    addGoal(goal)
})

function createId() {
    id += 1
    return id;
}

function addGoal(goal) {
    let boxGoal = structure(goal);
    divBox.appendChild(boxGoal);
}

function structure(goal) {
    let div = document.createElement('div');
    div.className = 'format-boxes';
    div.id = goal.id;

    let p = document.createElement('p');
    p.className = 'nameGoal';
    p.innerHTML = goal.name;

    let divCounter = document.createElement('div');
    divCounter.className = 'counter';

    let counterStart = document.createElement('p');
    counterStart.innerHTML = 0;

    let bar = document.createElement('p');
    bar.innerHTML = "/";

    let counterEnd = document.createElement('p');
    counterEnd.innerHTML = goal.times;

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "check-input";

    let divButtons = document.createElement('div');
    divButtons.className = "buttons-icons";

    let btnUndo = document.createElement('button');
    btnUndo.id = 'undo-btn';
    btnUndo.innerHTML = '<i class="fas fa-undo-alt icon"></i>';
    // btnUndo.setAttribute('onclick', 'undo('+goal.id+')');

    let btnEdit = document.createElement('button');
    btnEdit.id = 'edit-btn';
    btnEdit.innerHTML = '<i class="fas fa-pen icon"></i>';
    btnEdit.setAttribute('onclick', 'edit(' + goal.id + ')');

    let btnDelete = document.createElement('button');
    btnDelete.id = 'delete-btn';
    btnDelete.innerHTML = '<i class="fas fa-trash"></i>';
    btnDelete.setAttribute('onclick', 'remove(' + goal.id + ')');

    divCounter.appendChild(counterStart);
    divCounter.appendChild(bar);
    divCounter.appendChild(counterEnd);

    divButtons.appendChild(btnUndo);
    divButtons.appendChild(btnEdit);
    divButtons.appendChild(btnDelete);

    div.appendChild(p);
    div.appendChild(divCounter);
    div.appendChild(divButtons);

    return div

}

function edit(idGoal) {
    windowsEdit.classList.remove('hidden');
}
btnClose.addEventListener('click', () => {
    windowsEdit.classList.add('hidden');
})
btnUpdate.addEventListener('click', () => {
    let idGoal = goal.id;
    console.log(idGoal);
    // windowsEdit.classList.add('hidden');
})

function remove(idGoal) {
    let confirm = window.confirm('Are you sure you want to delete this?');
    if (confirm) {
        let div = document.getElementById('' + idGoal + '');
        if (div) {
            divBox.removeChild(div);
        }
    }
}