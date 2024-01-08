const DEFAULT_COLOR = '#333';
const DEFAULT_MODE = 'color';

const container = document.getElementById("container");
const colorPicker = document.getElementById("color-picker");

let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;

function setCurrentColor(newColor){
  currentColor = newColor;
}


let mouseDown = false;
document.body.onmousedown = () => { mouseDown = true };
document.body.onmouseup = () => { mouseDown = false };


colorPicker.oninput = (e) => setCurrentColor(e.target.value);


function createGrid(size){
  container.style.setProperty('--grid-rows', size);
  container.style.setProperty('--grid-cols', size);

  for(count = 0; count < (size * size); count++){
    let cell = document.createElement("div");
    cell.addEventListener("mouseover", changeColor);
    container.appendChild(cell).className = "grid-item";
  } 
}

function eraseAll(){
  let cells = document.querySelectorAll(".grid-item");
  cells.forEach(cell => cell.style.backgroundColor = "#fefefe");
}

function getRandomColor(){
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let count = 0; count < 6; count++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function colorMode(){
  currentMode = 'color';
  currentColor = colorPicker.value;
}


function eraseMode(){
  currentMode = 'erase';
}

function rainbowMode(){
  currentMode = 'rainbow';
}

function changeColor(e){
  if(e.type === "mouseover" && !mouseDown){
     return;
  }

  if(currentMode === 'erase'){
    e.target.style.backgroundColor = "#fefefe";
    return;
  }
  
  if(currentMode === 'color'){
    e.target.style.backgroundColor = currentColor;
    return;
  }

  if(currentMode === 'rainbow'){
    e.target.style.backgroundColor = getRandomColor();
    return;
  }

}


createGrid(40);
