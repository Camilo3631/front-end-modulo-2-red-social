const url = "https://back-end-modulo-2-red-social.vercel.app/"

export function obtenerMensajes(usernameContacto) {
  const userLog = localStorage.getItem("username");

  fetch(`${url}chat/mostrar-mensajes/${userLog}/${usernameContacto}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      enviarMensaje(usernameContacto);
      data.forEach((mensaje) => {
        document.getElementById("chat-mensajes").innerHTML += `
            <div class="burbuja-chat">
                <p>${mensaje.emisor}</p>
                <p>${mensaje.mensaje}</p>
                <span>${mensaje.fecha}</span>
            </div>
          `;
      });
    });
}


export function enviarMensaje(usernameContacto) {
  const mensaje = document.getElementById("input-mensaje").value;
  const userLog = localStorage.getItem("username");
console.log(mensaje, userLog)
  fetch(`${url}chat/registrar-mensaje`, {
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
