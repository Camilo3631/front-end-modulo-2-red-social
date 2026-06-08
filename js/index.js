import { buscarUsuarios, mostrarUsuarios, obtenerPublicacionesUsuarios } from "./contactos.js";
import { obtenerMensajes, enviarMensaje } from "./chat.js";
import { publicar, obtenerTodasLasPublicaciones } from "./publicaciones.js";

//const url = "http://localhost:3000";
const url = 'https://back-end-modulo-2-red-social.vercel.app/';


document
  .getElementById("btn-iniciar-sesion")
  .addEventListener("click", iniciarSesion);

document
  .getElementById("btn-iniciar-sesion")
  .addEventListener("click", iniciarSesion);

function iniciarSesion() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-contrasena").value;

  fetch(`${url}/usuarios/iniciar-sesion`, {
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

// Función principal y reutilizable para navegar a contactos
window.navContactos = function navContactos() {
  const usernameLogueado = localStorage.getItem("username");

  fetch("../html/contactos.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("contenido").innerHTML = html;

      document.getElementById("btn-buscarUsuarios")
        .addEventListener("click", () => {
          buscarUsuarios(
            document.getElementById("input-buscar").value.toLowerCase()
          );
        });

      // Carga la lista de contactos una vez el HTML está en el DOM
      fetch(`${url}/contactos/${usernameLogueado}`)
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


// FUNCIÓN PARA ACTUALIZAR LOS CONTADORES DEL PERFIL
export function actualizarContadoresPerfil() {
  const usuarioLogueado = localStorage.getItem("username");
  
  
  const contPostsElement = document.getElementById("contador-posts");
  const contSiguiendoElement = document.getElementById("contador-siguiendo");
  
  if (!contPostsElement && !contSiguiendoElement) return;

  // Contador de Publicaciones
  // 
  fetch(`${url}/publicaciones/todas`)
    .then((res) => res.json())
    .then((respuesta) => {
      const publicaciones = respuesta.data || [];
      const misPublicaciones = publicaciones.filter(post => post.username === usuarioLogueado);
      
      if(contPostsElement) {
          contPostsElement.innerText = misPublicaciones.length;
      }
    })
    .catch((err) => console.error("Error al contar publicaciones:", err));

  // 3. Contador de Seguidos / Contactos
  fetch(`${url}/contactos/${usuarioLogueado}`)
    .then((res) => res.json())
    .then((contactos) => {
      if(contSiguiendoElement) {
          contSiguiendoElement.innerText = contactos.length;
      }
    })
    .catch((err) => console.error("Error al contar contactos:", err));
}



window.enviarMensaje = enviarMensaje;
//Pantalla chat
window.btnChat = function btnChat(usernameContacto) {
  fetch("../html/chats.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("contenido").innerHTML = html;
    document.getElementById("chat-username").innerText = usernameContacto;
    obtenerMensajes(usernameContacto);
    setInterval(obtenerMensajes, 30000)
    
    document.getElementById("enviarMensaje").innerHTML = `
    <button onclick="enviarMensaje('${usernameContacto}')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
    </button>
    `;
  })
  .catch((err) => console.error("Error en el POST de publicación:", err));
};


//Perfil
window.navPerfil = function navPerfil(){
  fetch("../html/perfil.html")
  .then((res) => res.text())
  .then((html) => {
    const usernamePerfil = localStorage.getItem("username");
    document.getElementById("contenido").innerHTML = html;
    document.getElementById("username").innerText = usernamePerfil;
    obtenerTodasLasPublicaciones();
    actualizarContadoresPerfil();

  })
  .catch((err) =>
    console.error("Error al cargar la pantalla de perfil:", err),
);
};



//Para personalizar pantalla de perfil/contactos con datos del usuario
function guardarUsuario(data) {
  localStorage.setItem("id", data.usuarioVerificado._id);
  localStorage.setItem("email", data.usuarioVerificado.email);
  localStorage.setItem("username", data.usuarioVerificado.username);
}