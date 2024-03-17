import drawCircle,{selectCircle} from "./functions/circle.js";
import drawpolygon, { selectPolygon } from "./functions/polygon.js";
import drawEllipse, { selectEllipse } from "./functions/elipse.js";
import square, { selectSquare } from "./functions/square.js";
import rectangle, { selectRectangle } from "./functions/rectangle.js";
import drawLineBresenham,{selectLine} from "./functions/bresenham.js";
import drawPixel,{setColor} from "./functions/pixels.js";
import drawRombo, { selectRombo } from "./functions/rombo.js";
import drawTrapezoid, { selectTrapezoid } from "./functions/trapezoid.js";
//-----------------------declaraciones y estructuras---------------------------------------//
const canvas = document.getElementById("miCanvas");
export const ctx = canvas.getContext("2d");
var datos = {}; 
var sides = {}; 
var colorPicker = document.getElementById("colorPicker");
var color = colorPicker.value ;
var bColor= "rgb(255, 255, 255)";
var erase = false;
var stroke =3;
var isDrawing = false;
var layer = 1;
var last = 0;
var numSides = 5;
var startX, startY;   
var type = 1;
var sKey =0;
var und =0;
function updateHexColor() {
    color = colorPicker.value;
}
function updateStroke(strokeValue) {
    stroke = strokeValue;
}
function updateside(sidevalue){
    numSides = sidevalue;
}
function agregarDatos(key,x1, y1, x2, y2) {
    if (!datos[key]) {
        datos[key] = []; // Si no existe, inicializar una matriz para esa key
        if(type==6){
            sides[key]=numSides;
        }
    }
    datos[key].push({
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
function actualizarDatos(key, index, x1, y1, x2, y2, stroke, layer, color) {
    if (datos[key] && datos[key][index]) {
        datos[key][index] = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            stroke: stroke,
            layer: layer,
            color: color,
            type: datos[key][index].type // Mantener el valor existente de type
        };
    } else {
        console.error("No se encontraron datos para la clave proporcionada o el índice proporcionado está fuera de rango.");
    }
}

function eliminarDatos(key) {
    for(var i = key; i > (key +und) ; i--){
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
//--------------------------------eventos-------------------------------//
document.getElementById("1").addEventListener("click", function () {type = 1, noB();});
document.getElementById("2").addEventListener("click", function () {type = 2, noB();});
document.getElementById("3").addEventListener("click", function () {type = 3, noB();});
document.getElementById("4").addEventListener("click", function () {type = 4, noB();});
document.getElementById("5").addEventListener("click", function () {type = 5, noB();});
document.getElementById("6").addEventListener("click", function () {type = 6, noB();});
document.getElementById("7").addEventListener("click", function () {type = 7, noB();});
document.getElementById("8").addEventListener("click", function () {type = 8, noB();});
document.getElementById("9").addEventListener("click", function () {type = 9, noB();});
document.getElementById("10").addEventListener("click", function () {type = 1, borrador();});
document.getElementById("11").addEventListener("click", function () {type = 11;});
document.getElementById("12").addEventListener("click", function () {type = 12;});


document.getElementById("colorPicker").addEventListener("input", updateHexColor);
document.getElementById("strokeWidth").addEventListener("input", function(event) {var strokeValue = parseInt(event.target.value, 10); updateStroke(strokeValue);});
document.getElementById("sides").addEventListener("input", function(event) {var sideValue = parseInt(event.target.value, 10); updateside(sideValue);});
document.getElementById("undo").addEventListener("click", function () {undo();});
document.getElementById("endo").addEventListener("click", function () {endo();});
document.getElementById("clean").addEventListener("click", function () {clean();});
document.getElementById("toggleButton").addEventListener("click", function () {toggleElement();});
document.getElementById("toggleButton2").addEventListener("click", function () {toggleElement2();});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);

canvas.addEventListener("touchstart", (event) => {event.preventDefault();event.stopPropagation();startDrawing(event.touches[0]);});
canvas.addEventListener("touchmove", (event) => {event.preventDefault();event.stopPropagation();draw(event.touches[0]);});
canvas.addEventListener("touchend", (event) => {event.preventDefault();event.stopPropagation();stopDrawing(event.changedTouches[0]);});
//---------------------------------funciones de los eventos-------------------//
function toggleElement() {
    var elemento = document.getElementById("elementoOculto");
    
    if (elemento.style.display === "none") {
        elemento.style.display = "grid"; // Muestra el elemento
    } else {
        elemento.style.display = "none"; // Oculta el elemento
    }
}
function toggleElement2() {
    var elemento = document.getElementById("elementoOculto2");
    
    if (elemento.style.display === "none") {
        elemento.style.display = "grid"; // Muestra el elemento
    } else {
        elemento.style.display = "none"; // Oculta el elemento
    }
}
function borrador(){
    var tColor = color;
    color = bColor;
    bColor = tColor;
    erase = true;
}
function noB(){
    if(erase){
        var tColor = color;
        color = bColor;
        bColor = tColor;
        erase = false;
    }
}
function clean(){
    datos = {}; 
    sides = {};
    last = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFigures();
}
function getCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    return { x, y };
}
//-------------------------------dibujado--------------------------//
function startDrawing(event) {
    const { x, y } = getCoordinates(event);
    if(type==11 || type == 12){
        sKey=selectFigure(x,y);
    }else if(und==0){
        last +=1;
    }
    isDrawing =true;
    startX = x;
    startY = y;
}
function draw(event) {
    if(isDrawing){   
        const { x, y } = getCoordinates(event);
        const endX = x;
        const endY = y;
        if(type!=1){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // setTimeout(() => {
                drawFigures();
                // }, 100);
        }  
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
                    break;
                case 3:
                    drawCircle(startX, startY,endX,endY,stroke,color);
                    break;
                case 4:
                    rectangle(startX,startY,endX,endY,stroke,color);
                    break;
                case 5:
                    square(startX,startY,endX,stroke,color);
                    break;
                case 6:
                    drawpolygon(startX, startY, endX, endY, stroke,color,numSides);
                    break;
                case 7:
                    drawEllipse(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY), stroke,color);
                    break;
                case 8:
                    drawRombo(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY), stroke,color);
                    break;
                case 9:
                    drawTrapezoid(startX,startY,endX,endY,stroke,color);
                    break;
                case 11:
                    if(sKey!=0){//----------------move---------------//
                        const currentx= endX - startX; 
                        const currenty= endY - startY;
                        switch (datos[sKey][0].type) {
                            case 1:
                                for (let i = 0; i < datos[sKey].length; i++) {
                                    drawLineBresenham(datos[sKey][i].x1 + currentx, datos[sKey][i].y1 + currenty, datos[sKey][i].x2 + currentx, datos[sKey][i].y2 + currenty, datos[sKey][i].stroke,datos[sKey][i].color);
                                }
                                break;
                            case 2:                            
                                drawLineBresenham(datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2 + currentx, datos[sKey][0].y2 + currenty, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 3:
                                drawCircle(datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2 + currentx, datos[sKey][0].y2 + currenty, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 4:
                                rectangle(datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2 + currentx, datos[sKey][0].y2 + currenty, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 5:
                                square(datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2 + currentx,  datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 6:
                                drawpolygon(datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2 + currentx, datos[sKey][0].y2 + currenty, datos[sKey][0].stroke,datos[sKey][0].color,sides[sKey]);
                                break;
                            case 7:
                                drawEllipse(datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2, datos[sKey][0].y2, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 8:
                                drawRombo(datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2, datos[sKey][0].y2, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 9:
                                drawTrapezoid(datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2 + currentx, datos[sKey][0].y2 + currenty, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            default:
                            console.log("Opción no reconocida");
                            break;
                        }
                    }
                    break;
                case 12:
                    if(sKey!=0){//----------------move---------------//
                        const slope = (datos[sKey][0].y2 - datos[sKey][0].y1) / (datos[sKey][0].x2 - datos[sKey][0].x1);
                        const angle = Math.atan(slope);
                        const currentx = endX - startX; 
                        const currenty = endY - startY;
                        const current = Math.round((currentx +currenty) /2);
                        const deltaX = Math.round(current * Math.cos(angle));
                        const deltaY = Math.round(current * Math.sin(angle));
                        const current2 = Math.round((deltaX +deltaY) /2);
                        switch (datos[sKey][0].type) {
                            case 1:
                                for (let i = 0; i < datos[sKey].length; i++) {
                                    drawLineBresenham(datos[sKey][i].x1 , datos[sKey][i].y1 , datos[sKey][i].x2 + current, datos[sKey][i].y2 + current, datos[sKey][i].stroke,datos[sKey][i].color);
                                }
                                break;
                            case 2:                            
                                drawLineBresenham(datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + deltaX ,datos[sKey][0].y2 + deltaY, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 3:
                                drawCircle(datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + deltaX, datos[sKey][0].y2 + deltaY, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 4:
                                rectangle(datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + deltaX, datos[sKey][0].y2 + deltaY, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 5:
                                square(datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + currentx,  datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 6:
                                drawpolygon(datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + deltaX, datos[sKey][0].y2 + deltaY, datos[sKey][0].stroke,datos[sKey][0].color,sides[sKey]);
                                break;
                            case 7:
                                drawEllipse(datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + current2, datos[sKey][0].y2 + current2 , datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 8:
                                drawRombo(datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + current2, datos[sKey][0].y2 + current2 , datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 9:
                                drawTrapezoid(datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + deltaX, datos[sKey][0].y2 + deltaY, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            default:
                            console.log("Opción no reconocida");
                            break;
                        }
                    }
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
        }          
        const { x, y } = getCoordinates(event);
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
            case 9:
                agregarDatos(last,startX, startY, endX, endY);
                drawFigures();
                break;
            case 5:
                agregarDatos(last,startX, startY, endX, 0);
                drawFigures();
                break;
            case 7:
            case 8:
                agregarDatos(last,startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));
                drawFigures();
                break;
            case 11:
                if(sKey!=0){//----------------move---------------//
                    const currentx= endX - startX; 
                    const currenty= endY - startY;
                    switch (datos[sKey][0].type) {
                        case 1:
                            for (let i = 0; i < datos[sKey].length; i++) {
                                drawLineBresenham(datos[sKey][i].x1 + currentx, datos[sKey][i].y1 + currenty, datos[sKey][i].x2 + currentx, datos[sKey][i].y2 + currenty, datos[sKey][i].stroke,datos[sKey][i].color);
                                actualizarDatos(sKey,i,datos[sKey][i].x1 + currentx, datos[sKey][i].y1 + currenty, datos[sKey][i].x2 + currentx, datos[sKey][i].y2 + currenty, datos[sKey][i].stroke,0,datos[sKey][i].color);
                            }
                            break;
                        case 2:
                        case 3:
                        case 4:
                        case 6:
                        case 9:
                            actualizarDatos(sKey,0,datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2 + currentx, datos[sKey][0].y2 + currenty, datos[sKey][0].stroke,0,datos[sKey][0].color);
                            drawFigures();
                            break;
                        case 5:
                            actualizarDatos(sKey,0,datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2 + currentx, 0, datos[sKey][0].stroke,0,datos[sKey][0].color);
                            drawFigures();
                            break;
                        case 7:
                        case 8:
                            actualizarDatos(sKey,0,datos[sKey][0].x1 + currentx, datos[sKey][0].y1 + currenty, datos[sKey][0].x2 , datos[sKey][0].y2 , datos[sKey][0].stroke,0,datos[sKey][0].color);
                            drawFigures();
                            break;
                        default:
                            console.log("Opción no reconocida");
                            break;
                        }
                }
                sKey =0;
                drawFigures();
            case 12:
                const slope = (datos[sKey][0].y2 - datos[sKey][0].y1) / (datos[sKey][0].x2 - datos[sKey][0].x1);
                        const angle = Math.atan(slope);
                        const currentx = endX - startX; 
                        const currenty = endY - startY;
                        const current = Math.round((currentx +currenty) /2);
                        const deltaX = Math.round(current * Math.cos(angle));
                        const deltaY = Math.round(current * Math.sin(angle));
                        const current2 = Math.round((deltaX +deltaY) /2);
                        if(sKey!=0){//----------------move---------------//
                            const currentx= endX - startX; 
                            const currenty= endY - startY;
                            switch (datos[sKey][0].type) {
                                case 1:
                                    for (let i = 0; i < datos[sKey].length; i++) {
                                        drawLineBresenham(datos[sKey][i].x1 + currentx, datos[sKey][i].y1 + currenty, datos[sKey][i].x2 + currentx, datos[sKey][i].y2 + currenty, datos[sKey][i].stroke,datos[sKey][i].color);
                                        actualizarDatos(sKey,i,datos[sKey][i].x1 + currentx, datos[sKey][i].y1 + currenty, datos[sKey][i].x2 + currentx, datos[sKey][i].y2 + currenty, datos[sKey][i].stroke,0,datos[sKey][i].color);
                                    }
                                    break;
                                case 2:
                                case 3:
                                case 4:
                                case 6:
                                case 9:
                                    actualizarDatos(sKey,0,datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + deltaX, datos[sKey][0].y2 + deltaY, datos[sKey][0].stroke,0,datos[sKey][0].color);
                                    drawFigures();
                                    break;
                                case 5:
                                    actualizarDatos(sKey,0,datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + currentx,0,  datos[sKey][0].stroke,0,datos[sKey][0].color);
                                    drawFigures();
                                    break;
                                case 7:
                                case 8:
                                    actualizarDatos(sKey,0,datos[sKey][0].x1 , datos[sKey][0].y1 , datos[sKey][0].x2 + current2, datos[sKey][0].y2 + current2 , datos[sKey][0].stroke,0,datos[sKey][0].color);
                                    drawFigures();
                                    break;
                                default:
                                    console.log("Opción no reconocida");
                                    break;
                                }
                        }
                        sKey =0;
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
function selectFigure(x,y){
    var keys = Object.keys(datos);
    var longitud = keys.length;

    for (var i = longitud + und - 1; i >= 0; i--)  {
        var key = keys[i];
        if (datos[key] && datos[key].length > 0) {
            for (let i = 0; i < datos[key].length; i++) {
                switch (datos[key][i].type) {
                    case 1:
                        if(selectLine(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            return key;
                        }
                        break;
                    case 2:
                        if(selectLine(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            return key;
                        }
                        break;
                    case 3:
                        if(selectCircle(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            return key;
                        }
                        break;
                    case 4: 
                        if(selectRectangle(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            return key;
                        }                        
                        break;
                    case 5:
                        if(selectSquare(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,x,y,datos[key][i].stroke)){
                            return key;
                        }                           
                        break;
                    case 6:
                        if(selectPolygon(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke, sides[key])){
                            return key;
                        }                             
                        break;
                    case 7:
                        if(selectEllipse(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            return key;
                        }                             
                        break;
                    case 8:
                        if(selectRombo(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            return key;
                        }                             
                        break;
                    case 9:
                        if(selectTrapezoid(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            return key;
                        }       
                    default:
                        break;
                }
            }
        }
    }
    return 0;
}
function drawFigures() {
    var keys = Object.keys(datos);
    var longitud = keys.length;

    for (var i = 0; i < (longitud +und) ; i++) {
        var key = keys[i];
        if (datos[key] && datos[key].length > 0 && key !=sKey) {
            for (let i = 0; i < datos[key].length; i++) {
                switch (datos[key][i].type) {
                    case 1:
                        drawLineBresenham(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,datos[key][i].stroke,datos[key][i].color);
                        break;
                    case 2:
                        drawLineBresenham(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,datos[key][i].stroke,datos[key][i].color);
                        break;
                    case 3:
                        drawCircle(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,datos[key][i].stroke,datos[key][i].color);
                        break;
                    case 4:
                        rectangle(datos[key][i].x1,datos[key][i].y2,datos[key][i].x2,datos[key][i].y1,datos[key][i].stroke,datos[key][i].color);
                        break;
                    case 5:
                        square(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].stroke,datos[key][i].color);
                        break;
                    case 6:
                        drawpolygon(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,datos[key][i].stroke,datos[key][i].color, sides[key]);
                        break;
                    case 7:
                        drawEllipse(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,datos[key][i].stroke,datos[key][i].color);
                        break;
                    case 8:
                        drawRombo(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,datos[key][i].stroke,datos[key][i].color);
                        break;
                    case 9:
                        drawTrapezoid(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,datos[key][i].stroke,datos[key][i].color);
                    default:
                        break;
                }
            }
        }
    }
}