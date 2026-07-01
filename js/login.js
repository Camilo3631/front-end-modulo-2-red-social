import { getHtml } from "./services/html.service.js";
import { navContactos } from "./contactos.js";
import { doPost } from "./services/api.service.js";

export async function iniciarSesion() {
  const email = getHtml("login-email").value;
  const password = getHtml("login-contrasena").value;

  const res = await doPost(`usuarios/iniciar-sesion`, { email, contrasena: password })

  if (res.estado) {
    guardarUsuario(res);
    navContactos()
  } else {
    getHtml("error-inicio-sesion").innerText = "Credenciales incorrectas";
  }
}

function guardarUsuario(data) {
  localStorage.setItem("id", data.usuarioVerificado._id);
  localStorage.setItem("email", data.usuarioVerificado.email);
  localStorage.setItem("username", data.usuarioVerificado.username);
}