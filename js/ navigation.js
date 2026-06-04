// Panel ajustes dentro del perfil

function toggleConfig() {
  document.getElementById("panel-config").classList.toggle("abierto");
  document.getElementById("perfil-contenido").classList.toggle("reducido");
}

// NAVBAR
function navContactos() {
  window.location.href = "contactos.html";
}

function navPerfil() {
  window.location.href = "perfil.html";
}

//perfil
// SELECCIONAR AVATAR
function seleccionarAvatar(div) {
  // Quitar selección anterior
  document
    .querySelectorAll(".avatar-opcion")
    .forEach((a) => a.classList.remove("seleccionado"));
  div.classList.add("seleccionado");

  // Copiar el icono y el color al div de la foto de perfil
  const iconoSeleccionado = div.querySelector("i");
  const fotoPerfil = document.getElementById("foto-perfil");

  fotoPerfil.innerHTML = iconoSeleccionado.outerHTML;
}

//chats
function cerrarChat() {
  window.location.href = "contactos.html";
}

function abrirPerfil() {
  window.location.href = "perfil.html";
}
