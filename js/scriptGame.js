
function teclaPressionada(e) {
    e = e || window.event;
    let key = e.keyCode || e.which;
    return String.fromCharCode(key);
}

function selecionarElemento(seletor) {
    const elemento = document.querySelector(seletor)
    return elemento
}

function selecionarMultiplosElementos(seletor) {
    const elemento = document.querySelectorAll(seletor)
    return elemento
}

function moverEsquerda() {
    if (carro.parentElement.className == "pista1") return

    else if (carro.parentElement.className == "pista2") {
        const filhoPai = selecionarElemento('.slot-carro')
        filhoPai.style.display = "none"
        const novoPai = selecionarElemento('.pista1')
        filhoPai.style.display = "block"
        novoPai.appendChild(filhoPai)
    }

    else if (carro.parentElement.className == "pista3") {
        const filhoPai = selecionarElemento('.slot-carro')
        filhoPai.style.display = "none"
        const novoPai = selecionarElemento('.pista2')
        filhoPai.style.display = "block"
        novoPai.appendChild(filhoPai)
    }
}

function moverDireita() {
    if (carro.parentElement.className == "pista3") return

    else if (carro.parentElement.className == "pista1") {
        const filhoPai = selecionarElemento('.slot-carro')
        filhoPai.style.display = "none"
        const novoPai = selecionarElemento('.pista2')
        filhoPai.style.display = "block"
        novoPai.appendChild(filhoPai)
    }

    else if (carro.parentElement.className == "pista2") {
        const filhoPai = selecionarElemento('.slot-carro')
        filhoPai.style.display = "none"
        const novoPai = selecionarElemento('.pista3')
        filhoPai.style.display = "block"
        novoPai.appendChild(filhoPai)
    }
}

const carro = document.querySelector('.slot-carro')

document.onkeypress = (e) => {
    let tecla = teclaPressionada(e)

    if (tecla == 'a') {
        moverEsquerda()
    }
    else if (tecla == 'd') {
        moverDireita()
    }
}


function gerarBlocos() {
    let numero = Math.floor((Math.random() * 3) + 1)
    let numero2 = Math.floor((Math.random() * 3) + 1)

    const pista = selecionarElemento(`.pista${numero}`)
    const pista2 = selecionarElemento(`.pista${numero2}`)

    let bloco = document.createElement('div')
    bloco.classList.add(`bloco${numero}`)

    let bloco2 = document.createElement('div')
    bloco2.classList.add(`bloco${numero2}`)

    pista.appendChild(bloco)
    pista2.appendChild(bloco2)
    moverBlocos(bloco, 10)
    moverBlocos(bloco2, 10)

}

function moverBlocos(blocoGerado, velocidade) {
    let valor = 0
    const div = selecionarElemento("." + blocoGerado.classList)
    setInterval(() => {
        valor += velocidade

        div.style.top = valor + "px"

        if(valor == "800"){
            pontuar(1)
        }
    }, 1)
}

let pontoGlobal = 0
function pontuar(pontoAdquirido) {
    const pont = selecionarElemento('.pontos')

    pontoGlobal += 1
    pont.innerHTML = pontoGlobal

}

function iniciarGame() {
    // setInterval(() => {
    //     gerarBlocos()
    // }, 1000)

    const temporizador = setInterval(() => {
        gerarBlocos()

        if (colidiu(passaro, barreiras)) {
            clearInterval(temporizador)
        }
    }, 1000)

}

document.querySelector('#play').onclick = iniciarGame