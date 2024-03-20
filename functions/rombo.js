import drawLineBresenham, { selectLine } from "./bresenham.js";

function drawRombo(centerX, centerY, width, height, angle, str, col) {
    var vertices = calculateRotate(centerX, centerY, width, height, angle);
    drawLineBresenham(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, str, col);
    drawLineBresenham(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y, str, col);
    drawLineBresenham(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y, str, col);
    drawLineBresenham(vertices[3].x, vertices[3].y, vertices[0].x, vertices[0].y, str, col);
}

function calculateRotate(centerX, centerY, width, height, angle) {
    // Calcular vértices del rombo en coordenadas no rotadas
    var vertices = [
        { x: centerX, y: centerY - height },
        { x: centerX + width, y: centerY },
        { x: centerX, y: centerY + height },
        { x: centerX - width, y: centerY }
    ];

    // Rotar los vértices del rombo
    for (var i = 0; i < vertices.length; i++) {
        var x = vertices[i].x;
        var y = vertices[i].y;
        vertices[i].x = Math.round(centerX + (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle));
        vertices[i].y = Math.round(centerY + (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle));
    }
    return vertices;
}

function selectRombo(centerX, centerY, width, height, angle, x, y, str) {
    var vertices = calculateRotate(centerX, centerY, width, height, angle);
    if (
        selectLine(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, x, y, str) ||
        selectLine(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y, x, y, str) ||
        selectLine(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y, x, y, str) ||
        selectLine(vertices[3].x, vertices[3].y, vertices[0].x, vertices[0].y, x, y, str)
    ) {
        return true;
    }
}

export {
    drawRombo as default,
    selectRombo
};