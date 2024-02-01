//-----------------------declaraciones y estructuras---------------------------------------//
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
var datos = {}; // Objeto para almacenar las matrices
var color = '#000000' ;
var stroke =3;
var isDrawing = false;
var depth = 1;
var last = 0;
var isAdraw =false;
function agregarDatos(llave, x, y, stroke, depth) {
    if (!datos[llave]) {
        datos[llave] = []; // Si no existe, inicializar una matriz para esa llave
    }
    datos[llave].push({
        x: x,
        y: y,
        stroke: stroke,
        depth: depth,
    });
}

function eliminarDatos(llave) {
    if (datos[llave] && datos[llave].length > 0) {
        while(datos[llave].length != 0){
            datos[llave].pop();
        }
    }
}
//------------------------llamadas de aqui pa abajo----------------------------------------//
function removeAllEventListeners() {
    canvas.removeEventListener("mousedown",drawDown);
    canvas.removeEventListener("mouseup",drawUp);
    canvas.removeEventListener("mousemove",drawMove);
    canvas.removeEventListener("mousedown",lineDown);
    canvas.removeEventListener("mousemove",lineMove);
    canvas.removeEventListener("mouseup",lineUp);
    canvas.removeEventListener("mousedown",circleDown);
    canvas.removeEventListener("mousemove",circleMove);
    canvas.removeEventListener("mouseup",circleUp);
}
var startX, startY;   
function llamada(option){
    removeAllEventListeners();
    switch (option) {
        case 1:
            canvas.addEventListener("mousedown", drawDown);
            canvas.addEventListener("mousemove", drawMove);
            canvas.addEventListener("mouseup", drawUp);

          break;
      
        case 2:
            canvas.addEventListener("mousedown", lineDown);
            canvas.addEventListener("mousemove", lineMove);
            canvas.addEventListener("mouseup", lineUp);

          break;
      
        case 3:
            canvas.addEventListener("mousedown", circleDown);
            canvas.addEventListener("mousemove", circleMove);
            canvas.addEventListener("mouseup", circleUp);
          break;
      
        default:
          console.log("Opción no reconocida");
          break;
      }
      
}
//---dibujo mano alzada---//
function drawDown(event){
    last +=1;
    isDrawing =true;
    isAdraw = true;
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
}
function drawMove(event){
    if(isDrawing){
        var mouseX = event.clientX - canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - canvas.getBoundingClientRect().top;
        drawLineBresenham(startX, startY, mouseX, mouseY);
        startX = mouseX;
        startY = mouseY;
    }
}
function drawUp(event){
    if(isDrawing){
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        isDrawing =false;
        drawLineBresenham(startX, startY, endX, endY)
        isAdraw=false;
    }
}
//---linea bresenham---//
function lineDown(event){
    last+=1;
    isDrawing =true
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
}
function lineMove(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        drawLineBresenham(startX, startY, endX, endY)
        setTimeout(() => {
            drawFigures();
        }, 100);
    }
}
function lineUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        isDrawing =false;
        drawLineBresenham(startX, startY, endX, endY);
        drawFigures();
    }
}
//---circulo---//
function circleDown(event){
    last +=1;
    isDrawing = true;
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
}
function circleMove(){
    if (isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        const deltax = Math.abs(endX - startX);
        const deltay = Math.abs(endY - startY);
        const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
        drawCircle(startX, startY, radius)
        setTimeout(() => {
            drawFigures();
        }, 100);
    } 
}
function circleUp(event){
    if(isDrawing){
        isDrawing = false;
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        const deltax = Math.abs(endX - startX);
        const deltay = Math.abs(endY - startY);
        const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
        drawCircle(startX, startY, radius)
    
    }
};
//---------------------------------------------------figuras de aqui pa abajo----------------------------------------------//
function drawCircle(centerX, centerY, radius) {
    let x = radius;
    let y = 0;
    let decisionOver2 = 1 - x;   // Inicialización de la decisión del punto (el primer punto siempre está en el octante superior derecho)

    while (y <= x) {
        // Dibuja el pixel en cada octante
        drawPixel(centerX + x, centerY - y, stroke, color);
        drawPixel(centerX - x, centerY - y, stroke, color);
        drawPixel(centerX + x, centerY + y, stroke, color);
        drawPixel(centerX - x, centerY + y, stroke, color);
        drawPixel(centerX + y, centerY - x, stroke, color);
        drawPixel(centerX - y, centerY - x, stroke, color);
        drawPixel(centerX + y, centerY + x, stroke, color);
        drawPixel(centerX - y, centerY + x, stroke, color);

        if(!isDrawing ){
            agregarDatos(last, Math.round(centerX + x), Math.round(centerY - y), stroke , depth);
            agregarDatos(last, Math.round(centerX - x), Math.round(centerY - y), stroke , depth);
            agregarDatos(last, Math.round(centerX + x), Math.round(centerY + y), stroke , depth);
            agregarDatos(last, Math.round(centerX - x), Math.round(centerY + y), stroke , depth);
            agregarDatos(last, Math.round(centerX + y), Math.round(centerY - x), stroke , depth);
            agregarDatos(last, Math.round(centerX - y), Math.round(centerY - x), stroke , depth);
            agregarDatos(last, Math.round(centerX + y), Math.round(centerY + x), stroke , depth);
            agregarDatos(last, Math.round(centerX - y), Math.round(centerY + x), stroke , depth);    
        }

        y++;

        // Actualiza la decisión según el algoritmo del punto medio
        if (decisionOver2 <= 0) {
            decisionOver2 += 2 * y + 1;
        } else {
            x--;
            decisionOver2 += 2 * (y - x) + 1;
        }
    }
}

// Función para dibujar la línea
function drawLineBresenham(x1, y1, x2, y2) {
    const deltax = Math.abs(x2 - x1);
    const deltay = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = deltax - deltay;


    while (x1 !== x2 || y1 !== y2) {
        drawPixel(x1, y1, stroke ,color);
        if(!isDrawing || isAdraw){agregarDatos(last,Math.round(x1), Math.round(y1), stroke , depth);}
        let e2 = 2 * err;
        if (e2 > -deltay) {
            err -= deltay;
            x1 += sx;
        }
        if (e2 < deltax) {
            err += deltax;
            y1 += sy;
        }
    }
}
//--------------------------dibujar en el canva-----------------//
function drawFigures() {
    for (var llave in datos) {
        if (datos[llave].length > 0) {
            for (let i = 0; i < datos[llave].length; i++) {
                ctx.fillStyle = color; // Configurar el color antes de dibujar
                ctx.fillRect(datos[llave][i].x, datos[llave][i].y, datos[llave][i].stroke, datos[llave][i].stroke); // Dibuja el píxel
            }
        }
    }
}
function drawPixel(x, y,s,c) {
    ctx.fillRect(x, y, s, s); // Dibuja el píxel
    ctx.fillStyle = c;
}
