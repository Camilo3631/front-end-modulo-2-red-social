import { doPost } from "./services/api.service.js";
import { getHtml } from "./services/html.service.js";

getHtml("btn-registro").addEventListener("click", registrar);

async function registrar() {
  const res = await doPost(`usuarios/registrar`, {
    username: getHtml("reg-username").value,
    email: getHtml("reg-email").value,
    contrasena: getHtml("reg-contrasena").value,
  })

  getHtml("reg-username").value = "";
  getHtml("reg-email").value = "";
  getHtml("reg-contrasena").value = "";

  if (res.data.insertedId) {
    getHtml("register-message").innerText = "Usuario registrado";
    setTimeout(() => { getHtml("register-message").innerText = "" }, 2000);
  }
}
