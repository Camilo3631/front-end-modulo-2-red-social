import { url } from "./api.config.js";
import { actualizarContadoresPerfil } from "./perfil.js";
import { getHtml } from "./services/html.service.js";

const usuarioLogueado = localStorage.getItem("username");


// FUNCIÓN PARA CREAR UNA PUBLICACIÓN (POST)
export function publicar() {
  const input = getHtml("texto-publicacion");
  const texto = input.value.trim();

  if (texto === "") {
    alert("No puedes crear una publicación vacía");
    return;
  }

  const datos = {
    username: usuarioLogueado,
    texto: texto,
  };

  fetch(`${url}publicaciones/crear-publicacion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => res.json())
    .then((respuesta) => {
      if (respuesta.data) {
        input.value = "";
        obtenerTodasLasPublicaciones();
         actualizarContadoresPerfil(); // Recargamos para ver la nueva arriba y actualizacion del contador
      } else {
        alert("Error al crear la publicación");
      }
    })
    .catch((err) => console.error("Error en el POST:", err));
}


// FUNCIÓN PARA MOSTRAR LAS PUBLICACIONES
export function obtenerTodasLasPublicaciones() {
  const contenedor = getHtml("lista-publicaciones");
  if (!contenedor) return;

  fetch(`${url}publicaciones/todas`)
    .then((res) => res.json())
    .then((respuesta) => {
      const publicaciones = respuesta.data || [];
      contenedor.innerHTML = "";

      if (publicaciones.length === 0) {
        contenedor.innerHTML = `<p style="text-align:center; color:gray; margin-top:20px;">Aún no hay publicaciones.</p>`;
        return;
      }

      publicaciones.reverse().forEach((post) => {
        const divCard = document.createElement("div");
        divCard.classList.add("publicacion-card");

        divCard.innerHTML = `
            <div class="publicacion-header">
                <div class="usuario-info">
                    <div class="avatar-mini">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <span class="pub-username">${post.username}</span>
                </div>
            </div>
            <div class="publicacion-contenido">
                <p>${post.texto}</p>
            </div>
        `;
        contenedor.appendChild(divCard);
      });
    })
    .catch((err) => console.error("Error en el GET de publicaciones:", err));
}



// FUNCIÓN PARA MOSTRAR LAS PUBLICACIONES
export function obtenerPublicacionesUsuarios() {
  const contenedor = getHtml("publicaciones-contacto");
  if (!contenedor) return;

  fetch(`${url}publicaciones/todas`)
    .then((res) => res.json())
    .then((respuesta) => {
      const publicaciones = respuesta.data || [];
      contenedor.innerHTML = "";

      if (publicaciones.length === 0) {
        contenedor.innerHTML = `<p style="text-align:center; color:gray; margin-top:20px;">Aún no hay publicaciones.</p>`;
        return;
      }

      publicaciones.reverse().forEach((post) => {
        const divCard = document.createElement("div");
        divCard.classList.add("publicacion-card");

        divCard.innerHTML = `
            <div class="publicacion-header">
                <div class="usuario-info">
                    <div class="avatar-mini">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <span class="pub-username">${post.username}</span>
                </div>
            </div>
            <div class="publicacion-contenido">
                <p>${post.texto}</p>
            </div>
        `;
        contenedor.appendChild(divCard);
      });
    })
    .catch((err) => console.error("Error en el GET de publicaciones:", err));
}