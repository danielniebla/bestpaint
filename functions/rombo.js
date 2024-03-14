import drawLineBresenham,{selectLine} from "./bresenham.js";
function drawRombo(centerX, centerY, width, height, str, col) {
    // Draw top line
    drawLineBresenham(centerX - width, centerY, centerX, centerY - height, str, col);
    // Draw right line
    drawLineBresenham(centerX, centerY - height, centerX + width, centerY, str, col);
    // Draw bottom line
    drawLineBresenham(centerX + width, centerY, centerX, centerY + height, str, col);
    // Draw left line
    drawLineBresenham(centerX, centerY + height, centerX - width, centerY, str, col);
}
function selectRombo(centerX, centerY, width, height, x,y,str) {
    if(selectLine(centerX - width, centerY, centerX, centerY - height,x,y, str)||selectLine(centerX, centerY - height, centerX + width, centerY,x,y,str)||selectLine(centerX + width, centerY, centerX, centerY + height,x,y,str)||selectLine(centerX, centerY + height, centerX - width, centerY,x,y,str)){
        return true
    }
}

export {
    drawRombo as default,
    selectRombo
};