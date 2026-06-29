import { url } from "./api.config.js";


// // FUNCIÓN PARA ACTUALIZAR LOS CONTADORES DEL PERFIL


export function actualizarContadoresPerfil() {
  const usuarioLogueado = localStorage.getItem("username");


  const contPostsElement = document.getElementById("contador-posts");
  const contSiguiendoElement = document.getElementById("contador-siguiendo");

  if (!contPostsElement && !contSiguiendoElement) return;


  // Contador de Publicaciones
  // 
  fetch(`${url}publicaciones/todas`)
    .then((res) => res.json())
    .then((respuesta) => {
      const publicaciones = respuesta.data || [];
      const misPublicaciones = publicaciones.filter(post => post.username === usuarioLogueado);

      if(contPostsElement) {
          contPostsElement.innerText = misPublicaciones.length;
      }
    })
    .catch((err) => console.error("Error al contar publicaciones:", err));

  // 3. Contador de Seguidos / Contactos
  fetch(`${url}contactos/${usuarioLogueado}`)
    .then((res) => res.json())
    .then((contactos) => {
      if(contSiguiendoElement) {
          contSiguiendoElement.innerText = contactos.length;
      }
    })
    .catch((err) => console.error("Error al contar contactos:", err));
}


export function cerrarSesion(){
    console.log("cerrar sesion")
}