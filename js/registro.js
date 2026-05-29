function registrar() {
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-contrasena").value;

  fetch(  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario: username, email: email, contrasena: password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.data.insertedId) {
        document.getElementById("register-message").innerText =
          "usuario registrado";
        setTimeout(() => {
          document.getElementById("register-message").innerText = "";
        }, 2000);
      }
    });
}