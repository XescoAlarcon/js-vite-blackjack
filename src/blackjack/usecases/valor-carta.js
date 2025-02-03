
/**
 * Devuelve el valor de una carta
 * @param {String} carta Identificador de la carta de 1 a 3 carácteres
 * @returns {Number} Valor de la carta
 */
export const valorCarta = (carta) => {
    // El valor va de 2 a 10 y las especiales, por el 10 lo hacemos así ya que tiene 2 dígitos
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
      (valor === 'A') ? 11 : 10
      : valor * 1; // Multiplicar por uno un string lo convierte en número
  }
