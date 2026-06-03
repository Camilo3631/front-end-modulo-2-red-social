
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
function seleccionarAvatar(img) {
  // Quitar selección anterior
  document.querySelectorAll(".avatar-opcion").forEach(a => a.classList.remove("seleccionado"));
  img.classList.add("seleccionado");
 
  // Actualizar foto de perfil en pantalla
  document.getElementById("foto-perfil").src = img.src;
}

