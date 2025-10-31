// CONSTANTES Y VARIABLES DEL CU //

// INICIALIZACION DE ELEMENTOS INTERACTUABLES DE PANTALLA //

/**
 * Inicializa los elementos interactuables de la pantalla principal
 */
function init(){
    const params = new URLSearchParams(document.location.search);
    document.getElementById("cabecera-encuentro").innerHTML = params.get("nombre");
    obtenerJson("encuentros", params.get("hoja"), pintarInicioEncuentro);

    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerHTML = "Tirar iniciativa";
    nextBtn.onclick = () => tirarIniciativa(Object.fromEntries(
        new FormData(document.getElementById("formulario_despliegue")).entries()
    ));
}

// FUNCIONES DE PINTADO DE ELEMENTOS //
function pintarInicioEncuentro(encuentroObject){
    const formularioElement = document.createElement("form");
    formularioElement.id = "formulario_despliegue";

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
                iniciativaInput.value = integrante.iniciativa;

                const iniciativaLabel = document.createElement("label");
                iniciativaLabel.htmlFor = `${equipo}_${i}__iniciativa`;
                iniciativaLabel.classList.add("col-md-3", "col-form-label");
                iniciativaLabel.innerHTML = `( ${integrante.iniciativa < 0 ? "-" : "+"}${integrante.iniciativa} )`
                
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

/**
 * Realiza la tirada de iniciativa y ordena los elementos segun su orden de iniciativa.
 * Muestra los elementos para realizar desempates si procede
 * @param {Object} formulario datos del formulario del encuentro
 */
function tirarIniciativa(formulario){
    const cuerpoElement = document.getElementById("cuerpo-encuentro");
    cuerpoElement.innerHTML = "";
    cuerpoElement.appendChild(new Despliegue(formulario).toHtml());

    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerHTML = "Desplegar";
    nextBtn.onclick = () => desplegar(Object.fromEntries(
        new FormData(document.getElementById("formulario_despliegue")).entries()
    ));
}

/**
 * Realiza el despliegue del encuentro
 * @param {Object} formulario datos del formulario de despliegue
 */
function desplegar(formulario){
    const encuentro = new Encuentro(formulario);
    const cuerpoElement = document.getElementById("cuerpo-encuentro");
    cuerpoElement.innerHTML = "";

    const nextBtn = document.getElementById("next-btn");
    nextBtn.style.display = "none";

    encuentro.appendToHtml(cuerpoElement);
}
