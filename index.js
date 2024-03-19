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
var stack = {};
var cStack =  new Array();
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
window.addEventListener('load', function() {
    const contenedor = canvas.parentNode;
    setTimeout(() => {
        canvas.width = contenedor.offsetWidth;
        canvas.height = contenedor.offsetHeight;
    }, 100);
}); 
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
    reorder();
}
function reorder(){
    var datos2 = {}; 
    var sides2 = {};
    var index = 0;
    for (var llave in datos) {
        if (datos[llave] && datos[llave].length > 0) {
            index++;
            datos2[index] = datos[llave];
            sides2[index] = sides[llave];
        }
    }
    last = index + 1;
    datos={};
    sides = {};
    datos=datos2;
    sides=sides2;
    und = 0;
    stack = {};
    cStack = {};
}
function layers(key, mov){
    var datos2 = {}; 
    var sides2 = {};
    var index = 0;
    var datos3 = {}; 
    var sides3 = {};
    switch(mov){
        case -2:
            datos2[1]=datos[key];
            sides2[1]=sides[key];
            for (var llave in datos) {
                if (datos[llave] && datos[llave].length > 0 && llave!=key) {
                    index++;
                    datos2[index+1] = datos[llave];
                    sides2[index+1] = sides[llave];
                }
            }
            last = index + 1;
            datos={};
            sides = {};
            datos=datos2;
            sides=sides2;
        break;
        case -1:
            datos2[1]=datos[key-1];
            sides2[1]=sides[key-1];
            datos[key-1]=datos[key];
            sides[key-1]=sides[key];
            datos[key]=datos2[1];
            sides[key]=sides2[1];
        break;
        case 1:
            datos2[1]=datos[key+1];
            sides2[1]=sides[key+1];
            datos[key+1]=datos[key];
            sides[key+1]=sides[key];
            datos[key]=datos2[1];
            sides[key]=sides2[1];
        break;
        case 2:
            datos3[1]=datos[key];
            sides3[1]=sides[key];
            for (var llave in datos) {
                if (datos[llave] && datos[llave].length > 0 && llave!=key) {
                    index++;
                    datos2[index] = datos[llave];
                    sides2[index] = sides[llave];
                }
            }
            index++;
            datos2[index]=datos3[1];
            sides2[index]=sides3[1];
            last = index + 1;
            datos={};
            sides = {};
            datos=datos2;
            sides=sides2;
        break;
        default:
        console.log('uy quieto');
        break;
    }
    und = 0;
    stack = {};
    cStack = {};
}
function deleteFigure(k){
    cStack[und] =k ;
    stack[und]=JSON.parse(JSON.stringify(datos[k]));
    und++;
    datos[k].pop();
}
function undo(){
    if(und>0){
        und--; 
        datos[cStack[und]]= JSON.parse(JSON.stringify(stack[und]));

        // console.log('a',datos[cStack[und]],'b',stack[und],cStack[und]);
        // console.log(datos);

    }else{
        und--;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFigures();
}
function redo(){
    if(und<=0){
        und+=1;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFigures();
}
function save() {
    if(und!=0){
        eliminarDatos(last);
    }
    var datosCombinados = { figuras: datos, lados: sides };
    const datosJSON = JSON.stringify(datosCombinados);
    const blob = new Blob([datosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download = 'datos.json'; // Nombre del archivo
    enlaceDescarga.click();
    URL.revokeObjectURL(url);
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
document.getElementById("13").addEventListener("click", function () {type = 13;});
document.getElementById("14").addEventListener("click", function () {type = 14;});
document.getElementById("15").addEventListener("click", function () {type = 15;});
document.getElementById("16").addEventListener("click", function () {type = 16;});
document.getElementById("17").addEventListener("click", function () {type = 17;});
document.getElementById("18").addEventListener("click", function () {type = 18;});


document.getElementById("colorPicker").addEventListener("input", updateHexColor);
document.getElementById("strokeWidth").addEventListener("input", function(event) {var strokeValue = parseInt(event.target.value, 10); updateStroke(strokeValue);});
document.getElementById("sides").addEventListener("input", function(event) {var sideValue = parseInt(event.target.value, 10); updateside(sideValue);});
document.getElementById("undo").addEventListener("click", function () {undo();});
document.getElementById("redo").addEventListener("click", function () {redo();});
document.getElementById("save").addEventListener("click", function () {save();});
document.getElementById("clean").addEventListener("click", function () {clean();});
document.getElementById("toggleButton").addEventListener("click", function () {toggleElement();});
document.getElementById("toggleButton2").addEventListener("click", function () {toggleElement2();});
document.getElementById('archivoInput').addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    if (archivo && archivo.type === 'application/json') {
        // Si el archivo seleccionado es un JSON, cargar los datos
        cargarDatosDesdeJSON(archivo);
    } else {
        console.error('El archivo seleccionado no es un JSON.');
    }
});
document.getElementById("pdf").addEventListener("click", function () {savePDF();});
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
        undo(); // Deshacer al presionar Ctrl + Z
    } else if (event.ctrlKey && event.key === 'y') {
        redo(); // Rehacer al presionar Ctrl + Y
    }
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);

canvas.addEventListener("touchstart", (event) => {event.preventDefault();event.stopPropagation();startDrawing(event.touches[0]);});
canvas.addEventListener("touchmove", (event) => {event.preventDefault();event.stopPropagation();draw(event.touches[0]);});
canvas.addEventListener("touchend", (event) => {event.preventDefault();event.stopPropagation();stopDrawing(event.changedTouches[0]);});
//---------------------------------funciones de los eventos-------------------//
function cargarDatosDesdeJSON(archivo) {
    const lector = new FileReader();
    lector.onload = function(event) {
        const datosJSON = event.target.result;
        var datosCombinados = JSON.parse(datosJSON);
        datos = datosCombinados.figuras;
        sides = datosCombinados.lados;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFigures();
    };
    lector.readAsText(archivo);
}
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
    und=0;
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
    switch (type) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            if(und!=0){
                eliminarDatos(last);
                und=0;
                stack={};
            }
            last +=1;
        break;
        case 11:
        case 12:
        case 13:
        case 18:
            if(und<0){
                eliminarDatos(last);
            }
            sKey=selectFigure(x,y);
            if( sKey !=0&&type==13){
                deleteFigure(sKey);
                sKey = 0;
            }
        break;
        case 14:
            sKey=selectFigure(x,y);
            if( sKey !=0){
                layers(sKey,-1);
                sKey = 0;
            }
        break;
        case 15:
            sKey=selectFigure(x,y);
            if( sKey !=0){
                layers(sKey,1);
                sKey = 0;
            }
        break;
        case 16:
            sKey=selectFigure(x,y);
            if( sKey !=0){
                layers(sKey,-2);
                sKey = 0;
            }
        break;
        case 17:
            sKey=selectFigure(x,y);
            if( sKey !=0){
                layers(sKey,2);
                sKey = 0;
            }
        break;
        default:
            console.log("Opción no reconocida");
        break;
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
                                drawLineBresenham(datos[sKey][0].x1 , datos[sKey][0].y1 , endX,endY, datos[sKey][0].stroke,datos[sKey][0].color);
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
                case 13:
                break;
                case 18:
                   if(sKey!=0){//----------------move---------------//
                        const centerX = (datos[sKey][0].x1 + datos[sKey][0].x2) / 2;
                        const centerY = (datos[sKey][0].y1 + datos[sKey][0].y2) / 2;
                        
                        // Coordenadas relativas de las esquinas respecto al centro
                        const relativeStartX = datos[sKey][0].x1 - centerX;
                        const relativeStartY = datos[sKey][0].y1 - centerY;
                        const relativeEndX = datos[sKey][0].x2 - centerX;
                        const relativeEndY = datos[sKey][0].y2 - centerY;
                        
                        const angle = Math.atan2(relativeEndY, relativeEndX) - Math.atan2(relativeStartY, relativeStartX);
                        // Rotación
                        const rotatedStartX = relativeStartX * Math.cos(angle) - relativeStartY * Math.sin(angle);
                        const rotatedStartY = relativeStartX * Math.sin(angle) + relativeStartY * Math.cos(angle);
                        const rotatedEndX = relativeEndX * Math.cos(angle) - relativeEndY * Math.sin(angle);
                        const rotatedEndY = relativeEndX * Math.sin(angle) + relativeEndY * Math.cos(angle);
                        
                        // Coordenadas absolutas de las esquinas después de la rotación
                        const finalStartX = Math.round(rotatedStartX + centerX);
                        const finalStartY = Math.round(rotatedStartY + centerX);
                        const finalEndX = Math.round(rotatedEndX + centerX);
                        const finalEndY = Math.round(rotatedEndY + centerX);
                        switch (datos[sKey][0].type) {
                            case 1:
                                for (let i = 0; i < datos[sKey].length; i++) {
                                    drawLineBresenham(datos[sKey][i].x1 , datos[sKey][i].y1 , datos[sKey][i].x2 + current, datos[sKey][i].y2 + current, datos[sKey][i].stroke,datos[sKey][i].color);
                                }
                                break;
                            case 2:                            
                                drawLineBresenham(finalStartX , finalStartY , finalEndX,finalEndY, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 3:
                                drawCircle(finalStartX, finalStartY , finalEndX, finalEndY, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 4:
                                rectangle(finalStartX , finalStartY , finalEndX, finalEndY, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 5:
                                square(finalStartX , finalStartY , finalEndX,  datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 6:
                                drawpolygon(finalStartX, finalStartY , finalEndX, finalEndY, datos[sKey][0].stroke,datos[sKey][0].color,sides[sKey]);
                                break;
                            case 7:
                                drawEllipse(finalStartX , finalStartY , finalEndX, finalEndY, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 8:
                                drawRombo(finalStartX, finalStartY , finalEndX, finalEndY, datos[sKey][0].stroke,datos[sKey][0].color);
                                break;
                            case 9:
                                drawTrapezoid(finalStartX, finalStartY , finalEndX, finalEndY, datos[sKey][0].stroke,datos[sKey][0].color);
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
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);         
        const { x, y } = getCoordinates(event);
        const endX = x;
        const endY = y;
        switch (type) {
            case 1:
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
                // console.log(sKey);
                cStack[und] =sKey ;
                stack[und]=JSON.parse(JSON.stringify(datos[sKey]));
                // console.log('c',cStack[und], 's',stack[und],'k',sKey);
                und++; 
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
                                drawLineBresenham(datos[sKey][i].x1 + currentx, datos[sKey][i].y1 + currenty, datos[sKey][i].x2 + currentx, datos[sKey][i].y2 + currenty, datos[sKey][i].stroke,datos[sKey][i].color);
                                actualizarDatos(sKey,i,datos[sKey][i].x1 + currentx, datos[sKey][i].y1 + currenty, datos[sKey][i].x2 + currentx, datos[sKey][i].y2 + currenty, datos[sKey][i].stroke,0,datos[sKey][i].color);
                            }
                            // console.log('c',datos[sKey]);
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
                
                        if(sKey!=0){//----------------move---------------//
                            // console.log(sKey);
                            cStack[und] =sKey ;
                            stack[und]=JSON.parse(JSON.stringify(datos[sKey]));
                            // console.log('c',cStack[und], 's',stack[und],'k',sKey);
                            und++; 
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

            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
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

    for (var i = longitud + und ; i >= 0; i--)  {
        var key = keys[i];
        if (datos[key] && datos[key].length > 0) {
            for (let i = 0; i < datos[key].length; i++) {
                switch (datos[key][i].type) {
                    case 1:
                        if(selectLine(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            // console.log('key',key);
                            return key;
                        }
                        break;
                    case 2:
                        if(selectLine(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            // console.log('key',key);
                            return key;
                        }
                        break;
                    case 3:
                        if(selectCircle(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            // console.log('key',key);
                            return key;
                        }
                        break;
                    case 4: 
                        if(selectRectangle(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            // console.log('key',key);
                            return key;
                        }                        
                        break;
                    case 5:
                        if(selectSquare(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,x,y,datos[key][i].stroke)){
                            // console.log('key',key);
                            return key;
                        }                           
                        break;
                    case 6:
                        if(selectPolygon(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke, sides[key])){
                            // console.log('key',key);
                            return key;
                        }                             
                        break;
                    case 7:
                        if(selectEllipse(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            // console.log('key',key);
                            return key;
                        }                             
                        break;
                    case 8:
                        if(selectRombo(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            // console.log('key',key);
                            return key;
                        }                             
                        break;
                    case 9:
                        if(selectTrapezoid(datos[key][i].x1,datos[key][i].y1,datos[key][i].x2,datos[key][i].y2,x,y,datos[key][i].stroke)){
                            // console.log('key',key);
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