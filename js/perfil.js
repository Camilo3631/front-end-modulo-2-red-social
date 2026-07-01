import { url } from "./api.config.js";
import { obtenerTodasLasPublicaciones } from "./publicaciones.js";
import { getHtml, loadHtml } from "./services/html.service.js";
import { giveConfigBtnActions } from "./configuracion.js";
import { doGet } from "./services/api.service.js";

export async function actualizarContadoresPerfil() {
    const usuarioLogueado = localStorage.getItem("username");
    const contPostsElement = getHtml("contador-posts");
    const contSiguiendoElement = getHtml("contador-siguiendo");

    const res = await doGet(`publicaciones/todas`)
    const contactos = await doGet(`contactos/${usuarioLogueado}`)

    const publicaciones = res.data || [];
    const misPublicaciones = publicaciones.filter(post => post.username === usuarioLogueado);

    contPostsElement.innerText = misPublicaciones.length;
    contSiguiendoElement.innerText = contactos.length;
}

export function toggleSettings(selectedConfig) {
    if (!selectedConfig) {
        getHtml("panel-config").classList.replace("reducido", "abierto");
        giveConfigBtnActions()
    } else {
        getHtml("panel-config").classList.replace("abierto", "reducido");
    }
}

export async function navPerfil() {
    const html = await loadHtml("./html/perfil.html")
    const usernamePerfil = localStorage.getItem("username");
    getHtml("contenido").innerHTML = html;
    getHtml("username").innerText = usernamePerfil;

    obtenerTodasLasPublicaciones();
    actualizarContadoresPerfil();

    const configHtml = await loadHtml("./html/configuracion.html")
    getHtml("panel-config").innerHTML = configHtml;

};
