var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = 512
canvas.height = 512

ctx.fillStyle = 'rgb(51, 51, 51)'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.font = '256px CookieRun Black'
ctx.textBaseline = 'middle'
ctx.fillStyle = "white"
ctx.strokeStyle = "white"
ctx.textAlign = "center"
ctx.strokeText('디토', canvas.width / 2, canvas.height / 2)
ctx.fillText('디토', canvas.width / 2, canvas.height / 2)

document.querySelector('button').addEventListener('click', function() {
    var link = document.createElement('a')
    link.href = canvas.toDataURL("image/png")
    link.download = "image"
    link.click()
})