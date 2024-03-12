// Función para trazar una línea utilizando la fórmula y = mx + b
const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');
class LineDrawerPendiente {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    drawLine(x1, y1, x2, y2) {
        var m = (y2 - y1) / (x2 - x1);
        var b = y1 - m * x1;

        var startX = Math.min(x1, x2);
        var endX = Math.max(x1, x2);

        var data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

        var startY = Math.min(y1, y2);
        var endY = Math.max(y1, y2);
        // console.log("delta x", (endX - startX), " delta y", (endY - startY));
        if (((endX - startX) < (endY - startY) && (endX - startX) != 0) || ((endX - startX) == 0 && (endY - startY) > 1)) {
            for (var y = startY; y <= endY; y++) {
                var x = (y - b) / m;
                var index = (Math.round(y) * this.canvas.width + Math.round(x)) * 4;

                data[index] = 255;     // Valor de rojo
                data[index + 1] = 0;   // Valor de verde
                data[index + 2] = 0;   // Valor de azul
                data[index + 3] = 255; // Valor de opacidad
            }
        } else if (((endX - startX) < 2 && (endY - startY) < 2)) {
            var index = (Math.round(endY) * this.canvas.width + Math.round(endX)) * 4;

            data[index] = 0;     // Valor de rojo
            data[index + 1] = 200;   // Valor de verde
            data[index + 2] = 200;   // Valor de azul
            data[index + 3] = 255; // Valor de opacidad

        } else {
            for (var x = startX; x <= endX; x++) {
                var y = m * x + b;
                var index = (Math.round(y) * this.canvas.width + Math.round(x)) * 4;

                data[index] = 0;     // Valor de rojo
                data[index + 1] = 0;   // Valor de verde
                data[index + 2] = 0;   // Valor de azul
                data[index + 3] = 255; // Valor de opacidad
            }
        }

        this.ctx.putImageData(new ImageData(new Uint8ClampedArray(data), this.canvas.width, this.canvas.height), 0, 0);
    }
}


const lineDrawer = new LineDrawerPendiente(ctx, canvas);
var isDrawing = false;


ctx.willReadFrequently = true; 
// Establece el atributo para mejorar el rendimiento
//             miCanvas.addEventListener('mousedown', empezarDibujo, false);
//             miCanvas.addEventListener('mousemove', dibujarLinea, false);
//             miCanvas.addEventListener('mouseup', pararDibujar, false);

//             miCanvas.addEventListener('touchstart', empezarDibujo, false);
//             miCanvas.addEventListener('touchmove', dibujarLinea, false);
// Evento mousedown para capturar el punto de inicio
var startX, startY;   
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
            
                    lineDrawer.drawLine(startX, startY, endX, endY);
                    isDrawing =false;
            
                }
            });
            
            // Evento mousemove para dibujo libre mientras se mantiene presionado el botón
            canvas.addEventListener("mousemove", function (event) {
                   if(isDrawing){
                     var mouseX = event.clientX - canvas.getBoundingClientRect().left;
                    var mouseY = event.clientY - canvas.getBoundingClientRect().top;
            
                    lineDrawer.drawLine(startX, startY, mouseX, mouseY);
                    startX = mouseX;
                    startY = mouseY;
                }
            });
}
function linea(){
    canvas.addEventListener("mousedown", function (event) {
        startX = event.clientX - canvas.getBoundingClientRect().left;
        startY = event.clientY - canvas.getBoundingClientRect().top;
    });

    canvas.addEventListener("mouseup", function (event) {

            var endX = event.clientX - canvas.getBoundingClientRect().left;
            var endY = event.clientY - canvas.getBoundingClientRect().top;

            lineDrawer.drawLine(startX, startY, endX, endY);
    });

}
