
let Gfilas = 0;
let Gcolumnas = 0;
let GcasillasRestantes = 0;

function getFilas(){
    
    return Gfilas;
}

function getColumnas(){
    return Gcolumnas;
}

function iniciarPartida(){
    let valorMinimo = 10;
    let valorMaximo = 30;

    let numFilCol = parseInt(prompt("Introduce un numero (min 10 y max 30)", "10"));
   
    if(numFilCol<10){
        numFilCol = valorMinimo;
        
    }else if(numFilCol >30){
        numFilCol = valorMaximo;
    }
    
    Gfilas = numFilCol;
    Gcolumnas = numFilCol;
    
    crearTabla(numFilCol);
    let minas = setMines();
    GcasillasRestantes = (Gfilas*Gcolumnas)-minas;
    console.log("casillas restantes"+GcasillasRestantes);
    calculaAdjacents();
}

function crearTabla(numFilCol){
    
    //element.innerHTML = "<table border=1>";
    let tabla = "<table id = \"miTabla\" border=1>" ;

   for (var i = 0; i < numFilCol; i++) {
        tabla += `<tr width="20px" height="20px">`;
        for(let j = 0; j < numFilCol; j++){
            tabla += `<td width="20px" height="20px" data-num-mines="" id="${"td."+i+"."+j}" data-mina = 'false' descubierta="false">
            <img oncontextmenu = "ponerBandera(${i}, ${j})" src="img_pescamines/fons20px.jpg"  id="${i+"."+j}" onclick="obreCasella(${i}, ${j})" >
            </td>`
        }
        tabla +=`</tr>`
   }

   tabla += "</table>"
  
    document.getElementById('taulell').innerHTML = tabla;
}

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
            imagen.setAttribute('src', ' ');
            tabla.rows[x].cells[y].innerHTML = `<p width="20px" height="20px">${numeroMinasAdjacents}</p>`
            celda.setAttribute('descubierta','true');
            GcasillasRestantes--;
        }else if(celda.getAttribute('descubierta') == "false"){
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
    console.log("me quedan: "+GcasillasRestantes);
    if(perdioEljuego){
        alert("Perdió el juego");
        desHabilitarCasillas();
    }else{
        if(GcasillasRestantes == 0){
            alert('Ganaste..¡¡');
            desHabilitarCasillas();
        }
    }
    
    
}



function desHabilitarCasillas() {
    let imagenes = document.getElementsByTagName("img");
    // Hacer una copia de la lista de imágenes para evitar problemas de tiempo real
    let imagenesArray = Array.from(imagenes);
    for (let i = 0; i < imagenesArray.length; i++) {
        imagenesArray[i].onclick = null;
    }
}
function ponerBandera(x,y){
    let imagen = document.getElementById(x+'.'+y);
    imagen.setAttribute('src', 'img_pescamines/badera20px.jpg');
}
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

function setMines(){
    let filas = getFilas();
    let columnas = getColumnas();
    let porcentaje = 0.17;
    let cantidadDeMinas = Math.floor((filas * columnas) * porcentaje);
    let contador=0;

    let tabla = document.getElementById('miTabla');
    let arrayCeldas = [];

    for(let i=0; i < tabla.rows.length ; i++){
        for(let j=0; j < tabla.rows[i].cells.length ; j++){
            let celda = document.getElementById("td."+ i+"."+j);
            arrayCeldas.push(celda);

        }
    }
     // Asignamos exactamente la cantidad deseada de minas
     while (contador < cantidadDeMinas) {
        let indiceAleatorio = Math.floor(Math.random() * arrayCeldas.length);
        let celda = arrayCeldas[indiceAleatorio];

        if (celda.getAttribute('data-mina') === 'false') {
            celda.setAttribute('data-mina', 'true');
            contador++;
        }

        // Eliminamos la celda del array para no seleccionarla de nuevo
        arrayCeldas.splice(indiceAleatorio, 1);
    }
    console.log("Numero de minas:"+ cantidadDeMinas +"es igual: " + contador );

    return cantidadDeMinas;
    
}

function calculaAdjacents(){
    let contadorMinas=0;
    let tabla = document.getElementById('miTabla');
    for(let i = 0; i< tabla.rows.length; i++){
        for(let j=0; j< tabla.rows[i].cells.length; j++){
        // console.log("celda:");
        // console.log(tabla.rows[i].cells[j]);
           contadorMinas=0;
            let esUnaMina = esMina(i,j);
           if( esUnaMina == "false" ){
                for (let x = i - 1; x <= i + 1; x++) {
                    for (let y = j - 1; y <= j + 1; y++) {
                        // Asegúrate de que las coordenadas no estén fuera de los límites de la tabla
                        if (x >= 0 && x < tabla.rows.length && y >= 0 && y < tabla.rows[i].cells.length
                            && !(x ==i && y==j)) {
                            // Accede a la celda vecina
                            
                            let celdaVecina = tabla.rows[x].cells[y];
                            // console.log("celda vecina");
                            // console.log(celdaVecina);
                            // Realiza las operaciones que necesites con la celda vecina
                            let tieneMina = celdaVecina.getAttribute('data-mina');
                            //console.log("celda vecina tiene mina"+tieneMina);
                            if(tieneMina == "true"){
                                contadorMinas++
                                setMinesAdjacents(i,j,contadorMinas);
                                let celda = document.getElementById("td."+ i+"."+j);
                                let numMinas = celda.getAttribute('data-num-mines');
                                //console.log("celda con numero minas"+numMinas);;

                            }
                            
                        }
                    }
                }
           }
            
        }
    }

}
function esMina(x,y){
    //console.log("revisando celda"+x +"y"+y);
    let celda = document.getElementById("td."+ x+"."+y);
    return celda.getAttribute('data-mina');
}
function setMinesAdjacents(i,j,minasAdjacents){
     let celda = document.getElementById("td."+ i+"."+j);
     celda.setAttribute('data-num-mines', minasAdjacents);
}

