import drawPixel,{setColor} from "./pixels.js";
function drawCircle(centerX, centerY, endX,endY,str,col) {
    let x = calculateRadius(endX,centerX,endY,centerY);
    let y = 0;
    let decisionOver2 = 1 - x;   // Inicialización de la decisión del punto (el primer punto siempre está en el octante superior derecho)
    setColor(col);
    while (y <= x) {
        // Dibuja el pixel en cada octante     
        drawPixel(centerX + x, centerY - y, str);
        drawPixel(centerX - x, centerY - y, str);
        drawPixel(centerX + x, centerY + y, str);
        drawPixel(centerX - x, centerY + y, str);
        drawPixel(centerX + y, centerY - x, str);
        drawPixel(centerX - y, centerY - x, str);
        drawPixel(centerX + y, centerY + x, str);
        drawPixel(centerX - y, centerY + x, str);
        y++;
        // Actualiza la decisión según el algoritmo del punto medio
        if (decisionOver2 <= 0) {
            decisionOver2 += 2 * y + 1;
        } else {
            x--;
            decisionOver2 += 2 * (y - x) + 1;
        }
    }
}
function calculateRadius(endX, startX, endY, startY) {
    const deltax = Math.abs(endX - startX);
    const deltay = Math.abs(endY - startY);
    const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
    return radius;
}
function selectCircle(centerX, centerY, endX,endY,x3,y3,str) {
    let x = calculateRadius(endX,centerX,endY,centerY);
    let y = 0;
    let decisionOver2 = 1 - x;   // Inicialización de la decisión del punto (el primer punto siempre está en el octante superior derecho)
    while (y <= x) {
        // Dibuja el pixel en cada octante    
        if ((centerX + x) >= x3 - str && (centerX + x) <= x3 + str && (centerY - y) >= y3 - str && (centerY - y) <= y3 + str) {return true;}
        if ((centerX - x) >= x3 - str && (centerX - x) <= x3 + str && (centerY - y) >= y3 - str && (centerY - y) <= y3 + str) {return true;}
        if ((centerX + x) >= x3 - str && (centerX + x) <= x3 + str && (centerY + y) >= y3 - str && (centerY + y) <= y3 + str) {return true;}
        if ((centerX - x) >= x3 - str && (centerX - x) <= x3 + str && (centerY + y) >= y3 - str && (centerY + y) <= y3 + str) {return true;}
        if ((centerX + x) >= x3 - str && (centerX + x) <= x3 + str && (centerY - y) >= y3 - str && (centerY - y) <= y3 + str) {return true;}
        if ((centerX + y) >= x3 - str && (centerX + y) <= x3 + str && (centerY - x) >= y3 - str && (centerY - x) <= y3 + str) {return true;}
        if ((centerX - y) >= x3 - str && (centerX - y) <= x3 + str && (centerY - x) >= y3 - str && (centerY - x) <= y3 + str) {return true;}
        if ((centerX + y) >= x3 - str && (centerX + y) <= x3 + str && (centerY + x) >= y3 - str && (centerY + x) <= y3 + str) {return true;}
        if ((centerX - y) >= x3 - str && (centerX - y) <= x3 + str && (centerY + x) >= y3 - str && (centerY + x) <= y3 + str) {return true;}
        y++;
        // Actualiza la decisión según el algoritmo del punto medio
        if (decisionOver2 <= 0) {
            decisionOver2 += 2 * y + 1;
        } else {
            x--;
            decisionOver2 += 2 * (y - x) + 1;
        }
    }
}
export{
    drawCircle as default,
    calculateRadius,
    selectCircle
}