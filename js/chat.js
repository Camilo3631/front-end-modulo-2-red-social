const url = "http://localhost:3000";

export function obtenerMensajes(usernameContacto) {
  const userLog = localStorage.getItem("username");

  fetch(`${url}/chat/mostrar-mensajes/${userLog}/${usernameContacto}`)
    .then((res) => res.json())
    .then((data) => {
      const chat = document.getElementById("chat-mensajes");

      let html = "";

      data.forEach((mensaje) => {
        const userClass =
          userLog === mensaje.emisor ? "logged" : "contact";

        html += `
          <div class="${userClass}">
            <div class="burbuja-chat">
              <p><strong>${mensaje.emisor}</strong></p>
              <p>${mensaje.mensaje}</p>
              <span>${mensaje.fecha}</span>
            </div>
          </div>
        `;
      });

      // Solo actualiza si realmente cambió
      if (chat.innerHTML !== html) {
        chat.innerHTML = html;
      }

      setTimeout(() => {
        obtenerMensajes(usernameContacto);
      }, 3000);
    });
}


export function enviarMensaje(usernameContacto) {
  const mensaje = document.getElementById("input-mensaje").value;
  const userLog = localStorage.getItem("username");
console.log(mensaje, userLog)
  fetch(`${url}/chat/registrar-mensaje`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emisor: userLog,
      receptor: usernameContacto,
      mensaje: mensaje,
      fecha: new Date().toLocaleString(),
    }),
  })
    .then((res) => res.json())
    .then((data) => {

    });
}
