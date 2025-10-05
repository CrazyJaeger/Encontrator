// CONSTANTES Y VARIABLES DEL CU //
const TURNOS = [];

// INICIALIZACION DE ELEMENTOS INTERACTUABLES DE PANTALLA //

/**
 * Inicializa los elementos interactuables de la pantalla principal
 */
function init(){
    const params = new URLSearchParams(document.location.search);
    document.getElementById("cabecera-encuentro").innerHTML = params.get("nombre");
    obtenerJson("encuentros", params.get("hoja"), pintarIniciativa);
    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerHTML = "Tirar iniciativa";
    nextBtn.onclick = () => 
        initDespliegue(new Encuentro(
            Object.fromEntries(new FormData(document.getElementById("formulario_iniciativa")).entries())
        ));
}

function initDespliegue(encuentro){
    const body = document.getElementById("cuerpo-encuentro");
    body.innerHTML = "";
    body.appendChild(encuentro.toDespliegueHtml());
    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerHTML = "Desplegar";
    nextBtn.onclick = () => 
        initEncuentro(new Encuentro(
            Object.fromEntries(new FormData(document.getElementById("formulario_despliegue")).entries())
        ));
}

function initEncuentro(encuentro){
    TURNOS.push(encuentro);
    const body = document.getElementById("cuerpo-encuentro");
    body.innerHTML = "";
    body.appendChild(encuentro.toCombateHtml(combatienteActual));

    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerHTML = "Siguiente";
    nextBtn.onclick = () => 
        initTurnoSiguiente(new Encuentro(
            Object.fromEntries(new FormData(document.getElementById("formulario_encuento")).entries())
        ));

    const backBtn = document.getElementById("back-btn");
    backBtn.disabled = false;
    backBtn.onclick = () => 
        initTurnoAnterior();
}

function initTurnoSiguiente(encuentro){

}

function initTurnoAnterior(){
    
}

// FUNCIONES BASICAS //
function calcularTiradaIniciativa(iniciativa){
    return Math.floor(Math.random() * 19 + 1) + iniciativa;
}

// FUNCIONES DE PINTADO DE ELEMENTOS //
function pintarIniciativa(encuentroObject){
    const formularioElement = document.createElement("form");
    formularioElement.id = "formulario_iniciativa";

    const faseInput = document.createElement("input");
    faseInput.id = "fase";
    faseInput.name = "fase";
    faseInput.type = "hidden";
    faseInput.value = "iniciativa";
    formularioElement.appendChild(faseInput);

    for(const equipo in encuentroObject){
        const cartaElement = document.createElement("div");
        cartaElement.classList.add("card", "mb-2");

        const cabeceraElement = document.createElement("div");
        cabeceraElement.classList.add("card-header", "fw-bold", equipo);
        cabeceraElement.innerHTML = equipo;
        cartaElement.appendChild(cabeceraElement);

        const cuerpoElement = document.createElement("div");
        cuerpoElement.id = equipo;
        cuerpoElement.classList.add("card-body", "form-group", "row");

        let i = 0;
        for(const integrante of encuentroObject[equipo]){
            const integranteElement = document.createElement("div");
            integranteElement.classList.add("col-md-12", "mb-2");

            const integranteRow = document.createElement("div");
            integranteRow.classList.add("row", "align-items-center");

            const nombreText = document.createElement("label");
            nombreText.htmlFor = `${equipo}_${i}__nombre`;
            nombreText.classList.add("col-md-6", "col-form-label");
            nombreText.innerHTML = integrante.nombre;
            integranteRow.appendChild(nombreText);

            const nombreInput = document.createElement("input");
            nombreInput.id = `${equipo}_${i}__nombre`;
            nombreInput.name = `${equipo}[${i}].nombre`;
            nombreInput.type = "hidden";
            nombreInput.value = integrante.nombre;
            integranteRow.appendChild(nombreInput);

            const hojaInput = document.createElement("input");
            hojaInput.id = `${equipo}_${i}__hoja`;
            hojaInput.name = `${equipo}[${i}].hoja`;
            hojaInput.type = "hidden";
            hojaInput.value = integrante.hoja ?? "";
            integranteRow.appendChild(hojaInput);

            const iniciativaInput = document.createElement("input");
            iniciativaInput.id = `${equipo}_${i}__iniciativa`;
            iniciativaInput.name = `${equipo}[${i}].iniciativa`;

            if(integrante.hoja){
                iniciativaInput.type = "hidden";
                iniciativaInput.value = calcularTiradaIniciativa(integrante.iniciativa);
                
                const iniciativaLabel = document.createElement("label");
                iniciativaLabel.htmlFor = `${equipo}_${i}__iniciativa`;
                iniciativaLabel.classList.add("col-md-3", "col-form-label");
                iniciativaLabel.innerHTML = iniciativaInput.value;
                integranteRow.appendChild(iniciativaLabel);
                integranteRow.appendChild(iniciativaInput);
            }else{
                iniciativaInput.type = "text";
                iniciativaInput.classList.add("form-control");
                iniciativaInput.oninput = () => filterNumbers(iniciativaInput);

                const iniciativaCol = document.createElement("div");
                iniciativaCol.classList.add("col-md-3");

                iniciativaCol.appendChild(iniciativaInput);
                integranteRow.appendChild(iniciativaCol);
            }

            integranteElement.appendChild(integranteRow);
            cuerpoElement.appendChild(integranteElement);
            i++;
        }

        cartaElement.appendChild(cuerpoElement);
        formularioElement.appendChild(cartaElement);
    }

    document.getElementById("cuerpo-encuentro").appendChild(formularioElement);
}