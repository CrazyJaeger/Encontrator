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
    for(const encuentro of encuentrosObject.encuentros){
        const itemElement = document.createElement("li");
        const anchorElement = document.createElement("a");
        anchorElement.href= `./encuentros/simularEncuentro.html?nombre=${encuentro.nombre}&hoja=${encuentro.hoja}`;
        anchorElement.innerHTML = encuentro.nombre;

        itemElement.appendChild(anchorElement);
        listado.appendChild(itemElement);
    }

    showElement(document.getElementById("encuentros-card"));
}
