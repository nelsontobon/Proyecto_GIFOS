/**
 * Estructura del GIF en la seccion de trending
 * @param {*} url URL del gif
 * @param {*} titulo titulo del GIF
 * @param {*} id ID que se le quiere poner al gif
 * @param {*} imgFav si el gif ya se encuentra en favoritos cambia el tipo de img antes de pintar
 * @returns 
 */


export function planTrendingGifos (url,titulo, id, imgFav,fuente) { 
    return  `   <img src="${url}"  class="img">
                <div class="gifHover">
                    <div class="icons">
                        <button class="icon" id= "${fuente}-Fav-${id}" type="button"><img src="/img/icon-fav-${imgFav}.svg" alt="fav"></button>
                        <button class="icon" id= "${fuente}-Des-${id}" type="button"><img src="/img/icon-download-hover.svg" alt="des"></button>
                        <button class="icon" id= "${fuente}-Zoom-${id}" type="button"><img src="/img/icon-max-normal.svg" alt="max"></button>
                    </div>
                    <div class="text">
                        <span class="user">
                            User
                        </span>
                        <span class="gif-titulo">
                        ${titulo}
                        </span>
                    </div>
                </div>
            `;
    }

/**
 * Estructura del GIF cuando se activa el evento de ampliar
 * @param {*} url URL del gif
 * @param {*} titulo titulo del GIF
 * @param {*} id ID que se le quiere poner al gif
 * @param {*} zoomImgFav  si el gif ya se encuentra en favoritos cambia el tipo de img antes de pintar
 * @returns 
 */
export function planZoomGif (url, titulo, id, zoomImgFav){
    return `    <img class="zoom-img" src="${url}"  id="imgZoom">
                <div class="barra" id="barra_info">
                    <div class="barra-texto">
                        <span class="user">
                            User
                        </span>
                        <br>
                        <span class="barra_titulo">
                            ${titulo}
                        </span>
                    </div>
                    <div class="barra-icon">
                        <button class="icon" id= "Zoom-Fav-${id}" type="button"><img src="/img/icon-fav-${zoomImgFav}.svg" alt="fav"></button>
                        <button class="icon" id= "Zoom-Des-${id}" type="button"><img src="/img/icon-download.svg" alt="des"></button>
                    </div>
                </div>
            `;
}


export function planMisGifos (url,titulo, id, imgDel,fuente) { 
    return  `   <img src="${url}"  class="img">
                <div class="gifHover">
                    <div class="icons">
                        <button class="icon" id= "${fuente}-Bor-${id}" type="button"><img src="/img/icon-trash-hover.svg" alt="fav"></button>
                        <button class="icon" id= "${fuente}-Des-${id}" type="button"><img src="/img/icon-download-hover.svg" alt="des"></button>
                        <button class="icon" id= "${fuente}-Zoom-${id}" type="button"><img src="/img/icon-max-hover.svg" alt="max"></button>
                    </div>
                    <div class="text">
                        <span class="user">
                            User
                        </span>
                        <span class="gif-titulo">
                        ${titulo}
                        </span>
                    </div>
                </div>
            `;
    }