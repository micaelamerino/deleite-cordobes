const contentCards = document.getElementById("contentCards");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
  const response = await fetch("./data.json");
  const data = await response.json();
  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card text-center";
    content.innerHTML = `
        <img src= "${product.img}">
        <h5 class="subtitulo mt-2">${product.nombre}</h5>
        <p class="parrafo">${product.unidades}</p>
        <p class="parrafo">$ ${product.precio}</p>
        `;
    contentCards.append(content);

    let btnAgregar = document.createElement("button");
    btnAgregar.className = "btn-agregar";
    btnAgregar.innerText = "Agregar al carrito";
    content.appendChild(btnAgregar);

    contentCards.append(content);

    btnAgregar.addEventListener("click", () => {
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === product.id
      );
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          unidades: product.unidades,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        carritoContador();
        saveLocal();
      }
    });
  });
};

getProducts();

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Suscripción
const form = document.forms["formulario"];
const btnSuscripcion = document.getElementById("btnSuscripcion");

function confirmSusc(e) {
  e.preventDefault();
  const email = form.email.value;
  if (email == "") {
    Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Campo vacío, vuelva a intentar',
      });
  } else {
    Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Suscripción realizada exitosamente',
      });
  };
  form.reset();
};
btnSuscripcion.addEventListener("click", confirmSusc);
