let productos = ["./data.json"]

const recorrerProductos = ()=> {
    let contenedor = document.getElementById("container")
    fetch("./data.json")
    .then((res)=>res.json())
    .then((productos)=>{        
    productos.forEach((producto,indice)=>{
        let card = document.createElement("div")
        card.classList.add("card", "col-sm-8", "col-lg-3",);
        card.innerHTML = `<img src="${producto.imagen}"" class="card-img-top" alt="...">
        <h5 class="card-title">"${producto.tag}"</h5>
        <div class="card-body">
        <p class="card-text">"${producto.precio}"</p>
        <a href="#" class="btn btn-primary" id = "boton" onClick="agregarAlCarrito(${indice})">Comprar</a>
        </div>`;
        contenedor.appendChild(card)
        })
})
}

    recorrerProductos();
    let carrito = [];

    const agregarAlCarrito = (indice) => {
        fetch("./data.json")
        .then((res)=>res.json())
        .then((productos)=>{
        const indiceEncontradoCarrito = carrito.findIndex((elemento) =>{
            return elemento.id === productos[indice].id
        })
        if(indiceEncontradoCarrito === -1){
            const productoAgregar = productos[indice]
            productoAgregar.cantidad = 1;
            carrito.push(productoAgregar)
            dibujarCarrito();
        }else {
            carrito[indiceEncontradoCarrito].cantidad +=1;
            dibujarCarrito()
        }
    })
    };

    const modalCarrito = document.querySelector('#carrito')

    let total = 0;
    const dibujarCarrito= ()=> {
        modalCarrito.className="carrito";
        modalCarrito.innerHTML=""
        if(carrito.length > 0){
            carrito.forEach((producto, indice) => {
                total = total + producto.precio * producto.cantidad
                const carritoContainer = document.createElement("div")
                carritoContainer.className = "producto-carrito"
                carritoContainer.innerHTML = `
                <img class = "car-img" src="${producto.imagen}"/>
                <div class="product-details">
                ${producto.tag}
                </div>
                <div class="product-details"> Cantidad: ${producto.cantidad}</div>
                <div class="product-details"> Precio: ${producto.precio}</div>
                <div class="product-details"> Total: ${producto.precio * producto.cantidad}</div>
                <button class="btn btn-info" id="remove-product" onClick="removeProduct(${indice})">Eliminar Producto</button>
                `
                modalCarrito.appendChild(carritoContainer)
            })
            const totalContainer = document.createElement("div");
            totalContainer.className="total-carrito";
            totalContainer.innerHTML= `<div class = "total"> TOTAL $ ${total}</div>
            <button class= "btn btn-info  finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>
            </div>
            `
            modalCarrito.appendChild(totalContainer)
        }else {
            modalCarrito.classList.remove("carrito")
        }
    }


    const removeProduct = (indice) => {
        carrito.splice(indice, 1);
        dibujarCarrito();

    };
    const finalizarCompra = () => {
        const total = document.getElementsByClassName("total")[0].innerHTML;
        modalCarrito.innerHTML = "";
        const compraFinalizada = `<div class="compra-finalizada"><p class="compra-parrafo"> YA CASI ES TUYA LA COMPRA!! <div>
        <div class = "datos-clientes">
        <p class = "datos-parrafo"> Complete el formulario con sus datos para destinar sus pertenencias</p>
        <button class = "btn btn-info formulario" id = "formulario" onClick="DibujarFormu()"> FORMULARIO </button>
        </div>
        `
        modalCarrito.innerHTML = compraFinalizada
    }

    const DibujarFormu = () => {
        modalCarrito.innerHTML = "";
        const formulario = `
    <section class="form-register">
    <h4>Formulario Registro</h4>
    <input class="controls" type="text" name="nombres" id="nombre" placeholder="Ingrese su Nombre">
    <input class="controls" type="text" name="apellidos" id="apellido" placeholder="Ingrese su Apellido">
    <input class="controls" type="email" name="correo" id="correo" placeholder="Ingrese su Correo">
    <input class="controls" type="password" name="correo" id="domicilio" placeholder="Ingrese su Domicilio">
    <p>Estoy de acuerdo con <a href="#">Terminos y Condiciones</a></p>
    <input class="botons" type="submit" value="Registrar">
    <p><a href="#">¿Ya tengo Cuenta?</a></p>
    </section>`;
        modalCarrito.innerHTML = formulario;
}

const mostrarMensaje = () => {
    const nombreCliente = document.getElementById("name").value;
    const domicilioCliente = document.getElementById("domicilio").value
    modalCarrito.innerHTML = "";
    let mensaje = `<div class = "mensaje-final">Gracias ${nombreCliente} por su compra y registro, en un lapzo de 72 horas recibira su compra!!
    </div>`
    modalCarrito.innerHTML = mensaje;
} 