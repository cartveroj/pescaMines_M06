# Joc del pescaMines_M06
Veronica Cartagena
## Funcionament
Hi ha un taulell de caselles iguals. Al polsar sobre una casella: 
* Si hi ha una mina → es mostren totes les mines del taulell i un alert de que has perdut.
* Si no hi ha mina → es mostra el número de mines totals adjacents a la casella polsada
* Si el número de mines adjacents és 0, s’han d’obrir totes les caselles adjacents que també
tinguin com a valor 0

El joc acaba quan s’han descobert totes les caselles que no tenen mina → s’ha guanyat la partida,
o quan es clica sobre una que tingui mina → s’ha perdut la partida

## Enunciat
Crea una pàgina html que contingui un botó d’iniciar partida i un div tal que: 

<button onclick="iniciarPartida()">Iniciar Partida</button>
<div id="taulell"></div> 

iniciarPartida() ha de demanar el número de files i de columnes que són de mínim 10 de cada. Si el
número introduït és menor, s’ignora i es situa a 10.  
Igualment el màxim és de 30 (si s’introdueix un
número major de 30 s’ignora i es situa en 30).

Després el que ha de fer es invocar a crearTaulell(), que crearà una taula dinàmica del número de
files per el número de columnes especificat abans.

Cada cel·la tindrà una custom html property data-mina
= "false" i contindrà una imatge fons20px.jpg. Cada imatge invocarà al polsar el botó esquerre del ratolí al
mètode obreCasella(‘...’);
Després hi haurà un mètode setMines() que establirà la propietat de mina a true a un 17% de les
caselles totals. 

També has de crear un mètode calculaAdjacents() que recorrerà el taulell i apuntarà el número de
mines adjacents de cada casella en una custom html property data-num-mines inicialment a cero.  
Has de crear les funcions:
* esMina(x,y); que torna un boleà de si la posició x,y hi ha una mina
* setMinesAdjacents(x,y,nMinesAdjacents); que estableix a la casella de posició x,y
l’atribut del número de mines a nMinesAdjacents.  
Pots crear funcions addicionals per completar la tasca proposada