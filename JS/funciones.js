import { resultado, formulario} from './interfaz.js'
import {consultarAPI} from './api.js'

export function validarBusqueda(e) {
    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value
    if(busqueda === '' ) {
        mostrarAlerta('Debes ingresar una palabra')
        return
    }

    consultarAPI(busqueda)
}

export function mostrarAlerta(msj) {
    const alertaPrevia = document.querySelector('.alerta')

    if(!alertaPrevia) {
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-600', 'text-center', 'm-1', 'alerta', 'font-bold', 'align-center', 'rounded', 'p-5')
        resultado.classList.remove('grid')
        alerta.textContent = msj
    
        resultado.appendChild(alerta)
    
        setTimeout(() => {
            alerta.remove()
        }, 3000)
    }
}

export function obtenerResultados(resultados) {
    limpiarHTML()

    if (resultados.length === 0) {
        mostrarAlerta('Sin resultados')
        resultado.classList.remove('bg-gray-700')
        return
    }


    resultados.forEach(response => {
        
        const {author, definition, example, permalink} = response

        const definicion = quitarCaracteres(definition)
        const exampl = quitarCaracteres(example)


        const divMensaje = document.createElement('div')
        resultado.classList.remove('grid')
        resultado.classList.add('mt-10', 'w-full', 'bg-gray-700', 'p-6', 'rounded-lg')
        divMensaje.innerHTML = `
        <div class="div-resultado text-center border-gray-900 bg-gray-500 p-6 rounded-lg">
            <p class="font-bold uppercase">Author: <span class="font-light normal-case">${author}</span></p>
            <p class="font-bold uppercase">Definition: <span class="font-light normal-case">${definicion}</span></p>
            <p class="font-bold uppercase">Example: <span class="font-light normal-case">${exampl}</span></p>
            <p class="font-bold uppercase">See more: <a href=${permalink} target="_blank" rel="noopener noreferrer">Click here </a></p>
        </div>
        `

        resultado.appendChild(divMensaje)
    })
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function quitarCaracteres(tx) {
    return tx.replace(/[*+\-?^${}|[\]\\]/g,''); // $& significa toda la cadena coincidente
  }

// function quitarCaracteres(tx) {
//     return tx.replace(/.[*+\-?^${}()|[\]\\]/g,''); // $& significa toda la cadena coincidente
//   }
