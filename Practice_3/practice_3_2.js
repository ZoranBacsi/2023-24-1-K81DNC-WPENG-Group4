// Version 1 with easy delegation
/*
const ul = document.querySelector("ul")
let firstLi = null

function handleLiClick(e){
    if(!e.target.matches("li"))
        return;
    
    if(firstLi !== null){
        let secondLi = e.target;
        [firstLi.innerText, secondLi.innerText] = [secondLi.innerText, firstLi.innerText];
        firstLi = null;
    } else firstLi = e.target;
}

ul.addEventListener("click",handleLiClick)
*/

// With Delegate function
const ul = document.querySelector("ul")
let firstLi = null

function handleLiClick(){    
    if(firstLi !== null){
        let secondLi = this;
        [firstLi.innerText, secondLi.innerText] = [secondLi.innerText, firstLi.innerText];
        firstLi = null;
    } else firstLi = this;
}

delegate(ul, "click", "li", handleLiClick);

//Reusable delegate function
function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}