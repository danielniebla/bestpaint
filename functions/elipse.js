import drawPixel,{setColor} from "./pixels.js";
function drawEllipse(x1, y1, x2, y2,str,col) {
    let x = 0;
    let y = y2;
    let a2 = x2 * x2;
    let b2 = y2 * y2;
    let d = Math.round(b2 - a2 * y2 + 0.25 * a2);
    let dx = 2 * b2 * x;
    let dy = 2 * a2 * y;
    while (dx < dy) {
        drawEllipsePoints(x1, y1, x, y,str,col);

        x++;
        dx += 2 * b2;
        if (d < 0) {
            d += b2 * (2 * x + 3);
        } else {
            y--;
            dy -= 2 * a2;
            d += b2 * (2 * x + 3) + a2 * (-2 * y + 2);
        }
    }
    d = Math.round(b2 * (x + 0.5) * (x + 0.5) + a2 * (y - 1) * (y - 1) - a2 * b2);
    while (y >= 0) {
        drawEllipsePoints(x1, y1, x, y,str,col);
        y--;
        dy -= 2 * a2;
        if (d > 0) {
            d += a2 * (-2 * y + 3);
        } else {
            x++;
            dx += 2 * b2;
            d += b2 * (2 * x + 2) + a2 * (-2 * y + 3);
        }
    }
}
function drawEllipsePoints(xc, yc, x, y,str,col) {
    setColor(col);
    // Dibujar los puntos simétricos en el octante
    drawPixel(xc + x, yc + y, str);
    drawPixel(xc - x, yc + y, str);
    drawPixel(xc + x, yc - y, str);
    drawPixel(xc - x, yc - y, str);
}
export {
    drawEllipse as default
}