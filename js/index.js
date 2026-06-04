const url = "http://localhost:3000";

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

        guardarUsuario(data);
        listaContactos(data);

        fetch("../html/contactos.html")
          .then((res) => res.text())
          .then((html) => {
            document.getElementById("contenido").innerHTML = html;
          });
      } else {
        document.getElementById("error-inicio-sesion").innerText =
          "Credenciales incorrectas";
      }
    });
}

function listaContactos(data) {
  fetch("../html/contactos.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("contenido").innerHTML = html;
      console.log(data);
    });
  let username = data.usuarioVerificado.username;

  fetch(`${url}/contactos/${username}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((contacto) => {
        let contactoUsername =
          contacto.username_contacto1 === username
            ? contacto.username_contacto2
            : contacto.username_contacto1;
      });
      document.getElementById("lista-contactos").innerHTML += `
            <div>
            ${contactoUsername}
            </div>
            `;
    });
}

//Para personalizar pantalla de perfil/contactos con datos del usuario
function guardarUsuario(data) {
  localStorage.setItem("id", data.usuarioVerificado._id);
  localStorage.setItem("email", data.usuarioVerificado.email);
  localStorage.setItem("username", data.usuarioVerificado.username);
}

//Crear publicacion
