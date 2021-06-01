import {guardarGIF,addFavoritos} from './_funciones.js';
import {planTrendingGifos,planZoomGif} from '../Templates/_plantillas.js'

/**
 * 
 * @param {*} dataItem obejeto de respuesta de la API GIPHY a por gif
 * @param {*} contenedorPadre referencia al contenedor padre donde se hara la insercion del gif
 */
export function renderGif(dataItem,contenedorPadre) {

    let gifos = contenedorPadre;
    let Favoritos = JSON.parse(localStorage.getItem('Favoritos')) ? JSON.parse(localStorage.getItem('Favoritos')) : []


    let imgFav = Favoritos.findIndex(Favoritos => Favoritos.id === dataItem.id) > -1 ? 'active' : 'hover'

    const newGif = document.createElement('div');
    newGif.innerHTML = planTrendingGifos(dataItem.images['original'].url, dataItem.title, dataItem.id, imgFav);
    newGif.setAttribute('class', 'gifItem')
    gifos.append(newGif)

    //================= btn favoritos ======================
    let btnFav = document.getElementById(`Fav-${dataItem.id}`)
    btnFav.addEventListener('click', () => {
        addFavoritos(btnFav, Favoritos, dataItem)
    })

    //================= btn Decargar ======================
    let btnDes = document.getElementById(`Des-${dataItem.id}`)
    btnDes.addEventListener('click', () => {
        guardarGIF(dataItem.images['original'].url, dataItem.title)
    })

    //================= btn Zoom ======================
    let btnZoom = document.getElementById(`Zoom-${dataItem.id}`)
    btnZoom.addEventListener('click', () => {


        let zoom = document.getElementById("Zoom_div");
        let zoomContenido = document.getElementById('zoom-cont')
        let cerrar = document.getElementById("zoom-cerrar");
        let zoomImgFav = Favoritos.findIndex(Favoritos => Favoritos.id === dataItem.id) > -1 ? 'active' : 'hover'

        zoom.style.display = "block";
        zoomContenido.innerHTML = planZoomGif(dataItem.images['original'].url, dataItem.title, dataItem.id, zoomImgFav)

        let zoomBtnFav = document.getElementById(`Zoom-Fav-${dataItem.id}`)
        zoomBtnFav.addEventListener('click', () => {
            addFavoritos(zoomBtnFav, Favoritos, dataItem)
        })

        let zoomBtnDes = document.getElementById(`Zoom-Des-${dataItem.id}`)
        zoomBtnDes.addEventListener('click', () => {
            guardarGIF(dataItem.images['original'].url, dataItem.title)
        })

        cerrar.onclick = () => {
            zoom.style.display = "none";
            zoomContenido.innerHTML = '';
            // gifos.innerHTML = '';
            // TrendGifos()
        }

    })
}
