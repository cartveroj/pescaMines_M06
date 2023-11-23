
let Gfilas = 0;
let Gcolumnas = 0;

function getFilas(){
    
    return Gfilas;
}

function getColumnas(){
    return Gcolumnas;
}

function iniciarPartida(){
    let valorMinimo = 10;
    let valorMaximo = 30;

    let numFilCol = parseInt(prompt("Introduce un numero (min 10 y max 30)"));
   
    if(numFilCol<10){
        numFilCol = valorMinimo;
        
    }else if(numFilCol >30){
        numFilCol = valorMaximo;
    }
    
    Gfilas = numFilCol;
    Gcolumnas = numFilCol;
    
    crearTabla(numFilCol);
    setMines();
    calculaAdjacents();
}

function crearTabla(numFilCol){
    
    //element.innerHTML = "<table border=1>";
    let tabla = "<table id = \"miTabla\" border=1>" ;

   for (var i = 0; i < numFilCol; i++) {
        tabla += `<tr width="20px" height="20px">`;
        for(let j = 0; j < numFilCol; j++){
            tabla += `<td width="20px" height="20px" data-num-mines="" id="${"td."+i+"."+j}" data-mina = "false" >
            <img src="img_pescamines/fons20px.jpg"  id="${i+"."+j}" onclick="obreCasella(${i+"."+j})" >
            </td>`
        }
        tabla +=`</tr>`
   }

   tabla += "</table>"
  
    document.getElementById('taulell').innerHTML = tabla;
}

function obreCasella(posicion){
    let arrayPos = posicion.toString();
    let x = arrayPos.charAt(0);
    let y = arrayPos.charAt(2);
    console.log(x+"+"+y);
    console.log(esMina(x,y));
}



function setMines(){
    let filas = getFilas();
    let columnas = getColumnas();
    let porcentaje = 0.17;
    let cantidadDeMinas = (filas * columnas) * porcentaje;
    let contador=0;

    let tabla = document.getElementById('miTabla');

    for(let i=0; i<= tabla.rows.length-1 ; i++){
        for(let j=0; j <= tabla.rows[i].cells.length-1 ; j++){
            let celda = document.getElementById("td."+ i+"."+j);
            if (Math.random() < 0.17) {
                celda.setAttribute('data-mina', 'true');
                contador++;
            } else {
                celda.setAttribute('data-mina', 'false');
            }
            //let atributo = celda.getAttribute("data-mina");
            
        }
    }

    console.log(contador);

    
}

function calculaAdjacents(){
    let contadorMinas=0;
    let tabla = document.getElementById('miTabla');
    for(let i = 0; i< tabla.rows.length; i++){
        for(let j=0; j< tabla.rows[i].cells.length; j++){
           // console.log(tabla.rows[i].cells[j]);
            let esUnaMina = esMina(i,j);
            console.log(typeof(esUnaMina));
           if( esUnaMina == "false" ){
                for (let x = i - 1; x <= i + 1; x++) {
                    for (let y = j - 1; y <= j + 1; y++) {
                        // Asegúrate de que las coordenadas no estén fuera de los límites de la tabla
                        if (x >= 0 && x < tabla.rows.length && y >= 0 && y < tabla.rows[i].cells.length) {
                            // Accede a la celda vecina
                            let celdaVecina = tabla.rows[x].cells[y];
                            console.log(celdaVecina);
                            // Realiza las operaciones que necesites con la celda vecina
                            let tieneMina = celdaVecina.getAttribute('data-mina');
                        }
                    }
                }
           }
            
        }
    }

    console.log(contadorMinas);
}
function esMina(x,y){
    let celda = document.getElementById("td."+ x+"."+y);
    return celda.getAttribute('data-mina');
}
function setMinesAdjacents(){}