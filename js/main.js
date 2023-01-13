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
const error = document.querySelector('.error');
let id = 0;
let today = new Date();
let newDate = today.toUTCString();
let dataBase = getInLocalStorage();



dataBase.forEach(element => {
    addGoal(element)
});

inputDateEnd.addEventListener('click', () => {
    debugger;
    inputDateEnd.min = inputDateStart.value;
});
inputEditDateEnd.addEventListener('click', () => {
    inputEditDateEnd.min = inputEditDateStart.value;
});
inputTimes.addEventListener('input', () => {
    inputTimes.value <= 0 ? error.innerHTML = 'Please enter a number greater than 0' : error.innerHTML = '';
});

btnCreate.addEventListener('click', () => {
    if (inputName.value !== "" && inputTimes.value !== "" && inputDateStart.value !== "" && inputDateEnd.value !== "") {
        error.innerText = "";
        let goal = {
            id: createId(),
            name: inputName.value,
            times: inputTimes.value,
            dateStart: inputDateStart.value,
            dateEnd: inputDateEnd.value,
            counterStart: 0,

        }
        // create db
        dataBase.push(goal);
        saveInLocalStorage();
        addGoal(goal)
        clearInputs()

    } else {
        error.innerText = "Please, all fields have to be filled!"
    }

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


    let divContainerProgressBar = document.createElement('div');
    divContainerProgressBar.id = 'container-progress-bar';

    let progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = (goal.counterStart / goal.times) * 100 + "%";

    let p = document.createElement('p');
    p.id = 'nameGoal';
    p.className = 'name-progress-bar';
    p.innerHTML = goal.name;

    let divCounter = document.createElement('div');
    divCounter.className = 'counter';

    let counterStart = document.createElement('p');
    counterStart.className = 'counterStart';
    counterStart.innerHTML = goal.counterStart;

    let bar = document.createElement('p');
    bar.innerHTML = "/";

    let counterEnd = document.createElement('p');
    counterEnd.className = 'times';
    counterEnd.innerHTML = goal.times;

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "check-input";
    checkbox.setAttribute('onchange', 'check(' + goal.id + ')');

    let divButtons = document.createElement('div');
    divButtons.className = "buttons-icons";

    let btnUndo = document.createElement('button');
    btnUndo.id = 'undo-btn';
    btnUndo.innerHTML = '<i class="fas fa-undo-alt icon"></i>';
    btnUndo.setAttribute('onclick', 'undo(' + goal.id + ')');

    let btnEdit = document.createElement('button');
    btnEdit.id = 'edit-btn';
    btnEdit.innerHTML = '<i class="fas fa-pen icon"></i>';
    btnEdit.setAttribute('onclick', 'edit(' + goal.id + ')');

    let btnDelete = document.createElement('button');
    btnDelete.id = 'delete-btn';
    btnDelete.innerHTML = '<i class="fas fa-trash"></i>';
    btnDelete.setAttribute('onclick', 'remove(' + goal.id + ')');

    let divCounterButtons = document.createElement('div');
    divCounterButtons.className = 'divCounterButtons';


    divContainerProgressBar.appendChild(progressBar);
    divContainerProgressBar.appendChild(p);

    divCounter.appendChild(checkbox);
    divCounter.appendChild(counterStart);
    divCounter.appendChild(bar);
    divCounter.appendChild(counterEnd);


    divButtons.appendChild(btnUndo);
    divButtons.appendChild(btnEdit);
    divButtons.appendChild(btnDelete);

    divCounterButtons.appendChild(divCounter);
    divCounterButtons.appendChild(divButtons);


    div.appendChild(divContainerProgressBar);
    div.appendChild(divCounterButtons);

    let divDate = document.createElement('div');
    divDate.className = 'date';

    let pLastTime = document.createElement('p');
    pLastTime.id = 'lastTime';


    let dateStart = document.createElement('p');
    dateStart.className = 'start';
    dateStart.innerHTML = `Goal start in:  ${goal.dateStart}`;

    let dateEnd = document.createElement('p');
    dateEnd.className = 'end';
    dateEnd.innerHTML = `Goal end in :  ${goal.dateEnd}`;

    divDate.appendChild(pLastTime);
    divDate.appendChild(dateStart);
    divDate.appendChild(dateEnd);

    container.appendChild(div);
    container.appendChild(divDate);

    return container;

}

//open the window to editCounterStart
function edit(idGoal) {
    windowsEdit.classList.remove('hidden');
    let div = document.getElementById('' + idGoal + '');
    let name = div.querySelector('p#nameGoal');
    let times = div.querySelector('p.times');
    let start = div.querySelector('p.start');
    let end = div.querySelector('p.end');

    if (div) {
        idEditGoal.innerHTML = (`Edit goal ${idGoal}`);
        inputEditName.value = name.innerText;
        inputEditTimes.value = times.innerText;
        inputEditDateStart.value = start.innerText.slice(-10);
        inputEditDateEnd.value = end.innerText.slice(-10);
    }
}
btnClose.addEventListener('click', () => {
    windowsEdit.classList.add('hidden');
})
btnUpdate.addEventListener('click', () => {
    let idGoal = idEditGoal.innerHTML.replace('Edit goal', '');
    // create a new object with the goal updated;
    let goal = {
        id: Number(idGoal.trim()),
        name: inputEditName.value,
        times: inputEditTimes.value,
        dateStart: inputEditDateStart.value,
        dateEnd: inputEditDateEnd.value,
    }
    updateDatabase(goal)
    saveInLocalStorage();

    let currentGoal = document.getElementById('' + idGoal.trim() + '');
    console.log(currentGoal);
    if (currentGoal) {
        let divUpdateGoal = structure(goal);
        divBox.replaceChild(divUpdateGoal, currentGoal);
    }

    windowsEdit.classList.add('hidden');
})

function check(idGoal) {
    let div = document.getElementById('' + idGoal + '');
    let checkbox = div.querySelector('#check-input')
    let counterStart = div.querySelector('.counterStart');
    let counterEnd = div.querySelector('.times');
    let progressBar = div.querySelector('.progress-bar');
    let pLastTime = div.querySelector('#lastTime');
    let counter = Number(counterStart.innerText);
    if (checkbox.checked && counter < counterEnd.innerHTML) {
        counter = counter + 1;
        counterStart.innerText = counter;
        progressBar.style.width = (counter / counterEnd.innerHTML) * 100 + "%";
        pLastTime.innerHTML = `Last time: ${newDate}`;
        incrementCounter(idGoal);
        saveInLocalStorage();
    }

}

function undo(idGoal) {
    let div = document.getElementById('' + idGoal + '');
    let counterStart = div.querySelector('.counterStart');
    let counterEnd = div.querySelector('.times');
    let progressBar = div.querySelector('.progress-bar');
    let counter = Number(counterStart.innerText);
    if (counter > 0) {
        counter = counter - 1;
        counterStart.innerText = counter;
        progressBar.style.width = (counter / counterEnd.innerHTML) * 100 + "%";

        decrementCounter(idGoal);
        saveInLocalStorage();
    }

}

function remove(idGoal) {
    console.log(idGoal);
    let confirm = window.confirm('Are you sure you want to delete this?');
    if (confirm) {
        let div = document.getElementById('' + idGoal + '');
        if (div) {
            divBox.removeChild(div);
            removeItemDatabases(Number(idGoal));
            saveInLocalStorage()
        }

    }
    // saveInLocalStorage()

}

function clearInputs() {
    inputName.value = '';
    inputTimes.value = '';
    inputDateStart.value = '';
    inputDateEnd.value = '';
}

function getInLocalStorage() {
    const data = JSON.parse(localStorage.getItem('db'));
    if (data) {
        return data
    } else {
        return [];
    }


}

function saveInLocalStorage() {
    localStorage.setItem('db', JSON.stringify(dataBase))
}

//if find the same id, replace for the new information. 
function updateDatabase(goal) {

    dataBase = dataBase.map(element => {
        if (goal.id === element.id) {
            return goal;
        }
        return element;
    });
}

// if find the same id, will be deleted. 
function removeItemDatabases(idGoal) {
    dataBase = dataBase.filter(item => item.id !== idGoal);
}

// if find the same id, will be incremented;
function incrementCounter(idGoal) {
    dataBase = dataBase.map(element => {
        if (idGoal === element.id) {
            element.counterStart = element.counterStart + 1;
        }
        return element;
    });
}

function decrementCounter(idGoal) {
    dataBase = dataBase.map(element => {
        if (idGoal === element.id) {
            element.counterStart = element.counterStart - 1;
        }
        return element;
    });
}