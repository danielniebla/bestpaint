// Obtener el lienzo y el contexto
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");

var startX, startY;   
var isDrawing = false;

function linea(){
    canvas.addEventListener("mousedown", function (event) {
        startX = event.clientX - canvas.getBoundingClientRect().left;
        startY = event.clientY - canvas.getBoundingClientRect().top;
    });

    canvas.addEventListener("mouseup", function (event) {

        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;

        drawLineBresenham(startX, startY, endX, endY)
    });
}
function dibujar(){
    canvas.addEventListener("mousedown", function (event) {
        isDrawing =true;
            startX = event.clientX - canvas.getBoundingClientRect().left;
            startY = event.clientY - canvas.getBoundingClientRect().top;
    
    });
    
    // Evento mouseup para trazar la línea hacia el punto final
    canvas.addEventListener("mouseup", function (event) {
        if(isDrawing){
            var endX = event.clientX - canvas.getBoundingClientRect().left;
            var endY = event.clientY - canvas.getBoundingClientRect().top;
    
            drawLineBresenham(startX, startY, endX, endY)
            isDrawing =false;
    
        }
    });
    
    // Evento mousemove para dibujo libre mientras se mantiene presionado el botón
    canvas.addEventListener("mousemove", function (event) {
           if(isDrawing){
            var mouseX = event.clientX - canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
            drawLineBresenham(startX, startY, mouseX, mouseY);
            startX = mouseX;
            startY = mouseY;
        }
    });
}

// Función para dibujar la línea
function drawLineBresenham(x1, y1, x2, y2) {
    const deltax = Math.abs(x2 - x1);
    const deltay = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = deltax - deltay;


    while (x1 !== x2 || y1 !== y2) {
        ctx.fillRect(x1, y1, 1, 1); // Dibuja el píxel
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
