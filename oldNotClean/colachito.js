//-----------------------declaraciones y estructuras---------------------------------------//
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
var datos = {}; // Objeto para almacenar las matrices
var propiedades = {};
var color = colorPicker.value ;
var stroke =3;
var isDrawing = false;
var depth = 1;
var last = 0;
var isAdraw =false;
var numSides = 5;
var startX, startY;   

function updateHexColor() {
    // Obtener el valor hexadecimal del input de color
    var colorPicker = document.getElementById("colorPicker");
    // Convertir el valor a hexadecimal
    color = colorPicker.value;
}
function updateStroke(strokeValue) {
    stroke = strokeValue;
}
function updateside(sidevalue){
    numSides = sidevalue;
}
function agregarDatos(llave, x, y, stroke, depth,color) {
    if (!datos[llave]) {
        datos[llave] = []; // Si no existe, inicializar una matriz para esa llave
        propiedades[llave] = []
        propiedades[llave].push({
            stroke:stroke,
            depth:depth,
            color:color
        })
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
    canvas.removeEventListener("mousedown", rectangleDown);
    canvas.removeEventListener("mousemove", rectangleMove);
    canvas.removeEventListener("mouseup", rectangleUp);
    canvas.removeEventListener("mousedown", squareDown);
    canvas.removeEventListener("mousemove", squareMove);
    canvas.removeEventListener("mouseup", squareUp);
    canvas.removeEventListener("mousedown", poligonoDown);
    canvas.removeEventListener("mousemove", poligonoMove);
    canvas.removeEventListener("mouseup", poligonoUp);

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
    removeAllEventListeners();
    switch (option) {
        case 1:
            canvas.addEventListener("mousedown", drawDown);
            canvas.addEventListener("mousemove", drawMove);
            canvas.addEventListener("mouseup", drawUp);

            // canvas.addEventListener("touchstart", drawDown);
            // canvas.addEventListener("touchmove", drawMove);
            // canvas.addEventListener("touchend", drawUp);

            
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
        drawLineBresenham(startX, startY, endX, endY);
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
        drawLineBresenham(startX, startY, endX, endY);
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
        drawCircle(startX, startY, radius);
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
        drawCircle(startX, startY, radius);
    
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
        drawLineBresenham(startX, startY, endX, startY);
        //--linea final x--//
        drawLineBresenham(startX, endY, endX, endY);
        //--linea inicial y--//
        drawLineBresenham(startX, startY, startX, endY);
        //--linea final y--//
        drawLineBresenham(endX, startY, endX, endY);

        setTimeout(() => {
            drawFigures();
        }, 100);
    }
}
function rectangleUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        isDrawing =false;
        //--linea inicial x--//
        drawLineBresenham(startX, startY, endX, startY);
        //--linea final x--//
        drawLineBresenham(startX, endY, endX, endY);
        //--linea inicial y--//
        drawLineBresenham(startX, startY, startX, endY);
        //--linea final y--//
        drawLineBresenham(endX, startY, endX, endY);
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
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        const deltax = Math.abs(endX - startX);
        //--linea inicial x--//
        drawLineBresenham(startX, startY, endX, startY);
        //--linea final x--//
        drawLineBresenham(startX, (startY+deltax), endX, (startY+deltax));
        //--linea inicial y--//
        drawLineBresenham(startX, startY, startX, (startY+deltax));
        //--linea final y--//
        drawLineBresenham(endX, startY, endX, (startY+deltax));

        setTimeout(() => {
            drawFigures();
        }, 100);
    }
}
function squareUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        isDrawing =false;
        const deltax = Math.abs(endX - startX);
        //--linea inicial x--//
        drawLineBresenham(startX, startY, endX, startY);
        //--linea final x--//
        drawLineBresenham(startX, (startY+deltax), endX, (startY+deltax));
        //--linea inicial y--//
        drawLineBresenham(startX, startY, startX, (startY+deltax));
        //--linea final y--//
        drawLineBresenham(endX, startY, endX, (startY+deltax));
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
        const deltax = Math.abs(endX - startX);
        const deltay = Math.abs(endY - startY);
        const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
        var x = endX;
        var y = endY;    
        for (let i = 0; i < numSides+1; i++) {
            if(i < numSides){
                var theta = (2 * Math.PI * i) / numSides;
                var x1 = x + radius * Math.cos(theta);
                var y1 = y + radius * Math.sin(theta);   
                drawLineBresenham(Math.round(x), Math.round(y), Math.round(x1), Math.round(y1));
                x=x1;
                y=y1;
            }else if(i === numSides ){
                drawLineBresenham(Math.round(x), Math.round(y), Math.round(endX), Math.round(endY));
            }
        }
        setTimeout(() => {
            drawFigures();
        }, 100);

    }
}
function poligonoUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        isDrawing =false;
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        const deltax = Math.abs(endX - startX);
        const deltay = Math.abs(endY - startY);
        const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
        var x = endX;
        var y = endY;    
        for (let i = 0; i < numSides+1; i++) {
            if( i < numSides){
                var theta = (2 * Math.PI * i) / numSides;
                var x1 = x + radius * Math.cos(theta);
                var y1 = y + radius * Math.sin(theta);   
                drawLineBresenham(Math.round(x), Math.round(y), Math.round(x1), Math.round(y1));
                x=x1;
                y=y1;
            }else if(i === numSides ){
                drawLineBresenham(Math.round(x), Math.round(y), Math.round(endX), Math.round(endY));
            }
        }

        drawFigures();
    }
}
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
            agregarDatos(last, Math.round(centerX + x), Math.round(centerY - y), stroke , depth, color);
            agregarDatos(last, Math.round(centerX - x), Math.round(centerY - y), stroke , depth, color);
            agregarDatos(last, Math.round(centerX + x), Math.round(centerY + y), stroke , depth, color);
            agregarDatos(last, Math.round(centerX - x), Math.round(centerY + y), stroke , depth, color);
            agregarDatos(last, Math.round(centerX + y), Math.round(centerY - x), stroke , depth, color);
            agregarDatos(last, Math.round(centerX - y), Math.round(centerY - x), stroke , depth, color);
            agregarDatos(last, Math.round(centerX + y), Math.round(centerY + x), stroke , depth, color);
            agregarDatos(last, Math.round(centerX - y), Math.round(centerY + x), stroke , depth, color);    
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


    if(err != 0){
        while (x1 !== x2 || y1 !== y2) {
            drawPixel(x1, y1, stroke ,color);
            if(!isDrawing || isAdraw){agregarDatos(last,Math.round(x1), Math.round(y1), stroke , depth, color);}
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
//--------------------------dibujar en el canva-----------------//
function drawFigures() {
    for (var llave in datos) {
        if (datos[llave].length > 0) {
            ctx.fillStyle = propiedades[llave][0].color; // Configurar el color antes de dibujar
            for (let i = 0; i < datos[llave].length; i++) {
                ctx.fillRect(datos[llave][i].x, datos[llave][i].y, propiedades[llave][0].stroke, propiedades[llave][0].stroke); // Dibuja el píxel
            }
        }
    }
}
function drawPixel(x, y,s,c) {
    ctx.fillRect(x, y, s, s); // Dibuja el píxel
    ctx.fillStyle = c;
}
