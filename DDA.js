
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

        drawLineDDA(startX, startY, endX, endY)
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
    
            drawLineDDA(startX, startY, endX, endY)
            isDrawing =false;
    
        }
    });
    
    // Evento mousemove para dibujo libre mientras se mantiene presionado el botón
    canvas.addEventListener("mousemove", function (event) {
           if(isDrawing){
            var mouseX = event.clientX - canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
            drawLineDDA(startX, startY, mouseX, mouseY);
            startX = mouseX;
            startY = mouseY;
        }
    });
}

// Función para dibujar la línea
function drawLineDDA(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));

    const xIncrement = dx / steps;
    const yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        drawPixel(Math.round(x), Math.round(y));
        x += xIncrement;
        y += yIncrement;
    }
}
function drawPixel(x, y) {
    ctx.fillRect(x, y, 2, 2); // Dibuja el píxel
}
