// function draw() {
//     const canvas = document.getElementById("canvas");
//     if (canvas.getContext) {
//       const ctx = canvas.getContext("2d");
  
//       ctx.fillRect(25, 25, 100, 100);
//       ctx.clearRect(45, 45, 60, 60);
//       ctx.strokeRect(50, 50, 50, 50);
//     }
//   }
//////////////////////////////////////////////////
// let miCanvas;
//         let lineas = [];
//         let correccionX = 0;
//         let correccionY = 0;
//         let pintarLinea = false;
//         let nuevaPosicionX = 0;
//         let nuevaPosicionY = 0;
//         let grosorLinea = 5;

//         function stroke() {
//             return grosorLinea;
//         }

//         function cambiarGrosor() {
//             let ctx = miCanvas.getContext('2d');
//             grosorLinea = (grosorLinea % 10) + 1;
//             ctx.lineWidth = grosorLinea;
//         }

//         function cambiarTamañoLapiz() {
//             let lapiz = document.querySelector('.lapiz');
//             lapiz.style.width = grosorLinea * 10 + 'px';
//             lapiz.style.height = grosorLinea * 10 + 'px';
//         }

//         function empezarDibujo() {
//             pintarLinea = true;
//             lineas.push([]);
//         }

//         function guardarLinea() {
//             lineas[lineas.length - 1].push({
//                 x: nuevaPosicionX,
//                 y: nuevaPosicionY,
//                 grosor: grosorLinea,
//             });
//         }

//         function dibujarLinea(event) {
//             event.preventDefault();
//             if (pintarLinea) {
//                 let ctx = miCanvas.getContext('2d');
//                 ctx.lineJoin = ctx.lineCap = 'round';
        
//                 // Marca el nuevo punto
//                 if (event.changedTouches == undefined) {
//                     // Versión ratón
//                     nuevaPosicionX = event.layerX;
//                     nuevaPosicionY = event.layerY;
//                 } else {
//                     // Versión touch, pantalla táctil
//                     nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
//                     nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
//                 }
        
//                 // Guarda la línea
//                 guardarLinea();
        
//                 // Redibuja todas las líneas guardadas sin limpiar el canvas
//                 ctx.save();
//                 lineas.forEach(function (segmento) {
//                     segmento.forEach(function (punto, index) {
//                         if (index === 0) {
//                             ctx.beginPath();
//                             ctx.moveTo(punto.x, punto.y);
//                         } else {
//                             ctx.lineWidth = punto.grosor;
//                             ctx.lineTo(punto.x, punto.y);
//                             ctx.stroke();
//                         }
//                     });
//                 });
//                 ctx.restore();  // Restaura el estado del contexto
//             }
//         }
        

//         function pararDibujar() {
//             pintarLinea = false;
//             guardarLinea();
//         }

//         function dibujarLineaEntreDosPuntos(ctx, punto1, punto2) {
//             ctx.beginPath();
//             ctx.moveTo(punto1.x, punto1.y);
//             ctx.lineTo(punto2.x, punto2.y);
//             ctx.stroke();
//         }

//         let puntoInicial = null;
//         let puntoFinal = null;

//         function iniciarDibujo() {
//             puntoInicial = null;
//             puntoFinal = null;

//             // Agrega un nuevo evento de clic para dibujar una línea entre dos clics
//             miCanvas.removeEventListener('click', dibujarLineaEntreClicks);
//             miCanvas.addEventListener('click', dibujarLineaEntreClicks);
//         }

//         function dibujarLineaEntreClicks(event) {
//             event.preventDefault();
//             if (puntoInicial === null) {
//                 // Establece el punto inicial en el primer clic
//                 puntoInicial = {
//                     x: event.clientX - correccionX,
//                     y: event.clientY - correccionY
//                 };
//             } else {
//                 // Establece el punto final en el segundo clic
//                 puntoFinal = {
//                     x: event.clientX - correccionX,
//                     y: event.clientY - correccionY
//                 };

//                 // Dibuja la línea entre los dos puntos
//                 dibujarLineaEntreDosPuntos(miCanvas.getContext('2d'), puntoInicial, puntoFinal);

//                 // Reinicia los puntos
//                 puntoInicial = null;
//                 puntoFinal = null;

//                 // Remueve el evento de clic después de dibujar la línea
//                 miCanvas.removeEventListener('click', dibujarLineaEntreClicks);
//             }
//         }
//         function modal(){
//             var miElemento = document.getElementById('miElemento');
//             miElemento.classList.remove('invisible');
//             miElemento.classList.add('modal');
//         }
//         function pizarra() {
//             miCanvas = document.querySelector('#pizarra');
//             miCanvas.width = 1400;
//             miCanvas.height = 800;
//             let posicion = miCanvas.getBoundingClientRect();
//             correccionX = posicion.x;
//             correccionY = posicion.y;

//             miCanvas.addEventListener('mousedown', empezarDibujo, false);
//             miCanvas.addEventListener('mousemove', dibujarLinea, false);
//             miCanvas.addEventListener('mouseup', pararDibujar, false);

//             miCanvas.addEventListener('touchstart', empezarDibujo, false);
//             miCanvas.addEventListener('touchmove', dibujarLinea, false);

//             document.querySelector('.lapiz').addEventListener('click', function () {
//                 cambiarGrosor();
//                 cambiarTamañoLapiz();
//             });

//             document.querySelector('.linea').addEventListener('click', function () {
//                 iniciarDibujo();
//             });
//         }
//////////////////////////////////////////
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");

var startX, startY; // Coordenadas del punto de inicio

// Función para trazar una línea utilizando la fórmula y = mx + b
function drawLine(x1, y1, x2, y2) {
    var m = (y2 - y1) / (x2 - x1);
    var b = y1 - m * x1;

    var startX = Math.min(x1, x2);
    var endX = Math.max(x1, x2);

    var imageData = ctx.createImageData(canvas.width, canvas.height);
    var data = imageData.data;

    for (var x = startX; x <= endX; x++) {
        var y = m * x + b;
        var index = (Math.round(y) * canvas.width + Math.round(x)) * 4;

        data[index] = 255;     // Valor de rojo
        data[index + 1] = 0;   // Valor de verde
        data[index + 2] = 0;   // Valor de azul
        data[index + 3] = 255; // Valor de opacidad
    }

    ctx.putImageData(imageData, 0, 0);
}

// Evento mousedown para capturar el punto de inicio
canvas.addEventListener("mousedown", function (event) {
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
});

// Evento mouseup para trazar la línea hacia el punto final
canvas.addEventListener("mouseup", function (event) {
    var endX = event.clientX - canvas.getBoundingClientRect().left;
    var endY = event.clientY - canvas.getBoundingClientRect().top;

    drawLine(startX, startY, endX, endY);
});
