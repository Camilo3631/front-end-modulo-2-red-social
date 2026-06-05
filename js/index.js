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

