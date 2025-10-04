// CONSTANTES //

const VIEW_DIR = "criaturas";
const MODAL_ID = "criaturas-modal";
const MODAL_RASGOS = "_modalRasgo";
const MODAL_ACCION = "_modalAccion";
const MODAL_CONJURO = "_modalConjuro";

const TIRADAS_SALVACION = {
    nombreLista: "tiradasSalvacion",
    opciones : {
        "fuerza" : "fuerza", 
        "destreza": "destreza", 
        "constitucion" : "constitucion", 
        "inteligencia" : "inteligencia", 
        "sabiduria" : "sabiduria", 
        "carisma": "carisma"
    }
};

const HABILIDADES = {
    nombreLista: "habilidades",
    opciones : {
        "atletismo" : "fuerza", 
        "acrobacias": "destreza", 
        "con. arcano" : "inteligencia", 
        "engaño" : "carisma", 
        "historia": "inteligencia",
        "interpretación" : "carisma", 
        "intimidación" : "carisma",
        "investigación" : "inteligencia",
        "juego de manos": "destreza", 
        "medicina": "sabiduria",
        "naturaleza": "inteligencia",
        "percepción": "sabiduria",
        "perspicacia": "sabiduria",
        "persuasión": "carisma",
        "religión": "inteligencia",
        "sigilo": "destreza",
        "supervicencia": "sabiduria",
        "trat. con animales": "sabiduria",
    }
};

// INICIALIZACION DE ELEMENTOS INTERACTUABLES DE PANTALLA //

/**
 * Inicializa los elementos interactuables de la pantalla principal
 */
function init(){
    const fuerzaElement = document.getElementById("fuerza");
    fuerzaElement.oninput = () => {
        filterNumbers(fuerzaElement);
        document.getElementById("modFuerza").innerHTML = pintarParentesis(calcularModificador(+fuerzaElement.value));
    };        
    
    const destrezaElement = document.getElementById("destreza");
    destrezaElement.oninput = () => {
        filterNumbers(destrezaElement);
        document.getElementById("modDestreza").innerHTML = pintarParentesis(calcularModificador(+destrezaElement.value));
    };

    const constitucionElement = document.getElementById("constitucion");
    constitucionElement.oninput = () => {
        filterNumbers(constitucionElement);
        document.getElementById("modConstitucion").innerHTML = pintarParentesis(calcularModificador(+constitucionElement.value));
    };
    
    const inteligenciaElement = document.getElementById("inteligencia");
    inteligenciaElement.oninput = () => {
        filterNumbers(inteligenciaElement);
        document.getElementById("modInteligencia").innerHTML = pintarParentesis(calcularModificador(+inteligenciaElement.value));
    };
    
    const sabiduriaElement = document.getElementById("sabiduria");
    sabiduriaElement.oninput = () => {
        filterNumbers(sabiduriaElement);
        document.getElementById("modSabiduria").innerHTML = pintarParentesis(calcularModificador(+sabiduriaElement.value));
        recalcularPercepcionPasiva();
    };
    
    const carismaElement = document.getElementById("carisma");
    carismaElement.oninput = () => {
        filterNumbers(carismaElement);
        document.getElementById("modCarisma").innerHTML = pintarParentesis(calcularModificador(+carismaElement.value));
    };

    document.getElementById("add-tirada-salvacion").onclick = () => 
        addDesplegable(TIRADAS_SALVACION.nombreLista, TIRADAS_SALVACION.opciones);

    document.getElementById("add-habilidad").onclick = () => 
        addDesplegable(HABILIDADES.nombreLista, HABILIDADES.opciones);

    document.getElementById("add-sentido").onclick = () => 
        addTextbox("sentidos", "sentido");

    document.getElementById("add-idioma").onclick = () => 
        addTextbox("idiomas", "idioma");

    document.getElementById("add-inmunidad-estado").onclick = () => 
        addTextbox("inmunidadesEstado", "inmunidadEstado");

    document.getElementById("add-inmunidad-danno").onclick = () => 
        addTextbox("inmunidadesDanno", "inmunidadDanno");

    document.getElementById("add-resistencia-danno").onclick = () => 
        addTextbox("resistenciasDanno", "resistenciaDanno");

    document.getElementById("add-rasgo").onclick = () => 
        openModal(VIEW_DIR, MODAL_RASGOS, MODAL_ID, () => initModalRasgos());

    // HECHIZOS!
    document.getElementById("esConjurador").onclick = () => {
        setConjurosDisabled(!document.getElementById("esConjurador").checked);
        actualizarEtiquetasConjuros();
    }

    document.getElementById("conjurosCaracteristica").onclick = () =>
        actualizarEtiquetasConjuros();

    document.getElementById("add-nivel-conjuro").onclick = () => 
        addNivelConjuro();

    document.getElementById("add_conjuro_0").onclick = () => 
        openModal(VIEW_DIR, MODAL_CONJURO, MODAL_ID, () => initModalConjuros(0));

    document.getElementById("add-accion").onclick = () =>
        openModal(VIEW_DIR, MODAL_ACCION, MODAL_ID, () => initModalAcciones("acciones"));

    document.getElementById("add-reaccion").onclick = () =>
        openModal(VIEW_DIR, MODAL_ACCION, MODAL_ID, () => initModalAcciones("reacciones"));
}

/**
 * Inicializa los elementos interactuables de la modal de rasgos
 */
function initModalRasgos(){
    document.getElementById("modal-ok-btn").onclick = () =>
        addRasgo();
}

function initModalAcciones(nombreLista){
    document.getElementById("modal-title").insertAdjacentHTML('beforeend', ` (${nombreLista})`);
    
    document.getElementById("tipoAccion_ataque").onclick = () => {
        showElement(document.getElementById("seccion_accionAtaque"));
        hideElement(document.getElementById("seccion_accionSimple"));
    };

    document.getElementById("tipoAccion_simple").onclick = () => {
        showElement(document.getElementById("seccion_accionSimple"));
        hideElement(document.getElementById("seccion_accionAtaque"));
    };

    const modAtaqueElement = document.getElementById("accionAtaque_modificadorAtaque");
    if(modAtaqueElement){
        modAtaqueElement.oninput = () => 
                filterNumbers(modAtaqueElement);
    }
    
    const objetivosElement = document.getElementById("accionAtaque_objetivos");
    if(objetivosElement){
        objetivosElement.oninput = () => 
            filterNumbers(objetivosElement);
    }

    const numeroDadosElement = document.getElementById("accionAtaque_numeroDados");
    if(numeroDadosElement){
        numeroDadosElement.oninput = () => {
            filterNumbers(numeroDadosElement);
            recaulcularImpacto();
        };
    }        

    const tipoDadoElement = document.getElementById("accionAtaque_tipoDado");
    if(tipoDadoElement){
        tipoDadoElement.oninput = () => {
            filterNumbers(tipoDadoElement);
            recaulcularImpacto();
        };
    }

    const modificadorDannoElement = document.getElementById("accionAtaque_modificadorDanno");
    if(modificadorDannoElement){
        modificadorDannoElement.oninput = () => 
            recaulcularImpacto();
    }        

    document.getElementById("modal-ok-btn").onclick = () =>
        annadirAccion(
            nombreLista,
            Object.fromEntries(new FormData(
                document.getElementById(
                    document.getElementById("tipoAccion_ataque").checked 
                        ? "formulario_accionAtaque" 
                        : "formulario_accionSimple"
                )
            ).entries())
        );
}

/**
 * Abre un modal para crear un nuevo conjuro y agregarlo a una lista de conjuros.
 * 
 * @param {number} nivel indice de la lista de conjuros (nivel) al que pertenecerá
 */
function initModalConjuros(nivel){

const alcanceInputElement = document.getElementById("alcance");
    alcanceInputElement.oninput = () =>
        filterNumbers(alcanceInputElement);

    const tipoAreaElement = document.getElementById("tipoAreaEfecto");
    const areaEfectoInputElement = document.getElementById("areaEfecto");
    tipoAreaElement.onchange = () => {
        areaEfectoInputElement.disabled = tipoAreaElement.value == "objetivo";
    };

    areaEfectoInputElement.oninput = () =>
        filterNumbers(areaEfectoInputElement);

    const tipoTiradaElement = document.getElementById("tipoTiradaSalvacion");
    tipoTiradaElement.onchange = () => {
        const tipoSalvacionElements = document.getElementsByName("tipoSalvacion");
        for(const tipo of tipoSalvacionElements){
            tipo.disabled = tipoTiradaElement.value == "ninguna";
        }
    };

    document.getElementById("modal-ok-btn").onclick = () => 
        annadirConjuro(nivel, Object.fromEntries(
            new FormData(document.getElementById("formulario_conjuro")).entries()
        ));
}

// FUNCIONES BASICAS //
/**
 * Calcula el modificador correspondiente al atributo indicado
 * 
 * @param {number} atributo valor cuyo modificador queremos obtener
 * @returns valor del modificador
 */
function calcularModificador(atributo){
    return atributo >= 10
        ? Math.floor((atributo - 10) / 2)
        : Math.floor(atributo / 2) - 5;
}

/**
 * Proporciona el modificador proporcionado con parentesis y signo
 * 
 * @param {number} modificador valor del modificador
 * @returns modificador con parentesis y signo
 */
function pintarParentesis(modificador){
    const signo = modificador > 0 ? "+" : "";
    return `(${signo}${modificador})`
}

/**
 * Recalcula el valor de percepcion pasiva
 */
function recalcularPercepcionPasiva(){
    const modSabiduria = calcularModificador(+document.getElementById("sabiduria").value);
    const competencia = document.getElementById("esCompetenteEnPercepcion").value == TRUE 
        ? +document.getElementById("competencia").value : 0; 
    const percepcionPasiva = 10 + modSabiduria + competencia;

    document.getElementById("sentidos_0__Text").innerHTML = `Percepción pasiva (${percepcionPasiva})`;
}

/**
 * Elimina el desplegable indicado
 * 
 * @param {number} idx indice que queremos eliminar
 * @param {string} nombreLista nombre de la lista que estamos editando
 */
function eliminarInput(idx, nombreLista){
    const listaElement = document.getElementById(`${nombreLista}`);
    const containers = listaElement.children;   

    for(let i = idx + 1; i < containers.length; i++){
        document.getElementById(`${nombreLista}_${i}__Container`).id = `${nombreLista}_${i - 1}__Container`;
        const inputElement = document.getElementById(`${nombreLista}_${i}`);
        inputElement.id = `${nombreLista}__${i - 1}`;
        inputElement.name = `${nombreLista}[${i - 1}]`;
        document.getElementById(`${nombreLista}_${i}__Delete`).id = `${nombreLista}_${i - 1}__Delete`;
        const textElement = document.getElementById(`${nombreLista}_${i}__Text`);
        if(textElement){
            textElement.id = `${nombreLista}_${i - 1}__Text`
        }
    }

    listaElement.removeChild(containers[idx]);
}

/**
 * Ajusta el valor mostrado en la etiqueta del desplegable
 * 
 * @param {number} idx indice del elemento a ajustar
 * @param {any} valores valores constantes del desplegable que manejamos
 */
function ajustarEtiquetaDesplegable(idx, nombreLista, opciones){
    const textoElement = document.getElementById(`${nombreLista}_${idx}__Text`);
    const nombreAtributoBase = opciones[document.getElementById(`${nombreLista}_${idx}`).value];
    const valorAtributoBase = +document.getElementById(nombreAtributoBase).value
    textoElement.innerHTML = pintarParentesis(+document.getElementById("competencia").value + calcularModificador(valorAtributoBase));  
}

/**
 * Añade la acción a la lista objetivo
 * 
 * @param {string} nombreLista nombre de la lista a la que annadiremos la acción
 * @param {Object} objeto objeto JSON con los datos de la acción
 */
function annadirAccion(nombreLista, objeto){
    const accion = new Accion(objeto);
    const listadoElement = document.getElementById(nombreLista);
    listadoElement.appendChild(accion.toHtml(nombreLista, listadoElement.children.length));
}

/**
 * Añade conjuro a la lista objetivo
 * 
 * @param {number} nivel del conjuro
 * @param {Object} objeto objeto JSON con los datos del conjuro
 */
function annadirConjuro(nivel, objeto){
    const conjuro = new Conjuro(objeto);
    const listadoElement = document.getElementById(`conjuros_${nivel}__conjuros`);
    listadoElement.appendChild(conjuro.toHtml(nivel, listadoElement.children.length));
}

/**
 * Recalcula el valor del daño medio de impacto en el modal de acción
 */
function recaulcularImpacto(){
    const numeroDados = +document.getElementById("accionAtaque_numeroDados").value;
    const tipoDado = +document.getElementById("accionAtaque_tipoDado").value;
    const modDanno = +document.getElementById("accionAtaque_modificadorDanno").value;
    document.getElementById("accionAtaque_impacto").innerHTML = `(${(numeroDados * tipoDado) / 2 + modDanno})`;
}

/**
 * Deshabilita o habilita los controles de conjuros
 * 
 * @param {boolean} deshabilitar indicador de si debe deshabilitarse o no
 */
function setConjurosDisabled(deshabilitar){
    document.getElementById("conjurosCaracteristica").disabled = deshabilitar;
    document.getElementById("add-nivel-conjuro").disabled = deshabilitar;

    const addConjuroBtns = document.getElementsByName("add-conjuro-btn");
    for(const btn of addConjuroBtns){
        btn.disabled = deshabilitar;
    }

    const deleteNivelConjuroBtns = document.getElementsByName("delete-nivel-conjuro-btn");
    for(const btn of deleteNivelConjuroBtns){
        btn.disabled = deshabilitar;
    }

    const deleteConjuroBtns = document.getElementsByName("delete-conjuro-btn");
    for(const btn of deleteConjuroBtns){
        btn.disabled = deshabilitar;
    }
}

/**
 * Actualiza las etiquetas de lanzamiento de conjuros
 */
function actualizarEtiquetasConjuros(){
    const caracteristica = document.getElementById("conjurosCaracteristica").value;
    const modCaracteristica = calcularModificador(+document.getElementById(caracteristica).value);
    const bonCompetencia = +document.getElementById("competencia").value;

    const cdConjuros = 8 + modCaracteristica + bonCompetencia;
    const modLanzamiento = modCaracteristica + bonCompetencia;

    document.getElementById("cd-Conjuros").innerHTML = cdConjuros;
    document.getElementById("modConjuros").innerHTML = modLanzamiento < 0 
        ? modLanzamiento : `+${modLanzamiento}`;
}

// FUNCIONES DE PINTADO DE ELEMENTOS //
/**
 * Añade un desplegable a una lista.
 * 
 * Todo valor del desplegable, adicionalmente, lleva asociado un atributo básico. Por ese motivo,
 * se deberá proporcionar un diccionario o conjunto de pares clave - valor donde la clave es una
 * opción del desplegable y el valor su atributo asociado
 * 
 * @param {string} nombreLista nombre de la lista donde se incluye el desplegabñe
 * @param {any} opciones conjuto de pares clave - valor necesarios para el desplegable
 */
function addDesplegable(nombreLista, opciones){
    const listaElement = document.getElementById(nombreLista);
    const nextIdx = listaElement.children.length;

    const containerElement = document.createElement("div");
    containerElement.id = `${nombreLista}_${nextIdx}__Container`; 
    containerElement.classList.add("col-md-4");

    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    const selectColElement = document.createElement("div");
    selectColElement.classList.add("col-md-8");    

    const selectElement = document.createElement("select");
    selectElement.id = `${nombreLista}_${nextIdx}`;
    selectElement.name = `${nombreLista}[${nextIdx}]`;
    selectElement.classList.add("form-select");
    selectElement.onchange = () => {
        ajustarEtiquetaDesplegable(nextIdx, nombreLista, opciones);
        if(selectElement.value == "percepción"){
            document.getElementById("esCompetenteEnPercepcion").value = TRUE;
            recalcularPercepcionPasiva();
        }
    }

    for(const opcion in opciones){
        const optionElement = document.createElement("option");
        optionElement.value = opcion;
        optionElement.innerHTML = opcion;
        selectElement.appendChild(optionElement);
    }

    selectColElement.appendChild(selectElement);
    rowElement.appendChild(selectColElement);

    const textElement = document.createElement("span");
    textElement.id = `${nombreLista}_${nextIdx}__Text`; 
    textElement.classList.add("col-md-2", "col-form-label");
    // Por simplicidad, siempre se empieza por uno que depende de la fuerza
    textElement.innerHTML = pintarParentesis(
        calcularModificador(+document.getElementById("fuerza").value) + +document.getElementById("competencia").value
    );

    rowElement.appendChild(textElement);

    const btnColElement = document.createElement("div");
    btnColElement.classList.add("col-md-2", "align-content-center");

    const btnElement = document.createElement("button");
    btnElement.id = `${nombreLista}_${nextIdx}__Delete`;
    btnElement.type = "button";
    btnElement.classList.add("btn", "btn-sm", "btn-delete");
    btnElement.onclick = () => {
        eliminarInput(nextIdx, nombreLista);
        if(selectElement.value == "percepción"){
            document.getElementById("esCompetenteEnPercepcion").value = FALSE;
            recalcularPercepcionPasiva();
        }
    }

    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-trash");

    btnElement.appendChild(icon);
    btnColElement.appendChild(btnElement);
    rowElement.appendChild(btnColElement);
    containerElement.appendChild(rowElement);
    listaElement.appendChild(containerElement);
}

/**
 * Añade un textbox a una lista
 * 
 * @param {string} nombreLista nombre de la lista a la que pertenece el textbox
 */
function addTextbox(nombreLista){
    const listaElement = document.getElementById(nombreLista);
    const nextIdx = listaElement.children.length;

    const containerElement = document.createElement("div");
    containerElement.id = `${nombreLista}_${nextIdx}__Container`; 
    containerElement.classList.add("col-md-3");

    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    const textboxColElement = document.createElement("div");
    textboxColElement.classList.add("col-md-8");   

    const textboxElement = document.createElement("input");
    textboxElement.type = "text";
    textboxElement.id = `${nombreLista}_${nextIdx}`;
    textboxElement.name = `${nombreLista}[${nextIdx}]`;
    textboxElement.classList.add("form-control");

    textboxColElement.appendChild(textboxElement);
    rowElement.appendChild(textboxColElement);

    const btnColElement = document.createElement("div");
    btnColElement.classList.add("col-md-2", "align-content-center");

    const btnElement = document.createElement("button");
    btnElement.id = `${nombreLista}_${nextIdx}__Delete`;
    btnElement.type = "button";
    btnElement.classList.add("btn", "btn-sm", "btn-delete")
    btnElement.onclick = () => eliminarInput(nextIdx, nombreLista);
    
    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-trash");

    btnElement.appendChild(icon);
    btnColElement.appendChild(btnElement);
    rowElement.appendChild(btnColElement);
    containerElement.appendChild(rowElement);
    listaElement.appendChild(containerElement);
}

/**
 * Añade un rasgo (clave valor) a la lista de rasgos
 */
function addRasgo(){
    const listaElement = document.getElementById("rasgos");
    const nextIdx = listaElement.children.length;

    const containerElement = document.createElement("div");
    containerElement.id = `rasgos_${nextIdx}__Container`;
    containerElement.classList.add("col-md-12");

    const keyInput = document.createElement("input");
    keyInput.type = "hidden";
    keyInput.id = `rasgos_${nextIdx}__Key`;
    keyInput.name = `rasgos[${nextIdx}].Key`;
    keyInput.value = document.getElementById("nuevoRasgo_Key").value;
    containerElement.appendChild(keyInput);

    const valueInput =  document.createElement("input");
    valueInput.type = "hidden";
    valueInput.id = `rasgos_${nextIdx}__Value`;
    valueInput.name = `rasgos[${nextIdx}].Value`;
    valueInput.value = document.getElementById("nuevoRasgo_Value").value;
    containerElement.appendChild(valueInput);

    const titleElement = document.createElement("b");
    titleElement.classList.add("me-1");
    titleElement.innerHTML = document.getElementById("nuevoRasgo_Key").value + ".";
    containerElement.appendChild(titleElement);

    containerElement.insertAdjacentHTML('beforeend', document.getElementById("nuevoRasgo_Value").value);
    
    listaElement.appendChild(containerElement);
}

/**
 * Añade un nuevo panel de nivel de conjuro
 */
function addNivelConjuro(){
    const listaElement = document.getElementById("conjuros");
    const idx = listaElement.children.length;

    const containerElement = document.createElement("div");
    containerElement.id = `conjuros_${idx}__Container`;
    containerElement.classList.add("card", "mb-2");

    const headerElement = document.createElement("div");
    headerElement.classList.add("card-header", "d-flex", "fw-bold", "align-items-center");

    const nivelLabelElement = document.createElement("label");
    nivelLabelElement.htmlFor = `conjuros_${idx}__nivel`;
    nivelLabelElement.classList.add("me-3");
    nivelLabelElement.innerHTML = "Conjuros de nivel";
    headerElement.appendChild(nivelLabelElement);

    const nivelInputElement = document.createElement("input");
    nivelInputElement.type = "text";
    nivelInputElement.id = `conjuros_${idx}__nivel`;
    nivelInputElement.name = `conjuros[${idx}].nivel`;
    nivelInputElement.classList.add("w-25", "form-control", "me-3");
    nivelInputElement.oninput = () => filterNumbers(nivelInputElement);
    headerElement.appendChild(nivelInputElement);

    const espaciosLabelElement = document.createElement("label");
    espaciosLabelElement.htmlFor = `conjuros_${idx}__espacios`;
    espaciosLabelElement.classList.add("me-3");
    espaciosLabelElement.innerHTML = "Espacios disponibles"
    headerElement.appendChild(espaciosLabelElement);

    const espaciosInputElement = document.createElement("input");
    espaciosInputElement.type = "text";
    espaciosInputElement.id = `conjuros_${idx}__espacios`;
    espaciosInputElement.name = `conjuros[${idx}].espacios`;
    espaciosInputElement.classList.add("w-25", "form-control", "me-3");
    espaciosInputElement.oninput = () => filterNumbers(espaciosInputElement);
    headerElement.appendChild(espaciosInputElement);

    const addButtonElement = document.createElement("button");
    addButtonElement.id = `add_conjuro_${idx}`;
    addButtonElement.name = "add-conjuro-btn";
    addButtonElement.type="button";
    addButtonElement.classList.add("btn", "btn-sm", "btn-primary");
    addButtonElement.onclick = () => 
        openModal(VIEW_DIR, MODAL_CONJURO, MODAL_ID, () => initModalConjuros(idx));

    const iconElement = document.createElement("i");
    iconElement.classList.add("fa", "fa-plus");
    addButtonElement.appendChild(iconElement);

    headerElement.appendChild(addButtonElement);
    containerElement.appendChild(headerElement);

    const conjurosListElement = document.createElement("div");
    conjurosListElement.id = `conjuros_${idx}__conjuros`;
    conjurosListElement.classList.add("card-body", "form-group", "row");
    containerElement.appendChild(conjurosListElement);

    listaElement.appendChild(containerElement);
}
