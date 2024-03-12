import drawLineBresenham from "./bresenham.js";
function rectangle(startX,startY,endX,endY,stroke,color){
     //--linea inicial x--//
    drawLineBresenham(startX, startY, endX, startY,stroke,color);
    //--linea final x--//
    drawLineBresenham(startX, endY, endX, endY,stroke,color);
    //--linea inicial y--//
    drawLineBresenham(startX, startY, startX, endY,stroke,color);
    //--linea final y--//
    drawLineBresenham(endX, startY, endX, endY,stroke,color);
}
export{
    rectangle as default
}