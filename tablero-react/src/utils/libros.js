// libros.js
// Devuelve el siguiente estado de lectura para uno de los libros

import { ESTADOS_LECTURA } from '../data/libros.js';

export function siguienteEstado(estadoActual) {
  const indiceActual = ESTADOS_LECTURA.indexOf(estadoActual);
  const indiceSiguiente = (indiceActual + 1) % ESTADOS_LECTURA.length;

  return ESTADOS_LECTURA[indiceSiguiente];
}