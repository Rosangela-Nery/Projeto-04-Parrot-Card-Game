let quantidadeCartas = 0

function pegarQuantidade() {
    let numeroDeCartas = Number(prompt(`Quantas cartas você quer jogar? 
Obs: só poderá inserir números pares, de 4 a 14.`));

    if (numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 !== 0) {
        pegarQuantidade();
    }
    else {
        quantidadeCartas = numeroDeCartas;
    }
}

pegarQuantidade();

let galeria = document.querySelector(".galeriaDeCartas");
let images = [
    "1.gif",
    "2.gif",
    "3.gif",
    "4.gif",
    "5.gif",
    "6.gif",
    "7.gif"
];

let cartaHTML = "";

for (let index = 0; index < quantidadeCartas/2; index++) {
    cartaHTML += `
    <div class="memoria-carta" data-carta="${images[index]}">
        <div class="front-face">
            <img class="verso" src="imagens/front.png"/>
        </div>
        <div class="back-face">
            <img class="frente" src="imagens/${images[index]}"/>
        </div>
    </div>
  `;
}

galeria.innerHTML = cartaHTML + cartaHTML;

let cartas = document.querySelectorAll(".memoria-carta");
let primeiraCarta = 0;
let segundaCarta = 0;
let cartaNova = false;
let corresponde = false;

function virarCarta () {

    let carta_clicada = this.classList.contains("virar");

    if (carta_clicada === false) {
        if(cartaNova) return false;
        this.classList.add('virar');

        if(!primeiraCarta) {
            primeiraCarta = this;
            return false;
        }
        segundaCarta = this;

        cartaCorrenpondia();
    }
}

function cartaCorrenpondia() {
    let corresponde = primeiraCarta.dataset.carta === segundaCarta.dataset.carta;

    if(corresponde == false) {
        return desativarCarta();
    }
    removerCarta(corresponde);
}

function desativarCarta() {
    cartaNova = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('virar');
        segundaCarta.classList.remove('virar');

        removerCarta();

    }, 1000)
}

function removerCarta() {

    if(corresponde) {
        primeiraCarta.removeEvenListener('virar', virarCarta);
        segundaCarta.removeEvenListener('virar', virarCarta);
    }
    [primeiraCarta, segundaCarta, cartaNova] = [null, null, false];
}

function baralharCarta() {
    cartas.forEach(carta => {
        let numeroAleatorio = Math.floor(Math.random() * 14);
        carta.style.order = numeroAleatorio;
    })
}
baralharCarta();

cartas.forEach(carta => carta.addEventListener('click', virarCarta));
