import {tema} from '/utils/_Tema.js'
import {TrendGifos} from '/utils/_TrendGifos.js'
import {renderGif} from '/utils/_renderGif.js'

window.onload = ()=>{

    let verMas = document.getElementById('vermasFav')
    let gifos = document.getElementById('favoritos')
    let Favoritos = []
    let gifPos = 0
    let gifsRender = 0

    tema()
    TrendGifos()
    rederFavs()

    verMas.addEventListener('click', () =>{
        let displayVermas = Favoritos.length - gifPos < 12 ? 'none' : 'block'
        verMas.style.display = displayVermas
        gifsRender = Favoritos.length - gifPos < 12 ? Favoritos.length : 12
        for (let item = gifPos item < gifsRender item++ ) {
            renderGif(Favoritos[item],gifos,'Favs')
            gifPos++
        }
    })


    function rederFavs (){
        Favoritos = localStorage.getItem('Favoritos')
        Favoritos = JSON.parse(Favoritos)

        if (Favoritos){
            let displayVermas = Favoritos.length - gifPos < 12 ? 'none' : 'block'
            verMas.style.display = displayVermas

            gifsRender = Favoritos.length - gifPos < 12 ? Favoritos.length : 12

            for (let item = gifPos item < gifsRender item++ ) {
                renderGif(Favoritos[item],gifos,'Favs')
                gifPos++
            }
        }else{
            verMas.style.display = 'none'
            gifos.innerHTML = `<div class="sinResultados">
                                <img src="../../img/icon-fav-sin-contenido.svg" alt="sin resultado">
                                <p>¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!</p>
                                </div>`
        }
    }
}