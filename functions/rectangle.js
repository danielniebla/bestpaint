import drawLineBresenham,{selectLine} from "./bresenham.js";
function rectangle(startX, startY, endX, endY,angle, stroke, color) {
   
    var vertices = calculateRotate(startX, startY, endX, endY,angle);
    // Dibujar el rectángulo con las coordenadas rotadas
    drawLineBresenham(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, stroke, color);
    drawLineBresenham(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y, stroke, color);
    drawLineBresenham(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y, stroke, color);
    drawLineBresenham(vertices[3].x, vertices[3].y, vertices[0].x, vertices[0].y, stroke, color);
}
function calculateRotate(startX, startY, endX, endY,angle){
    // Calcular centro del rectángulo
    var centerX = (startX + endX) / 2;
    var centerY = (startY + endY) / 2;

    // Calcular la mitad de la longitud y altura del rectángulo
    var halfWidth = Math.abs(endX - startX) / 2;
    var halfHeight = Math.abs(endY - startY) / 2;

    // Calcular los vértices del rectángulo en coordenadas no rotadas
    var vertices = [
        { x: centerX - halfWidth, y: centerY - halfHeight },
        { x: centerX + halfWidth, y: centerY - halfHeight },
        { x: centerX + halfWidth, y: centerY + halfHeight },
        { x: centerX - halfWidth, y: centerY + halfHeight }
    ];

    // Rotar los vértices del rectángulo
    for (var i = 0; i < vertices.length; i++) {
        var x = vertices[i].x;
        var y = vertices[i].y;
        vertices[i].x = Math.round(centerX + (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle));
        vertices[i].y = Math.round(centerY + (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle));
    }
    return vertices;
}
function selectRectangle(startX,startY,endX,endY,x,y, stroke,angle){
    var vertices = calculateRotate(startX, startY, endX, endY,angle);
    if(selectLine(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y,x,y,stroke)||selectLine(vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y,x,y,stroke)||selectLine(vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y,x,y,stroke)||selectLine(vertices[3].x, vertices[3].y, vertices[4].x, vertices[4].y,x,y,stroke)){
        return true
    }
}
export{
    rectangle as default,
    selectRectangle 
}