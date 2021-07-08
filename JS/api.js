import {mostrarAlerta, obtenerResultados} from './funciones.js'
import {resultado} from './interfaz.js'

export function consultarAPI(busqueda) {
    const palabra = {
        autor: '',
        significado: '',
        ejemplo: '',
        horaEscrito: ''
    }

    const options = {
        method: 'GET',
        url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
        params: {term: busqueda},
        headers: {
          'x-rapidapi-key': 'd588d32c7cmshf0bc9e79aac11d0p17a2c5jsn5882892b3b06',
          'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
      };
      
      axios.request(options)
        .then(response => {
            obtenerResultados(response.data.list);
        })
        .catch(function () {
        while(resultado.firstChild) {
            resultado.removeChild(resultado.firstChild);
            resultado.classList.remove('bg-gray-700')
        }
        mostrarAlerta('La palabra no fue encontrada')
        });
}