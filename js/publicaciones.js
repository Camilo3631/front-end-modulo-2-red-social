const usuarioLogueado = localStorage.getItem("username");

// // Función que prepara el encabezado y el nombre del perfil
// export function inicializarPerfil() {
//   const usernameElement = document.getElementById("username");
//   if (usernameElement && usuarioLogueado) {
//     usernameElement.innerText = usuarioLogueado;
//   }
//   // Llamamos a cargar los posts del usuario logueado
//   obtenerMisPublicaciones();
// }

// FUNCIÓN PARA CREAR UNA PUBLICACIÓN (POST)
export function publicar(event) {
  event.preventDefault();
  const input = document.getElementById("texto-publicacion");
  const texto = input.value.trim();

  if (texto === "") {
    alert("No puedes crear una publicación vacía");
    return;
  }

  const datos = {
    username: usuarioLogueado,
    texto: texto,
  };

  fetch("http://localhost:3000/publicaciones/crear-publicacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => res.json())
    .then((respuesta) => {
      if (respuesta.data) {
        input.value = "";
        obtenerTodasLasPublicaciones();
        actualizarContadoresPerfil(); // Recargamos para ver la nueva arriba y actualizacion del contador
      } else {
        alert("Error al crear la publicación");
      }
    })
    .catch((err) => console.error("Error en el POST:", err));
}


// FUNCIÓN PARA MOSTRAR LAS PUBLICACIONES
export function obtenerTodasLasPublicaciones() {
  const contenedor = document.getElementById("lista-publicaciones");
  if (!contenedor) return;

  fetch(`http://localhost:3000/publicaciones/todas`)
    .then((res) => res.json())
    .then((respuesta) => {
      const publicaciones = respuesta.data || [];
      contenedor.innerHTML = "";

      if (publicaciones.length === 0) {
        contenedor.innerHTML = `<p style="text-align:center; color:gray; margin-top:20px;">Aún no hay publicaciones.</p>`;
        return;
      }

      publicaciones.reverse().forEach((post) => {
        const divCard = document.createElement("div");
        divCard.classList.add("publicacion-card");

        divCard.innerHTML = `
            <div class="publicacion-header">
                <div class="usuario-info">
                    <div class="avatar-mini">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <span class="pub-username">${post.username}</span>
                </div>
            </div>
            <div class="publicacion-contenido">
                <p>${post.texto}</p>
            </div>
        `;
        contenedor.appendChild(divCard);
      });
    })
    .catch((err) => console.error("Error en el GET de publicaciones:", err));
}



// Hacemos que la función sea accesible globalmente por si el HTML usa onclick="publicar(event)"
window.publicar = publicar;
