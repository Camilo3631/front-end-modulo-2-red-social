import { url } from "./api.config.js";
import { getHtml } from "./services/html.service.js";

getHtml("btn-registro").addEventListener("click", () => {
  registrar()
});

function registrar() {
  const username = getHtml("reg-username").value;
  const email = getHtml("reg-email").value;
  const password = getHtml("reg-contrasena").value;

  fetch(`${url}usuarios/registrar`, {
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

      getHtml("reg-username").value = "";
      getHtml("reg-email").value = "";
      getHtml("reg-contrasena").value = "";

      if (data.insertedId) {
        getHtml("register-message").innerText =
          "Usuario registrado";
        setTimeout(() => {
          getHtml("register-message").innerText = "";
        }, 8000);
      }
    });
}
