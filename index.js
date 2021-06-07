import {tema} from './utils/_Tema.js';
import {TrendGifos} from './utils/_TrendGifos.js'
import {reqBusqResult,reqBusqSugerencia,reqTrendigTerms} from './utils/_request.js'
import {renderGif} from '../../utils/_renderGif.js'

window.onload = ()=>{

    tema()
    TrendGifos();

    reqTrendigTerms().then(
        (Response) => {
            let busquedas = document.getElementById('TrendingTerms')
            busquedas.innerHTML = Response.data.slice(0,5).join(', ')
        }
    )

    let busqPalabra = document.getElementById('busqueda-barra')
    let busqIcon = document.getElementById('bus-icon')

    busqIcon.addEventListener('click', BuscarGifs)
    
    busqPalabra.addEventListener('keydown', (event)=>{
        if (event.keyCode === 13 ){
                BuscarGifs();
        }
    })

    busqPalabra.addEventListener('keypress',()=>{
        reqBusqSugerencia(busqPalabra.value, 4).then(
            (Response) => {
                let busBarra = document.getElementById('cont-barra')
                let sugerencias = document.getElementById('segeridos')
                let sugerenciasLista =document.getElementById('sug-lista')

                busBarra.style.marginTop = '10px'

                sugerencias.style.display = 'block'
                sugerencias.style.paddingTop = '10px'


                sugerenciasLista.innerHTML = '' 

                for (let i in Response.data){
                    let newLi = document.createElement('li')
                    newLi.innerHTML = Response.data[i].name
                    sugerenciasLista.append(newLi)
                }
            }
        )
    })

    function BuscarGifs (){
        reqBusqResult(busqPalabra.value,16).then(
            (Response) => {
                let contBusqueda = document.getElementById('bus-resul')
                let sugerencias = document.getElementById('segeridos')
                let busBarra = document.getElementById('cont-barra')

                busBarra.style.margin = '0'
                sugerencias.style.display = 'none'
                
                busBarra.style.margin = '0'
                contBusqueda.innerHTML = ''

                for (let item in Response.data){
                    renderGif(Response.data[item],contBusqueda);
                }
                busqPalabra.value = ''
            }
        )
    }

}//fin onload
