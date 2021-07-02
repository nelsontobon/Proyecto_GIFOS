import {tema} from '/utils/_Tema.js'
import {TrendGifos} from '/utils/_TrendGifos.js'
import {reqBusqResult,reqBusqSugerencia,reqTrendigTerms} from '/utils/_request.js'
import {renderGif} from '/utils/_renderGif.js'

window.onload = ()=>{

    tema()
    TrendGifos()

    reqTrendigTerms().then(
        (Response) => {
            let busquedas = document.getElementById('TrendingTerms')
            busquedas.innerHTML = Response.data.slice(0,5).join(', ')
        }
    )

    let busqPalabra = document.getElementById('busqueda-barra')
    let busqIconBucar = document.getElementById('bus-icon-busq')
    
    let verMas = document.getElementById('vermas')
    let gifsPos = 0
    let verMasFlag = 0

    let busqIconClose = document.getElementById('bus-icon-close')
    let sugerenciasClick = []

    busqIconClose.addEventListener('click',()=>{
        let busContenedores = document.getElementsByClassName('busq')
        busContenedores[0].style.display = 'none'
        busqPalabra.value = ''
        busqIconBucar.style.display = 'block'
        busqIconClose.style.display = 'none'
        verMasFlag = 0
    })

    busqIconBucar.addEventListener('click',()=>{
        let busContenedores = document.getElementsByClassName('busq')
        busContenedores[2].innerHTML = ''

        busqIconBucar.style.display = 'none'
        busqIconClose.style.display = 'block'

        gifsPos = 0
        verMasFlag = 0
        BuscarGifs()
    } )
    
    busqPalabra.addEventListener('keydown', (event)=>{
        if (event.keyCode === 13 ){
                let busContenedores = document.getElementsByClassName('busq')
                busContenedores[2].innerHTML = ''
                busqIconBucar.style.display = 'none'
                busqIconClose.style.display = 'block'
                gifsPos = 0
                verMasFlag = 0
                BuscarGifs()
        }
    })

    verMas.addEventListener('click', () =>{
        verMasFlag = 1
        BuscarGifs()
    
    })

    busqPalabra.addEventListener('input',()=>{
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
                    newLi.setAttribute('id', `sug-${i}`)
                    sugerenciasLista.append(newLi)

                    sugerenciasClick[i] = document.getElementById(`sug-${i}`)
                    sugerenciasClick[i].addEventListener('click', () => {
                        busqPalabra.value = sugerenciasClick[i].textContent
                        BuscarGifs()
                    })
                }

            }
        )
    })

    function BuscarGifs (){
        reqBusqResult(busqPalabra.value, 12, gifsPos).then(
            (Response) => {
                
                let busContenedores = document.getElementsByClassName('busq')
                let sugerencias = document.getElementById('segeridos')
                let busBarra = document.getElementById('cont-barra')

                busBarra.style.margin = '0'
                sugerencias.style.display = 'none'
                
                busBarra.style.margin = '0'

                busContenedores[0].style.display = 'flex'
                
                busContenedores[1].innerHTML = busqPalabra.value
                if (Response.data.length != 0 || verMasFlag === 1){

                    busContenedores[3].style.display = 'block'

                    for (let item in Response.data){
                        renderGif(Response.data[item],busContenedores[2])
                        gifsPos++
                    }
                }else{
                    busContenedores[3].style.display = 'none'
                    busContenedores[2].innerHTML = `<div class="sinResultados">
                        <img src="./img/icon-busqueda-sin-resultado.svg" alt="sin resultado">
                        <p>Intenta con otra búsqueda.</p>
                        </div>`
                }

                

            }
        )
    }

}//fin onload
