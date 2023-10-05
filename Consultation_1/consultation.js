// 1. What I would like to modify?
const spanElement = document.querySelector('span#specSpan')

// 2. What I would like to do with it?
function handleSpecSpan(){
    spanElement.innerHTML="Test string"
    spanElement.style.color = "red"
}

// 3. When?
spanElement.addEventListener("click",handleSpecSpan)
