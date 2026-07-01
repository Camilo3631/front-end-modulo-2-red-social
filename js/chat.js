import { doGet, doPost } from "./services/api.service.js";
import { getHtml, loadHtml } from "./services/html.service.js";

let usernameContacto = ""

export async function navChat(contacto) {
  const htmlChat = await loadHtml("./html/chats.html")
  getHtml("contenido").innerHTML = htmlChat
  getHtml("chat-username").innerText = contacto
  usernameContacto = contacto
  obtenerMensajes()
  getHtml("btn-enviarMensaje").addEventListener("click", () => {
    enviarMensaje(contacto)
  })
}

export async function obtenerMensajes() {
  const userLog = localStorage.getItem("username");
  const res = await doGet(`chat/mostrar-mensajes/${userLog}/${usernameContacto}`)
  const chat = getHtml("chat-mensajes");
  let html = "";

  res.forEach((mensaje) => {
    const userClass = userLog === mensaje.emisor ? "logged" : "contact";
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
  if (chat) chat.innerHTML = html

  setTimeout(async () => { await obtenerMensajes() }, 500)
}

export async function enviarMensaje(usernameContacto) {
  const res = await doPost(`chat/registrar-mensaje`, {
    emisor: localStorage.getItem("username"),
    receptor: usernameContacto,
    mensaje: getHtml("input-mensaje").value,
    fecha: new Date().toLocaleString(),
  })
}
