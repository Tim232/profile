var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var rangeSize = document.getElementById('range-size')
var isIE = false || !!document.documentMode

rangeSize.innerText = document.getElementById('range').value + 'px'

canvas.width = 512
canvas.height = 512

ctx.fillStyle = 'rgb(51, 51, 51)'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.font = '256px CookieRun Black'
ctx.textBaseline = 'middle'
ctx.textAlign = "center"

document.getElementById('save').addEventListener('click', function() {
    if (isIE) {
        canvas.toBlob(function(blob) {
            window.navigator.msSaveBlob(blob, 'image.png')
        })
    } else {
        var link = document.createElement('a')
        link.href = canvas.toDataURL()
        link.download = "image"
        link.click()
    }
})

document.getElementById('copy').addEventListener('click', function() {
    canvas.toBlob(function(blob) {
        clipboard.write([ new clipboard.ClipboardItem({ 'image/png': blob }) ])

        //window.navigator.clipboard.write([ new ClipboardItem({ 'image/png': blob }) ])
    })
})

if (isIE) {
    document.getElementById('range').addEventListener('change', function(event) {
        var size = event.target.value
        ctx.font = size + 'px CookieRun Black'
        rangeSize.innerText = size + 'px'
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

function isChrome() {
    for (var i = 0; i < navigator.plugins.length; i++)
        if (navigator.plugins[i].name == 'Chrome PDF Viewer') return true;
    return false;
}

if (!isChrome()) {
    var notice = document.createElement('p')
    notice.innerText = '현재 크로미움 브라우저 외에는 복사 기능이 지원되지 않습니다.'
    notice.style.marginTop = '3vh'

    document.querySelector('#main').appendChild(notice)
}