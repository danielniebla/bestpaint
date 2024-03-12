import drawLineBresenham from "./bresenham.js";
function square(startX,startY,endX,stroke,color){
    const deltax = endX - startX;
    //--linea inicial x--//
    drawLineBresenham(startX, startY, endX, startY,stroke,color);
    //--linea final x--//
    drawLineBresenham(startX, (startY+deltax), endX, (startY+deltax),stroke,color);
    //--linea inicial y--//
    drawLineBresenham(startX, startY, startX, (startY+deltax),stroke,color);
    //--linea final y--//
    drawLineBresenham(endX, startY, endX, (startY+deltax),stroke,color);
}
export{
    square as default
}