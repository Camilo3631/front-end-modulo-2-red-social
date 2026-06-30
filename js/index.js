import { buscarUsuarios, navContactos } from "./contactos.js";
import { btnChat } from "./chat.js";
import { publicar } from "./publicaciones.js";
import { navPerfil, toggleSettings } from "./perfil.js";
import { doPost } from "./services/api.service.js";
import { getHtml } from "./services/html.service.js";

getHtml("btn-iniciar-sesion").addEventListener("click", iniciarSesion);

async function iniciarSesion() {
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

window.navContactos = navContactos
window.navPerfil = navPerfil
window.toggleSettings = toggleSettings
window.publicar = publicar
window.btnChat = btnChat


function guardarUsuario(data) {
  localStorage.setItem("id", data.usuarioVerificado._id);
  localStorage.setItem("email", data.usuarioVerificado.email);
  localStorage.setItem("username", data.usuarioVerificado.username);
}