var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");

var numSides = 5;
var isDrawing = false;
var startX, startY;   


canvas.addEventListener("mousedown", poligonoDown);
canvas.addEventListener("mousemove", poligonoMove);
canvas.addEventListener("mouseup", poligonoUp);

function updateside(sidevalue){
    numSides = sidevalue;
}
//--poligono de n lados de bresenham--//
function poligonoDown(event){
    isDrawing =true
    startX = event.clientX - canvas.getBoundingClientRect().left;
    startY = event.clientY - canvas.getBoundingClientRect().top;
}
function poligonoMove(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        const deltax = Math.abs(endX - startX);
        const deltay = Math.abs(endY - startY);
        const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
        var x = endX;
        var y = endY;    
        for (let i = 0; i < numSides+1; i++) {
            if(i < numSides){
                var theta = (2 * Math.PI * i) / numSides;
                var x1 = x + radius * Math.cos(theta);
                var y1 = y + radius * Math.sin(theta);   
                drawLineBresenham(Math.round(x), Math.round(y), Math.round(x1), Math.round(y1));
                x=x1;
                y=y1;
            }else if(i === numSides ){
                drawLineBresenham(Math.round(x), Math.round(y), Math.round(endX), Math.round(endY));
            }
        }

    }
}
function poligonoUp(event){
    if(isDrawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        isDrawing =false;
        var endX = event.clientX - canvas.getBoundingClientRect().left;
        var endY = event.clientY - canvas.getBoundingClientRect().top;
        const deltax = Math.abs(endX - startX);
        const deltay = Math.abs(endY - startY);
        const radius = Math.sqrt((deltax * deltax) + (deltay * deltay));
        var x = endX;
        var y = endY;    
        for (let i = 0; i < numSides+1; i++) {
            if( i < numSides){
                var theta = (2 * Math.PI * i) / numSides;
                var x1 = x + radius * Math.cos(theta);
                var y1 = y + radius * Math.sin(theta);   
                drawLineBresenham(Math.round(x), Math.round(y), Math.round(x1), Math.round(y1));
                x=x1;
                y=y1;
            }else if(i === numSides ){
                drawLineBresenham(Math.round(x), Math.round(y), Math.round(endX), Math.round(endY));
            }
        }
    }
}

function drawLineBresenham(x1, y1, x2, y2) {
    const deltax = Math.abs(x2 - x1);
    const deltay = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = deltax - deltay;


    if(err != 0){
        while (x1 !== x2 || y1 !== y2) {
            drawPixel(x1, y1, 2 );
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
function drawPixel(x, y,s) {
    ctx.fillRect(x, y, s, s); // Dibuja el píxel
}
