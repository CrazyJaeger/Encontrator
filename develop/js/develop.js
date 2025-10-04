/**
 * Arranca el entorno de pruebas de modales
 */
function init(){
    const bsModal = new bootstrap.Modal(document.getElementById("develop-modal"));
    bsModal.show();

    setTimeout(function(){
        initModal();
    }, 1000);
}

function initModal(){
    // Copiar contenido 
}

// Insertar a partir de aqui funciones adicionales que queramos probar
