document.body.addEventListener('dragstart', event => event.preventDefault())

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const range = document.getElementById('range')
const rangeInput = document.getElementById('range-input')
const rangeForm = document.getElementById('range-form')
const copy = document.getElementById('copy')
const imageType = document.getElementById('image-type')

canvas.width = 512
canvas.height = 512

range.max = canvas.width
range.value = canvas.width / 2

rangeInput.value = canvas.width / 2

ctx.fillStyle = '#333333'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.font = `${canvas.width / 2}px CookieRun Black`
ctx.textBaseline = 'middle'
ctx.textAlign = 'center'

range.addEventListener('change', ({ target: { value } }) => {
    ctx.font = `${value}px CookieRun Black`
    rangeInput.value = value
})

range.addEventListener('input', ({ target: { value } }) => {
    ctx.font = `${value}px CookieRun Black`
    rangeInput.value = value
})

document.getElementById('save').addEventListener('click', () => {
    if (!confirm('저장하실 건가요?')) return

    const link = document.createElement('a')
    link.href = canvas.toDataURL(`image/${imageType.value}`)
    link.download = `image.${imageType.value}`
    link.click()
})

imageType.addEventListener('change', ({ target: { value } }) => {
    if (value === 'png') copy.style.display = 'inline'
    else copy.style.display = 'none'
})

document.getElementById('form').addEventListener('submit', event => {
    event.preventDefault()

    const value = document.getElementById('name').value

    if (!value) return

    ctx.fillStyle = '#333333'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'

    ctx.strokeText(value, canvas.width / 2, canvas.height / 2)
    ctx.fillText(value, canvas.width / 2, canvas.height / 2)
})

rangeForm.addEventListener('submit', event => {
    event.preventDefault()

    if (isNaN(rangeInput.value) || rangeInput.value > canvas.width || rangeInput.value < 5) return rangeInput.value = range.value

    ctx.font = `${rangeInput.value}px CookieRun Black`
    range.value = rangeInput.value
})

if (window.navigator.clipboard && window.navigator.clipboard.write && window.ClipboardItem) copy.addEventListener('click', () => canvas.toBlob(blob => navigator.clipboard.write([ new ClipboardItem({ [blob.type]: blob }) ]).then(null, err => console.error(err)), `image/${imageType.value}`))
else copy.remove()