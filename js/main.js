const inputNameGoal = document.getElementById('input-name-goal');
const inputTimesGoal = document.getElementById('input-times-goal');
const inputDateStart = document.getElementById('input-date-start');
const inputDateEnd = document.getElementById('input-date-end');
const btnCreate = document.getElementById('create-btn');
const doing = document.querySelector('.doing');
// const lastTimeDate = document.getElementById('last-time-date');
const updateGoal = document.querySelector('.update-goal');
let counter = 0;
let counterId = 1;

const goals = []
const arrayId = []
function putOnListItem(name, times, dateStart, dateEnd) {
    const divListGoal = document.createElement('div');
    divListGoal.innerHTML = `
    <div class="box">
    <input type="text" value="${counterId}" id="goal-input-id" class="hidden"  >
        <div class="container-progress-bar format-boxes">
            <div class="progress-bar"></div>
            <p class="name-progress-bar">${name}</p>
          
        </div>
        <div class="counter format-boxes">
            <p class="counter-start">0</p>
            <p> / </p>
            <p class="counter-end">${times}</p>
            <input type="checkbox" id="check-input-${counterId}" class="ckeck" >
            
        </div>
        <div class="buttons">
            <button id="undo-btn" class="undo"><i class="fas fa-undo-alt icon"></i></button>
            <button id="edit-btn" class="edit"><i class="fas fa-pen icon"></i></button>
        </div>

        <div class="about">
            <div class="date">
                <div>
                    <p>Last time done: </p>
                    <p class="last-time-date">${new Date()}</p>
                </div>
                <div>
                    <p>Goal started in:</p>
                    <p class="date-start">${dateStart}</p>
                </div>
                <div>
                    <p>Goal finish in:</p>
                    <p class="date-end">${dateEnd}</p>
                </div>

            </div>
        </div>

    

        <div class="edit-goal hidden">
    
            <div class="div-name">
                <label for="text">Your goal:</label>
                <input type="text" id="edit-name-goal" class="format-boxes"  value="${name}">
                
            </div>

            <div class="div-time">
                <label for="text">Many times?</label>
                <input type="number" id="edit-times-goal" value="${times}" class="format-boxes">
                
            </div>
            <div class="div-start">
                <label for="text">Start:</label>
                <input type="date" id="edit-date-start" class="format-boxes" value="${dateStart}">
            </div>
            <div class="div-end">
                <label for="text">End:</label>
                <input type="date" id="edit-date-end" class="format-boxes" value="${dateEnd}">
            </div>
            <button type="submit" id="update-btn">Update</button>

         </div>

    </div>
    `
    return divListGoal
}
function listGoal() {

    const divListGoal = putOnListItem(inputNameGoal.value, inputTimesGoal.value, inputDateStart.value, inputDateEnd.value)

    doing.appendChild(divListGoal)


    //create object in the array 
    goals.push({

        id: counterId,
        name: inputNameGoal.value,
        times: inputTimesGoal.value,
        dateStart: inputDateStart.value,
        dateEnd: inputDateEnd.value,

    })


    //check what btn is clicked
    document.addEventListener("click", (e) => {
        const targetElement = e.target;
        console.log(targetElement)

    })

    //increment counter and progress bar
    const progressBar = document.querySelector('.progress-bar');
    const checkInput = document.getElementById(`check-input-${counterId}`);
    const counterStart = document.querySelector('.counter-start');
    checkInput.addEventListener('change', function (e) {
        console.log(e)
        if (this.checked) {
            counter = counter + 1;
            counterStart.innerText = counter;
            progressBar.style.width = (counter / inputTimesGoal.value) * 100 + "%";
        }
    })

    counterId += 1;

    //decrement counter and progress bar
    const btnUndo = document.querySelector('#undo-btn');
    btnUndo.addEventListener('click', () => {
        if (counter > 0) {
            counter = counter - 1;
            counterStart.innerText = counter;
            progressBar.style.width = (counter / inputTimesGoal.value) * 100 + "%";
        }

    })

    //edit the goal
    let boxEditGoal = document.querySelector('.edit-goal');
    const btnEdit = document.querySelector('#edit-btn');
    btnEdit.addEventListener('click', () => {
        boxEditGoal.classList.remove("hidden");
        editGoal()
    })

}


function editGoal() {
    let listNameGoal = document.querySelector('.name-progress-bar')
    listNameGoal.innerHTML = inputNameGoal.value;

    let listTimesGoal = document.querySelector('.counter-end')
    listTimesGoal.innerHTML = inputTimesGoal.value;


    let listDateStart = document.querySelector('.date-start')
    listDateStart.innerHTML = inputDateStart.value;

    let listDateEnd = document.querySelector('.date-end')
    listDateEnd.innerHTML = inputDateEnd.value;


    let boxEditGoal = document.querySelector('.edit-goal');
    let inputId = document.querySelector('#goal-input-id');
    console.log(inputId.value);

    let updateName = document.querySelector('#edit-name-goal');
    let updateTimes = document.querySelector('#edit-times-goal');
    let updateDateStart = document.querySelector('#edit-date-start');
    let updateDateEnd = document.querySelector('#edit-date-end');
    const btnUpdate = document.getElementById('update-btn');
    btnUpdate.addEventListener('click', () => {
        listNameGoal.innerHTML = updateName.value;
        listTimesGoal.innerHTML = updateTimes.value;
        listDateStart.innerHTML = updateDateStart.value;
        listDateEnd.innerHTML = updateDateEnd.value;
        boxEditGoal.classList.add("hidden");

    })


}








btnCreate.addEventListener('click', () => {
    // cleanCreateGoal()
    listGoal()

})





function cleanCreateGoal() {
    console.log('passou no input')
    inputNameGoal.innerHTML = "";
    inputTimesGoal.innerHTML = "";
    inputDateStart.innerHTML = "";
    inputDateEnd.innerHTML = "";

    // inputNameGoal.value = "";
    // inputTimesGoal.value = "";
    // inputDateStart.value = "";
    // inputDateEnd.value = "";
}













