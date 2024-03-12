// Obtener el lienzo y el contexto
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");

// Array para almacenar todas las elipses dibujadas
var ellipses = [];

// Función para dibujar los puntos simétricos de la elipse en un octante
function drawEllipsePoints(xc, yc, x, y) {
    // Dibujar los puntos simétricos en el octante
    ctx.fillRect(xc + x, yc + y, 1, 1);
    ctx.fillRect(xc - x, yc + y, 1, 1);
    ctx.fillRect(xc + x, yc - y, 1, 1);
    ctx.fillRect(xc - x, yc - y, 1, 1);
}

// Función para dibujar una elipse a partir de su centro y semiejes (a y b)
function drawEllipse(xc, yc, a, b) {
    let x = 0;
    let y = b;
    let a2 = a * a;
    let b2 = b * b;
    let d = Math.round(b2 - a2 * b + 0.25 * a2);
    let dx = 2 * b2 * x;
    let dy = 2 * a2 * y;

    while (dx < dy) {
        drawEllipsePoints(xc, yc, x, y);

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
        drawEllipsePoints(xc, yc, x, y);

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

var startX, startY;
var isDrawing = false;

// Manejar evento de mousedown
canvas.addEventListener("mousedown", function(event) {
    // Obtener las coordenadas del click
    var rect = canvas.getBoundingClientRect();
    startX = Math.round(event.clientX - rect.left);
    startY = Math.round(event.clientY - rect.top);
    isDrawing = true;
});

// Manejar evento de mousemove
canvas.addEventListener("mousemove", function(event) {
    if (!isDrawing) return; // Salir si no estamos dibujando

    var rect = canvas.getBoundingClientRect();
    var x = Math.round(event.clientX - rect.left);
    var y = Math.round(event.clientY - rect.top);

    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar todas las elipses almacenadas
    ellipses.forEach(function(ellipse) {
        drawEllipse(ellipse.centerX, ellipse.centerY, ellipse.a, ellipse.b);
    });

    // Dibujar la elipse actual mientras se arrastra el mouse
    drawEllipse(startX, startY, Math.abs(x - startX), Math.abs(y - startY));
});

// Manejar evento de mouseup
canvas.addEventListener("mouseup", function(event) {
    if (!isDrawing) return; // Salir si no estamos dibujando

    var rect = canvas.getBoundingClientRect();
    var x = Math.round(event.clientX - rect.left);
    var y = Math.round(event.clientY - rect.top);

    // Calcular los semiejes de la elipse
    var a = Math.abs(x - startX);
    var b = Math.abs(y - startY);

    // Almacenar la elipse dibujada actualmente
    ellipses.push({ centerX: startX, centerY: startY, a: a, b: b });

    // Restablecer la bandera de dibujo
    isDrawing = false;
});