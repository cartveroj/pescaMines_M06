let filas = 

function iniciarPartida(){
    let valorMinimo = 10;
    let valorMaximo = 30;

    let numFilCol = parseInt(prompt("Introduce un numero (min 10 y max 30)"));
   
    if(numFilCol<10){
        numFilCol = valorMinimo;
        
    }else if(numFilCol >30){
        numFilCol = valorMaximo;
    }

    crearTabla(numFilCol);
}

function crearTabla(numFilCol){
    
    //element.innerHTML = "<table border=1>";
    let tabla = "<table border=1>" ;

   for (var i = 0; i < numFilCol; i++) {
        tabla += `<tr width="20px" height="20px">`;
        for(let j = 0; j < numFilCol; j++){
            tabla += `<td width="20px" height="20px" id="${"td."+i+"."+j}" data-mina = "false">
            <img src="img_pescamines/fons20px.jpg" id="${i+"."+j}" onclick="obreCasella(${i+"."+j})" >
            </td>`
        }
        tabla +=`</tr>`
   }

   tabla += "</table>"
  
    document.getElementById('taulell').innerHTML = tabla;
}

function obreCasella(posicion){
    let casillaAbierta = document.getElementById(`${posicion}`);
    casillaAbierta.src = " ";
    console.log(posicion);
}

function setMines(){
    let valor = document.getElementsByid("td.");
    console.log(valor);
}