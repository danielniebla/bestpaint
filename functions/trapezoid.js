import drawLineBresenham,{selectLine} from "./bresenham.js";



function drawTrapezoid(startX, startY, x, y, angle, str, col) {
    var vertices = calculateTrapezoidVertices(startX, startY, x, y, angle);

    // Dibujar el trapecio rotado
    for (var i = 0; i < vertices.length; i++) {
        var nextIndex = (i + 1) % vertices.length;
        drawLineBresenham(Math.round(vertices[i].x), Math.round(vertices[i].y), Math.round(vertices[nextIndex].x), Math.round(vertices[nextIndex].y), str, col);
    }
}

function selectTrapezoid(startX, startY, x, y, angle, px, py, str) {
    var vertices = calculateTrapezoidVertices(startX, startY, x, y, angle);

    // Seleccionar el trapecio rotado
    for (var i = 0; i < vertices.length; i++) {
        var nextIndex = (i + 1) % vertices.length;
        if (selectLine(Math.round(vertices[i].x), Math.round(vertices[i].y), Math.round(vertices[nextIndex].x), Math.round(vertices[nextIndex].y), px, py, str)) {
            return true;
        }
    }
    return false;
}

function rotatePoint(x, y, centerX, centerY, angle) {
    var newX = centerX + (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle);
    var newY = centerY + (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle);
    return { x: newX, y: newY };
}

function calculateTrapezoidVertices(startX, startY, x, y, angle) {
    var width = Math.abs(x - startX);
    var height = Math.abs(y - startY);

    // Calcular los vértices del trapecio en las coordenadas originales
    var vertices = [
        { x: startX, y: startY },
        { x: x, y: startY },
        { x: x + width / 2, y: y },
        { x: startX - width / 2, y: y }
    ];

    // Calcular el centro del trapecio
    var centerX = 0;
    var centerY = 0;
    for (var i = 0; i < vertices.length; i++) {
        centerX += vertices[i].x;
        centerY += vertices[i].y;
    }
    centerX /= vertices.length;
    centerY /= vertices.length;

    // Rotar los vértices del trapecio
    var rotatedVertices = [];
    for (var i = 0; i < vertices.length; i++) {
        rotatedVertices.push(rotatePoint(vertices[i].x, vertices[i].y, centerX, centerY, angle));
    }

    return rotatedVertices;
}
export {
    drawTrapezoid as default,
    selectTrapezoid
};