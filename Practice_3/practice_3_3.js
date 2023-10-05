const table = document.querySelector("table")

function handleMouseOver(){
    this.style.backgroundColor = "yellow"
}

function handleMouseOut(){
    this.style.backgroundColor = ""
}

delegate(table, "mouseover", "td", handleMouseOver)
delegate(table, "mouseout", "td", handleMouseOut)

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}