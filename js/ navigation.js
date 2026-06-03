
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
// ── SELECCIONAR AVATAR ────────────────────────────────────────────────────────
function seleccionarAvatar(i) {
  // Quitar selección anterior
  document.querySelectorAll(".avatar-opcion").forEach(a => a.classList.remove("seleccionado"));
  i.classList.add("seleccionado");
 
  // Actualizar foto de perfil en pantalla
  document.getElementById("foto-perfil").src = i.src;
}

//chats
function cerrarChat(){
  window.location.href = "contactos.html";
}

function abrirPerfil(){
  window.location.href = "perfil.html"; 
}