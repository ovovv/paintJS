const canve = document.getElementById('canves')
const ctx = canve.getContext('2d')
let color = document.getElementsByClassName('color')
let range = document.getElementById('range')
let mode = document.getElementById('mode')
let painting = false
let filling = false

/* ctx & canve default */
canve.width = 550
canve.height = 550
ctx.lineWidth = 2.5;
ctx.strokeStyle = 'black'
ctx.fillStyle = 'black'


function start(e) {
  painting = true
}

function stop(e) {
  painting = false
}

function onMouseMove(e) {
  const x = e.offsetX
  const y = e.offsetY

  if(!painting) {
    ctx.beginPath()
    ctx.moveTo(x,y)
  } else {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

Array.from(color).forEach((col) => 
  col.addEventListener('click', changeColor)
)

function changeColor(e) {
  ctx.strokeStyle = e.target.style.backgroundColor
  ctx.fillStyle = e.target.style.backgroundColor
}

if(range) {
  range.addEventListener('input', changeLine)
}

function changeLine(e) {
  ctx.lineWidth = e.target.value
}

if(mode) {
  mode.addEventListener('click', changeMode)
}

function changeMode(e) {
  if(filling) {
    filling = false
    mode.innerText = 'FILL'
  } else {
    filling = true
    ctx.fillStyle = ctx.strokeStyle
    mode.innerText = 'PAINT'
  }
}

function fill(e) {
  if(filling) {
    ctx.fillRect(0, 0, canve.width, canve.height)
  }
}

if(canve) {
  canve.addEventListener('mousemove', onMouseMove)
  canve.addEventListener('mousedown', start)
  canve.addEventListener('mouseup', stop)
  canve.addEventListener('mouseleave', stop)
  canve.addEventListener('click', fill)
}