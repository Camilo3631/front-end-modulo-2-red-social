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
            document.getElementById("contacto-contenido").innerHTML = html;
            console.log(data)
          });

          localStorage.setItem("id", data.usuarioVerificado._id);
          localStorage.setItem("email", data.usuarioVerificado.email);
          localStorage.setItem("username", data.usuarioVerificado.username);

      } else {
        document.getElementById("error-inicio-sesion").innerText =
          "Credenciales incorrectas";
      }
    });
}

function navPerfil() {
  fetch("/..html/perfil.html").then(res=> res.text()).then(html => {
    document.getElementById("perfil-contenido").innerHTML = html;
    let usernamePerfil = localStorage.getItem("username");

    document.getElementById("username").innerText = usernamePerfil;

  })
}
