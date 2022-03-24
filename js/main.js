'use strict';

let diccionario = ['DONA', 'CRUZ', 'COLA', 'HOJA', 'GRUA', 'APODO', 'ACTOR', 'CHINA', 'DUBAI', 'LECHE', 'CUARZO', 'INGLES', 'ATAQUE', 'GLOBAL', 'VIAJAR', 'BOLIVIA', 'DOLARES', 'ECUADOR', 'PLANTAS', 'SEMANAS'];
let palabraSeleccionada = '';
let contador = 0;
let matriz = [];

const seleccionarPalabra = () => {
    let num = Math.floor(Math.random() * 21);
    return diccionario[num];
}

const reiniciar = () => {
    contador = 0;
    palabraSeleccionada = '';
    matriz = [];
    document.getElementById('txt-palabra').value = '';
    document.getElementById('txt-intentos').value = '';
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
            console.log('True ' + element)
            extraerReemplazar(n);
            indicador++;
            contador++;
        } else {
            console.log('False ' + element)
        }
    });

    //El siguiente IF le indica al usuario si la opción seleccionada es correcta o incorrecta
    if (indicador > 0) {
        Swal.fire({
            icon: 'success',
            title: '¡Correcto!'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: '¡Incorrecto!',
        });
        document.getElementById('txt-intentos').value += n
    }
    //El siguiente IF se ejecuta cuando se resuelve la palabra
    if (contador == matriz.length) {
        Swal.fire({
            icon: 'success',
            title: 'FELICIDADES',
            text: 'Ha adivinado la palabra'
        });
    }
}