// Event targets
const startButton = document.querySelector("button");
const sizeInput = document.querySelector("input");
const statusSpan = document.querySelector("#status")
const table = document.querySelector("table")
const controlsDiv = document.querySelector("div")
const timeSpan = document.querySelector("#time")

// Helper variable
let board
let startTime
let unguessed = 0
let firstTd = null
let secondTd = null

// Handler functions
function handleStartButtonClick() {
    let n = sizeInput.valueAsNumber
    if (n >= 2 && n <= 10 && n % 2 === 0) {
        startGame(n)
    }else{
        statusSpan.innerText = "The table size should between 2 and 10 ..."
        statusSpan.style.color = "red"
        statusSpan.value = ""
    }
}

// Helper functions

function startGame(n) {
    statusSpan.innerText = ""
    controlsDiv.style.display = "none"
    startTime = Date.now()
    timeSpan.innerText = "Elapsed Time: 00:00"
    generateMatrix(n)
    generateTable(n)
}

function generateMatrix(n) {
    board = []
    unguessed = n*n / 2
    for (let i = 0; i < n; i++) board[i] = []
    for (let i = 0; i < n*n; i++){
        let value = Math.floor(i / 2) + 1
        let x,y
        do{
            x = Math.floor(Math.random() * n)
            y = Math.floor(Math.random() * n)
        }while(board[x][y] !== undefined)
        board[x][y] = value
    }
    console.log(board)
}

function generateTable(n){
    document.querySelectorAll("tr").forEach(tr => table.removeChild(tr))
    for (let i = 0; i < n; i++) {
        let tr = document.createElement("tr")
        for (j = 0; j < n; j++) {
            let td = document.createElement("td")
            tr.appendChild(td)            
        }
        table.appendChild(tr)
    }
}

function handleTimer(){
    if(unguessed){
        let time = Date.now()
        let sumsec = Math.floor((time-startTime) / 1000)
        let min = String(Math.floor(sumsec / 60)).padStart(2,'0')
        let sec = ('0' + (sumsec % 60)).slice(-2)
        timeSpan.innerText = `Elapsed Time: ${min}:${sec} `
    }
}

function handleClick(){
    let row = this.parentElement.rowIndex
    let col = this.cellIndex
    if(this.innerText !== "") return;
    if(firstTd === null){
        this.innerText = board[row][col]
        firstTd = this
    } else if (secondTd === null){
        this.innerText = board[row][col]
        if(this.innerText == firstTd.innerText){
            this.style.color = "orange"
            firstTd.style.color = "orange"
            firstTd = null
            unguessed--
            if(unguessed == 0) {
                controlsDiv.style.display = "block"
                statusSpan.style.color = "green"
                let endTime = Date.now()
                statusSpan.innerText = `You win. This game last ${(endTime-startTime) / 1000} seconds.`
            }
        } else {
            secondTd = this
        }        
    }else{
        firstTd.innerText = ""
        secondTd.innerText = ""
        firstTd = null
        secondTd = null
    }
}

// EventListeners
startButton.addEventListener("click",handleStartButtonClick)
setInterval(handleTimer, 1000)
delegate(table,'click','td',handleClick)

function delegate(parent, type, selector, handler){
    parent.addEventListener(type,function(event){
        const targetElement = event.target.closest(selector)
        if(this.contains(targetElement)) handler.call(targetElement, event)
    })
}
