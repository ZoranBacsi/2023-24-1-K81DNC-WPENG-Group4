const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

let turtle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    delta: 0
}

function rotate(ddelta){
    turtle.delta += ddelta
}

function move(ds) {
    ctx.beginPath()
    ctx.moveTo(turtle.x,turtle.y)
    turtle.x += Math.sin(turtle.delta * Math.PI / 180) * ds
    turtle.y += Math.cos(turtle.delta * Math.PI / 180) * ds
    ctx.lineTo(turtle.x,turtle.y)
    ctx.stroke()     
}

function polygon(n,a) {
    for (let index = 0; index < n; index++) {
        move(a)
        rotate(360/n)        
    }    
}

ctx.lineWidth = 2
polygon(8,70)