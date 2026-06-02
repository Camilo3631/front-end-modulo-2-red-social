const inputBusqueda = document.getElementById('input-buscar');

const resultadosBusqueda = document.getElementById('resultados-busqueda');

let usuarios = [];

const cargarUsuarios = async  () => {

    try  {
     
        const response = await fetch('http://localhost:3000/usuarios');
        const data = await response.json();
        usuarios = data;

        mostrarUsuarios(usuarios);

    } catch (error) {
        alert('Error loading users');
    }
};

const buscarUsuario = () => {

    const texto = inputBusqueda.value.toLowerCase();

    const usuariosFiltrados = usuarios.filter(usuario => usuario.username.toLowerCase().includes(texto));

    mostrarUsuarios(usuariosFiltrados);
};


const mostrarUsuarios = (usuarios) => {

    resultadosBusqueda.innerHTML = '';

    usuarios.forEach(usuario => {

        resultadosBusqueda.innerHTML += `
        
        <div class="card-usuario">

         <h3>${usuario.username}</h3>

         <button>
           Follow
         </button>
        

        </div>`

    });
};

cargarUsuarios();





















