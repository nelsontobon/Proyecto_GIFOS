import {tema} from '../../utils/_Tema.js';
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

        for (let item in Favoritos ) {
            // Favoritos[item].id = Favoritos[item]
            renderGif(Favoritos[item],gifos,'Favs')
        }
    }
}//fin onload
