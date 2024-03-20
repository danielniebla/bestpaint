import drawLineBresenham,{selectLine} from "./bresenham.js";
function square(startX, startY, endX,endY, stroke, color, angle) {
    var size = Math.max(Math.abs(endX - startX), Math.abs(endY - startY));
    var vertices = calculateRotate(startX, startY, size, angle);

    // Dibujar el cuadrado con las coordenadas rotadas
    drawLineBresenham(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, stroke, color);
    drawLineBresenham(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y, stroke, color);
    drawLineBresenham(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y, stroke, color);
    drawLineBresenham(vertices[3].x, vertices[3].y, vertices[0].x, vertices[0].y, stroke, color);
}

function calculateRotate(startX, startY, size, angle) {
    // Calcular centro del cuadrado
    var centerX = startX + size / 2;
    var centerY = startY + size / 2;
    
    // Calcular los vértices del cuadrado en coordenadas no rotadas
    var halfSize = size / 2;
    var vertices = [
        { x: centerX - halfSize, y: centerY - halfSize },
        { x: centerX + halfSize, y: centerY - halfSize },
        { x: centerX + halfSize, y: centerY + halfSize },
        { x: centerX - halfSize, y: centerY + halfSize }
    ];

    // Rotar los vértices del cuadrado
    for (var i = 0; i < vertices.length; i++) {
        var x = vertices[i].x;
        var y = vertices[i].y;
        vertices[i].x = Math.round(centerX + (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle));
        vertices[i].y = Math.round(centerY + (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle));
    }
    
    return vertices;
}

function selectSquare(startX,startY,endX,endY,x,y, stroke,angle){
    var size = Math.max(Math.abs(endX - startX), Math.abs(endY - startY));
    var vertices = calculateRotate(startX, startY, size, angle);
    if(selectLine(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y,x,y,stroke)||selectLine(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y,x,y,stroke)||selectLine(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y,x,y,stroke)||selectLine(vertices[3].x, vertices[3].y, vertices[0].x, vertices[0].y,x,y,stroke)){
        return true
    }
}
export{
    square as default,
    selectSquare
}