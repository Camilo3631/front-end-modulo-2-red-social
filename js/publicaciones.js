import { url } from "./api.config.js";
import { actualizarContadoresPerfil } from "./perfil.js";
import { doGet, doPost } from "./services/api.service.js";
import { getHtml } from "./services/html.service.js";

const usuarioLogueado = localStorage.getItem("username");

export async function publicar() {
  const input = getHtml("texto-publicacion");
  const texto = input.value.trim();

  if (!texto) {
    alert("No puedes crear una publicación vacía");
    return;
  }

  const res = await doPost(`publicaciones/crear-publicacion`, {
    username: usuarioLogueado,
    texto: texto,
  })
  
  if (res.data) {
    input.value = "";
    obtenerTodasLasPublicaciones();
    actualizarContadoresPerfil();
  } else {
    alert("Error al crear la publicación");
  }
}


export async function obtenerTodasLasPublicaciones() {
  const contenedor = getHtml("lista-publicaciones");

  const res = await doGet(`publicaciones/todas`)
  const publicaciones = res.data || [];
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
}