import {
    tema
} from '../../utils/_Tema.js';
import {
    subirGif
} from '../../utils/_request.js';

window.onload = () => {
    tema()

    let gif = document.getElementById('gif')
    let comenzar = document.getElementById('comenzar')
    let grabar = document.getElementById('grabar')
    let parar = document.getElementById('parar')
    let subir = document.getElementById('subir')

    comenzar.addEventListener('click', getStreamAndRecord)

    function getStreamAndRecord() {
        
        gif.innerHTML = `<span class="titulo">¿Nos das acceso<br>a tu cámara?</span>
                        <span class="texto">El acceso a tu camara será válido sólo<br>por el tiempo en el que estés creando el GIFO.</span>`

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

                gif.innerHTML = `<video id="video" class="video"></video>
                                <div class="label" id="label"></div>
                                `
                let video = document.getElementById('video')
                let label = document.getElementById('label')

                video.srcObject = stream;
                video.play()
                comenzar.style.display = 'none'
                grabar.style.display = 'block'

                grabar.addEventListener('click',  function grabarFunc() {

                    this.removeEventListener('click',grabarFunc)

                    grabar.style.display = 'none'
                    parar.style.display = 'block'

                    recorder.startRecording();
                    label.innerHTML = video.currentTime
                    
                    parar.addEventListener('click', function pararFunc() {
                        this.removeEventListener('click',pararFunc)

                        let form = new FormData();
                        recorder.stopRecording()
                        video.pause();

                        form.append('file', recorder.getBlob(), 'myGif.gif');

                        parar.style.display = 'none'
                        subir.style.display = 'block'

                        label.innerHTML = '<span class="link" id="repetir">repetir captura</span>'  
                        
                        subir.addEventListener('click', function subirFunc() {
                            this.removeEventListener('click',subirFunc)

                            // label.innerHTML = ''
                            console.log(form)
                            // subirGif(form).then((response) => {
                            //     console.log(response)
                            //     subir.style.display = 'none'
                            //     grabar.style.display = 'block'
                                
                            // })
                        })

                        let repetir = document.getElementById('label')  
                        repetir.addEventListener('click', () => {
                            label.innerHTML = ''
                            form = ''
                            comenzar.style.display = 'block'
                            grabar.style.display = 'none'
                            parar.style.display = 'none'
                            subir.style.display = 'none'
                            getStreamAndRecord()
                        })
                        
                    })
                })
            }
        )
    }//fin funcion
}// fin onload