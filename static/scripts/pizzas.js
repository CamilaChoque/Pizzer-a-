/**
 * Añade la pizza seleccionada a los pedidos.
 * 
 * @param {string} tamaño - El tamaño correspondiente a la pizza seleccionada.
 * @param {string} nombrePizza - El nombre de la pizza seleccionada.
 */
function sumarProductoCarrito(tamaño, nombrePizza) {
    // moverCirculo(idBotonCompra, 'botonPedidos');
    mostrarNotificacion(tamaño, nombrePizza);
    
    /*
        Parte del código en la que vamos a almacenar la
        información de la compra en una base de datos para
        poder recuperarlos después en la página de pedidos. 
    */
}

let funcionEnProceso = false;
let cola = [];

/**
 * Muestra una notificación, correspondiente a la pizza seleccionada, en pantalla para notificar la compra al usuario.
 * 
 * @param {string} tamaño - El tamaño que se va a mostrar en la notificación.
 * @param {string} nombrePizza - El nómbre de la pizza que se va a mostrar en la notificación.
 */
function mostrarNotificacion(tamaño, nombrePizza) {

    // En caso de que la función ya esté en progreso, añadimos su llamada a una cola.
    if(funcionEnProceso) {
        cola.push(sumarProductoCarrito.bind(this, tamaño, nombrePizza));
        return;
    }

    // Marcamos esta variable como true, para que a partir del próximo llamado se acumulen en la cola.
    funcionEnProceso = true;

    // Modificamos la notificación en base a los parámetros recibidos.
    const notificacion = document.getElementById('notificacion');
    const espacioImagen = document.getElementById('compraInfo');
    const informacion = document.getElementById('compraInfoProducto');

    estadoInicial = notificacion.innerHTML;
    
    const imagen = document.createElement('img');
    imagen.id = 'compraImagen';
    imagen.src = `../static/image/comercial/pizza/pizza-${nombrePizza}.png`;
    imagen.alt = 'Imagen de la pizza que agregó al carrito.';

    const datosPizza = document.createElement('p');
    datosPizza.innerText  = `Pizza: ${nombrePizza[0].toUpperCase() + nombrePizza.slice(1)}`;

    const datosTamaño = document.createElement('p');
    datosTamaño.innerText = `Tamaño: ${tamaño}`;

    // En el caso en el que el ancho de la pantalla sea mayor a 540px, se añade la imagen a la notificación
    if(window.innerWidth > 540) {
        espacioImagen.appendChild(imagen);
    }

    informacion.appendChild(datosPizza);
    informacion.appendChild(datosTamaño);

    notificacion.classList.toggle('animado');
    
    // La devolvemos a su estado inicial después de 2 segundos.  
    setTimeout(() => {
        notificacion.classList.toggle('animado');
        // Esperamos a que la notificacion se despeje hacia la derecha para que desaparezca.
        setTimeout(() => {
            notificacion.innerHTML = estadoInicial;
        }, 400);
        // Marcamos como que el primer llamado a la función ya no está en progreso, y empezamos a llamar a los que están en la cola.
        setTimeout(() => {
            funcionEnProceso = false;
            if(cola.length > 0) {
                let siguienteNotificacion = cola.shift();
                siguienteNotificacion();
            }
        }, 400);
    }, 2000);
}

