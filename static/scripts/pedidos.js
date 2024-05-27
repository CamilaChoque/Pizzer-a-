// Se calcula el precio total al cargar la página.
window.onload = calcularPrecioTotal();

/**
 * Calcula el precio total de todos los productos seleccionados y lo muestra en el formulario de pago.
 * 
 */
function calcularPrecioTotal() {
    const contenedorProductos = document.getElementsByClassName('contenedor-producto');
    let precioTotal = 0;

    for (let i = 0 ; i < contenedorProductos.length ; i++) {
        const precioTexto = document.getElementsByClassName('precio-producto')[i];
        const precioProducto = precioTexto.innerText.split('$')[1];

        precioTotal += parseInt(precioProducto);
    }
    const total = document.getElementById('precioTotal');
    total.innerText = `$${precioTotal}`;
}

function eliminarProducto(idProducto) {
    const contenedorProductos = document.getElementById('productosElegidos');
    const producto = document.getElementById(idProducto);

    contenedorProductos.removeChild(producto);
    calcularPrecioTotal();
}