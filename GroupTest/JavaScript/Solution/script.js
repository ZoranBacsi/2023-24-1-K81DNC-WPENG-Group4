// Good Luck!
const controls = document.querySelectorAll("#controls")
const generateButton = document.querySelector("#generate")
const bingoTable = document.querySelector("table")
const drawButton = document.querySelector("#draw")
const numberList = document.querySelector("#numberlist")
let bingo = false
const bingoPattern = [
    [0,6,18,24],
    [4,8,16,20],
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24]
]

let round = 1

let tableElements = []
let generatedNumbers = []

function generateButtonHandler(){
    controls.forEach(function(control){control.classList.toggle("hidden")})
    let theader = document.createElement("tr")
    "BINGO".split('').forEach(char => {
        let th = document.createElement("th")
        th.innerText = char
        theader.appendChild(th)
    })
    theader.style.border = 'none'
    bingoTable.appendChild(theader)

    generateRandomNumbers(25,tableElements)
    tableElements[12] = "Free!"

    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j <5; j++) {
            let td = document.createElement("td")
            td.innerText = tableElements[i*5+j]
            tr.appendChild(td)
        }
        bingoTable.appendChild(tr)
    }

    bingoTable.style.border = 'none'
}

function selectionHandler() {
    this.classList.toggle("selected")
}

function drawHandler() {

    if(!bingo){
        generateRandomNumbers(round,generatedNumbers)
        round++
    }

    const cells = document.querySelectorAll("td")

    cells.forEach(cell => {if(cell.innerText == generatedNumbers.slice(-1)) cell.classList.add("selected")})
    numberList.innerText = generatedNumbers.join(' , ')

    bingoPattern.forEach(pattern => {
        let testArray = []

        pattern.forEach(
            index => {
                if(cells[index].classList.contains("selected")){
                    testArray.push("selected")
                }else{
                    testArray.push("_")
                }
            }
        )

        if(testArray.every(item => item == "selected")) bingo = true
    })

    if(bingo) alert("BINGO")
}

// Event Listeners
generateButton.addEventListener("click",generateButtonHandler)
drawButton.addEventListener("click",drawHandler)
delegate(bingoTable,"click","td",selectionHandler)

//Helper functions


function generateRandomNumbers(amount, numbersArray) {

    while(numbersArray.length != amount){
        let x = Math.floor(Math.random() * 100)

        if(!numbersArray.includes(x)){
            numbersArray.push(x)
        }
    }
}

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}