import drawLineBresenham,{selectLine} from "./bresenham.js";
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
function selectRectangle(startX,startY,endX,endY,x,y, stroke){
    if(selectLine(startX, startY, endX, startY,x,y,stroke)||selectLine(startX, endY, endX, endY,x,y,stroke)||selectLine(startX, startY, startX, endY,x,y,stroke)||selectLine(endX, startY, endX, endY,x,y,stroke)){
        return true
    }
}
export{
    rectangle as default,
    selectRectangle 
}