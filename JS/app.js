import { formulario } from "./interfaz.js"
import {validarBusqueda} from './funciones.js'

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarBusqueda)
})