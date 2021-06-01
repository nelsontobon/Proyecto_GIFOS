import {tema} from '../utils/_Tema.js';
import {TrendGifos} from '../../utils/_TrendGifos.js'
import {renderGif} from '../../utils/_renderGif.js'

window.onload = ()=>{

    tema()
    TrendGifos();
    rederFavs();

    function rederFavs (){
        let Favoritos = localStorage.getItem('Favoritos')
        let gifos = document.getElementById('favoritos')
        Favoritos = JSON.parse(Favoritos);
        console.log(Favoritos)

        for (let item in Favoritos ) {
            renderGif(Favoritos[item],gifos)
        }
    }
}//fin onload
