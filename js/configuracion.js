import { getHtml } from "./services/html.service.js";
import { doGet, doPost, doDelete } from "./services/api.service.js";

function cambiarUsername() {

  console.log("cambiar username");
}

function cambiarContrasena() {
  console.log("cambiar contrasena");
}

function seleccionarAvatar(avatar) {
  console.log("avatar", avatar);
}

async function eliminarCuenta() {
  console.log("eliminar cuenta");
  let email = localStorage.getItem("email")
  console.log(email)
  const res = await doDelete(`usuarios/eliminar-cuenta/hugo`, {})
  console.log(res)
}

function cerrarSesion() {
  console.log("cerrar sesion");
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
    seleccionarAvatar(1);
  });
  getHtml("btn-seleccionar-avatar-2").addEventListener("click", () => {
    seleccionarAvatar(2);
  });
  getHtml("btn-seleccionar-avatar-3").addEventListener("click", () => {
    seleccionarAvatar(3);
  });
  getHtml("btn-seleccionar-avatar-4").addEventListener("click", () => {
    seleccionarAvatar(4);
  });
}
