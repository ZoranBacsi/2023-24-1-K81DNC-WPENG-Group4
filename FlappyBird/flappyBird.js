const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

let bird = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 20,
    vy: 0,
    ay: 200
}

let dead = false
let score = 0
let pipes = []
let lastFrame = performance.now()

const PIPE_SPEED = -200
const PIPE_DIST = 300
const PIPE_GAP = 150

function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

function newPipe(){
    let h = random(10, canvas.height / 2)
    pipes.push(
        {
            x: canvas.width,
            width: 30,
            y: 0,
            height: h
        },
        {
            x: canvas.width,
            width: 30,
            y: h + PIPE_GAP,
            height: canvas.height - (h + PIPE_GAP)
        }
    )
}

function gameLoop(){
    let now = performance.now()
    let dt = (now - lastFrame) / 1000
    lastFrame = now
    update(dt)
    render()
    if (!dead) requestAnimationFrame(gameLoop)
}

function collision(a, b) {
    return !(b.y + b.height < a.y  || a.x + a.width < b.x || a.y + a.height < b.y || b.x + b.width < a.x)
}

function update(dt) {
    bird.vy += bird.ay * dt
    bird.y += bird.vy * dt

    if (bird.y < 0) bird.y = 0
    if (bird.y > canvas.height) dead = true

    pipes.forEach(function(p){
        let before = p.x
        p.x += PIPE_SPEED * dt
        if( before > bird.x && p.x <= bird.x) score += 0.5
        if(collision(p, bird)) dead = true
    })

    if(pipes[pipes.length - 1].x < canvas.width - PIPE_DIST) newPipe()
    pipes = pipes.filter(p => p.x >= -p.width)
}

function render(){
    ctx.fillStyle = "lightblue"
    ctx.fillRect(0,0,canvas.width, canvas.height)
    ctx.fillStyle = "brown"
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height)
    ctx.fillStyle = "darkgreen"
    pipes.forEach(function(p){
        ctx.fillRect(p.x, p.y, p.width, p.height)
    })
    ctx.fillStyle = "black"
    ctx.font = "20px sans-serif"
    ctx.fillText(score, 0, 20)
}

function handleKeys(e){
    if(e.code == "Space")
        bird.vy = -200
}

document.addEventListener("keydown", handleKeys)
newPipe()
gameLoop()