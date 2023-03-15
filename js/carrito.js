const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="titulo">Carrito de compras</h1>
    `;
    modalContainer.append(modalHeader);

    const btnModal = document.createElement("button");
    btnModal.className = "btn-modal";
    btnModal.innerText = "X";

    btnModal.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(btnModal);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3 class="subtitulo">${product.nombre}</h3>
            <p class="parrafo mb-0">${product.unidades}</p>
            <p class="parrafo mb-0">$ ${product.precio}</p>
            <button class="restar">-</button>
            <p class="parrafo mb-0">Cantidad: ${product.cantidad}</p>
            <button class="sumar">+</button>
            <p class="parrafo mb-0">$ Total: ${product.precio * product.cantidad}</p>
            <button class="btn-eliminar">x</button>
        `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".btn-eliminar");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const envio = 1000;

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content parrafo";

    if (total === 0) {
        totalCompra.innerHTML = `Su carrito está vacío`
    } else if (total >= 5000) {
        totalCompra.innerHTML = `Total a pagar: $ ${total} ¡Tiene envío gratis!`
    } else {
        totalCompra.innerHTML = `Total de su compra: $ ${total}. Total a pagar con envío $ ${total + envio} <br> *Valor de envío: $ ${envio}`
    }
    modalContainer.append(totalCompra);

    if(total > 0){
        const finalizar = document.createElement("button");
        finalizar.className = "btn-finalizar parrafo";
        finalizar.innerText = "Finalizar compra";
        modalContainer.append(finalizar)
    };
    
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    });
    carritoContador();
    saveLocal();
    pintarCarrito();
};

const carritoContador = () => {
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoContador();


