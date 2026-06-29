import { url } from "./api.config.js";

let contactos = [];
let usuarios = [];
let loggedUsername = ""


export const buscarUsuarios = async (username) => {
  loggedUsername = username
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
  const resultadosBusqueda = document.getElementById("resultados-busqueda");
  resultadosBusqueda.innerHTML = "";

  usuariosParaMostrar.forEach((usuario) => {

    const yaLoSigo = contactos.find(
      (c) =>
        c.username_contacto1 === usuario.username ||
        c.username_contacto2 === usuario.username
    );
    const textoBoton = yaLoSigo ? "Unfollow" : "Follow";
    const claseBoton = yaLoSigo ? "btn-unfollow" : "btn-follow";
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
  });

  usuariosParaMostrar.forEach((usuario) => {
    const yaLoSigo = contactos.find(
      (c) =>
        c.username_contacto1 === usuario.username ||
        c.username_contacto2 === usuario.username
    );
    document.getElementById("changeFollow-" + usuario.username)
      .addEventListener("click", () => {
        console.log(yaLoSigo)
        changeFollow(usuario.username, yaLoSigo);
      });

  });

};

export async function changeFollow(usernameObjetivo, yaLoSigo) {
  let usernamelogueado = localStorage.getItem("username");
  try {
    if (yaLoSigo) {
      await fetch(`${url}contactos/eliminar-contacto/${yaLoSigo._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      buscarUsuarios(loggedUsername)
    } else {
      await fetch(`${url}contactos/agregar-contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username_contacto1: usernamelogueado,
          username_contacto2: usernameObjetivo,
        }),
      });
      buscarUsuarios(loggedUsername)
    }
  } catch (error) {
    alert("Error al actualizar seguimiento");
  }
}
