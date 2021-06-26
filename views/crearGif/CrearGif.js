import {
    tema
} from '../../utils/_Tema.js';
import {
    subirGif
} from '../../utils/_request.js';
import { addMyGif } from '../../utils/_funciones.js';



window.onload = () => {
    tema()
    imgTema()
    let nocturno = document.getElementById('nocturno')
    nocturno.addEventListener('click',imgTema)


    let pantallas = document.getElementsByClassName('pantalla')
    let botones = document.getElementsByClassName('btn')
    let pasos = document.getElementsByClassName('pasosItem')

    let comenzar = document.getElementById('comenzar')
    let grabar = document.getElementById('grabar')
    let parar = document.getElementById('parar')
    let subir = document.getElementById('subir')

    let video = document.getElementById('video')
    let label = document.getElementById('label')

    comenzar.addEventListener('click', getStreamAndRecord)

    function getStreamAndRecord() {
        
        cambiarPantalla(0,1)
        cambiarPaso(0,0)

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: {ideal: 480},
                height: {ideal: 320}
            }
        }).then(
            (stream) => {

                let recorder = RecordRTC(stream, {
                    type: 'gif',
                    frameRate: 1,
                    quality: 10,
                    hidden: 240
                });

                cambiarPantalla(1,2)
                cambiarBotones(0,1)
                cambiarPaso(0,1)

                video.srcObject = stream;
                video.play()

                grabar.addEventListener('click',  function grabarFunc() {

                    this.removeEventListener('click',grabarFunc)
                    cambiarBotones(1,2)

                    recorder.startRecording();
                    let tiempo = setInterval(Tiempo,1000)
                    
                    parar.addEventListener('click', function pararFunc() {
                        clearInterval(tiempo);
                        this.removeEventListener('click',pararFunc)

                        let form = new FormData();
                        recorder.stopRecording()
                        video.pause();

                        form.append('file', recorder.getBlob(), 'myGif.gif');

                        cambiarBotones(2,3)

                        subir.addEventListener('click', function subirFunc() {
                            this.removeEventListener('click',subirFunc)
                            cambiarPaso(1,2)
                            subirGif(form).then((response) => {
                                console.log(response)
                                if (response){
                                    addMyGif(response.data.id)
                                    cambiarPantalla(2,0)
                                    cambiarBotones(3,0)
                                    pasos[2].classList.remove("pasosItemActive");
                                }
                                
                            })
                        })
                        
                        
                        label.innerHTML = '<span class="link" id="repetir">repetir captura</span>' 
                        let repetir = document.getElementById('label')  
                        repetir.addEventListener('click', () => {
                            label.innerHTML = ''
                            form = ''
                            cambiarPantalla(2,0)
                            cambiarBotones(3,0)

                        })
                        
                    })
                })
            }
        )
    }

    function cambiarPantalla (anterior, siguiente){
        pantallas[anterior].style.display = 'none'
        pantallas[siguiente].style.display = 'block'
    }

    function cambiarBotones (anterior, siguiente){
        botones[anterior].style.display = 'none'
        botones[siguiente].style.display = 'block'
    }

    function cambiarPaso (anterior, siguiente){
        pasos[anterior].classList.remove("pasosItemActive");
        pasos[siguiente].classList.add("pasosItemActive");
    }

    function Tiempo(){
        let s = parseInt(video.currentTime % 60);
        let m = parseInt((video.currentTime / 60) % 60);
        label.innerHTML = '0:'+ m + ':' + s ;
    }   

    function imgTema(){
        let camara = document.getElementById('camara-img')
        let pelicula = document.getElementById('pelicula-img')
        let tema = localStorage.getItem('tema')

        if(tema == 'oscuro'){
            camara.setAttribute('src','/img/camara-modo-noc.svg')
            pelicula.setAttribute('src','/img/pelicula-modo-noc.svg')        }
        else if (tema == 'claro'){
            camara.setAttribute('src','/img/camara.svg')
            pelicula.setAttribute('src','/img/pelicula.svg')
        }
    }
}// fin onload