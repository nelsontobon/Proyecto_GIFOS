/**
 * Funcion para verificar el tipo de tema, tambien detecta el evento del cambio de tema
 */
export function tema() {
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