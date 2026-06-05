const url = 'http://localhost:3000';

export function obtenerMensajes(usernameContacto) {
const userLog = localStorage.getItem('username')
console.log(userLog, usernameContacto)
  fetch(`${url}/chat/mostrar-mensajes/${userLog}/${usernameContacto}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      data.forEach(mensaje => {
          document.getElementById('chat-mensajes').innerHTML += `
            <p>${mensaje.mensaje}</p>
          `

      })
     
    });
}
