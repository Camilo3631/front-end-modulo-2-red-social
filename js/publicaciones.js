//Crear publicacion
async function crearPublicacion() {
  const texto = document.getElementById("texto-publicacion").value.trim();
  const msg = document.getElementById("msg-nueva-pub");

  if (!texto) {
    msg.textContent = "Escribe algo antes de publicar.";
    return;
  }

  const res = await fetch("/publicaciones/crear-publicacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto }),
  });
  const data = await res.json();

  if (res.ok) {
    msg.textContent = "";
    document.getElementById("texto-publicacion").value = "";
    cargarPublicaciones();
  } else {
    msg.textContent = data.mensaje || "Error al publicar.";
  }
}
