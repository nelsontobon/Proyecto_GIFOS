/**
 * 
 * @param {*} gifos número de GIFos a consultar
 * @returns Trendinf de Gifos en formato JSON
 */

export async function reqTrendigGifos(gifos){
    const req = new URL('https://api.giphy.com/v1/gifs/trending')
    req.searchParams.append('api_key', 'FKRvUkbOjkoSEknyMM1l6ZaA1WIdRdqJ')
    req.searchParams.append('limit', gifos)
    // req.searchParams.append('rating', 'g')

    let response = await fetch(req)
    response = await response.json()

    return response
}

/**
 * funcion para hacer la peticion de la busqueda de gifos por determinada palabra
 * @param {*} busqueda paralabra a buscar
 * @param {*} gifos numero de gifos a consultar
 * @param {*} offset 
 * @returns json con la informacion de gifos encontrados 
 */

export async function reqBusqResult(busqueda, gifos, offset){
    const req = new URL('https://api.giphy.com/v1/gifs/search')
    req.searchParams.append('api_key', 'FKRvUkbOjkoSEknyMM1l6ZaA1WIdRdqJ')
    req.searchParams.append('q', busqueda)
    req.searchParams.append('limit', gifos)
    req.searchParams.append('offset', offset)
    
    // req.searchParams.append('rating', 'g')

    let response = await fetch(req)
    response = await response.json()

    return response
}

/**
 * peticion de sugerencias cuando se esta buscando un gif
 * @param {*} busqueda palabra a buscar
 * @param {*} items numero de sugerencia
 * @returns json con sugerencias 
 */

export async function reqBusqSugerencia(busqueda,items){ 
    const req = new URL('https://api.giphy.com/v1/gifs/search/tags')
    req.searchParams.append('api_key', 'FKRvUkbOjkoSEknyMM1l6ZaA1WIdRdqJ')
    req.searchParams.append('q', busqueda)
    req.searchParams.append('limit', items)
    // req.searchParams.append('rating', 'g')

    let response = await fetch(req)
    response = await response.json()

    return response
}

/**
 * consulta las categorias mas buscadas
 * @returns json con categorias
 */
export async function reqTrendigTerms(){
    const req = new URL('https://api.giphy.com/v1/trending/searches')
    req.searchParams.append('api_key', 'FKRvUkbOjkoSEknyMM1l6ZaA1WIdRdqJ')

    let response = await fetch(req)
    response = await response.json()

    return response
}

/**
 * funcion para subir un gif
 * @param {*} form dato con la informacion del gifo a subir
 * @returns json con el id del gif subido
 */
export async function subirGif(form) {
    form.append('api_key', 'FKRvUkbOjkoSEknyMM1l6ZaA1WIdRdqJ')

    let response = await fetch('https://upload.giphy.com/v1/gifs', {
        method: 'POST',
        body: form
    })

    response = await response.json()
    return response
}

/**
 * peticion para consultar un gif por su id
 * @param {*} ids ids de gifs a consultar
 * @returns json con la informacion del gif
 */
export async function reqMisGifs(ids){
    const req = new URL('https://api.giphy.com/v1/gifs')
    req.searchParams.append('api_key', 'FKRvUkbOjkoSEknyMM1l6ZaA1WIdRdqJ')
    req.searchParams.append('ids', ids)

    let response = await fetch(req)
    response = await response.json()

    return response
}