
/**
 * Esta función devuelve la primera carta del mazo
 * @param {Array<string>} deck Baraja de cartas, array de strings
 * @returns {String} Devuelve los caracteres que representan una carta 
 */
export const pedirCarta = (deck) => {
    if (!deck || deck.length === 0) {
      throw 'No hay cartas en el deck';
    }
    return deck.pop();
  }