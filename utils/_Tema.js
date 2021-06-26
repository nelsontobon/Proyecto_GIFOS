/**
 * Funcion para verificar el tipo de tema, tambien detecta el evento del cambio de tema
 */
export function tema() {
    let nocturno = document.getElementById('nocturno')
    let tema = localStorage.getItem('tema')
    let logo = document.getElementById('Header-logo')

    if(tema == 'oscuro'){
        document.body.classList.toggle('dark')
        nocturno.innerHTML= 'Modo Diurno'
        logo.setAttribute('src','/img/logo-modo-noc.svg')

    }
    else if (tema == 'claro'){
        document.body.classList.remove('dark')
        nocturno.innerHTML= 'Modo Nocturno'
        logo.setAttribute('src','/img/logo-desktop.svg')

    }else{
        localStorage.setItem('tema','claro')
        nocturno.innerHTML= 'Modo Nocturno'
        logo.setAttribute('src','/img/logo-desktop.svg')
    }


    nocturno.addEventListener('click',() => {
            let tema = localStorage.getItem('tema')
            document.body.classList.toggle('dark')

            if(tema == 'oscuro'){
                localStorage.setItem('tema','claro')
                nocturno.innerHTML= 'Modo Nocturno'
                logo.setAttribute('src','/img/logo-desktop.svg')
            }
            else if (tema == 'claro'){
                localStorage.setItem('tema','oscuro')
                nocturno.innerHTML= 'Modo Diurno'
                logo.setAttribute('src','/img/logo-modo-noc.svg')
            }
        }
    )
}