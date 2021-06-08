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

export async function reqTrendigTerms(){
    const req = new URL('https://api.giphy.com/v1/trending/searches')
    req.searchParams.append('api_key', 'FKRvUkbOjkoSEknyMM1l6ZaA1WIdRdqJ')

    let response = await fetch(req)
    response = await response.json()

    return response
}


