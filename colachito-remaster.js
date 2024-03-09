//-----------------------declaraciones y estructuras---------------------------------------//
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
var datos = {}; 
var sides = {}; 
var color = colorPicker.value ;
var stroke =3;
var isDrawing = false;
var layer = 1;
var last = 0;
var numSides = 5;
var startX, startY;   
var type = 0;
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
    if (datos[llave] && datos[llave].length > 0) {
        while(datos[llave].length != 0){
            datos[llave].pop();
        }
    }
}
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
    canvas.removeEventListener("mousedown", rectangleDown);
    canvas.removeEventListener("mousemove", rectangleMove);
    canvas.removeEventListener("mouseup", rectangleUp);
    canvas.removeEventListener("mousedown", squareDown);
    canvas.removeEventListener("mousemove", squareMove);
    canvas.removeEventListener("mouseup", squareUp);
    canvas.removeEventListener("mousedown", poligonoDown);
    canvas.removeEventListener("mousemove", poligonoMove);
    canvas.removeEventListener("mouseup", poligonoUp);
    canvas.removeEventListener("mousedown", elipseDown);
    canvas.removeEventListener("mousemove", elipseMove);
    canvas.removeEventListener("mouseup", elipseUp);

    // canvas.removeEventListener("touchstart",drawDown);
    // canvas.removeEventListener("touchend",drawUp);
    // canvas.removeEventListener("touchmove",drawMove);
    // canvas.removeEventListener("touchstart",lineDown);
    // canvas.removeEventListener("touchmove",lineMove);
    // canvas.removeEventListener("touchend",lineUp);
    // canvas.removeEventListener("touchstart",circleDown);
    // canvas.removeEventListener("touchmove",circleMove);
    // canvas.removeEventListener("touchend",circleUp);
}
function llamada(option){
    type = option;
    removeAllEventListeners();
    switch (option) {
        case 1:
            canvas.addEventListener("mousedown", drawDown);
            canvas.addEventListener("mousemove", drawMove);
            canvas.addEventListener("mouseup", drawUp);

            // canvas.addEventListener("touchstart", tDrawDown);
            // canvas.addEventListener("touchmove", tDrawMove);
            // canvas.addEventListener("touchend", tDrawUp);
            break;
        case 2:
            canvas.addEventListener("mousedown", lineDown);
            canvas.addEventListener("mousemove", lineMove);
            canvas.addEventListener("mouseup", lineUp);

            // canvas.addEventListener("touchstart", lineDown);
            // canvas.addEventListener("touchmove", lineMove);
            // canvas.addEventListener("touchend", lineUp);
            break;
        case 3:
            canvas.addEventListener("mousedown", circleDown);
            canvas.addEventListener("mousemove", circleMove);
            canvas.addEventListener("mouseup", circleUp);

            // canvas.addEventListener("touchstart", circleDown);
            // canvas.addEventListener("touchmove", circleMove);
            // canvas.addEventListener("touchend", circleUp);
            break;
        case 4:
            canvas.addEventListener("mousedown", rectangleDown);
            canvas.addEventListener("mousemove", rectangleMove);
            canvas.addEventListener("mouseup", rectangleUp);
            break;
        case 5:
            canvas.addEventListener("mousedown", squareDown);
            canvas.addEventListener("mousemove", squareMove);
            canvas.addEventListener("mouseup", squareUp);
            break;
        case 6:
            canvas.addEventListener("mousedown", poligonoDown);
            canvas.addEventListener("mousemove", poligonoMove);
            canvas.addEventListener("mouseup", poligonoUp);
            break;
        case 7:
            canvas.addEventListener("mousedown", elipseDown);
            canvas.addEventListener("mousemove", elipseMove);
            canvas.addEventListener("mouseup", elipseUp);
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
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
}
function drawMove(event){
    if(isDrawing){
        var mouseX = event.clientX - canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - canvas.getBoundingClientRect().top;
        drawLineBresenham(startX, startY, mouseX, mouseY, stroke,color);
        agregarDatos(last,startX, startY, mouseX, mouseY);
        startX = mouseX;
        startY = mouseY;
    }
}
function drawUp(event){
    if(isDrawing){
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        isDrawing =false;
        drawLineBresenham(startX, startY, endX, endY, stroke,color);
        agregarDatos(last,startX, startY, endX, endY);
    }
}
function tDrawDown(event) {
    event.preventDefault();
    event.stopPropagation();

    last += 1;
    isDrawing = true;
    
    // Accede a las coordenadas táctiles del primer punto de contacto
    startX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
    startY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
}
function tDrawMove(event) {
    event.preventDefault();
    event.stopPropagation();

    if (isDrawing && event.touches && event.touches[0]) {
        var mouseX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
        var mouseY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
        drawLineBresenham(startX, startY, mouseX, mouseY, stroke, color);
        agregarDatos(last, startX, startY, mouseX, mouseY);
        startX = mouseX;
        startY = mouseY;
    }
}
function tDrawUp(event) {
    event.preventDefault();
    event.stopPropagation();

    if (isDrawing && event.touches && event.touches[0]) {
        // Verifica que event.touches y event.touches[0] existan antes de acceder a sus propiedades
        var endX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
        var endY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
        
        isDrawing = false;
        drawLineBresenham(startX, startY, endX, endY, stroke, color);
        agregarDatos(last, startX, startY, endX, endY);
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
        drawLineBresenham(startX, startY, endX, endY, stroke,color);
        // setTimeout(() => {
            drawFigures();
        // }, 100);
    }
}
function lineUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        isDrawing =false;
        agregarDatos(last,startX, startY, endX, endY);
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
        drawCircle(startX, startY, calculateRadius(endX, startX, endY, startY),stroke,color);
        // setTimeout(() => {
            drawFigures();
        // }, 100);
    } 
}
function circleUp(event){
    if(isDrawing){
        isDrawing = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        agregarDatos(last,startX, startY, endX, endY);
        drawFigures();
    }
};
//---rectangulo bresenham-daniel---//
function rectangleDown(event){
    last+=1;
    isDrawing =true
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
}
function rectangleMove(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        //--linea inicial x--//
        drawLineBresenham(startX, startY, endX, startY,stroke,color);
        //--linea final x--//
        drawLineBresenham(startX, endY, endX, endY,stroke,color);
        //--linea inicial y--//
        drawLineBresenham(startX, startY, startX, endY,stroke,color);
        //--linea final y--//
        drawLineBresenham(endX, startY, endX, endY,stroke,color);
        // setTimeout(() => {
            drawFigures();
        // }, 100);
    }
}
function rectangleUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        isDrawing =false;
        agregarDatos(last,startX, startY, endX, endY);
        drawFigures();
    }
}
//---cuadrado bresenham-daniel---//
function squareDown(event){
    last+=1;
    isDrawing =true
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
}
function squareMove(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        const deltax = Math.abs(endX - startX);
        //--linea inicial x--//
        drawLineBresenham(startX, startY, endX, startY,stroke,color);
        //--linea final x--//
        drawLineBresenham(startX, (startY+deltax), endX, (startY+deltax),stroke,color);
        //--linea inicial y--//
        drawLineBresenham(startX, startY, startX, (startY+deltax),stroke,color);
        //--linea final y--//
        drawLineBresenham(endX, startY, endX, (startY+deltax),stroke,color);
        // setTimeout(() => {
            drawFigures();
        // }, 100);
    }
}
function squareUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        isDrawing =false;
        agregarDatos(last,startX, startY, endX, 0);
        drawFigures();
    }
}
//--poligono de n lados de bresenham--//
function poligonoDown(event){
    last+=1;
    isDrawing =true
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
}
function poligonoMove(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        drawpoligono(startX, startY, endX, endY, stroke,color,numSides);
        // setTimeout(() => {
            drawFigures();
        // }, 100);

    }
}
function poligonoUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        isDrawing =false;
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        agregarDatos(last,startX, startY, endX, endY);
        drawFigures();
    }
}
function elipseDown(event){
    last+=1;
    isDrawing =true
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
}
function elipseMove(evente){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        drawEllipse(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY), stroke,color);
        // setTimeout(() => {
            drawFigures();
        // }, 100);
    }
}
function elipseUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        isDrawing =false;
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        agregarDatos(last,startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));
        drawFigures();
    }
}
//---------------------------------------------------figuras de aqui pa abajo----------------------------------------------//
function calculateRadius(endX, startX, endY, startY) {
    const deltax = Math.abs(endX - startX);
    const deltay = Math.abs(endY - startY);
    const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
    return radius;
}
function drawCircle(centerX, centerY, radius,str,col) {
    let x = radius;
    let y = 0;
    let decisionOver2 = 1 - x;   // Inicialización de la decisión del punto (el primer punto siempre está en el octante superior derecho)

    while (y <= x) {
        // Dibuja el pixel en cada octante
        drawPixel(centerX + x, centerY - y, str, col);
        drawPixel(centerX - x, centerY - y, str, col);
        drawPixel(centerX + x, centerY + y, str, col);
        drawPixel(centerX - x, centerY + y, str, col);
        drawPixel(centerX + y, centerY - x, str, col);
        drawPixel(centerX - y, centerY - x, str, col);
        drawPixel(centerX + y, centerY + x, str, col);
        drawPixel(centerX - y, centerY + x, str, col);
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
function drawLineBresenham(x1, y1, x2, y2,str, col) {
    const deltax = Math.abs(x2 - x1);
    const deltay = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = deltax - deltay;
    if(err != 0){
        while (x1 !== x2 || y1 !== y2) {
            drawPixel(x1, y1, str ,col);
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
}
function drawpoligono(x1, y1, x2, y2,str, col, sid){
    radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    initialAngle = Math.atan2(y2 - y1, x2 - x1);
    var angle = (2 * Math.PI) / sid; // Ángulo central de cada vértice
    var lastX, lastY;

    for (var i = 0; i < sid; i++) {
        var x = Math.round(x1 + radius * Math.cos(angle * i + initialAngle));
        var y = Math.round(y1 + radius * Math.sin(angle * i + initialAngle));

        if (i > 0) {
            drawLineBresenham(lastX, lastY, x, y,str,col);
        }

        lastX = x;
        lastY = y;
    }
    // Dibujar la última línea que conecta el último punto con el primero
    drawLineBresenham(lastX, lastY, Math.round(x1 + radius * Math.cos(initialAngle)), Math.round(y1 + radius * Math.sin(initialAngle)),str,col);
}
// Función para dibujar una elipse a partir de su centro y semiejes (a y b)
function drawEllipse(x1, y1, x2, y2,str,col) {
    let x = 0;
    let y = y2;
    let a2 = x2 * x2;
    let b2 = y2 * y2;
    let d = Math.round(b2 - a2 * y2 + 0.25 * a2);
    let dx = 2 * b2 * x;
    let dy = 2 * a2 * y;

    while (dx < dy) {
        drawEllipsePoints(x1, y1, x, y,str,col);

        x++;
        dx += 2 * b2;
        if (d < 0) {
            d += b2 * (2 * x + 3);
        } else {
            y--;
            dy -= 2 * a2;
            d += b2 * (2 * x + 3) + a2 * (-2 * y + 2);
        }
    }

    d = Math.round(b2 * (x + 0.5) * (x + 0.5) + a2 * (y - 1) * (y - 1) - a2 * b2);
    while (y >= 0) {
        drawEllipsePoints(x1, y1, x, y,str,col);

        y--;
        dy -= 2 * a2;
        if (d > 0) {
            d += a2 * (-2 * y + 3);
        } else {
            x++;
            dx += 2 * b2;
            d += b2 * (2 * x + 2) + a2 * (-2 * y + 3);
        }
    }
}
function drawEllipsePoints(xc, yc, x, y,str,col) {
    ctx.fillStyle = col;
    // Dibujar los puntos simétricos en el octante
    ctx.fillRect(xc + x, yc + y, str, str);
    ctx.fillRect(xc - x, yc + y, str, str);
    ctx.fillRect(xc + x, yc - y, str, str);
    ctx.fillRect(xc - x, yc - y, str, str);
}
//--------------------------dibujar en el canva-----------------//
function drawFigures() {
    for (var llave in datos) {
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
                        drawCircle(datos[llave][i].x1,datos[llave][i].y1,calculateRadius(datos[llave][i].x1,datos[llave][i].x2, datos[llave][i].y1,datos[llave][i].y2),datos[llave][i].stroke,datos[llave][i].color);
                        break;
                    case 4:
                            //--linea inicial x--//
                        drawLineBresenham(datos[llave][i].x1, datos[llave][i].y1, datos[llave][i].x2, datos[llave][i].y1,datos[llave][i].stroke,datos[llave][i].color);
                            //--linea final x--//
                        drawLineBresenham(datos[llave][i].x1, datos[llave][i].y2, datos[llave][i].x2, datos[llave][i].y2,datos[llave][i].stroke,datos[llave][i].color);
                            //--linea inicial y--//
                        drawLineBresenham(datos[llave][i].x1, datos[llave][i].y1, datos[llave][i].x1, datos[llave][i].y2,datos[llave][i].stroke,datos[llave][i].color);
                            //--linea final y--//
                        drawLineBresenham(datos[llave][i].x2, datos[llave][i].y1, datos[llave][i].x2, datos[llave][i].y2,datos[llave][i].stroke,datos[llave][i].color);
                        break;
                    case 5:
                        const deltax = Math.abs(datos[llave][i].x2 - datos[llave][i].x1);
                        //--linea inicial x--//
                        drawLineBresenham(datos[llave][i].x1, datos[llave][i].y1, datos[llave][i].x2, datos[llave][i].y1,datos[llave][i].stroke,datos[llave][i].color);
                        //--linea final x--//
                        drawLineBresenham(datos[llave][i].x1, (datos[llave][i].y1+deltax), datos[llave][i].x2, (datos[llave][i].y1+deltax),datos[llave][i].stroke,datos[llave][i].color);
                        //--linea inicial y--//
                        drawLineBresenham(datos[llave][i].x1, datos[llave][i].y1, datos[llave][i].x1, (datos[llave][i].y1+deltax),datos[llave][i].stroke,datos[llave][i].color);
                        //--linea final y--//
                        drawLineBresenham(datos[llave][i].x2, datos[llave][i].y1, datos[llave][i].x2, (datos[llave][i].y1+deltax),datos[llave][i].stroke,datos[llave][i].color);
                        break;
                    case 6:
                        drawpoligono(datos[llave][i].x1,datos[llave][i].y1,datos[llave][i].x2,datos[llave][i].y2,datos[llave][i].stroke,datos[llave][i].color, sides[llave]);
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
function drawPixel(x, y,s,c) {
    ctx.fillRect(x, y, s, s); // Dibuja el píxel
    ctx.fillStyle = c;
}
