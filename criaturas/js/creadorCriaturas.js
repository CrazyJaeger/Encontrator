// CONSTANTES //

const MODAL_ID = "criaturas-modal";

// INICIALIZACION DE ELEMENTOS INTERACTUABLES DE PANTALLA //

/**
 * Inicializa los elementos interactuables de la pantalla principal
 */
function init(){
    const fuerzaElement = document.getElementById("fuerza");
    fuerzaElement.oninput = () => {
        filterNumbers(fuerzaElement);
        actualizarModificador(+fuerzaElement.value);
    };        
    
    const destrezaElement = document.getElementById("destreza");
    destrezaElement.oninput = () => {
        filterNumbers(destrezaElement);
        actualizarModificador(+destrezaElement.value, document.getElementById("modDestreza"));
    };

    const constitucionElement = document.getElementById("constitucion");
    constitucionElement.oninput = () => {
        filterNumbers(constitucionElement);
        actualizarModificador(+constitucionElement.value, document.getElementById("modConstitucion"));
    };
    
    const inteligenciaElement = document.getElementById("inteligencia");
    inteligenciaElement.oninput = () => {
        filterNumbers(inteligenciaElement);
        actualizarModificador(+inteligenciaElement.value, document.getElementById("modInteligencia"));
    };
    
    const sabiduriaElement = document.getElementById("sabiduria");
    sabiduriaElement.oninput = () => {
        filterNumbers(sabiduriaElement);
        actualizarModificador(+sabiduriaElement.value, document.getElementById("modSabiduria"));
        recalcularPercepcionPasiva();
    };
    
    const carismaElement = document.getElementById("carisma");
    carismaElement.oninput = () => {
        filterNumbers(carismaElement);
        actualizarModificador(+carismaElement.value, document.getElementById("modCarisma"));
    };

    document.getElementById("add-tirada-salvacion").onclick = () =>
        abrirModalTiradaSalvacion();
}

// CARGA DE VISTAS PARCIALES //
/**
 * Abre el modal de tiradas de salvación
 */
function abrirModalTiradaSalvacion(){
    fetch("./views/_modalTiradasSalvacion.html").then((response) => {
        debugger;
        const modalElement = document.getElementById(MODAL_ID);
        modalElement.innerHTML = response.text();

        const bsModal = new bootstrap.Modal(modalElement);
        bsModal.show();
    });
}

// FUNCIONES //
/**
 * Calcula el modificador correspondiente al atributo indicado y lo introduce en el campo correspondiente
 * 
 * @param {Number} atributo valor cuyo modificador queremos obtener
 * @param {HTMLElement} elementoModificador elemento donde escribiremos el modificador
 */
function actualizarModificador(atributo, elementoModificador){
    const modificador = calcularModificador(atributo);
    const signo = modificador > 0 ? "+" : "";

    elementoModificador.innerHTML = `(${signo}${modificador})`;
}

/**
 * Calcula el modificador correspondiente al atributo indicado
 * 
 * @param {Number} atributo valor cuyo modificador queremos obtener
 * @returns valor del modificador
 */
function calcularModificador(atributo){
    return atributo >= 10
        ? Math.floor((atributo - 10) / 2)
        : Math.floor(atributo / 2) - 5;
}

/**
 * Recalcula el valor de percepcion pasiva
 */
function recalcularPercepcionPasiva(){
    const modSabiduria = calcularModificador(+document.getElementById("sabiduria").value);
    const competencia = document.getElementById("esCompetenteEnPercepcion").value == TRUE 
        ? +document.getElementById("competencia").value
        : 0; 
    const percepcionPasiva = 10 + modSabiduria + competencia;

    document.getElementById("sentidos__0_Value").value = percepcionPasiva;
    document.getElementById("sentidos__0_Text").innerHTML = `Percepción pasiva (${percepcionPasiva})`;
}
