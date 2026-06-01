function iniciarSesion() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-contrasena").value;

  fetch(`http://localhost:3000/usuarios/iniciar-sesion`, {
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
        fetch("../html/contactos.html")
          .then((res) => res.text())
          .then((html) => {
            document.getElementById("contenido").innerHTML = html;
          });

        localStorage.setItems("email", data.usuarioVerificado.email);
      } else {
        document.getElementById("error-inicio-sesion").innerText =
          "Credenciales incorrectas";
      }
    });
}

function navPerfil() {}
