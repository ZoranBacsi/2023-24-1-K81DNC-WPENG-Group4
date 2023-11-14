const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

ctx.fillStyle = "yellow"
ctx.strokeStyle = "blue"
ctx.lineWidth = 2
ctx.beginPath()
ctx.moveTo(20,200)
ctx.lineTo(20,20)
ctx.lineTo(200,200)
ctx.closePath() // Equal with: ctx.lineTo(20,200)
ctx.stroke()
ctx.fill()

ctx.fillStyle = "orange"
ctx.fillRect(200,150,150,150)
// ctx.strokeRect(200,150,150,150)

ctx.strokeStyle = "purple"
ctx.strokeRect(220,50,200,200)


