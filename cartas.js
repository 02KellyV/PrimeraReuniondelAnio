
var cartas = [{nombre: '1', seleccion: false, card: "CardsPioneers/Pioneras-01.jpg"},
  {nombre: '2', seleccion: false, card: "CardsPioneers/Pioneras-02.jpg"},
  {nombre: '3', seleccion: false, card: "CardsPioneers/Pioneras-03.jpg"},
  {nombre: '4', seleccion: false, card: "CardsPioneers/Pioneras-04.jpg"},
  {nombre: '5', seleccion: false, card: "CardsPioneers/Pioneras-05.jpg"},
  {nombre: '6', seleccion: false, card: "CardsPioneers/Pioneras-06.jpg"},
  {nombre: '7', seleccion: false, card: "CardsPioneers/Pioneras-07.jpg"},
  {nombre: '8', seleccion: false, card: "CardsPioneers/Pioneras-08.jpg"},
  {nombre: '1', seleccion: false, card: "CardsPioneers/Pioneras-01.jpg"},
  {nombre: '2', seleccion: false, card: "CardsPioneers/Pioneras-02.jpg"},
  {nombre: '3', seleccion: false, card: "CardsPioneers/Pioneras-03.jpg"},
  {nombre: '4', seleccion: false, card: "CardsPioneers/Pioneras-04.jpg"},
  {nombre: '5', seleccion: false, card: "CardsPioneers/Pioneras-05.jpg"},
  {nombre: '6', seleccion: false, card: "CardsPioneers/Pioneras-06.jpg"},
  {nombre: '7', seleccion: false, card: "CardsPioneers/Pioneras-07.jpg"},
  {nombre: '8', seleccion: false, card: "CardsPioneers/Pioneras-08.jpg"}];
		
var jugada1 = "";
var jugada2 = "";
var identificadorJ1 = "";
var identificadorJ2 = "";
var intentos = 0;

/*
Para inciar el juego
 */
function iniciarJuego () {
  //Nos traemos el elemento que vendría siendo el div con el id juego
  var dato = document.getElementById("juego");
  dato.style.opacity = 1;

  //Ordenamos las cartas de manera aleatoria
  cartas = cartas.sort(function() {return Math.random() - 0.5});

  //Este for se encarga de asignarles las imaganes aleatorias para comensar con el juego
  for ( var i = 0 ; i < 16 ; i++ ) {
    var carta = cartas[i].nombre;
    dato = document.getElementById( i.toString() );
    dato.dataset.valor = carta;
  }
};

//Reinicia el juego
function resetearJuego () {
  intentos = 0;
  cartas = cartas.sort(function() {return Math.random() - 0.5});
  //Vuelve a asignar de manera aleatoria las cartas
  for ( var i = 0 ; i < 16 ; i++ ) {
    var carta = cartas[i].nombre;
    cartas[i].seleccion = false;
    var dato = document.getElementById( i.toString() );
    dato.dataset.valor = carta;
    //Voltea las cartas
    cartaCambio( i,  "CardsPioneers/Pioneras-00.jpg");
  }	
}

function girarCarta () {

  /*
  Un evento es algo que se llama cuando algo sucede,
  por lo que, por ejemplo, hacer clic y pulsar teclas son eventos.
  */
  var evento = window.event;


  //Extraemos el valor de la carta
  jugada2 = evento.target.dataset.valor;
  identificadorJ2 = evento.target.id;

  if ( jugada1 !== "" ) {

    ++intentos;

    //Verificamos si ya hay 2 cartas seleccionadas y si son iguales
    if ( jugada1 === jugada2 && identificadorJ1 !== identificadorJ2
        && cartas[parseInt(identificadorJ2)].seleccion !== true
        && cartas[parseInt(identificadorJ1)].seleccion !== true) {

      //Sabiendo que ambas cartas seleccionadas son iguales procedemos a marcarlas como seleccionadas
      cartas[parseInt(identificadorJ1)].seleccion = true;
      cartas[parseInt(identificadorJ2)].seleccion = true;

      //Mostramos la carta, vaciamos y comprobamos
      cartaCambio(identificadorJ2, cartas[parseInt(identificadorJ2)].card);
      vaciar();
      comprobar();
    }else if(identificadorJ1 !== identificadorJ2){
      cartaCambio(identificadorJ2, cartas[parseInt(identificadorJ2)].card);

      //En el caso de que no sean iguales las mostramos durante 1 segundo
      setTimeout(function(){
        cartaCambio(this.identificadorJ1, "CardsPioneers/Pioneras-00.jpg")
        cartaCambio(this.identificadorJ2, "CardsPioneers/Pioneras-00.jpg")
        vaciar()
      },200);
    }
    //Verificamos que aún no se hayan tomados las dos cartas aún y le asignamos la carta a la primera jugada
  } else if(jugada2 !== "valor") {

    cartaCambio(identificadorJ2, cartas[parseInt(identificadorJ2)].card);

    jugada1 = jugada2;
    identificadorJ1 = identificadorJ2;
  }
};

//Deseleccionamos las cartas
function vaciar ()  {
  jugada1 = "";	
  jugada2 = "";	

  identificadorJ1 = "";
  identificadorJ2 = "";
}

//Para mostrar o ocultar las cartas
function cartaCambio (posicion, contenido) {
  document.getElementById(posicion.toString()).src = contenido;
}	

//Comprobamos si ya se finalizó el juego para mostrar el mensaje que ganaron
function comprobar () {
  var aciertos = 0;
  //Cuenta cuántos aciertos llevan
  for( var i = 0 ; i < 16 ; i++ ){
    if ( cartas[i].seleccion === true ) {
      aciertos ++;
    }
  }

  //Muestra el mensaje de victoria
  if(aciertos === 16){
    alert("Ganaste con: "+intentos+" intentos!");
    resetearJuego();    
  }
}
