var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var isIE = false || !!document.documentMode

if (!Element.prototype.remove) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this)
        }
    }
}

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

document.getElementById('save').addEventListener('click', function() {
    if (isIE) {
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

if (!window.navigator.clipboard || !window.navigator.clipboard.write) document.getElementById('copy').remove()