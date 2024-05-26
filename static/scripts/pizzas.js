/**
 * Realiza la transición de un circulo desde una posición inicial hasta una posición final
 * 
 * @param {string} idInicio - id de un elemento HTML
 * @param {string} idFin - id de un elemento HTML
 */
function moverCirculo(idInicio, idFin) {
    const circulo = document.getElementById('circulo');
    const inicio = document.getElementById(idInicio);
    const fin = document.getElementById(idFin);

    // Obtengo los 'rectángulos delimitadores' para los botones y el article que los contiene
    const inicioRect = inicio.getBoundingClientRect();
    const finRect = fin.getBoundingClientRect();
    const contenedorRect = document.querySelector('.contenedor-opciones').getBoundingClientRect();

    // Calculo las posiciones iniciales y finales del movimiento que va a realizar el circulo
    const ajustePixeles = 10;
    const inicioX = inicioRect.left - contenedorRect.left + inicioRect.width / 2 - ajustePixeles;
    const inicioY = inicioRect.top - contenedorRect.top + inicioRect.height / 2 - ajustePixeles;
    const finX = finRect.left - contenedorRect.left + finRect.width / 2 - ajustePixeles;
    const finY = finRect.top - contenedorRect.top + finRect.height / 2 - ajustePixeles;

    // Movemos el círculo a la posición inicial del movimiento
    circulo.style.left = `${inicioX}px`;
    circulo.style.top = `${inicioY}px`;
    circulo.style.display = 'block';

    // Con esto forzamos que la transición se reinicire correctamente
    circulo.getBoundingClientRect();

    // Realiza el movimiento del circulo de un botón a otro
    let miliSegundos = 10;
    setTimeout(() => {
        circulo.style.transform = `translate(${finX - inicioX}px, ${finY - inicioY}px)`;
    }, miliSegundos);

    // Reinicio el círculo a su origen después de la animación
    miliSegundos = 1010;
    setTimeout(() => {
        circulo.style.display = 'none';
        circulo.style.transform = 'none';
    }, miliSegundos);
}

/**
 * Realiza una animación para indicar que se sumó un producto al carrito, y suma ese producto a una base de datos.
 * 
 * @param {string} idBotonCompra - id del botón con el que se realizó la compra
 */
function sumarProductoCarrito(idBotonCompra) {
    moverCirculo(idBotonCompra, 'botonPedidos');
    
    // Parte del código en la que vamos a envíar los datos.
}