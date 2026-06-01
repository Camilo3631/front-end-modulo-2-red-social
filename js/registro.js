function registrar() {
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-contrasena").value;

<<<<<<< HEAD
  fetch(`http://localhost:3000/usuarios/registrar`, {
=======
   fetch(`http://localhost:3000/usuarios/registrar`, {
>>>>>>> 1350a81133b2419ef4279082b46ae4a7c6272d1d
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      contrasena: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      document.getElementById("reg-username").value = ""
      document.getElementById("reg-email").value = ""
      document.getElementById("reg-contrasena").value = ""

      if (data.data.insertedId) {
        document.getElementById("register-message").innerText =
          "Usuario registrado";
        setTimeout(() => {
          document.getElementById("register-message").innerText = "";
        }, 8000);
      }
    });
}
