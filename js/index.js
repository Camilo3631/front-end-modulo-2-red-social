import { buscarUsuarios, mostrarUsuarios } from "./contactos.js";

<<<<<<< HEAD
const url = "http://localhost:3000";
=======
import {
  obtenerMensajes
} from "./chat.js"

const url = 'http://localhost:3000';


document.getElementById('btn-iniciar-sesion').addEventListener('click', iniciarSesion)
>>>>>>> a20b20cfbcb2f559e32766e3021ef0d4e6b0b5db

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
      document
        .getElementById("btn-buscarUsuarios")
        .addEventListener("click", () => {
          buscarUsuarios(
            document.getElementById("input-buscar").value.toLowerCase(),
          );
        });
    });
  let usernameLogueado = data.usuarioVerificado.username;

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
}

//Para personalizar pantalla de perfil/contactos con datos del usuario
function guardarUsuario(data) {
  localStorage.setItem("id", data.usuarioVerificado._id);
  localStorage.setItem("email", data.usuarioVerificado.email);
  localStorage.setItem("username", data.usuarioVerificado.username);
}

//Crear publicacion

// Variable global que simula el usuario que tiene la sesión activa
const usuarioLogueado = "username_";

document.addEventListener("DOMContentLoaded", () => {
  const usernameElement = document.getElementById("username");
  if (usernameElement) {
    usernameElement.innerText = usuarioLogueado;
  }

  obtenerMisPublicaciones();
});

// FUNCIÓN PARA CREAR UNA PUBLICACIÓN (POST)
function publicar(event) {
  event.preventDefault();
  const input = document.getElementById("texto-publicacion");
  const texto = input.value.trim();

  if (texto === "") {
    alert("No puedes crear una publicación vacía");
    return;
  }

  const datos = {
    username: usuarioLogueado,
    texto: texto,
  };

  // Petición POST
  fetch("/api/publicaciones/crear-publicacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => res.json())
    .then((respuesta) => {
      if (respuesta.data) {
        input.value = ""; //
        obtenerMisPublicaciones(); // Recargamos las publicaciones para ver la nueva arriba
      } else {
        alert("Error al crear la publicación");
      }
    })
    .catch((err) => console.error("Error en el POST de publicación:", err));
}

//FUNCIÓN PARA MOSTRAR LAS PUBLICACIONES
function obtenerMisPublicaciones() {
  const contenedor = document.getElementById("mis-publicaciones");
  if (!contenedor) return;

  // Petición GET enviando el username como parámetro de ruta
  fetch(`/api/publicaciones/${usuarioLogueado}`)
    .then((res) => res.json())
    .then((respuesta) => {
      const publicaciones = respuesta.data || [];
      contenedor.innerHTML = ""; // Limpiamos para evitar duplicados

      if (publicaciones.length === 0) {
        contenedor.innerHTML = `<p style="text-align:center; color:gray; margin-top:20px;">Aún no has hecho ninguna publicación.</p>`;
        return;
      }

      // Invertir el array para mostrar lo más reciente al principio
      publicaciones.reverse().forEach((post) => {
        const divCard = document.createElement("div");
        divCard.classList.add("publicacion-card");

        divCard.innerHTML = `
                    <div class="publicacion-header">
                        <div class="usuario-info">
                            <div class="avatar-mini">
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <span class="pub-username">${post.username}</span>
                        </div>
                    </div>
                    <div class="publicacion-contenido">
                        <p>${post.texto}</p>
                    </div>
                `;
        contenedor.appendChild(divCard);
      });
    })
    .catch((err) => console.error("Error en el GET de publicaciones:", err));
}
