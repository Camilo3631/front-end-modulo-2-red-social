import { navContactos } from "./contactos.js";
import { navChat } from "./chat.js";
import { publicar } from "./publicaciones.js";
import { navPerfil, toggleSettings } from "./perfil.js";
import { getHtml, loadHtml } from "./services/html.service.js";
import { iniciarSesion } from "./login.js";

if (localStorage.getItem("username")) {
  navContactos()
} else {
  getHtml("contenido").innerHTML = await loadHtml("./html/login.html");
  getHtml("btn-iniciar-sesion").addEventListener("click", iniciarSesion);
}


window.navContactos = navContactos;
window.navPerfil = navPerfil;
window.toggleSettings = toggleSettings;
window.publicar = publicar;
window.navChat = navChat;
