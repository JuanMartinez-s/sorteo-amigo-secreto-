let nombresIngresados = [];

// Limpia el campo de entrada
function limpiarCaja() {
    document.querySelector('#amigo').value = '';
}


function actualizarLista(elemento) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = ""; // Limpia la lista antes de actualizar
    nombresIngresados.forEach(nombreNuevo => {
        elementoHtml.innerHTML += `<li>${nombreNuevo}</li>`;
    });
}

// Agrega un nuevo amigo a la lista
function agregarAmigo() {
    let input = document.getElementById('amigo');
    let nombreNuevo = input.value.trim();

    if (nombreNuevo === "") {
        alert('Por favor, ingrese un nombre válido');
        return;
    }

    nombresIngresados.push(nombreNuevo);
    actualizarLista('#listaAmigos');
    limpiarCaja();
}

// Mezcla los nombres
function mezclarNombres(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Asigna amigos secretos
function sortearAmigo() {
    if (nombresIngresados.length < 4) {
        alert('Debe ingresar al menos 4 nombres');
        return;
    }

    let asignaciones;
    let esValido = false;

    // Mezclar hasta que nadie se asigne a sí mismo
    while (!esValido) {
        asignaciones = [...nombresIngresados]; // Copia del array original
        mezclarNombres(asignaciones);

        esValido = true; 
        for (let i = 0; i < nombresIngresados.length; i++) {
            if (nombresIngresados[i] === asignaciones[i]) {
                esValido = false; // Error, volvemos a mezclar
                break;
            }
        }
    }

    // Asignamos los amigos secretos en un objeto
    let resultados = {};
    for (let i = 0; i < nombresIngresados.length; i++) {
        resultados[nombresIngresados[i]] = asignaciones[i];
    }

    publicarResultado('#resultado', resultados);
    return resultados;
}

// Publica los resultados
function publicarResultado(elemento, resultados) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = ""; // Limpia el contenido antes de actualizar

    for (let nombre in resultados) {
        elementoHtml.innerHTML += `<li>${nombre} ➡️ ${resultados[nombre]}</li>`;
    }
}
