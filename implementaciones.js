var datos = {}; // Objeto para almacenar las matrices
var last = 0;
var isDrawing = false;
var depth = 1;
var stroke =3;
var color = '#000000' ;
function agregarDatos(llave, x, y, stroke, depth) {
    // Verificar si la llave ya existe en el objeto
    if (!datos[llave]) {
        datos[llave] = []; // Si no existe, inicializar una matriz para esa llave
    }
    // Agregar datos a la matriz asociada a la llave
    datos[llave].push({
        x: x,
        y: y,
        stroke: stroke,
        depth: depth,
    });
}

function eliminarDatos(llave) {
    // Verificar si la llave existe en el objeto
    
    if (datos[llave] && datos[llave].length > 0) {
        while(datos[llave].length != 0){
            datos[llave].pop();
        }
    }
}
function recorrerDatos(llave) {
    // Verificar si la llave existe en el objeto
    if (datos[llave]) {
        // Recorrer todos los conjuntos de datos asociados a la llave
        for (let i = 0; i < datos[llave].length; i++) {
            const conjuntoDatos = datos[llave][i];
            console.log(`Datos para la llave ${llave}, índice ${i}:`, conjuntoDatos);
        }
    } else {
        console.log(`No hay datos para la llave ${llave}`);
    }
}

// Ejemplo de uso


for (var llave in datos) {
    if (this.datos[llave].length > 0) {
        console.log(`Llave: ${llave}, Datos: ${JSON.stringify(this.datos[llave])}`);
    }
}
console.log(datos); // Mostrar el objeto de matrices
//---///-------------///////////////////-------------////////////////////
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");
function drawCircle(centerX, centerY, radius) {
    let x = radius;
    let y = 0;
    let decisionOver2 = 1 - x;   // Inicialización de la decisión del punto (el primer punto siempre está en el octante superior derecho)

    while (y <= x) {
        // Dibuja el pixel en cada octeto
        drawPixel(centerX + x, centerY - y, stroke, color);
        drawPixel(centerX - x, centerY - y, stroke, color);
        drawPixel(centerX + x, centerY + y, stroke, color);
        drawPixel(centerX - x, centerY + y, stroke, color);
        drawPixel(centerX + y, centerY - x, stroke, color);
        drawPixel(centerX - y, centerY - x, stroke, color);
        drawPixel(centerX + y, centerY + x, stroke, color);
        drawPixel(centerX - y, centerY + x, stroke, color);

        if(!isDrawing){
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

function drawPixel(x, y,s,c) {
    ctx.fillRect(x, y, s, s); // Dibuja el píxel
    ctx.fillStyle = c;
}
function drawFigures() {
    for (var llave in datos) {
        if (datos[llave].length > 0) {
            for (let i = 0; i < datos[llave].length; i++) {
                ctx.fillStyle = color; // Configurar el color antes de dibujar
                ctx.fillRect(datos[llave][i].x, datos[llave][i].y, datos[llave][i].stroke, datos[llave][i].stroke); // Dibuja el píxel
                console.log(datos[llave][i].x, datos[llave][i].y, datos[llave][i].stroke, datos[llave][i].stroke);
            }
        }
    }
}


/*
canvas.addEventListener("mousedown", function (event) {
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener("mouseup", function (event) {

    var endX = event.clientX - canvas.getBoundingClientRect().left;
    var endY = event.clientY - canvas.getBoundingClientRect().top;
    const deltax = Math.abs(endX - startX);
    const deltay = Math.abs(endY - startY);
    const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
    drawCircle(startX, startY, radius)
});

*/
canvas.addEventListener("mousedown", function (event) {
    last +=1;
    isDrawing = true;
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener("mousemove", function (event) {
    if (!isDrawing) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
    var endX = event.clientX - canvas.getBoundingClientRect().left;
    var endY = event.clientY - canvas.getBoundingClientRect().top;
    const deltax = Math.abs(endX - startX);
    const deltay = Math.abs(endY - startY);
    const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
    drawCircle(startX, startY, radius)
});

canvas.addEventListener("mouseup", function () {
    isDrawing = false;
    var endX = event.clientX - canvas.getBoundingClientRect().left;
    var endY = event.clientY - canvas.getBoundingClientRect().top;
    const deltax = Math.abs(endX - startX);
    const deltay = Math.abs(endY - startY);
    const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
    drawCircle(startX, startY, radius)
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
    drawFigures();
});