class Encuentro{
    constructor(objeto){    
        this.fase = "iniciativa";
        // Primera fase del encuentro: acaba de tirase iniciativa.
        // Calculamos el orden y vamos recuperando las fichas de criatura
        if(objeto.fase == "iniciativa"){
            let i;
            let combatientes = [];
            debugger;

            i = 0;
            while(objeto[`enemigos[${i}].nombre`] != undefined){
                combatientes.push({
                    equipo: "enemigos",
                    nombre: objeto[`enemigos[${i}].nombre`],
                    iniciativa: +objeto[`enemigos[${i}].iniciativa`],
                    // atributos: obtenerJson(
                    //     "criaturas", objeto[`enemigos[${i}].hoja`], 
                    //     (obj) => new CriaturaCombatiente(obj)
                    // ) 
                });
                i++;
            }

            i = 0;
            while(objeto[`neutral[${i}].nombre`] != undefined){
                combatientes.push({
                    equipo: "neutral",
                    nombre: objeto[`neutral[${i}].nombre`],
                    iniciativa: +objeto[`neutral[${i}].iniciativa`],
                    // atributos: obtenerJson(
                    //     "criaturas", objeto[`neutral[${i}].hoja`], 
                    //     (obj) => new CriaturaCombatiente(obj)
                    // ) 
                });
                i++;
            }
            
            i = 0;
            while(objeto[`aliados[${i}].nombre`] != undefined){
                combatientes.push({
                    equipo: "aliados",
                    nombre: objeto[`aliados[${i}].nombre`],
                    iniciativa: +objeto[`aliados[${i}].iniciativa`],
                    // atributos: objeto[`aliados[${i}].hoja`] != ""
                    //     ? obtenerJson(
                    //         "criaturas", 
                    //         objeto[`aliados[${i}].hoja`], 
                    //         (obj) => new CriaturaCombatiente(obj)
                    //     ) : null
                });
                i++;
            }

            this.combatientes = combatientes.sort((a, b) => b.iniciativa - a.iniciativa);
        }
        debugger;
    };

    toDespliegueHtml(){
        const formularioElement = document.createElement("form");
        formularioElement.id = "formulario_iniciativa";

        const faseInput = document.createElement("input");
        faseInput.id = "fase";
        faseInput.name = "fase";
        faseInput.type = "hidden";
        faseInput.value = "despliegue";
        formularioElement.appendChild(faseInput);

        const cartaElement = document.createElement("div");
        cartaElement.classList.add("card", "mb-2");

        const cabeceraElement = document.createElement("div");
        cabeceraElement.classList.add("card-header", "fw-bold");
        cabeceraElement.innerHTML = "Combatientes";
        cartaElement.appendChild(cabeceraElement);

        const bodyElement = document.createElement("div");
        bodyElement.classList.add("card-body", "form-group", "row")

        let i = 0;
        for(const combatiente of this.combatientes){
            const innerColElement = document.createElement("div");
            innerColElement.id = `combatientes_${i}`;
            innerColElement.classList.add("col-md-12", combatiente.equipo, "mb-2");

            const innerRowElement = document.createElement("div");            
            innerRowElement.classList.add("row");

            const equipoInput = document.createElement("input");
            equipoInput.id = `combatientes_${i}__equipo`;
            equipoInput.name = `combatientes[${i}].equipo`;
            equipoInput.type = "hidden";
            equipoInput.value = combatiente.equipo;
            innerRowElement.appendChild(equipoInput);

            const nombreText = document.createElement("label");
            nombreText.htmlFor = `combatientes_${i}__nombre`;
            nombreText.classList.add("col-md-6", "col-form-label");
            nombreText.innerHTML = combatiente.nombre;
            innerRowElement.appendChild(nombreText);

            const nombreInput = document.createElement("input");
            nombreInput.id = `combatientes_${i}__nombre`;
            nombreInput.name = `combatientes[${i}].nombre`;
            nombreInput.type = "hidden";
            nombreInput.value = combatiente.nombre;
            innerRowElement.appendChild(nombreInput);

            const iniciativaText = document.createElement("label");
            iniciativaText.htmlFor = `combatientes_${i}__iniciativa`;
            iniciativaText.classList.add("col-md-3", "col-form-label");
            iniciativaText.innerHTML = combatiente.iniciativa;
            innerRowElement.appendChild(iniciativaText);

            const iniciativaInput = document.createElement("input");
            iniciativaInput.id = `combatientes_${i}__iniciativa`;
            iniciativaInput.name = `combatientes[${i}].iniciativa`;
            iniciativaInput.type = "hidden";
            iniciativaInput.value = combatiente.iniciativa;
            innerRowElement.appendChild(iniciativaInput);

            const ventajaCol = document.createElement("div");
            ventajaCol.classList.add("col-md-3");

            const ventajaInput = document.createElement("input");
            ventajaInput.id = `combatientes_${i}__ventaja`;
            ventajaInput.name = `combatientes[${i}].ventaja`;
            ventajaInput.type = "text";
            ventajaInput.value = 0;
            ventajaInput.classList.add("form-control");
            ventajaInput.oninput = () => filterNumbers(ventajaInput);
            ventajaCol.appendChild(ventajaInput);
            innerRowElement.appendChild(ventajaCol);
            // cuerpoElement.appendChild(atributos.toHtmlInputs());            
            
            innerColElement.appendChild(innerRowElement);
            bodyElement.appendChild(innerColElement);
            i++;
        }

        cartaElement.appendChild(bodyElement);
        formularioElement.appendChild(cartaElement);
        return formularioElement;
    };
}