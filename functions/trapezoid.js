import drawLineBresenham,{selectLine} from "./bresenham.js";

function drawTrapezoid(startX, startY, x, y, str,col) {
    var topLeftX = startX;
    var topLeftY = startY;
    var topRightX = x;
    var bottomRightX = x + (x - startX) / 2;
    var bottomRightY = y;
    var bottomLeftX = startX - (x - startX) / 2;

    // Dibujar el trapecio utilizando la función de línea de Bresenham
    drawLineBresenham(Math.round(topLeftX), Math.round(topLeftY), Math.round(topRightX), Math.round(topLeftY),str,col); // Borde superior
    drawLineBresenham(Math.round(topRightX), Math.round(topLeftY), Math.round(bottomRightX), Math.round(bottomRightY),str,col); // Borde derecho
    drawLineBresenham(Math.round(bottomRightX), Math.round(bottomRightY), Math.round(bottomLeftX), Math.round(bottomRightY),str,col); // Borde inferior
    drawLineBresenham(Math.round(bottomLeftX), Math.round(bottomRightY), Math.round(topLeftX), Math.round(topLeftY),str,col); // Borde izquierdo
}
function selectTrapezoid(startX, startY, x, y, str,) {
    var topLeftX = startX;
    var topLeftY = startY;
    var topRightX = x;
    var bottomRightX = x + (x - startX) / 2;
    var bottomRightY = y;
    var bottomLeftX = startX - (x - startX) / 2;

    // Dibujar el trapecio utilizando la función de línea de Bresenham
    if(selectLine(Math.round(topLeftX), Math.round(topLeftY), Math.round(topRightX), Math.round(topLeftY),x,y, str)||selectLine(Math.round(topRightX), Math.round(topLeftY), Math.round(bottomRightX), Math.round(bottomRightY),x,y,str)||selectLine(Math.round(bottomRightX), Math.round(bottomRightY), Math.round(bottomLeftX), Math.round(bottomRightY),x,y,str)||selectLine(Math.round(bottomLeftX), Math.round(bottomRightY), Math.round(topLeftX), Math.round(topLeftY),x,y,str)){
        return true
    }
}
export {
    drawTrapezoid as default,
    selectTrapezoid
};