'use strict';

let diccionario = ['DONA', 'CRUZ', 'COLA', 'HOJA', 'GRUA', 'APODO', 'ACTOR', 'CHINA', 'DUBAI', 'LECHE', 'CUARZO', 'INGLES', 'ATAQUE', 'GLOBAL', 'VIAJAR', 'BOLIVIA', 'DOLARES', 'ECUADOR', 'PLANTAS', 'SEMANAS'];
let abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let palabraSeleccionada = '';
let contadorBuenas = 0;
let matriz = [];
let turnos = 0;

const seleccionarPalabra = () => {
        let num = Math.floor(Math.random() * 21);
        return diccionario[num];
    }
    /*
    function myFunction() {
        var element = document.getElementsByClassName('teclado');
        element.classList.add('estilo-boton');
    }*/

const reiniciar = () => {
    contadorBuenas = 0;
    turnos = 0;
    palabraSeleccionada = '';
    matriz = [];
    document.getElementById('txt-turnos').value = 0;
    document.getElementById('txt-palabra').value = '';
    document.getElementById('txt-intentos').value = '';
    abecedario.forEach(element => {
        document.getElementById(element).classList.remove('opcion-correcta');
        document.getElementById(element).classList.remove('opcion-incorrecta');
        document.getElementById(element).classList.add('estilo-boton');
        document.getElementById(element).disabled = false;
    });
}

const partidaPerdida = () => {
    abecedario.forEach(element => {
        document.getElementById(element).classList.remove('estilo-boton');
        document.getElementById(element).classList.remove('opcion-correcta');
        document.getElementById(element).classList.add('opcion-incorrecta');
        document.getElementById(element).disabled = true;
    });
}

const partidaGanada = () => {
    abecedario.forEach(element => {
        document.getElementById(element).classList.remove('estilo-boton');
        document.getElementById(element).classList.remove('opcion-incorrecta');
        document.getElementById(element).classList.add('opcion-correcta');
        document.getElementById(element).disabled = true;
    });
}

const extraerReemplazar = (n) => {
    let textoExtraido = document.getElementById('txt-palabra').value;
    let cadenaExtraida = [];
    let cadenaReemplazar = [];
    let textoReemplazar = '';
    for (var i = 0; i < textoExtraido.length; i++) {
        cadenaExtraida[i] = textoExtraido.substring(i, i + 1);
    }
    cadenaReemplazar = cadenaExtraida;
    for (var x = 0; x < matriz.length; x++) {
        if (n == matriz[x].toUpperCase()) {
            cadenaReemplazar[x] = n;
        }
    }
    cadenaReemplazar.forEach(element => {
        textoReemplazar += element;
    });
    document.getElementById('txt-palabra').value = '';
    document.getElementById('txt-palabra').value = textoReemplazar;
}

const nuevoJuego = () => {
    reiniciar();
    palabraSeleccionada = seleccionarPalabra();
    console.log(palabraSeleccionada);
    for (var i = 0; i < palabraSeleccionada.length; i++) {
        document.getElementById('txt-palabra').value += '-';
    }
    for (var j = 0; j < palabraSeleccionada.length; j++) {
        matriz[j] = palabraSeleccionada.substring(j, j + 1);
    }
}

const comprobar = (n) => {
    let indicador = 0;
    matriz.forEach(element => {
        if (n == element.toUpperCase()) {
            extraerReemplazar(n);
            indicador++;
            contadorBuenas++;
        }
    });
    turnos++;
    document.getElementById('txt-turnos').value = turnos;
    //El siguiente IF le indica al usuario si la opción seleccionada es correcta o incorrecta
    if (indicador > 0) {
        document.getElementById(n).disabled = true;
        document.getElementById(n).classList.remove('estilo-boton');
        document.getElementById(n).classList.add('opcion-correcta');
    } else {
        document.getElementById(n).disabled = true;
        document.getElementById(n).classList.remove('estilo-boton');
        document.getElementById(n).classList.add('opcion-incorrecta');
        document.getElementById('txt-intentos').value += n;
    }
    //El siguiente IF se ejecuta cuando se resuelve la palabra
    let marcadorJugador = parseInt(document.getElementById('txt-marcador-jugador').value);
    let marcadorComputadora = parseInt(document.getElementById('txt-marcador-computadora').value);
    if (contadorBuenas == matriz.length) {
        Swal.fire({
            icon: 'success',
            title: 'FELICIDADES',
            text: 'Ha adivinado la palabra'
        });
        document.getElementById('txt-marcador-jugador').value = marcadorJugador + 1;
        partidaGanada();
    } else if (turnos >= 10) {
        Swal.fire({
            icon: 'error',
            title: '¡Perdiste!',
            text: 'No has logrado adivinar en menos de 10 turnos'
        });
        document.getElementById('txt-marcador-computadora').value = marcadorComputadora + 1;
        partidaPerdida();
    }
}