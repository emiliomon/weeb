// Función para guardar una receta en localStorage
function guardarReceta(receta) {
    const recetasGuardadas = localStorage.getItem('recetas');
    const recetas = recetasGuardadas ? JSON.parse(recetasGuardadas) : [];
    recetas.push(receta);
    localStorage.setItem('recetas', JSON.stringify(recetas));
}

// Función para mostrar una receta en la página
function mostrarReceta(receta) {
    const recipeContainer = document.createElement('div');
    recipeContainer.className = 'recipe-card';
    recipeContainer.innerHTML = `
        <h3>${receta.titulo}</h3>
        <p>${receta.descripcion}</p>
        ${receta.imagen ? `<img src="${receta.imagen}" alt="Imagen de ${receta.titulo}">` : ''}
        <div class="comments-section">
            <h4>Comentarios</h4>
            <form class="comment-form" data-id="${receta.id}">
                <input type="text" placeholder="Escribe tu comentario..." required>
                <button type="submit">Comentar</button>
            </form>
            <div class="comments-container">
                ${receta.comentarios.map(comment => `<p>${comment}</p>`).join('')}
            </div>
        </div>
    `;
    document.getElementById('recipes-container').appendChild(recipeContainer);
}

// Maneja el envío del formulario para agregar una receta
document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.getElementById('imagen').value;

    const nuevaReceta = {
        titulo: titulo,
        descripcion: descripcion,
        imagen: imagen || '',
        comentarios: []
    };

    guardarReceta(nuevaReceta);
    document.getElementById('recipe-form').reset();
    mostrarReceta(nuevaReceta);
});

// Recupera y muestra recetas guardadas al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const recetasGuardadas = localStorage.getItem('recetas');
    if (recetasGuardadas) {
        const recetas = JSON.parse(recetasGuardadas);
        recetas.forEach(receta => mostrarReceta(receta));
    }
});
