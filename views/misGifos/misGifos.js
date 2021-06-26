import {tema} from '/utils/_Tema.js'
import {TrendGifos} from '/utils/_TrendGifos.js'
import {renderMisGifs} from '/utils/_renderMiGif.js'
import { reqMisGifs } from '/utils/_request.js'


window.onload = ()=>{

    let verMas = document.getElementById('vermasFav')
    let gifos = document.getElementById('misGifos')
    let misGifos = []
    let gifPos = 0
    let gifsRender = 0

    tema()
    TrendGifos()
    

    let ids = JSON.parse(localStorage.getItem('MyGifs')) ? JSON.parse(localStorage.getItem('MyGifs')) : []

    reqMisGifs(ids).then((Response) => {
        misGifos = Response.data
        renderGifs()
    })
    
    verMas.addEventListener('click', () =>{
        let displayVermas = misGifos.length - gifPos < 12 ? 'none' : 'block'
        verMas.style.display = displayVermas
        gifsRender = misGifos.length - gifPos < 12 ? misGifos.length : 12
        for (let item = gifPos item < gifsRender item++ ) {
            renderGif(misGifos[item],gifos,'Favs')
            gifPos++
        }
    })

    function renderGifs (){

        if (misGifos.length > 0){
            let displayVermas = misGifos.length - gifPos < 12 ? 'none' : 'block'
            verMas.style.display = displayVermas

            gifsRender = misGifos.length - gifPos < 12 ? misGifos.length : 12

            for (let item = gifPos item < gifsRender item++ ) {
                renderMisGifs(misGifos[item],gifos,'MisG')
                gifPos++
            }
        }else{
            verMas.style.display = 'none'
            gifos.innerHTML = `<div class="sinResultados">
                                <img src="../../img/icon-mis-gifos-sin-contenido.svg" alt="sin resultado">
                                <p>¡Guarda tu primer GIFO en misGifos para que se muestre aquí!</p>
                                </div>`
        }
    }
}