import drawLineBresenham,{selectLine} from "./bresenham.js";
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
function selectSquare(startX,startY,endX,x,y, stroke){
    const deltax = endX - startX;
    if(selectLine(startX, startY, endX, startY,x,y,stroke)||selectLine(startX, (startY+deltax), endX, (startY+deltax),x,y,stroke)||selectLine(startX, startY, startX, (startY+deltax),x,y,stroke)||selectLine(endX, startY, endX, (startY+deltax),x,y,stroke)){
        return true
    }
}
export{
    square as default,
    selectSquare
}