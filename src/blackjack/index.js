import _ from 'underscore';
import {crearDeck, pedirCarta, valorCarta} from './usecases';

let deck = [];
const tipos = ['C', 'D', 'H', 'S'],
  especiales = ['A', 'J', 'Q', 'K'];

let puntosJugadores = []; // El último será siempre el de la computadora

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir'),
  btnDetener = document.querySelector('#btnDetener'),
  btnNuevo = document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll('small'),
  divCartasJugadores = document.querySelectorAll('.divCartas');

// Esta función inicializa el juego
const inicializarJuego = (numJugadores = 2) => {
  deck = crearDeck(tipos, especiales);
  puntosJugadores = [];
  for (let i = 0; i < numJugadores; i++) {
    puntosJugadores.push(0);
  }

  puntosHTML.forEach(elem => elem.innerText = 0);
  divCartasJugadores.forEach(elem => elem.innerHTML = '');

  btnPedir.disabled = false;
  btnDetener.disabled = false;

}

// Turno: 0 = primer jugador y el último será la computadora
const acumularPuntos = (carta, turno) => {
  puntosJugadores[turno] += valorCarta(carta);
  puntosHTML[turno].innerText = puntosJugadores[turno];
  return puntosJugadores[turno];
}

const crearCarta = (carta, turno) => {
  const imgCarta = document.createElement('img');
  imgCarta.classList.add('carta');
  imgCarta.src = `assets/cartas/${carta}.png`;
  divCartasJugadores[turno].append(imgCarta);
}

const determinarGanador = () => {

  const [puntosMinimos, puntosComputadora] = puntosJugadores;

  setTimeout(() => {
    // Comprobar fin de juego
    if (puntosComputadora === puntosMinimos) {
      alert('Nadie gana 🥲');
    } else if (puntosMinimos > 21) {
      alert('Gana la máquina 🤦‍♂️');
    } else if (puntosComputadora > 21) {
      alert('Ganas la partida! 😊');
    } else {
      alert('Gana la máquina 🤦‍♂️');
    }
  }, 500);
}

// Turno computadora
const turnoComputadora = (puntosMinimos) => {
  let puntosComputadora = 0;
  do {
    const carta = pedirCarta(deck);
    puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
    crearCarta(carta, puntosJugadores.length - 1);

  } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);
  determinarGanador();
}

// Eventos
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta(deck);
  const puntosJugador = acumularPuntos(carta, 0);
  crearCarta(carta, 0);

  if (puntosJugador > 21) {
    console.warn('Lo siento mucho. Has perdido.');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn('21, genial');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugadores[0]);
});

btnNuevo.addEventListener('click', () => {
  inicializarJuego();
});