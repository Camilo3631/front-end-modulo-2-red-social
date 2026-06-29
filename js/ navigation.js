
function toggleConfig() {
  document.getElementById("panel-config").classList.toggle("abierto");
  document.getElementById("perfil-contenido").classList.toggle("reducido");
}

function seleccionarAvatar(div) {
  document
    .querySelectorAll(".avatar-opcion")
    .forEach((a) => a.classList.remove("seleccionado"));
  div.classList.add("seleccionado");

  const iconoSeleccionado = div.querySelector("i");
  const fotoPerfil = document.getElementById("foto-perfil");

  fotoPerfil.innerHTML = iconoSeleccionado.outerHTML;
}

function cerrarChat() {
  window.location.href = "contactos.html";
}

function abrirPerfil() {
  window.location.href = "perfil.html";
}

document.getElementById("link-perfil").addEventListener("click", ()=>{
  console.log("hola")
  navPerfil()
})

function navPerfil() {
  fetch("./html/perfil.html")
    .then((res) => res.text())
    .then((html) => {
      const usernamePerfil = localStorage.getItem("username");
      document.getElementById("contenido").innerHTML = html;
      document.getElementById("username").innerText = usernamePerfil;

      obtenerTodasLasPublicaciones();
      actualizarContadoresPerfil();

    })
    .catch((err) =>
      console.error("Error al cargar la pantalla de perfil:", err),
    );
};
