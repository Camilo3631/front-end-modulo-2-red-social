import {
  buscarUsuarios, mostrarUsuarios
} from "./contactos.js"

import {
  obtenerMensajes
} from "./chat.js"

const url = 'http://localhost:3000';


document.getElementById('btn-iniciar-sesion').addEventListener('click', iniciarSesion)


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
        listaContactos(data);

      } else {
        document.getElementById("error-inicio-sesion").innerText =
          "Credenciales incorrectas";
      }
    });
}


//Mostrat lista contactos agregados en columna izq de contactos
function listaContactos(data) {
  fetch("../html/contactos.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("contenido").innerHTML = html;

      //funcion en contacto.js
      document.getElementById('btn-buscarUsuarios').addEventListener('click', () => { buscarUsuarios(document.getElementById('input-buscar').value.toLowerCase()) });

    });
  let usernameLogueado = data.usuarioVerificado.username

  fetch(`${url}/contactos/${usernameLogueado}`).then(res => res.json()).then(data => {
    data.forEach(contacto => {
      let contactoUsername = contacto.username_contacto1 === usernameLogueado ? contacto.username_contacto2 : contacto.username_contacto1


      document.getElementById('lista-contactos').innerHTML += `
              <div class="card-contactos" onclick="btnChat('${contactoUsername}')">
                <p><strong>${contactoUsername}</strong></p>
                <div class="btns-contacto">
                  <button><i class="fa-solid fa-x" id="dejarSeguir"></i> Dejar de seguir</button>
                </div>
              </div>
              `
    })
  })
}


//Para personalizar pantalla de perfil/contactos con datos del usuario
function guardarUsuario(data) {
  localStorage.setItem("id", data.usuarioVerificado._id);
  localStorage.setItem("email", data.usuarioVerificado.email);
  localStorage.setItem("username", data.usuarioVerificado.username);
}


//Crear publicacion
async function crearPublicacion() {
  const texto = document.getElementById("texto-publicacion").value.trim();
  const msg = document.getElementById("msg-nueva-pub");

  if (!texto) {
    msg.textContent = "Escribe algo antes de publicar.";
    return;
  }

  const res = await fetch(`${url}/publicaciones/crear-publicacion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });
  const data = await res.json();

  if (res.ok) {
    msg.textContent = "";
    document.getElementById("texto-publicacion").value = "";
    cargarPublicaciones();
  } else {
    msg.textContent = data.mensaje || "Error al publicar.";
  }
}


//Pantalla chat
window.btnChat = function btnChat(usernameContacto) {
  
   fetch("../html/chats.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("contenido").innerHTML = html;
      obtenerMensajes(usernameContacto)

    })

}

