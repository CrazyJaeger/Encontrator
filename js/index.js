// INICIALIZACION DE ELEMENTOS INTERACTUABLES DE PANTALLA //
function init(){
    document.getElementById("create-creature-btn").onclick = () => 
        location.replace("./criaturas/creadorCriaturas.html");

    document.getElementById("run-enconuter-btn").onclick = () =>
        obtenerJson("encuentros", "00_IndiceEncuentros", listarEncuentros);
}

// FUNCIONES DE PINTADO DE ELEMENTOS //
function listarEncuentros(encuentrosObject){
    const listado = document.getElementById("encuentros-lista");
    for(const encuentro in encuentrosObject.encuentros){

    }
}
