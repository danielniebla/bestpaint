var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");

var isDrawing = false;
var startX, startY;   

canvas.addEventListener("mousedown", squareDown);
canvas.addEventListener("mousemove", squareMove);
canvas.addEventListener("mouseup", squareUp);

function squareDown(event){
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
