const inputNameGoal = document.getElementById('input-name-goal');
const inputTimesGoal = document.getElementById('input-times-goal');
const inputDateStart = document.getElementById('input-date-start');
const inputDateEnd = document.getElementById('input-date-end');
const btnCreate = document.getElementById('create-btn');
const doing = document.querySelector('.doing');
const nameGoal = document.getElementById('name-progress-bar');
// const counterStart = document.getElementById('counter-start');
// const counterEnd = document.getElementById('counter-end');
// const checkbox = document.getElementById('check-input');
// const btnUndo = document.getElementById('undo-btn');
// const btnEdit = document.getElementById('edit-btn');
const box = document.querySelector('.box');
const about = document.querySelector('.about');
const lastTimeDate = document.getElementById('last-time-date');
const dateStart = document.getElementById('date-start');
const dateEnd = document.getElementById('date-end');
const progressBar = document.querySelector('.progress-bar');
const updateGoal = document.querySelector('.update-goal');
const btnUpdate = document.getElementById('update-btn');
let counter = 0;

btnCreate.addEventListener('click', () => {
    const goals = document.createElement('div');
    goals.innerText = inputNameGoal.value;
    goals.classList.add('format-boxes')
    box.appendChild(goals);




    const counterStart = document.createElement('p');
    counterStart.innerText = 0;
    counterStart.classList.add('format-boxes')
    // box.appendChild(counterStart);

    const times = document.createElement('p');
    times.innerText = inputTimesGoal.value;
    times.classList.add('format-boxes')
    // box.appendChild(times);

    const divBox = document.createElement('div');
    divBox.classList.add('flex')
    divBox.appendChild(counterStart);
    divBox.appendChild(times);
    box.appendChild(divBox);

    const checkInput = document.createElement("INPUT");
    checkInput.setAttribute("type", "checkbox");
    checkInput.id = "check-input";
    box.appendChild(checkInput);
    checkInput.addEventListener('change', function () {
        if (this.checked) {
            console.log("Check")
            counter = counter + 1;
            counterStart.innerText = counter;
            goals.style.width = (counter / inputTimesGoal.value) * 100 + "%";
        }

    })

})

// btnUndo.addEventListener('click', () => {
//     counter = counter - 1;
// counterStart.innerText = counter;
//     progressBar.style.width = (counter / inputTimesGoal.value) * 100 + "%";
//     lastTimeDate.innerText = new Date();
// })

// btnEdit.addEventListener('click', () => {
//     // updateGoal.classList.remove("hidden");
//     updateGoal.innerHTML = `

//     <div class="div-name">
//         <label for="text"> Your goal:</label>
//         <input type="text" id="input-name-goal" class="format-boxes">
//     </div>

//     <div class="div-time">
//         <label for="text">Many times?</label>
//         <input type="number" id="input-times-goal" class="format-boxes">
//     </div>
//     <div class="div-start">
//         <label for="text">Start:</label>
//         <input type="date" id="input-date-start" class="format-boxes">
//     </div>
//     <div class="div-end">
//         <label for="text">End:</label>
//         <input type="date" id="input-date-end" class="format-boxes">
//     </div>
//     <button type="submit" id="uptade-btn">Update</button>

// `
//     // nameGoal.value = inputNameGoal.value;
//     // counterEnd.innerHTML = inputTimesGoal.value;
//     // dateEnd.innerHTML = inputDateEnd.value;
//     // dateStart.innerHTML = inputDateStart.value;
// })


// function createBox() {
//     doing.innerHTML =
//         `
//         <div class="box">
//             <div class="container-progress-bar format-boxes">
//             <div class="progress-bar"></div>
//                 <p id="name-progress-bar">${inputNameGoal.value} </p>
//             </div>
//             <div class="counter format-boxes">
//                 <p id="counter-start">${counter}</p>
//                 <p> / </p>
//                 <p id="counter-end">${inputTimesGoal.value} </p>
//             //  ${doing.appendChild(checkInput)}

//             </div>
//             <div class="buttons">
//                 <button id="undo-btn"><i class="fas fa-undo-alt icon"></i></button>
//                 <button id="edit-btn"><i class="fas fa-pen icon"></i></button>
//             </div>
//         </div>


//         <div class="about ">
//             <div class="date">
//                 <div>
//                     <p>Last time done: </p>
//                     <p id="last-time-date">${new Date()} </p>
//                 </div>
//                 <div>
//                     <p>
//                         Start in:</p>
//                     <p id="date-start">${inputDateStart.value} </p>
//                 </div>
//                 <div>
//                     <p>Goal finish in:</p>
//                     <p id="date-end">${inputDateEnd.value} </p>
//                 </div>

//             </div>

//         </div>`
// }
// const checkInput = document.createElement("INPUT");
// checkInput.setAttribute("type", "checkbox");
// checkInput.id = "check-input";
// document.body.appendChild(checkInput)

