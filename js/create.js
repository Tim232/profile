var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var range = document.getElementById('range')
var rangeInput = document.getElementById('range-input')
var rangeForm = document.getElementById('range-form')

canvas.width = 512
canvas.height = 512

if (window.innerWidth < 650 || window.innerHeight < 650) {
    canvas.width = 256
    canvas.height = 256

    range.max = 256
    range.value = 128
}

if (window.innerWidth < 400 || window.innerHeight < 400) {
    canvas.width = 128
    canvas.height = 128

    range.max = 128
    range.value = 64
}

if (window.innerWidth < 300 || window.innerHeight < 300) {
    canvas.width = 64
    canvas.height = 64

    range.max = 64
    range.value = 32
}

rangeInput.value = range.value

ctx.fillStyle = '#333333'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.font = canvas.height / 2 + 'px CookieRun Black'
ctx.textBaseline = 'middle'
ctx.textAlign = "center"

window.addEventListener('resize', function (event) {
    if (event.target.innerWidth < 650 || event.target.innerHeight < 650) {
        canvas.width = 256
        canvas.height = 256
    
        range.max = 256
        range.value = 128
    }

    if (event.target.innerWidth < 400 || event.target.innerHeight < 400) {
        canvas.width = 128
        canvas.height = 128

        range.max = 128
        range.value = 64
    }

    if (event.target.innerWidth < 300 || event.target.innerHeight < 300) {
        canvas.width = 64
        canvas.height = 64

        range.max = 64
        range.value = 32
    }

    ctx.fillStyle = '#333333'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = canvas.height / 2 + 'px CookieRun Black'
    ctx.textBaseline = 'middle'
    ctx.textAlign = "center"
})

range.addEventListener('change', function(event) {
    var size = event.target.value

    ctx.font = size + 'px CookieRun Black'
    rangeInput.value = size
})

range.addEventListener('input', function(event) {
    var size = event.target.value

    ctx.font = size + 'px CookieRun Black'
    rangeInput.value = size
})

document.getElementById('save').addEventListener('click', function() {
    if (!confirm('저장하실 건가요?')) return

    if (window.navigator.msSaveBlob) {
        canvas.toBlob(function(blob) {
            window.navigator.msSaveBlob(blob, 'image.png')
        })
    } else {
        var link = document.createElement('a')
        link.href = canvas.toDataURL()
        link.download = "image.png"
        link.click()
    }
})

document.getElementById('copy').addEventListener('click', function() {
    canvas.toBlob(function(blob) {
        window.navigator.clipboard.write([ new ClipboardItem({ 'image/png': blob }) ])
    })
})

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var value = document.getElementById('name').value

    if (!value) return

    ctx.fillStyle = '#333333'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white"
    ctx.strokeStyle = "white"

    ctx.strokeText(value, canvas.width / 2, canvas.height / 2)
    ctx.fillText(value, canvas.width / 2, canvas.height / 2)
})

rangeForm.addEventListener('submit', function(event) {
    event.preventDefault()

    var size = rangeInput.value

    if (isNaN(size) || size > canvas.width || size < 5) return rangeInput.value = range.value

    ctx.font = size + 'px CookieRun Black'
    range.value = size
})

rangeInput.addEventListener('keydown', function(event) {
    if (!/^[0-9]+|Backspace|Enter|ArrowLeft|ArrowRight|ArrowUp|ArrowDown$/.test(event.key)) event.preventDefault()
})

if (!Element.prototype.remove) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this)
        }
    }
}

if (!window.navigator.clipboard || !window.navigator.clipboard.write) document.getElementById('copy').remove()