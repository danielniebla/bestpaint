import drawPixel, { setColor } from "./pixels.js";
function drawEllipse(xc, yc, a, b, str, col, angle = 0) {
    setColor(col);
    let cosAngle = Math.cos(angle);
    let sinAngle = Math.sin(angle);
    const points = 1800; // Aumentamos el número de puntos a generar

    for (let i = 0; i <= points; i++) {
        let angle = (i * Math.PI * 2) / points;
        let x = Math.round(a * Math.cos(angle));
        let y = Math.round(b * Math.sin(angle));

        // Rotar y trasladar los puntos de la elipse
        let xRotated = Math.round(x * cosAngle - y * sinAngle) + xc;
        let yRotated = Math.round(x * sinAngle + y * cosAngle) + yc;

        drawPixel(xRotated, yRotated, str);
    }
}

function selectEllipse(xc, yc, a, b, x3, y3, str, angle = 0) {
    let cosAngle = Math.cos(angle);
    let sinAngle = Math.sin(angle);
    const points = 1800; // Aumentamos el número de puntos a generar

    for (let i = 0; i <= points; i++) {
        let angle = (i * Math.PI * 2) / points;
        let x = Math.round(a * Math.cos(angle));
        let y = Math.round(b * Math.sin(angle));

        // Rotar y trasladar los puntos de la elipse
        let xRotated = Math.round(x * cosAngle - y * sinAngle) + xc;
        let yRotated = Math.round(x * sinAngle + y * cosAngle) + yc;

        if (verify(xRotated, yRotated, x3, y3, str)) {
            return true;
        }
    }

    return false;
}


function verify(x1, y1, x, y, s) {
    if (x1 >= x - s + 1 && x1 <= x + s + 1 && y1 >= y - s + 1 && y1 <= y + s + 1) {
        return true;
    }
}

export {
    drawEllipse as default,
    selectEllipse
}