const inputNameGoal = document.getElementById('input-name-goal');
const inputTimesGoal = document.getElementById('input-times-goal');
const inputDateStart = document.getElementById('input-date-start');
const inputDateEnd = document.getElementById('input-date-end');
const btnCreate = document.getElementById('create-btn');
const doing = document.querySelector('.doing');
const nameGoal = document.getElementById('name-progress-bar');
const counterStart = document.getElementById('counter-start');
const counterEnd = document.getElementById('counter-end');
const checkbox = document.getElementById('check-input');
const btnUndo = document.getElementById('undo-btn');
const btnEdit = document.getElementById('edit-btn');
const about = document.querySelector('.about');
const lastTimeDate = document.getElementById('last-time-date');
const dateStart = document.getElementById('date-start');
const dateEnd = document.getElementById('date-end');
const progressBar = document.querySelector('.progress-bar');
const updateGoal = document.querySelector('.update-goal');
const btnUpdate = document.getElementById('update-btn');
let counter = 0;

btnCreate.addEventListener('click', () => {
    doing.classList.remove("hidden");
    nameGoal.innerHTML = inputNameGoal.value;
    counterEnd.innerHTML = inputTimesGoal.value;
    dateEnd.innerHTML = inputDateEnd.value;
    dateStart.innerHTML = inputDateStart.value;
    counterStart.innerText = "0"
})
checkbox.addEventListener('change', function () {
    if (this.checked) {
        counter = counter + 1;
        counterStart.innerText = counter;
        progressBar.style.width = (counter / inputTimesGoal.value) * 100 + "%";
        lastTimeDate.innerText = new Date();
    }
    // else {
    //     lastTimeDate.innerText = new Date();
    // }
})
btnUndo.addEventListener('click', () => {
    counter = counter - 1;
    counterStart.innerText = counter;
    progressBar.style.width = (counter / inputTimesGoal.value) * 100 + "%";
    lastTimeDate.innerText = new Date();
})

btnEdit.addEventListener('click', () => {
    updateGoal.classList.remove("hidden");
    nameGoal.value = inputNameGoal.value;
    counterEnd.innerHTML = inputTimesGoal.value;
    dateEnd.innerHTML = inputDateEnd.value;
    dateStart.innerHTML = inputDateStart.value;
})
