const inputName = document.getElementById('input-name-goal');
const inputTimes = document.getElementById('input-times-goal');
const inputDateStart = document.getElementById('input-date-start');
const inputDateEnd = document.getElementById('input-date-end');
const btnCreate = document.getElementById('create-btn');
const divBox = document.querySelector('.box');
const windowsEdit = document.querySelector('.windowsEdit');
const btnClose = document.querySelector('#close-btn');
const inputEditName = document.querySelector('#editName');
const inputEditTimes = document.querySelector('#editTimes');
const inputEditDateStart = document.querySelector('#edit-date-start');
const inputEditDateEnd = document.querySelector('#edit-date-end');
const btnUpdate = document.querySelector('#update-btn');
const idEditGoal = document.querySelector('#id-edit');
let id = 0;

btnCreate.addEventListener('click', () => {
    let goal = {
        id: createId(),
        name: inputName.value,
        times: inputTimes.value,
        dateStart: inputDateStart.value,
        dateEnd: inputDateEnd.value
    }
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

    let container = document.createElement('div');
    container.className = 'container';
    container.id = goal.id;

    let div = document.createElement('div');
    div.className = 'format-boxes';

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
    counterEnd.className = 'times';
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

    divCounter.appendChild(checkbox);
    divCounter.appendChild(counterStart);
    divCounter.appendChild(bar);
    divCounter.appendChild(counterEnd);

    divButtons.appendChild(btnUndo);
    divButtons.appendChild(btnEdit);
    divButtons.appendChild(btnDelete);

    div.appendChild(p);
    div.appendChild(divCounter);
    div.appendChild(divButtons);

    let divDate = document.createElement('div');
    divDate.className = 'date';

    let pLastTime = document.createElement('p');
    pLastTime.innerHTML = `Last time: ${new Date()}`

    let pStart = document.createElement('p');
    pStart.className = 'start';
    // pStart.innerHTML = `Goal started in: ${goal.dateStart}`
    pStart.innerHTML = goal.dateStart;


    let pEnd = document.createElement('p');
    pEnd.className = 'end';
    // pEnd.innerHTML = `Goal end in: ${goal.dateEnd}`
    pEnd.innerHTML = goal.dateEnd;

    divDate.appendChild(pLastTime);
    divDate.appendChild(pStart);
    divDate.appendChild(pEnd);

    container.appendChild(div);
    container.appendChild(divDate);

    return container;

}

//open the window to edit
function edit(idGoal) {
    windowsEdit.classList.remove('hidden');
    let div = document.getElementById('' + idGoal + '');
    let name = div.querySelector('p.nameGoal');
    let times = div.querySelector('p.times');
    let start = div.querySelector('p.start');
    let end = div.querySelector('p.end');

    if (div) {
        idEditGoal.innerHTML = (`Edit goal ${idGoal}`);
        inputEditName.value = name.innerText;
        inputEditTimes.value = times.innerText;
        inputEditDateStart.value = start.innerText;
        inputEditDateEnd.value = end.innerText;

        console.log(inputEditDateStart.value);
    }
}
btnClose.addEventListener('click', () => {
    windowsEdit.classList.add('hidden');
})
btnUpdate.addEventListener('click', () => {
    let idGoal = idEditGoal.innerHTML.replace('Edit goal', '');
    // create a new object with the goal updated;
    let goal = {
        id: idGoal.trim(),
        name: inputEditName.value,
        times: inputEditTimes.value,
        dateStart: inputEditDateStart.value,
        dateEnd: inputEditDateEnd.value,
    }

    let currentGoal = document.getElementById('' + idGoal.trim() + '');
    console.log(currentGoal);
    if (currentGoal) {
        let divUpdateGoal = structure(goal);
        divBox.replaceChild(divUpdateGoal, currentGoal);
    }

    windowsEdit.classList.add('hidden');
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