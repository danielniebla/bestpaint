var datos = {}; // Objeto para almacenar las matrices
var last = 0;
function agregarDatos(llave, x, y, profundidad) {
    // Verificar si la llave ya existe en el objeto
    if (!datos[llave]) {
        datos[llave] = []; // Si no existe, inicializar una matriz para esa llave
    }

    // Agregar la pareja de datos como un array dentro de la matriz
    datos[llave].push([x, y,profundidad]);
}

function eliminarDatos(llave) {
    // Verificar si la llave existe en el objeto
    
    if (datos[llave] && datos[llave].length > 0) {
        while(datos[llave].length != 0){
            datos[llave].pop();
        }
    }
}

// Ejemplo de uso
agregarDatos(last +=1, 10, 20,last);
agregarDatos(last, 30, 40,last);
agregarDatos(last +=1, 50, 60,last);
agregarDatos(last, 70, 80,last);

eliminarDatos(1);
for (var llave in datos) {
    if (this.datos[llave].length > 0) {
        console.log(`Llave: ${llave}, Datos: ${JSON.stringify(this.datos[llave])}`);
    }
}
console.log(datos); // Mostrar el objeto de matrices
