                /*Logica de Javascript del juego del busca minas */

/*declaracion de variables globales */
let Gfilas = 0;
let Gcolumnas = 0;
let GcasillasRestantes = 0;

/*Funcion que retorna el numero de filas */
function getFilas(){
    
    return Gfilas;
}
/*Funcion que retorna el numero de columnas */
function getColumnas(){
    return Gcolumnas;
}

/*Funcion principal que inicia la partida con el numero de filas y columnas */
function iniciarPartida(){
    let valorMinimo = 10;
    let valorMaximo = 30;

    let numFil = parseInt(prompt("Introduce un numero de filas (min 10 y max 30)", "10"));
    let numCol = parseInt(prompt("Introduce un numero de columnas (min 10 y max 30)", "10"));
    if(numFil<10 || numCol<10){
        numCol = valorMinimo;
        
    }else if(numCol >30 || numCol >30){
        numCol = valorMaximo;
    }
    
    Gfilas = numFil;
    Gcolumnas = numCol;
    
    crearTabla(numFil, numCol);
    let minas = setMines();
    GcasillasRestantes = (Gfilas*Gcolumnas)-minas;
    console.log("casillas restantes"+GcasillasRestantes);
    calculaAdjacents();
}
// Crear la estructura HTML de la tabla y asignarla al elemento con id 'taulell'

function crearTabla(numFil, numCol){
    
    let tabla = "<table id = \"miTabla\" border=1>" ;

   for (var i = 0; i < numFil; i++) {
        tabla += `<tr>`;
        for(let j = 0; j < numCol; j++){
            tabla += `<td  data-num-mines="" id="${"td."+i+"."+j}" data-mina = 'false' descubierta="false">
            <img oncontextmenu = "ponerBandera(${i}, ${j})" src="img_pescamines/fons20px.jpg"  id="${i+"."+j}" onclick="obreCasella(${i}, ${j})" >
            </td>`
        }
        tabla +=`</tr>`
   }

   tabla += "</table>"
  
    document.getElementById('taulell').innerHTML = tabla;
}
// Funcion que contiene la lógica para revelar la casilla
function obreCasella(x,y){

    let esUnaMina = esMina(x,y);
    let celda = document.getElementById("td."+ x+"."+y);
    let imagen = document.getElementById(x+'.'+y);
    let perdioEljuego = false;
    let tabla = document.getElementById('miTabla');
    let numeroMinasAdjacents = celda.getAttribute('data-num-mines');

    
    if(esUnaMina == "true"){
        imagen.setAttribute('src', 'img_pescamines/mina20px.jpg');
        obreTodasLasMinas();
        perdioEljuego = true;
    }else{
        if(numeroMinasAdjacents !== "" && celda.getAttribute('descubierta') == "false" ){
           // Revelar el número de minas adyacentes
            imagen.setAttribute('src', ' ');
            tabla.rows[x].cells[y].innerHTML = `<p width="20px" height="20px">${numeroMinasAdjacents}</p>`
            celda.setAttribute('descubierta','true');
            GcasillasRestantes--;
        }else if(celda.getAttribute('descubierta') == "false"){
            // Revelar celda y verificar las celdas adyacentes
            imagen.setAttribute('src', ' ');
            celda.setAttribute('descubierta','true');
            GcasillasRestantes--;
            for (let i = x - 1; i <= x + 1; i++) {
                for (let j = y - 1; j <= y + 1; j++) {
                    if (i >= 0 && i < tabla.rows.length && j >= 0 && j < tabla.rows.length
                        && !(i === x && j === y)) {  
                            obreCasella(i, j);
                    }   
                }
            }
        }
        
    }
// Verificar si el jugador ha ganado o perdido
    if(perdioEljuego){
        alert("Es una mina..¡¡\nperdiste :(");
        desHabilitarCasillas();
    }else{
        if(GcasillasRestantes == 0){
            alert('Ganaste..¡¡ :)');
            obreTodasLasMinas();
            desHabilitarCasillas();
        }
    }
    
    
}

// Deshabilita los eventos click en todas las imágenes
function desHabilitarCasillas() {
    let imagenes = document.getElementsByTagName("img");
    // Hacer una copia de la lista de imágenes para evitar problemas de tiempo real
    let imagenesArray = Array.from(imagenes);
    for (let i = 0; i < imagenesArray.length; i++) {
        imagenesArray[i].onclick = null;
    }
}
// Coloca una bandera en la imagen correspondiente
function ponerBandera(x,y){
    let imagen = document.getElementById(x+'.'+y);
    imagen.setAttribute('src', 'img_pescamines/badera20px.jpg');
}
 // Revela todas las minas al finalizar el juego
function obreTodasLasMinas(){
    let tabla = document.getElementById('miTabla');

    for(let i=0; i < tabla.rows.length ; i++){
        for(let j=0; j < tabla.rows[i].cells.length ; j++){
            let celda = document.getElementById("td."+ i+"."+j);
            let tieneMina = celda.getAttribute('data-mina');
            if(tieneMina == "true"){
                let imagen = document.getElementById(i+'.'+j);
                imagen.setAttribute('src', 'img_pescamines/mina20px.jpg');
            }
        }
    }
}

/* 
   Coloca minas aleatoriamente en el tablero y devuelve la cantidad de minas.
*/
function setMines() {
    // Obtener el número de filas y columnas
    let filas = getFilas();
    let columnas = getColumnas();

    // Porcentaje de minas en relación al tamaño del tablero
    let porcentaje = 0.17;

    // Calcular la cantidad de minas según el porcentaje
    let cantidadDeMinas = Math.floor((filas * columnas) * porcentaje);
    let contador = 0;

    // Obtener la tabla del juego
    let tabla = document.getElementById('miTabla');

    // Crear un array con todas las celdas del tablero
    let arrayCeldas = [];
    for (let i = 0; i < tabla.rows.length; i++) {
        for (let j = 0; j < tabla.rows[i].cells.length; j++) {
            let celda = document.getElementById("td." + i + "." + j);
            arrayCeldas.push(celda);
        }
    }

    // Asignar exactamente la cantidad deseada de minas
    while (contador < cantidadDeMinas) {
        let indiceAleatorio = Math.floor(Math.random() * arrayCeldas.length);
        let celda = arrayCeldas[indiceAleatorio];

        // Verificar si la celda ya tiene una mina asignada
        if (celda.getAttribute('data-mina') === 'false') {
            celda.setAttribute('data-mina', 'true');
            contador++;
        }

        // Eliminar la celda del array para no seleccionarla de nuevo
        arrayCeldas.splice(indiceAleatorio, 1);
    }

    // Mostrar en consola la cantidad de minas asignadas y la cantidad deseada
    console.log("Numero de minas: " + cantidadDeMinas + " es igual: " + contador);

    // Devolver la cantidad de minas asignadas
    return cantidadDeMinas;
}


/* 
   Calcula y asigna la cantidad de minas adyacentes a cada celda del tablero.
*/
function calculaAdjacents() {
    let contadorMinas = 0;
    let tabla = document.getElementById('miTabla');

    for (let i = 0; i < tabla.rows.length; i++) {
        for (let j = 0; j < tabla.rows[i].cells.length; j++) {
            // Reiniciar el contador de minas para cada celda
            contadorMinas = 0;

            // Verificar si la celda actual no contiene una mina
            let esUnaMina = esMina(i, j);
            if (esUnaMina == "false") {
                // Explorar las celdas adyacentes a la celda actual
                for (let x = i - 1; x <= i + 1; x++) {
                    for (let y = j - 1; y <= j + 1; y++) {
                        // Asegurarse de que las coordenadas estén dentro de los límites de la tabla
                        if (x >= 0 && x < tabla.rows.length && y >= 0 && y < tabla.rows[i].cells.length
                            && !(x == i && y == j)) {
                            // Acceder a la celda vecina
                            let celdaVecina = tabla.rows[x].cells[y];

                            // Verificar si la celda vecina contiene una mina
                            let tieneMina = celdaVecina.getAttribute('data-mina');
                            if (tieneMina == "true") {
                                // Incrementar el contador de minas adyacentes
                                contadorMinas++;
                                // Asignar la cantidad de minas adyacentes a la celda actual
                                setMinesAdjacents(i, j, contadorMinas);
                            }
                        }
                    }
                }
            }
        }
    }
}

/* 
   Verifica si la celda en las coordenadas (x, y) contiene una mina.
*/
function esMina(x,y){
    let celda = document.getElementById("td."+ x+"."+y);
    return celda.getAttribute('data-mina');
}

/* 
   Asigna la cantidad de minas adyacentes a la celda en las coordenadas (i, j).
*/
function setMinesAdjacents(i,j,minasAdjacents){
     let celda = document.getElementById("td."+ i+"."+j);
     celda.setAttribute('data-num-mines', minasAdjacents);
}

