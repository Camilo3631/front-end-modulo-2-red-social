import { buscarUsuarios } from "./contactos.js";
import { obtenerMensajes, enviarMensaje } from "./chat.js";
import { publicar, obtenerTodasLasPublicaciones } from "./publicaciones.js";
import { actualizarContadoresPerfil, toggleSettings } from "./perfil.js";
import { cerrarSesion } from "./perfil.js";

import { url } from "./api.config.js";

document.getElementById("btn-iniciar-sesion").addEventListener("click", iniciarSesion);

function iniciarSesion() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-contrasena").value;

  fetch(`${url}usuarios/iniciar-sesion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      contrasena: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.estado) {
        guardarUsuario(data);
        navContactos()
      } else {
        document.getElementById("error-inicio-sesion").innerText =
          "Credenciales incorrectas";
      }
    });
}

// // Función principal y reutilizable para navegar a contactos
window.navContactos = function navContactos() {
  const usernameLogueado = localStorage.getItem("username");

  fetch("./html/contactos.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("contenido").innerHTML = html;

      document.getElementById("btn-buscarUsuarios")
        .addEventListener("click", () => {
          buscarUsuarios(
            document.getElementById("input-buscar").value.toLowerCase()
          );
        });

      fetch(`${url}contactos/${usernameLogueado}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((contacto) => {
            let contactoUsername =
              contacto.username_contacto1 === usernameLogueado
                ? contacto.username_contacto2
                : contacto.username_contacto1;

            document.getElementById("lista-contactos").innerHTML += `
              <div class="card-contactos" onclick="btnChat('${contactoUsername}')">
                <p><strong>${contactoUsername}</strong></p>
                <div class="btns-contacto">
                  <button><i class="fa-solid fa-x" id="dejarSeguir"></i> Dejar de seguir</button>
                </div>
              </div>
            `;
          });
        });
    });
};


window.navPerfil = function navPerfil() {
  fetch("./html/perfil.html")
    .then((res) => res.text())
    .then((html) => {
      const usernamePerfil = localStorage.getItem("username");
      document.getElementById("contenido").innerHTML = html;
      document.getElementById("username").innerText = usernamePerfil;

      obtenerTodasLasPublicaciones();
      actualizarContadoresPerfil();
      fetch("./html/configuracion.html")
        .then((res) => res.text())
        .then((html) => {
          document.getElementById("panel-config").innerHTML = html;
        })
    })
    .catch((err) =>
      console.error("Error al cargar la pantalla de perfil:", err),
    );
};

window.toggleSettings = toggleSettings


// //Para personalizar pantalla de perfil/contactos con datos del usuario
function guardarUsuario(data) {
  localStorage.setItem("id", data.usuarioVerificado._id);
  localStorage.setItem("email", data.usuarioVerificado.email);
  localStorage.setItem("username", data.usuarioVerificado.username);
}