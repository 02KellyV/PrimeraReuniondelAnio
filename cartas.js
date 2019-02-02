
var cartas = [
  {nombre: '1', seleccion: false, card: "CardsPioneers/Pioneras-01.jpg"},
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
  {nombre: '8', seleccion: false, card: "CardsPioneers/Pioneras-08.jpg"}
];
		
var valorDeLaJugada1 = "";
var valorDeLaJugada2 = "";

var idDeLaJugada1 = "";
var idDeLaJugada2 = "";


/*
Para inciar el juego
 */
function iniciarJuego () {
  //Nos traemos el elemento que vendría siendo el div con el id juego
  var juego = document.getElementById("juego");
  juego.style.opacity = 1;

  //Ordenamos las cartas de manera aleatoria
  cartas.sort(function() {return Math.random() - 0.5});

  //Este for se encarga de asignarles las imaganes aleatorias para comensar con el juego
  for ( var i = 0; i < 16 ; i++ ) {
    var carta = cartas[i].nombre;
    juego = document.getElementById( i.toString() );
    juego.dataset.valor = carta;
  }
};

//Reinicia el juego
function resetearJuego () {
  cartas.sort(function() {return Math.random() - 0.5});
  //Vuelve a asignar de manera aleatoria las cartas
  for ( var i = 0 ; i < 16; i++ ) {
    var carta = cartas[i].nombre;
    var dato = document.getElementById( i.toString() );
    dato.dataset.valor = carta;
    //Voltea las cartas
    colorCambio( i, 'black', "CardsPioneers/Pioneras-00.jpg");
  }	
}

function girarCarta () {

  var evento = window.event;

  if ( valorDeLaJugada1 === "" ) {

    valorDeLaJugada1 = evento.target.dataset.valor;
    idDeLaJugada1 = evento.target.id;
    reemplazarImagenDeLaCarta(idDeLaJugada1, cartas[parseInt(idDeLaJugada1)].card);

  } else {
    
    valorDeLaJugada2 = evento.target.dataset.valor;
    idDeLaJugada2 = evento.target.id;
    reemplazarImagenDeLaCarta(idDeLaJugada2, cartas[parseInt(idDeLaJugada2)].card);
    validarSiLasCartasSonDiferentes();
    validarSiLasCartasSonIguales();
    comprobarSiHaGanadoElJuego();

  }
}

function validarSiLasCartasSonDiferentes () {
  if ( valorDeLaJugada1 !== valorDeLaJugada2 ) {
    setTimeout(() => {
      reemplazarImagenDeLaCarta(idDeLaJugada1, "CardsPioneers/Pioneras-00.jpg")
      reemplazarImagenDeLaCarta(idDeLaJugada2, "CardsPioneers/Pioneras-00.jpg")
      vaciar();
    },600);
  }
}

function validarSiLasCartasSonIguales () {
  if ( 
      valorDeLaJugada1 === valorDeLaJugada2 
      && cartas[parseInt(idDeLaJugada1)].seleccion === false
      && cartas[parseInt(idDeLaJugada2)].seleccion === false
    ) {
      cartas[parseInt(idDeLaJugada1)].seleccion = true;
      cartas[parseInt(idDeLaJugada2)].seleccion = true;
      vaciar();
    }
}

//Deseleccionamos las cartas
function vaciar ()  {
  valorDeLaJugada1 = "";	
  valorDeLaJugada2 = "";	

  idDeLaJugada1 = "";
  idDeLaJugada2 = "";
}

//Para mostrar o ocultar las cartas
function reemplazarImagenDeLaCarta (idDeLaCarta, nuevaImagenDeLaCarta) {
  document.getElementById(idDeLaCarta.toString()).src = nuevaImagenDeLaCarta;
}	

//Comprobamos si ya se finalizó el juego para mostrar el mensaje que ganaron
function comprobarSiHaGanadoElJuego () {
  var aciertos = 0;
  //Cuenta cuántos aciertos llevan
  for( var i = 0 ; i < 16 ; i++ ){
    if ( cartas[i].seleccion === true ) {
      aciertos ++;
    }
  }

  //Muestra el mensaje de victoria
  if(aciertos === 16){
    alert("¡Que bien! Te ganaste un pan ;)");
  }
}
