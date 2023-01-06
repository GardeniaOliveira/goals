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

//put the goal information into the array
function renderGoals() {
    doing.innerHTML = null; //clean the list previously filled
    goals.forEach(function (goal) { //for each goal we have a list of information in the array 
        const listFromArray = structure(goal.name, goal.times, goal.dateStart, goal.dateEnd)
        doing.appendChild(listFromArray); //show the list on the screen

    })
}

// html structure showed in the screen
function structure(name, times, dateStart, dateEnd) {
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
        <div class="buttons-icons">
            <button id="undo-btn" class="undo"><i class="fas fa-undo-alt icon"></i></button>
            <button id="edit-btn" class="edit"><i class="fas fa-pen icon"></i></button>
            <button id="delete-btn" class="delete"><i class="fas fa-trash"></i></button>
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

    

        <div class="edit-goal hidden" id="edit-goal-${counterId}">
    
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

//update the array after another goal
function updateArray() {
    //store id, name, times and dates inside the array;
    goals.push({
        id: counterId,
        name: inputNameGoal.value,
        times: inputTimesGoal.value,
        dateStart: inputDateStart.value,
        dateEnd: inputDateEnd.value,
    })
    renderGoals()   //update the array;
}

function listGoal() {
    updateArray()

    //increment counter and progress bar
    // const progressBar = document.querySelectorAll('.progress-bar');
    // const counterStart = document.querySelectorAll('.counter-start');
    // const checkInputs = document.querySelectorAll(`#check-input-${counterId}`);
    // checkInputs.forEach((element, index) => {
    //     element.addEventListener('change', function () {
    //         if (this.checked) {
    //             counter = counter + 1;
    //             counterStart.innerText = counter;
    //             progressBar.style.width = (counter / inputTimesGoal.value) * 100 + "%";
    //         }
    //     })
    // })
    counterId = counterId + 1;

    //decrement counter and progress bar
    const btnsUndo = document.querySelectorAll('#undo-btn');
    btnsUndo.forEach((element, index) => { //add to all buttons a click event
        element.addEventListener('click', () => {
            if (counter > 0) {
                counter = counter - 1;
                counterStart.innerText = counter;
                progressBar.style.width = (counter / inputTimesGoal.times) * 100 + "%";
            }
        })
    })


    //edit the goal
    const btnsEdit = document.querySelectorAll('#edit-btn'); //get all edit buttons
    console.log(btnsEdit)
    btnsEdit.forEach((element, index) => { //add to all buttons a click event
        element.addEventListener('click', () => {
            let boxEditGoal = document.querySelector(`#edit-goal-${index + 1}`);
            boxEditGoal.classList.remove("hidden");
            editGoal(index)
        })
    });


    //delete the goal 
    // let btnDelete = document.querySelector('#delete-btn');
    // btnDelete.setAttribute("remove", "");
    // btnDelete.addEventListener('click', () => {
    //     function deleteGoal(e) {
    //         console.log(e.target)
    //         let position = e.target.getAttribute("remove");
    //         goals.slice(position, 1)
    //     }

    //     deleteGoal();

    // })

}


function editGoal(index) {
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


        goals = goals.map(function (goal, position) { //update in the array
            if (position === index) {
                return {
                    id: goal.id,
                    name: updateName.value,
                    times: updateTimes.value,
                    dateStart: updateDateStart.value,
                    dateEnd: updateDateEnd.value,
                }
            }
            return goal;
        })
        renderGoals(); //update the array with new goals after the edit

    })


}








btnCreate.addEventListener('click', () => {
    listGoal()
    // cleanInput()

})




//clean the inputs 
function cleanInput() {
    inputNameGoal.value = "";
    inputTimesGoal.value = "";
    inputDateStart.value = "";
    inputDateEnd.value = "";
}













