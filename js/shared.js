// CONSTANTES //
const BRANCH = "main" /*"main"*/;
const EXP_DESAFIO = {
    "0": "10px",
    "1/8": "25px",
    "1/4": "50px",
    "1/2": "100px",
    "1": "200px",
    "2": "450px",
    "3": "700px",
    "4": "1100px",
    "5": "1800px",
    "6": "2300px",
    "7": "2900px",
    "8": "3900px",
    "9": "5000px",
    "10": "5900px",
    "11": "7200px",
    "12": "8400px",
    "13": "10.000px",
    "14": "11.500px",
    "15": "13.000px",
    "16": "15.000px",
    "17": "18.000px",
    "18": "20.000px",
    "19": "22.000px",
    "20": "25.000px",
    "21": "33.000px",
    "22": "41.000px",
    "23": "50.000px",
    "24": "62.000px",
    "25": "75.000px",
    "26": "90.000px",
    "27": "105.000px",
    "28": "120.000px",
    "29": "135.000px",
    "30": "155.000px"
};

const HABILIDADES_CARACTERISTICAS = {
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
    "trat. con animales": "sabiduria"
};

const TRUE = "true";
const FALSE = "false";
const CHECKED = "on";

// FUNCIONES //
/**
 * Filtra los datos de entrada en el input para solo permitir la entrada de numeros
 * 
 * @param {HTMLElement} element elemento del que filtramos los numeros
 */
function filterNumbers(element){
    let finalValue = "";
    for(const c of element.value){
        if(c <= '9' && c >= '0'){
            finalValue += c;
        }
    }
    element.value = finalValue;
}

/**
 * Muestra una vista parcial en un elemento modal.
 * 
 * @param {string} viewDir directorio donde está la vista parcial
 * @param {string} viewName nombre de la vista parcial (sin extensión)
 * @param {string} modalId nombre del elemento modal que contendrá la vista
 * @param {() => void} initFunc función de inicialización de la vista
 */
function openModal(viewDir, viewName, modalId, initFunc){
    fetch(`https://raw.githubusercontent.com/CrazyJaeger/Encontrator/refs/heads/${BRANCH}/${viewDir}/views/${viewName}.html`)
        .then((response) => response.text())
        .then((response) => {
            const modalElement = document.getElementById(modalId);
            modalElement.innerHTML = response;
            
            const bsModal = new bootstrap.Modal(modalElement);
            bsModal.show();
        })
        .then(() => initFunc());
}

/**
 * Muestra el elemento oculto indicado en pantalla
 * 
 * @param {HTMLElement} element elemento a mostrar
 */
function showElement(element){
    element.style = "";
}

/**
 * Muestra el elemento a ocultar en la pantalla
 * 
 * @param {HTMLElement} element  elemento a ocultar
 */
function hideElement(element){
    element.style = "display:none;";
}

/**
 * Genera un fichero con el contenido proporcionado y lo descarga
 * 
 * @param {string} nombre nombre completo del fichero
 * @param {string} contenido contenido del fichero
 */
function descargar(nombre, contenido){
    const element = document.createElement('a');
    element.style.display = "none";
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent(contenido);
    element.download = nombre;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

/**
 * Obtiene un objeto almacenado en formato JSON del almacén de entidades
 * 
 * @param {string} tipo tipo de objeto que queremos recuperar
 * @param {string} nombre nombre del objeto (sin extensión)
 * @param {(Object) => void} callback función callback que recibe el objeto como resultado
 */
function obtenerJson(tipo, nombre, callback){
    fetch(`https://raw.githubusercontent.com/CrazyJaeger/Encontrator/refs/heads/${BRANCH}/almacen/${tipo}/${nombre}.json`)
        .then((response) => response.text())
        .then((response) => callback(JSON.parse(response)));
}
