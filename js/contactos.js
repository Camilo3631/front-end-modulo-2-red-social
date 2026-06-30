import { url } from "./api.config.js";
import { doPost, doGet, doDelete } from "./services/api.service.js";
import { loadHtml, getHtml } from "./services/html.service.js";

let contactos = [];
let usuarios = [];
let loggedUsername = ""

export async function navContactos() {
  const usernameLogueado = localStorage.getItem("username");
  getHtml("contenido").innerHTML = await loadHtml("./html/contactos.html")
  getHtml("btn-buscarUsuarios").addEventListener("click", () => {
    buscarUsuarios(
      getHtml("input-buscar").value.toLowerCase()
    );
  });

  let contactos = await doGet(`contactos/${usernameLogueado}`)
  contactos.forEach((contacto) => {
    let contactoUsername =
      contacto.username_contacto1 === usernameLogueado
        ? contacto.username_contacto2
        : contacto.username_contacto1;

    getHtml("lista-contactos").innerHTML += `
              <div class="card-contactos" onclick="btnChat('${contactoUsername}')">
                <p><strong>${contactoUsername}</strong></p>
                <div class="btns-contacto">
                  <button><i class="fa-solid fa-x" id="dejarSeguir"></i> Dejar de seguir</button>
                </div>
              </div>
            `;
  });

};

export const buscarUsuarios = async (username) => {
  loggedUsername = username
  try {
    let usernamelogueado = localStorage.getItem("username");

    usuarios = await doPost(`usuarios/buscar`, { username })
    contactos = await doGet(`contactos/${usernamelogueado}`)

    mostrarUsuarios(usuarios.data, contactos);
  } catch (error) {
    alert("Error al cargar usuarios y contactos");
  }
};

const mostrarUsuarios = (usuariosParaMostrar, contactos) => {
  const resultadosBusqueda = getHtml("resultados-busqueda");
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
    getHtml("changeFollow-" + usuario.username)
      .addEventListener("click", () => {
        changeFollow(usuario.username, yaLoSigo);
      });

  });

};

export async function changeFollow(usernameObjetivo, yaLoSigo) {
  let usernamelogueado = localStorage.getItem("username");
  try {
    if (yaLoSigo) {
      const res = await doDelete(`contactos/eliminar-contacto/${yaLoSigo._id}`, {})
      buscarUsuarios(loggedUsername)
    } else {
      const res = await doPost(`contactos/agregar-contacto`, {
        username_contacto1: usernamelogueado,
        username_contacto2: usernameObjetivo,
      })
      buscarUsuarios(loggedUsername)
    }
  } catch (error) {
    alert("Error al actualizar seguimiento");
  }
}
