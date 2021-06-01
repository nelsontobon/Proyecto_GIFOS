window.onload = ()=>{

    let tema = () => {
        let nocturno = document.getElementById('nocturno');
        let tema = localStorage.getItem('tema')

        if(tema == 'oscuro'){
            document.body.classList.toggle('dark');
            nocturno.innerHTML= 'Modo Diurno';
        }
        else if (tema == 'claro'){
            document.body.classList.remove('dark');
            nocturno.innerHTML= 'Modo Nocturno';
        }else{
            localStorage.setItem('tema','claro')
            nocturno.innerHTML= 'Modo Nocturno';
        }
        
    
        nocturno.addEventListener('click',() => {
                let tema = localStorage.getItem('tema')
                document.body.classList.toggle('dark');
    
                if(tema == 'oscuro'){
                    localStorage.setItem('tema','claro')
                    nocturno.innerHTML= 'Modo Nocturno';
                }
                else if (tema == 'claro'){
                    localStorage.setItem('tema','oscuro')
                    nocturno.innerHTML= 'Modo Diurno';
                }
                
            }
        )
    }


    let trendigGifos = (gifos) => {

        const req = new URL('https://api.giphy.com/v1/gifs/trending')
        req.searchParams.append('api_key', 'FKRvUkbOjkoSEknyMM1l6ZaA1WIdRdqJ')
        req.searchParams.append('limit', gifos)
        // req.searchParams.append('rating', 'g')

        fetch(req).then(
            Response => Response.json()
            ).then(
                Response => {
                    let gifos = document.getElementById('GifosTrend');
                    let btnFav = [], btnDes = [] , btnZoom = [];
                    let Favoritos = JSON.parse(localStorage.getItem('Favoritos')) ? JSON.parse(localStorage.getItem('Favoritos')) : []
                    console.log(Response);

                    for (let item in Response.data ) {
                        let imgFav = Favoritos.findIndex(Favoritos => Favoritos.id === Response.data[item].id) > -1 ? 'active' : 'hover'
            
                        const newGif = document.createElement('div');
                        newGif.innerHTML = `<img src="${Response.data[item].images['original'].url}"  class="img">
                                            <div class="gifHover">
                                                <div class="icons">
                                                    <button class="icon" id= "Fav-${Response.data[item].id}" type="button"><img src="./img/icon-fav-${imgFav}.svg" alt="fav"></button>
                                                    <button class="icon" id= "Des-${Response.data[item].id}" type="button"><img src="./img/icon-download-hover.svg" alt="des"></button>
                                                    <button class="icon" id= "Zoom-${Response.data[item].id}" type="button"><img src="./img/icon-max-normal.svg" alt="max"></button>
                                                </div>
                                                <div class="text">
                                                    <span>
                                                        User
                                                    </span>
                                                    <span>
                                                    ${Response.data[item].title}
                                                    </span>
                                                </div>
                                            </div>
                                        `

                        newGif.setAttribute('class', 'gifItem')
                        gifos.append(newGif)

                        //================= btn favoritos ======================
                        btnFav[item] = document.getElementById(`Fav-${Response.data[item].id}`)  

                        btnFav[item].addEventListener('click', ()=> {
                            if (Favoritos.length > 0 ){
                                let indice = Favoritos.findIndex(Favoritos => Favoritos.id === Response.data[item].id);
                                if (indice > -1){
                                    Favoritos.splice(indice,1)
                                    localStorage.setItem('Favoritos', JSON.stringify(Favoritos))
                                    btnFav[item].innerHTML =  '<img src="./img/icon-fav-hover.svg" alt="des">'
                                }else{
                                    Favoritos.push({id: Response.data[item].id, url: Response.data[item].images['original'].url})
                                    localStorage.setItem('Favoritos', JSON.stringify(Favoritos))
                                    btnFav[item].innerHTML =  '<img src="./img/icon-fav-active.svg" alt="des"></img>'
                                }   
                                
                            }else{
                                Favoritos.push({id: Response.data[item].id, url: Response.data[item].images['original'].url})
                                localStorage.setItem('Favoritos', JSON.stringify(Favoritos))
                                btnFav[item].innerHTML =  '<img src="./img/icon-fav-active.svg" alt="des"></img>'
                            }
                        })
                        //================= btn Decargar ======================
                        btnDes[item] = document.getElementById(`Des-${Response.data[item].id}`)  
                        btnDes[item].addEventListener('click', ()=> {
                            console.log('Descargar:',`${Response.data[item].images['original'].url}`)

                            guardarGIF(Response.data[item].images['original'].url, Response.data[item].title)

                        })
                        //================= btn Zoom ======================
                        btnZoom[item] = document.getElementById(`Zoom-${Response.data[item].id}`)  
                        btnZoom[item].addEventListener('click', ()=> {
                            console.log('Zoom:',Response.data[item].id)

                            let zoom = document.getElementById("Zoom_div");
                            let zoomImg = document.getElementById("imgZoom");
                            let barra = document.getElementById("barra_info");
                            let span = document.getElementsByClassName("cerrar")[0];
                            
                            zoom.style.display = "block";
                            zoomImg.src = Response.data[item].images['original'].url;
                            barra.innerHTML = Response.data[item].title;
                            
                            span.onclick =  () => {
                                zoom.style.display = "none";
                            }
                        })
                    }  
                }
            )
    }

    
    async function guardarGIF(urlGIF,title){
        let response = await fetch(urlGIF);
        let urlBlob = await response.blob();                                                
        let url =  URL.createObjectURL(urlBlob);
        let a =  document.createElement('a');
        a.href = url;
        a.download = title ;
        a.click()
    }

    tema();
    trendigGifos(3);
    
}