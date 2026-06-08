
const listaContactos = document.getElementById('lista-contactos');
const msgContactos = document.getElementById('msg-contactos');

let contactos = [];
let usuarios = [];

export const buscarUsuarios = async (username) => {
    try {
        const response = await fetch('http://localhost:3000/usuarios/buscar',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username
    }),

        });
        usuarios = await response.json();
        

        let usernamelogueado = localStorage.getItem('username')
        const responseContactos = await fetch(`http://localhost:3000/contactos/${usernamelogueado}`);
        
        contactos = await responseContactos.json();
        
        mostrarUsuarios(usuarios.data, contactos);
        
    } catch (error) {
        alert('Error al cargar usuarios y contactos');
    }
};


export const mostrarUsuarios = (usuariosParaMostrar, contactos) => {
    const resultadosBusqueda = document.getElementById('resultados-busqueda');
    resultadosBusqueda.innerHTML = '';
    console.log(usuariosParaMostrar)
    console.log(contactos)
    
    usuariosParaMostrar.forEach(usuario => {
        const yaLoSigo = contactos.some(c => c.username_contacto1 === usuario.username || c.username_contacto2 === usuario.username );
        const textoBoton = yaLoSigo ? 'Unfollow' : 'Follow';
        const claseBoton = yaLoSigo ? 'btn-unfollow' : 'btn-follow';

            resultadosBusqueda.innerHTML += `
          <div class='card-usuario'>

            <div class='info'>
              <p>@${usuario.username}</p>
            </div>

            <button class='${claseBoton} ${yaLoSigo})'>
                ${textoBoton}
            </button>
          </div>
      `;

    //     resultadosBusqueda.innerHTML += `
    //       <div class='card-usuario'>
    //         <img src='${usuario.foto || 'https://picsum.photos'}' class='foto-perfil' alt='Perfil'>

    //         <div class='info'>
    //           <p>@${usuario.username}</p>
    //         </div>

    //         <button class='${claseBoton}' onclick='ChangeFollow(${usuario.id}, ${yaLoSigo})'>
    //             ${textoBoton}
    //         </button>
    //       </div>
    //   `;
    });
};


// export const ChangeFollow = async (idUsuario, yaLoSigo) => {
//     try {
//         if (yaLoSigo) {
//             await fetch(`http://localhost:3000/contactos/${idUsuario}`, {
//                 method: 'DELETE'
//             });
//         } else {
//             await fetch('http://localhost:3000/contactos', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ id_usuario: idUsuario })
//             });
//         } 
//         cargarUsuarios(); 
//     } catch (error) {
//         alert('Error al actualizar seguimiento');
//     }
// };


// export const iniciarChat = (username) => {
//     alert(`Iniciando chat con @${username}`);
// };

// export const navPerfil = () => {
//     window.location.href = './perfil.html';
// };



// FUNCIÓN PARA MOSTRAR LAS PUBLICACIONES
export function obtenerPublicacionesUsuarios() {
  const contenedor = document.getElementById("publicaciones-contacto");
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