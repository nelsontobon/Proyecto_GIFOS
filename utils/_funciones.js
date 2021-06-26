/**
 * Funcion para descargar un GIF 
 * @param {*} urlGIF url del GIF a descargar
 * @param {*} title titulo del GIF
 */

export async function guardarGIF(urlGIF,title){
    let response = await fetch(urlGIF);
    let urlBlob = await response.blob();                                                
    let url =  URL.createObjectURL(urlBlob);
    let a =  document.createElement('a');
    a.href = url;
    a.download = title ;
    a.click()

}

/**
 * Agregar un GIF a la seecion de favoritos
 * @param {*} btnFav Referencia al boton para agregar a favoritos del GIF
 * @param {*} Favoritos datos del Local storage del item 'Favoritos'
 * @param {*} data Datos del request TrendGifos 
 */

export function addFavoritos(btnFav,data){
    let Favoritos = JSON.parse(localStorage.getItem('Favoritos')) ? JSON.parse(localStorage.getItem('Favoritos')) : []
    if (Favoritos.length > 0 ){
        let indice = Favoritos.findIndex(Favoritos => Favoritos.id === data.id );
        if (indice > -1){
            Favoritos.splice(indice,1)
            if (Favoritos.length > 0){
                localStorage.setItem('Favoritos', JSON.stringify(Favoritos))
                btnFav.innerHTML =  '<img src="/img/icon-fav-hover.svg" alt="Fav">'
            }else{
                localStorage.removeItem('Favoritos')
            }
            
            
        }else{
            Favoritos.push(data)
            localStorage.setItem('Favoritos', JSON.stringify(Favoritos))
            btnFav.innerHTML =  '<img src="/img/icon-fav-active.svg" alt="Fac"></img>'
        }   
    }else{
        Favoritos.push(data)
        localStorage.setItem('Favoritos', JSON.stringify(Favoritos))
        btnFav.innerHTML =  '<img src="/img/icon-fav-active.svg" alt="Fav"></img>'
    }
}

export function addMyGif(id){
    let MyGifs = JSON.parse(localStorage.getItem('MyGifs')) ? JSON.parse(localStorage.getItem('MyGifs')) : []
    MyGifs.push(id)
    localStorage.setItem('MyGifs', JSON.stringify(MyGifs))
}

export function borrarGif(data){
    let misGifos = JSON.parse(localStorage.getItem('MyGifs')) 
    if (misGifos.length > 0 ){
        let indice = misGifos.findIndex(Gifos => Gifos === data.id );
        if (indice > -1){
            console.log('encontrado');
            misGifos.splice(indice,1)
            if (misGifos.length > 0){
                localStorage.setItem('MyGifs', JSON.stringify(misGifos))
            }else{
                localStorage.removeItem('MyGifs')
            }
            
        }else{
            console.log('no exitste');
        }   
    }

    location.reload();

}