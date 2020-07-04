var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var rangeSize = document.getElementById('range-size')
var isIE = false || !!document.documentMOde

rangeSize.innerText = document.getElementById('range').value + 'px'

canvas.width = 512
canvas.height = 512

ctx.fillStyle = 'rgb(51, 51, 51)'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.font = '256px CookieRun Black'
ctx.textBaseline = 'middle'
ctx.textAlign = "center"

document.getElementById('save').addEventListener('click', function() {
    var link = document.createElement('a')
    link.href = canvas.toDataURL()
    link.download = "image"
    link.click()
})

if (isIE) {
    document.getElementById('range').addEventListener('change', function(event) {
        var size = event.target.value
        ctx.font = size + 'px CookieRun Black'
        rangeSize.textContent = size + 'px'
    })
} else {
    document.getElementById('range').addEventListener('input', function(event) {
        var size = event.target.value
        ctx.font = size + 'px CookieRun Black'
        rangeSize.innerText = size + 'px'
    })
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var value = document.getElementById('name').value

    if (!value) return

    document.getElementById('name').focus()

    ctx.fillStyle = 'rgb(51, 51, 51)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white"
    ctx.strokeStyle = "white"

    ctx.strokeText(value, canvas.width / 2, canvas.height / 2)
    ctx.fillText(value, canvas.width / 2, canvas.height / 2)
})