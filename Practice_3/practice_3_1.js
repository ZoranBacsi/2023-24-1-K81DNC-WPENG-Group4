let last = null
let lastTime = null
const outputSpan = document.querySelector("span")
outputSpan.innerText = "Kattints a képernyőn!"

function handleClick(event){
    if(last != null){
        let dist = ((event.screenX - last.screenX) ** 2 + (event.screenY - last.screenY) ** 2) ** 0.5
        let timeDiff = event.timeStamp - last.timeStamp
        outputSpan.innerText = "Távolság: " + dist + " px\nIdőkülönbség: " + timeDiff + " ms"
    }else{
        outputSpan.innerText = "Kattints még egyszer képernyőn!"
    }

    last = event
    lastTime = performance.now()
}

document.addEventListener("click",handleClick)