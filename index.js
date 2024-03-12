import drawCircle from "./functions/circle.js";
import drawpolygon from "./functions/polygon.js";
import drawEllipse from "./functions/elipse.js";
import square from "./functions/square.js";
import rectangle from "./functions/rectangle.js";
import drawLineBresenham from "./functions/bresenham.js";
import drawPixel,{setColor} from "./functions/pixels.js"
//-----------------------declaraciones y estructuras---------------------------------------//
const canvas = document.getElementById("miCanvas");
export const ctx = canvas.getContext("2d");
var datos = {}; 
var sides = {}; 
var color = colorPicker.value ;
var stroke =3;
var isDrawing = false;
var layer = 1;
var last = 0;
var numSides = 5;
var startX, startY;   
var type = 1;
var und =0;
document.getElementById("1").addEventListener("click", function () {type = 1;});
document.getElementById("2").addEventListener("click", function () {type = 2;});
document.getElementById("3").addEventListener("click", function () {type = 3;});
document.getElementById("4").addEventListener("click", function () {type = 4;});
document.getElementById("5").addEventListener("click", function () {type = 5;});
document.getElementById("6").addEventListener("click", function () {type = 6;});
document.getElementById("7").addEventListener("click", function () {type = 7;});
document.getElementById("colorPicker").addEventListener("input", updateHexColor);
document.getElementById("strokeWidth").addEventListener("input", function(event) {var strokeValue = parseInt(event.target.value, 10); updateStroke(strokeValue);});
document.getElementById("sides").addEventListener("input", function(event) {var sideValue = parseInt(event.target.value, 10); updateside(sideValue);});
document.getElementById("undo").addEventListener("click", function () {undo();});
document.getElementById("endo").addEventListener("click", function () {endo();});
function updateHexColor() {
    var colorPicker = document.getElementById("colorPicker");
    color = colorPicker.value;
}
function updateStroke(strokeValue) {
    stroke = strokeValue;
}
function updateside(sidevalue){
    numSides = sidevalue;
}
function agregarDatos(llave,x1, y1, x2, y2) {
    if (!datos[llave]) {
        datos[llave] = []; // Si no existe, inicializar una matriz para esa llave
        if(type==6){
            sides[llave]=numSides;
        }
    }
    datos[llave].push({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        stroke: stroke,
        layer: layer,
        color: color,
        type: type,
    });
}
function eliminarDatos(llave) {
    for(var i = llave; i > (llave +und) ; i--){
        if (datos[i] && datos[i].length > 0) {
            while(datos[i].length != 0){
                datos[i].pop();
            }
        }
    }
}
function undo(){
    und-=1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFigures();
}
function endo(){
    und+=1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFigures();
}
//------------------------llamadas de aqui pa abajo----------------------------------------//
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);

canvas.addEventListener("touchstart", (event) => {startDrawing(event.touches[0]);});
canvas.addEventListener("touchmove", (event) => {draw(event.touches[0]);});
canvas.addEventListener("touchend", (event) => {stopDrawing(event.changedTouches[0]);});

function getCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    return { x, y };
}
function startDrawing(event) {
    const { x, y } = getCoordinates(event);
    if(und==0){
        last +=1;
    }
    isDrawing =true;
    startX = x;
    startY = y;
}
function draw(event) {
    
    if(isDrawing){   
        if(type!=1){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }  
        const { x, y } = getCoordinates(event);
        const endX = x;
        const endY = y;
        switch (type) {
            case 1:
                const mouseX = x
                const mouseY = y
                drawLineBresenham(startX, startY, mouseX, mouseY, stroke,color);
                agregarDatos(last,startX, startY, mouseX, mouseY);
                startX = mouseX;
                startY = mouseY;
                break;
            case 2:
                drawLineBresenham(startX, startY, endX, endY, stroke,color);
                // setTimeout(() => {
                    drawFigures();
                // }, 100);
                break;
            case 3:
                drawCircle(startX, startY,endX,endY,stroke,color);
                // setTimeout(() => {
                    drawFigures();
                // }, 100);
                break;
            case 4:
                rectangle(startX,startY,endX,endY,stroke,color);
                // setTimeout(() => {
                    drawFigures();
                // }, 100);
                break;
            case 5:
                square(startX,startY,endX,stroke,color);
                // setTimeout(() => {
                    drawFigures();
                // }, 100);
                break;
            case 6:
                drawpolygon(startX, startY, endX, endY, stroke,color,numSides);
                // setTimeout(() => {
                    drawFigures();
                // }, 100);
                break;
            case 7:
                drawEllipse(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY), stroke,color);
                // setTimeout(() => {
                    drawFigures();
                // }, 100);
                break;
            default:
            console.log("Opción no reconocida");
            break;
        }
    }  
}
function stopDrawing(event) {
    if(isDrawing){
        if(und!=0){
            eliminarDatos(last);
            und=0;
        }
        if(type!=1){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }          const { x, y } = getCoordinates(event);
        const endX = x;
        const endY = y;
        switch (type) {
            case 1:
                drawLineBresenham(startX, startY, endX, endY, stroke,color);
                agregarDatos(last,startX, startY, endX, endY);
                break;
            case 2:
            case 3:
            case 4:
            case 6:
                agregarDatos(last,startX, startY, endX, endY);
                drawFigures();
                break;
            case 5:
                agregarDatos(last,startX, startY, endX, 0);
                drawFigures();
                break;
            case 7:
                agregarDatos(last,startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));
                drawFigures();
                break;
            default:
            console.log("Opción no reconocida");
            break;
        }  
        isDrawing =false;
    }
}
//--------------------------dibujar en el canva-----------------//
function drawFigures() {
    var llaves = Object.keys(datos);
    var longitud = llaves.length;

    for (var i = 0; i < (longitud +und) ; i++) {
        var llave = llaves[i];
        if (datos[llave].length > 0) {
            for (let i = 0; i < datos[llave].length; i++) {
                switch (datos[llave][i].type) {
                    case 1:
                        drawLineBresenham(datos[llave][i].x1,datos[llave][i].y1,datos[llave][i].x2,datos[llave][i].y2,datos[llave][i].stroke,datos[llave][i].color);
                        break;
                    case 2:
                        drawLineBresenham(datos[llave][i].x1,datos[llave][i].y1,datos[llave][i].x2,datos[llave][i].y2,datos[llave][i].stroke,datos[llave][i].color);
                        break;
                    case 3:
                        drawCircle(datos[llave][i].x1,datos[llave][i].y1,datos[llave][i].x2,datos[llave][i].y2,datos[llave][i].stroke,datos[llave][i].color);
                        break;
                    case 4:
                        rectangle(datos[llave][i].x1,datos[llave][i].y2,datos[llave][i].x2,datos[llave][i].y1,datos[llave][i].stroke,datos[llave][i].color);
                        break;
                    case 5:
                        square(datos[llave][i].x1,datos[llave][i].y1,datos[llave][i].x2,datos[llave][i].stroke,datos[llave][i].color);
                        break;
                    case 6:
                        drawpolygon(datos[llave][i].x1,datos[llave][i].y1,datos[llave][i].x2,datos[llave][i].y2,datos[llave][i].stroke,datos[llave][i].color, sides[llave]);
                        break;
                    case 7:
                        drawEllipse(datos[llave][i].x1,datos[llave][i].y1,datos[llave][i].x2,datos[llave][i].y2,datos[llave][i].stroke,datos[llave][i].color);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}