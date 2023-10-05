// 1. TASK
const greetButton = document.querySelector("#greeting")
const greetSpan   = document.querySelector("#hello")

function handleGreetButtonClick(){
    greetButton.style.display = "none"
    greetSpan.innerHTML = "Welcome on my Course!"
}

greetButton.addEventListener("click", handleGreetButtonClick)

// 2. TASK
const target = Math.floor(Math.random() * 100)
console.log(target)
const guessInput  = document.querySelector("input#guess")
const guessButton = document.querySelector("button#guess")
const guessOutput = document.querySelector("span#guess")

function handleGuessButtonClick(){
    let guessed = parseInt(guessInput.value)
    if (guessed === target) guessOutput.innerText = "You find it!"
    else if (guessed > target) guessOutput.innerText = "Lower!"
    else guessOutput.innerText = "Greater"
}

guessButton.addEventListener("click", handleGuessButtonClick)

// 3. TASK
const urlInput    = document.querySelector("#url")
const showButton  = document.querySelector("#showimage")
const imageOutput = document.querySelector("img")

function handleShowButtonClick(){
    imageOutput.src = urlInput.value
}

showButton.addEventListener("click", handleShowButtonClick)

// 4. TASK
const list  = document.querySelector("ul")
const links = document.querySelectorAll("a[href]")

links.forEach(function(link){
    let e = document.createElement("li")
    e.innerText = link.href
    list.appendChild(e)
})

// 5. TASK
const balanceSpan    = document.querySelector("#balance")
const moneyInput     = document.querySelector("#money")
const withdrawButton = document.querySelector("#withdraw")
let balance = 500000

function handleMoneyInput(){
    let amount = parseInt(moneyInput.value)
    moneyInput.classList.toggle("error", isNaN(amount) || amount > balance)
}

function handleWithdrawClick(){
    let amount = parseInt(moneyInput.value)
    if (!isNaN(amount)) balance -= amount
    balanceSpan.innerText = balance
}

moneyInput.addEventListener("input", handleMoneyInput)
withdrawButton.addEventListener("click", handleWithdrawClick)

// 6. TASK
const inputs     = [document.querySelector("#field1"), document.querySelector("#field2"), document.querySelector("#field3")]
const loadButton = document.querySelector("#loadrow")
const table      = document.querySelector("table")

function handleLoadButtonClick(){
    let tr = document.createElement("tr")
    inputs.forEach(function(field){
        let td = document.createElement("td")
        td.innerText = field.value
        field.value = ""
        tr.appendChild(td)
    })
    table.appendChild(tr)
}

loadButton.addEventListener("click", handleLoadButtonClick)

// 7. TASK
const rangeInput = document.querySelector("input[type=range]")
const sliderDiv  = document.querySelector("#slider")

function handleSliderInput(){
    let cs = window.getComputedStyle(rangeInput)
    let width = cs.width.slice(0, -2)
    sliderDiv.innerText = rangeInput.value
    sliderDiv.style.left = rangeInput.value / 100 * width - 40 + "px"
}

rangeInput.addEventListener("input", handleSliderInput)