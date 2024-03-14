import drawLineBresenham,{selectLine} from "./bresenham.js";

function drawTrapezoid(x1, y1, topWidth, bottomWidth, str, col) {
    const height= topWidth;

    // Draw top line
    drawLineBresenham(x1 - topWidth, y1, x1 + topWidth, y1, str, col);
    // Draw right slant line
    drawLineBresenham(x1 + topWidth, y1, x1 + bottomWidth, y1 + height, str, col);
    // Draw bottom line
    drawLineBresenham(x1 + bottomWidth, y1 + height, x1 - bottomWidth, y1 + height, str, col);
    // Draw left slant line
    drawLineBresenham(x1 - bottomWidth, y1 + height, x1 - topWidth, y1, str, col);
}
function selectTrapezoid(x1, y1, topWidth, bottomWidth, x,y,str) {
    const height= topWidth;

    if(selectLine(x1 - topWidth, y1, x1 + topWidth, y1,x,y, str)||selectLine(x1 + topWidth, y1, x1 + bottomWidth, y1 + height,x,y,str)||selectLine(x1 + bottomWidth, y1 + height, x1 - bottomWidth, y1 + height,x,y,str)||selectLine(x1 - bottomWidth, y1 + height, x1 - topWidth, y1,x,y,str)){
        return true
    }
}
export {
    drawTrapezoid as default,
    selectTrapezoid
};