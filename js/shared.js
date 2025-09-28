// CONSTANTES //
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

const TRUE = "true";
const FALSE = "false";

// FUNCIONES //
/**
 * Filtra los datos de entrada en el input para solo permitir la entrada de numeros
 * 
 * @param {HTMLElement} element elemento del que filtramos los numeros
 */
function filterNumbers(element){
    let finalValue = "";
    for(const c of element.value){
        if(+c != NaN){
            finalValue += c;
        }
    }
    element.value = finalValue;
}