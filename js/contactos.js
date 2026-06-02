const inputBusqueda = document.getElementById('input-buscar');

const resltadosbusqueda = document.getElementById('resultados-busqueda');

let usuarios = [];

const cargarUsuarios = () => {

    try  {
     
        const response = await fetch('http://localhost:3000/usuarios');
        const data = await response.json();
        usuarios = data;

        mostrarUsarios(usuarios);

    } catch (error) {
        alert('Error loading users');
    }
};

const buscarUsuario = () => {

    const texto = inputBuscar.value.toLowerCase();

    const usuariosFiltrados = usuarios.filter(usuario => usuario.username.toLowerCase().incluides(texto));

    mostrarUsuarios(usariosFiltrados);
};
























