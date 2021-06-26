import {guardarGIF,addFavoritos,borrarGif} from './_funciones.js'
import {planMisGifos,planZoomGif} from '/Templates/_plantillas.js'

/**
 * sirve para crear la estructura de un gif en la pagina Mis  Gifos
 * @param {*} dataItem obejeto de respuesta de la API GIPHY a por gif
 * @param {*} contenedorPadre referencia al contenedor padre donde se hara la insercion del gif
 * @param {*} fuente refencia para identificar en donde se dio el evento
 */
export function renderMisGifs(dataItem,contenedorPadre,fuente) {

    let gifos = contenedorPadre
    let Favoritos = JSON.parse(localStorage.getItem('Favoritos')) ? JSON.parse(localStorage.getItem('Favoritos')) : []
    let imgFav = Favoritos.findIndex(Favoritos => Favoritos.id === dataItem.id) > -1 ? 'active' : 'hover'

    const newGif = document.createElement('div')
    newGif.innerHTML = planMisGifos(dataItem.images['original'].url, dataItem.title, dataItem.id, imgFav,fuente)
    newGif.setAttribute('class', 'gifItem')
    gifos.append(newGif)

    //================= btn favoritos ======================
    let btnBor = document.getElementById(`${fuente}-Bor-${dataItem.id}`)
    btnBor.addEventListener('click', (event) => {
        event.stopPropagation()
        borrarGif(dataItem)
    })

    //================= btn Decargar ======================
    let btnDes = document.getElementById(`${fuente}-Des-${dataItem.id}`)
    btnDes.addEventListener('click', () => {
        guardarGIF(dataItem.images['original'].url, dataItem.title)
    })

    //================= btn Zoom ======================
    let btnZoom = document.getElementById(`${fuente}-Zoom-${dataItem.id}`)
    btnZoom.addEventListener('click', () => {

        let zoom = document.getElementById("Zoom_div")
        let zoomContenido = document.getElementById('zoom-cont')
        let cerrar = document.getElementById("zoom-cerrar")
        let zoomImgFav = Favoritos.findIndex(Favoritos => Favoritos.id === dataItem.id) > -1 ? 'active' : 'hover'

        zoom.style.display = "block"
        zoomContenido.innerHTML = planZoomGif(dataItem.images['original'].url, dataItem.title, dataItem.id, zoomImgFav)

        let zoomBtnFav = document.getElementById(`Zoom-Fav-${dataItem.id}`)
        zoomBtnFav.addEventListener('click', () => {
            addFavoritos(zoomBtnFav,  dataItem)
        })

        let zoomBtnDes = document.getElementById(`Zoom-Des-${dataItem.id}`)
        zoomBtnDes.addEventListener('click', () => {
            guardarGIF(dataItem.images['original'].url, dataItem.title)
        })

        cerrar.onclick = () => {
            zoom.style.display = "none"
            zoomContenido.innerHTML = ''
            // gifos.innerHTML = ''
            // TrendGifos()
        }

    })
}
