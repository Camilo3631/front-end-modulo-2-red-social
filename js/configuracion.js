import { getHtml, loadHtml } from "./services/html.service.js";
import { doGet, doPost, doDelete, doPut } from "./services/api.service.js";
import { iniciarSesion } from "./login.js";

function cambiarUsername() {
  let email = localStorage.getItem("email");
  let username = getHtml("nuevo-username").value;
  let contrasena = getHtml("nueva-contrasena").value;
  doPut(`usuarios/modificar-cuenta/${email}`, {
    username: username,
    contrasena: contrasena,
  });
}

function cambiarContrasena() {
  let email = localStorage.getItem("email");
  let username = localStorage.getItem("username");
  let contrasena = getHtml("nueva-contrasena").value;
  doPut(`usuarios/modificar-cuenta/${email}`, {
    username: username,
    contrasena: contrasena,
  });
}

function seleccionarAvatar(avatar) {
  getHtml("foto-perfil").style.background = avatar;
}

async function eliminarCuenta() {
  let email = localStorage.getItem("email");
  const res = await doPost(`usuarios/eliminar-cuenta/${email}`, {});
  console.log(res);
}

async function cerrarSesion() {
  getHtml("contenido").innerHTML = await loadHtml("./html/login.html");
  getHtml("btn-iniciar-sesion").addEventListener("click", () => {
    iniciarSesion();
  });
  localStorage.setItem("email", "");
  localStorage.setItem("id", "");
  localStorage.setItem("username", "");
}

export function giveConfigBtnActions() {
  getHtml("btn-cambiar-username").addEventListener("click", () => {
    cambiarUsername();
  });
  getHtml("btn-cambiar-contrasena").addEventListener("click", () => {
    cambiarContrasena();
  });
  getHtml("btn-cerrar-sesion").addEventListener("click", () => {
    cerrarSesion();
  });
  getHtml("btn-eliminar-cuenta").addEventListener("click", () => {
    eliminarCuenta();
  });

  getHtml("btn-seleccionar-avatar-1").addEventListener("click", () => {
    seleccionarAvatar("rgb(154, 227, 154)");
  });
  getHtml("btn-seleccionar-avatar-2").addEventListener("click", () => {
    seleccionarAvatar("rgb(228, 181, 115)");
  });
  getHtml("btn-seleccionar-avatar-3").addEventListener("click", () => {
    seleccionarAvatar("rgb(200, 118, 236)");
  });
  getHtml("btn-seleccionar-avatar-4").addEventListener("click", () => {
    seleccionarAvatar("rgb(151, 193, 242)");
  });
}
