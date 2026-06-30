import { url } from "./api.config.js";
import { obtenerTodasLasPublicaciones } from "./publicaciones.js";
import { getHtml } from "./services/html.service.js";
import { giveConfigBtnActions } from "./configuracion.js";

export function actualizarContadoresPerfil() {
    const usuarioLogueado = localStorage.getItem("username");
    const contPostsElement = getHtml("contador-posts");
    const contSiguiendoElement = getHtml("contador-siguiendo");

    if (!contPostsElement && !contSiguiendoElement) return;
    // Contador de Publicaciones
    // 
    fetch(`${url}publicaciones/todas`)
        .then((res) => res.json())
        .then((respuesta) => {
            const publicaciones = respuesta.data || [];
            const misPublicaciones = publicaciones.filter(post => post.username === usuarioLogueado);

            if (contPostsElement) {
                contPostsElement.innerText = misPublicaciones.length;
            }
        })
        .catch((err) => console.error("Error al contar publicaciones:", err));

    // 3. Contador de Seguidos / Contactos
    fetch(`${url}contactos/${usuarioLogueado}`)
        .then((res) => res.json())
        .then((contactos) => {
            if (contSiguiendoElement) {
                contSiguiendoElement.innerText = contactos.length;
            }
        })
        .catch((err) => console.error("Error al contar contactos:", err));
}

export function toggleSettings(selectedConfig) {
    if (!selectedConfig) {
        getHtml("panel-config").classList.replace("reducido", "abierto");
        giveConfigBtnActions()

    } else {
        getHtml("panel-config").classList.replace("abierto", "reducido");
    }
}

export function navPerfil() {
    fetch("./html/perfil.html")
        .then((res) => res.text())
        .then((html) => {
            const usernamePerfil = localStorage.getItem("username");
            getHtml("contenido").innerHTML = html;
            getHtml("username").innerText = usernamePerfil;

            obtenerTodasLasPublicaciones();
            actualizarContadoresPerfil();
            fetch("./html/configuracion.html")
                .then((res) => res.text())
                .then((html) => {
                    getHtml("panel-config").innerHTML = html;
                })

        })
        .catch((err) =>
            console.error("Error al cargar la pantalla de perfil:", err),
        );
};
