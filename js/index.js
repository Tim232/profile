var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var range = document.getElementById('range')
var rangeInput = document.getElementById('range-input')
var rangeForm = document.getElementById('range-form')

canvas.width = 512
canvas.height = 512

range.max = canvas.width
range.value = canvas.width / 2

rangeInput.value = range.value

ctx.fillStyle = '#333333'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.font = canvas.width / 2 + 'px CookieRun Black'
ctx.textBaseline = 'middle'
ctx.textAlign = "center"

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
    if (!/^\d+|Backspace|Enter|ArrowLeft|ArrowRight|ArrowUp|ArrowDown$/.test(event.key) || event.target.value.length > canvas.width.length) event.preventDefault()
})

if (window.navigator.clipboard && window.navigator.clipboard.write && ClipboardItem) {
    document.getElementById('copy').addEventListener('click', function() {
        canvas.toBlob(function(blob) {
            window.navigator.clipboard.write([ new ClipboardItem({ 'image/png': blob }) ])
        })
    })
} else {
    if (!Element.prototype.remove) {
        Element.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this)
            }
        }
    }

    document.getElementById('copy').remove() 
}