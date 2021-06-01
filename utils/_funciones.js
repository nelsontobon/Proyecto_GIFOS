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

export function addFavoritos(btnFav,Favoritos,data){
    if (Favoritos.length > 0 ){
        let indice = Favoritos.findIndex(Favoritos => Favoritos.id === data.id);
        if (indice > -1){
            Favoritos.splice(indice,1)
            localStorage.setItem('Favoritos', JSON.stringify(Favoritos))
            btnFav.innerHTML =  '<img src="../../img/icon-fav-hover.svg" alt="Fav">'
        }else{
            Favoritos.push(data)
            localStorage.setItem('Favoritos', JSON.stringify(Favoritos))
            btnFav.innerHTML =  '<img src="../../img/icon-fav-active.svg" alt="Fac"></img>'
        }   
        
    }else{
        Favoritos.push(data)
        localStorage.setItem('Favoritos', JSON.stringify(Favoritos))
        btnFav.innerHTML =  '<img src="../../img/icon-fav-active.svg" alt="Fav"></img>'
    }
}