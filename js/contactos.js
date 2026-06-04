const inputBusqueda = document.getElementById('input-buscar');
const resultadosBusqueda = document.getElementById('resultados-busqueda');
const listaContactos = document.getElementById('lista-contactos');
const msgContactos = document.getElementById('msg-contactos');

let contactos = [];
let usuarios = [];

const cargarUsuarios = async () => {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        usuarios = await response.json();

        const responseContactos = await fetch('http://localhost:3000/contactos');
        contactos = await responseContactos.json();

        mostrarUsuarios(usuarios);
        mostrarContactos(contactos);
    } catch (error) {
        alert('Error al cargar usuarios y contactos');
    }
};

const buscarUsuario = () => {
    const texto = inputBusqueda.value.toLowerCase();

    const usuariosFiltrados = usuarios.filter(usuario => 
        (usuario.username && usuario.username.toLowerCase().includes(texto)) ||
        (usuario.nombre && usuario.nombre.toLowerCase().includes(texto))
    );
    
    mostrarUsuarios(usuariosFiltrados);
};

const mostrarUsuarios = (usuariosParaMostrar) => {
    resultadosBusqueda.innerHTML = '';

    
    usuariosParaMostrar.forEach(usuario => {
        const yaLoSigo = contactos.some(c => c.id === usuario.id);
        const textoBoton = yaLoSigo ? 'Unfollow' : 'Follow';
        const claseBoton = yaLoSigo ? 'btn-unfollow' : 'btn-follow';

        resultadosBusqueda.innerHTML += `
          <div class='card-usuario'>
            <img src='${usuario.foto || 'https://picsum.photos'}' class='foto-perfil' alt='Perfil'>

            <div class='info'>
              <h3>${usuario.nombre || 'Usuario'}</h3>
              <p>@${usuario.username}</p>
            </div>

            <button class='${claseBoton}' onclick='ChangeFollow(${usuario.id}, ${yaLoSigo})'>
                ${textoBoton}
            </button>
          </div>
      `;
    });
};


const ChangeFollow = async (idUsuario, yaLoSigo) => {
    try {
        if (yaLoSigo) {
            await fetch(`http://localhost:3000/contactos/${idUsuario}`, {
                method: 'DELETE'
            });
        } else {
            await fetch('http://localhost:3000/contactos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_usuario: idUsuario })
            });
        } 
        cargarUsuarios(); 
    } catch (error) {
        alert('Error al actualizar seguimiento');
    }
};


const iniciarChat = (username) => {
    alert(`Iniciando chat con @${username}`);
};

const navPerfil = () => {
    window.location.href = './perfil.html';
};


cargarUsuarios();

