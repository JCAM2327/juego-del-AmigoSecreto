// Array para almacenar los nombres de los amigos
let amigos = [];

// Elementos del DOM
const inputAmigo = document.getElementById('amigo');
const listaAmigos = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const nombre = inputAmigo.value.trim();
    
    // Validar que el nombre no esté vacío
    if (nombre === '') {
        alert('Por favor, escribe un nombre.');
        return;
    }
    
    // Validar que el nombre no esté repetido
    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista.');
        return;
    }
    
    // Agregar al array y actualizar la lista en pantalla
    amigos.push(nombre);
    actualizarListaAmigos();
    
    // Limpiar el campo de entrada
    inputAmigo.value = '';
}

// Función para actualizar la lista de amigos en el DOM
function actualizarListaAmigos() {
    // Limpiar la lista actual
    listaAmigos.innerHTML = '';
    
    // Recorrer el array y agregar cada amigo
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

// Función para barajar un array (Fisher-Yates shuffle)
function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // Intercambiar elementos
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    
    return array;
}

// Función para sortear los amigos secretos
function sortearAmigo() {
    // Verificar que haya suficientes amigos
    if (amigos.length < 2) {
        alert('Necesitas al menos 2 amigos para sortear.');
        return;
    }
    
    // Crear una copia del array de amigos
    let asignados = [...amigos];
    
    // Barajar hasta que no haya autoasignaciones
    let intentos = 0;
    const maxIntentos = 100;
    
    do {
        asignados = shuffle([...asignados]);
        intentos++;
    } while (asignados.some((amigo, index) => amigo === amigos[index]) && intentos < maxIntentos);
    
    // Si después de maxIntentos aún hay autoasignaciones, hacer un ajuste manual
    if (intentos === maxIntentos) {
        for (let i = 0; i < amigos.length; i++) {
            if (asignados[i] === amigos[i]) {
                // Buscar un índice diferente para intercambiar
                let j;
                do {
                    j = Math.floor(Math.random() * amigos.length);
                } while (j === i);
                
                // Intercambiar
                [asignados[i], asignados[j]] = [asignados[j], asignados[i]];
            }
        }
    }
    
    // Mostrar los resultados
    mostrarResultados(asignados);
}

// Función para mostrar los resultados del sorteo
function mostrarResultados(asignados) {
    // Limpiar resultados anteriores
    resultado.innerHTML = '';
    
    // Recorrer el array de amigos y mostrar cada asignación
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = `${amigo} ➔ ${asignados[index]}`;
        resultado.appendChild(li);
    });
}