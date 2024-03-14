import drawPixel,{setColor} from "./pixels.js";
function drawLineBresenham(x1, y1, x2, y2,str, col) {
    const deltax = Math.abs(x2 - x1);
    const deltay = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = deltax - deltay;
    setColor(col);
    if(err != 0){
        while (x1 !== x2 || y1 !== y2) {
            drawPixel(x1, y1, str ,col);
            let e2 = 2 * err;
            if (e2 > -deltay) {
                err -= deltay;
                x1 += sx;
            }
            if (e2 < deltax) {
                err += deltax;
                y1 += sy;
            }
        }
    }
}
function selectLine(x1,y1,x2,y2,x,y,s){
    const deltax = Math.abs(x2 - x1);
    const deltay = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = deltax - deltay;
    let rad = Math.round(s / 2);
    if(err != 0){
        while (x1 !== x2 || y1 !== y2) {
            if (x1 >= x - rad && x1 <= x + rad && y1 >= y - rad && y1 <= y + rad) {
                return true;
            }
            let e2 = 2 * err;
            if (e2 > -deltay) {
                err -= deltay;
                x1 += sx;
            }
            if (e2 < deltax) {
                err += deltax;
                y1 += sy;
            }
        }
    }
}
export{
    drawLineBresenham as default,
    selectLine
}