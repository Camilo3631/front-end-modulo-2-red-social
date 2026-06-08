const url = "https://back-end-modulo-2-red-social.vercel.app/"
function registrar() {
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-contrasena").value;


  
   fetch(`${url}/usuarios/registrar`, {

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


      if (data.insertedId) {
        document.getElementById("register-message").innerText =
          "Usuario registrado";
        setTimeout(() => {
          document.getElementById("register-message").innerText = "";
        }, 8000);
      }
    });
}
