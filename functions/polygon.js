import drawLineBresenham from "./bresenham.js";
function drawpolygon(x1, y1, x2, y2,str, col, sid){
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const initialAngle = Math.atan2(y2 - y1, x2 - x1);
    const angle = (2 * Math.PI) / sid; // Ángulo central de cada vértice
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
export{
    drawpolygon as default
}