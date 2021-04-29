
import './App.css';
import React, { useLayoutEffect, useState } from "react";
import rough from 'roughjs/bundled/rough.esm';
import { OwnButton } from './components/button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Icons from './icons';
import Functions from './functions';

const generator = rough.generator();
const iconos = Icons;
// 
var color = 'red';
var grosor = 9;
var estado = 0;
// const funciones = Functions;
function line() {
  estado = 0;
}
function circle() {
  estado = 1;
}
function rectangle() {
  estado = 2;
}
function lapiz() {
  estado = 3;
}
function relleno() {
  estado = 4;
}

function escogerColor() {
  estado = 3;
}

function escogerGrosor() {
  estado = 3;
}

// 
function createElement(x1, y1, x2, y2) {
  let roughElement = null;
  if (estado == 0) {
    roughElement = generator.line(x1, y1, x2, y2, { roughness: 0.5, stroke: color, strokeWidth: grosor });
  } else if (estado == 1) {
    roughElement = generator.circle(x1, y1, Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)), { roughness: 0.5, stroke: color, strokeWidth: grosor });
  } else if (estado == 2) {
    roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, { roughness: 0.5, stroke: color, strokeWidth: grosor });
  } else {
    roughElement = generator.line(x2, y2, x2, y2, { roughness: 0.5, stroke: color, strokeWidth: grosor });
  }
  return { x1, y1, x2, y2, roughElement };
}
// 
function App() {
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);


  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const handleMouseDown = (event) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    const element = createElement(clientX, clientY, clientX, clientY);
    setElements(prevState => [...prevState, element]);
  };
  const handleMouseMove = (event) => {
    if (!drawing) return;
    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedElement = createElement(x1, y1, clientX, clientY);

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };
  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <div class="w3-blue ">
      <div class="w3-row w3-display-topleft">
        <div class="w3-col m1 1">
          <OwnButton onclick={line}>{<SvgIcon>
            {iconos[0]}
          </SvgIcon>}</OwnButton>
        </div>
        <div class="w3-col m1 1">
          <OwnButton onclick={circle}>{<SvgIcon>
            {iconos[1]}
          </SvgIcon>}</OwnButton>
        </div>
        <div class="w3-col m1 1">
          <OwnButton onclick={rectangle}>{<SvgIcon>
            {iconos[2]}
          </SvgIcon>}</OwnButton>
        </div>
        <div class="w3-col m1 1">
          <OwnButton onclick={lapiz}>{<SvgIcon>
            {iconos[3]}
          </SvgIcon>}</OwnButton>
        </div>
        <div class="w3-col m1 1">
          <OwnButton onclick={relleno}>{<SvgIcon>
            {iconos[4]}
          </SvgIcon>}</OwnButton>
        </div>
        <div class="w3-col m1 1">
          <OwnButton onclick={null}>{<SvgIcon>
            {iconos[5]}
          </SvgIcon>}</OwnButton>
        </div>
        <div class="w3-col m1 1">
          <OwnButton onclick={null}>{<SvgIcon>
            {iconos[6]}
          </SvgIcon>}</OwnButton>
        </div>
        
      </div>
      <div class="w3-display-topright">
          <OwnButton onclick={null}>{<SvgIcon>
            {iconos[7]}
          </SvgIcon>}</OwnButton>
        </div>
      <div class="w3-center">
        <canvas id='canvas'
          style={{ backgroundColor: "white" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          width={window.innerWidth/1.1}
          height={window.innerHeight/1.01}
        >
          PROGRAMACION WEB
    </canvas>
      </div>
      <footer class="w3-container w3-padding-32 w3-center  w3-xlarge footer">
        <a href="https://github.com/IsmaDavidAA" class="fa fa-github w3-hover-opacity w3-row-padding"></a>
        <a href="https://gitlab.com/IsmaDavidAA" class="fa fa-gitlab w3-hover-opacity w3-row-padding"></a>
        <a href="https://twitter.com/ImIsmaBot" class="fa fa-twitter w3-hover-opacity w3-row-padding"></a>
        <a href="https://www.linkedin.com/in/ismael-david-angulo-61ab0b1ab/"
            class="fa fa-linkedin w3-hover-opacity w3-row-padding"></a>
        <p class="w3-medium">Desarrollado por: Ismael David Angulo Andrade</p>
    </footer>
    </div>
  );
}

export default App;
