import { ctx } from "../index.js";
function drawPixel(x, y,s) {
    ctx.fillRect(x, y, s, s); // Dibuja el píxel
}
function setColor(c){
    ctx.fillStyle = c;
}
export{
    drawPixel as default,
    setColor
}