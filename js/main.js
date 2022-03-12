'use strict';

let diccionario = ['DONA', 'CRUZ', 'COLA', 'HOJA', 'GRUA', 'APODO', 'ACTOR', 'CHINA', 'DUBAI', 'LECHE', 'CUARZO', 'INGLES', 'ATAQUE', 'GLOBAL', 'VIAJAR', 'BOLIVIA', 'DOLARES', 'ECUADOR', 'PLANTAS', 'SEMANAS'];
let palabraSeleccionada = '';

const seleccionarPalabra = () => {
    let num = Math.floor(Math.random() * 21)
    palabraSeleccionada = diccionario[num]
}