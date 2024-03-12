var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");

var isDrawing = false;
var startX, startY;   

canvas.addEventListener("mousedown", rectangleDown);
canvas.addEventListener("mousemove", rectangleMove);
canvas.addEventListener("mouseup", rectangleUp);

function rectangleDown(event){
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
            drawPixel(x1, y1);
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
function drawPixel(x, y) {
    ctx.fillRect(x, y, 2, 2); // Dibuja el píxel
}
