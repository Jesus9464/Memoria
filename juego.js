let nombre = "";

Swal.fire({
    title: "Cual es tu nombre",
    input: 'text',
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: 'Cancelar',
    inputValidator: n => {
        if (!n) {
            return "Escriba un nombre";
        } else {
            return undefined;
        }
    }
})
    .then(({ value }) => {
        nombre = value
    }).catch(() => {
        console.log('hola');
    })

const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 10;




class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 1000);

    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        //toggle funciona como switch para agregar y quitar
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }
    }


    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor((Math.random() * 4)))
    }
    siguienteNivel() {
        this.subNivel = 0
        this.iluminarSecuencia()
        this.agregarElemntosClick()
    }

    transformarNumeroAColor(color) {
        switch (color) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'

            case 2:
                return 'naranja'

            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1

            case 'naranja':
                return 2

            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => {
                this.iluminarColor(color)
            }, 1000 * i);
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color)
            , 350);
    }


    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarElemntosClick() {
        //.bind es atar un codigo cpon otro
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)

    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }



    elegirColor(ev) {
        console.log(ev);
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subNivel]) {
            this.subNivel++
            if (this.subNivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500);
                }
            }
        } else {
            this.perdio()
        }
    }

    ganoElJuego() {
        swal('OHHH', 'Felicitaciones, ganaste el juego', 'success')
            .then(this.inicializar)
    }

    perdio() {
        swal(':(', 'Que mala onda,sigue intentando', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }


}

function empezarJuego() {
    Swal.fire(`Bienvenido ${nombre},  el juego va a comenzar, memoriza los colores`)
        .then(() => {
            window.juego = new Juego()
        });
}


