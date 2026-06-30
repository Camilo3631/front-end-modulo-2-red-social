import { url } from "./api.config.js";
import { getHtml } from "./services/html.service.js";
import { loadHtml } from "./services/html.service.js";



export async function btnChat(contactoUsername) {
  const htmlChat = await loadHtml("./html/chats.html")
  getHtml("contenido").innerHTML = htmlChat
  getHtml("chat-username").innerText = contactoUsername
  obtenerMensajes(contactoUsername)
  getHtml("btn-enviarMensaje").addEventListener("click", () => {
    enviarMensaje(contactoUsername)
  })
}


export function obtenerMensajes(usernameContacto) {
  const userLog = localStorage.getItem("username");

  fetch(`${url}chat/mostrar-mensajes/${userLog}/${usernameContacto}`)
    .then((res) => res.json())
    .then((data) => {
      const chat = getHtml("chat-mensajes");

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
      }, 500);
    });
}




export function enviarMensaje(usernameContacto) {
  const mensaje = getHtml("input-mensaje").value;
  const userLog = localStorage.getItem("username");
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
