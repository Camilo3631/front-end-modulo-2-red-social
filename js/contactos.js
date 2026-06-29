import { url } from "./api.config.js";

let contactos = [];
let usuarios = [];

export const buscarUsuarios = async (username) => {
  try {
    const response = await fetch(`${url}usuarios/buscar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });
    usuarios = await response.json();

    let usernamelogueado = localStorage.getItem("username");
    const responseContactos = await fetch(
      `${url}contactos/${usernamelogueado}`,
    );

    contactos = await responseContactos.json();

    mostrarUsuarios(usuarios.data, contactos);
  } catch (error) {
    alert("Error al cargar usuarios y contactos");
  }
};

const mostrarUsuarios = (usuariosParaMostrar, contactos) => {
  console.log(usuariosParaMostrar, contactos);
  const resultadosBusqueda = document.getElementById("resultados-busqueda");
  resultadosBusqueda.innerHTML = "";

  usuariosParaMostrar.forEach((usuario) => {

    const yaLoSigo = contactos.some(
      (c) =>
        c.username_contacto1 === usuario.username ||
        c.username_contacto2 === usuario.username,
    );
    console.log(yaLoSigo)
    const textoBoton = yaLoSigo ? "Unfollow" : "Follow";
    const claseBoton = yaLoSigo ? "btn-unfollow" : "btn-follow";
    const contactoId = yaLoSigo ? yaLoSigo._id : "";
    resultadosBusqueda.innerHTML += `
          <div class='card-usuario-buscador'>

            <div class='info'>
              <p>@${usuario.username}</p>
            </div>

            <button id=${"changeFollow-" + usuario.username} class='${claseBoton} ${yaLoSigo})'>
                ${textoBoton}
            </button>
          </div>
      `;
    document
      .getElementById("changeFollow-" + usuario.username)
      .addEventListener("click", () => {
        changeFollow(usuario.username, yaLoSigo, contactoId);
      });
  });


};

export async function changeFollow(usernameObjetivo, yaLoSigo, contactoId) {
  let usernamelogueado = localStorage.getItem("username");
  console.log(yaLoSigo)
  console.log(contactoId)
  try {
    if (yaLoSigo) {
      await fetch(`${url}contactos/eliminar-contacto/${contactoId}`, {
        method: "DELETE",
      });
    } else {
      await fetch(`${url}contactos/agregar-contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username_contacto1: usernamelogueado,
          username_contacto2: usernameObjetivo,
        }),
      });
    }
  } catch (error) {
    alert("Error al actualizar seguimiento");
  }
}

// FUNCIÓN PARA MOSTRAR LAS PUBLICACIONES
export function obtenerPublicacionesUsuarios() {
  const contenedor = document.getElementById("publicaciones-contacto");
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
