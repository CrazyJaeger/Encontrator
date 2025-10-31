class Despliegue{
    constructor(objeto){
        const encuentro = [];

        let i = 0;
        while(objeto[`aliados[${i}].nombre`] != undefined){
            encuentro.push({
                nombre: objeto[`aliados[${i}].nombre`],
                equipo: "aliados",
                hoja: objeto[`aliados[${i}].hoja`],
                iniciativa: objeto[`aliados[${i}].hoja`] == ""
                    ? +objeto[`aliados[${i}].iniciativa`]
                    : this.calcularTiradaIniciativa(+objeto[`aliados[${i}].iniciativa`])
            });
            i++;
        }

        i = 0;
        while(objeto[`enemigos[${i}].nombre`] != undefined){
            encuentro.push({
                nombre: objeto[`enemigos[${i}].nombre`],
                equipo: "enemigos",
                hoja: objeto[`enemigos[${i}].hoja`],
                iniciativa: objeto[`enemigos[${i}].hoja`] == ""
                    ? +objeto[`enemigos[${i}].iniciativa`]
                    : this.calcularTiradaIniciativa(+objeto[`enemigos[${i}].iniciativa`])
            });
            i++;
        }

        i = 0;
        while(objeto[`neutral[${i}].nombre`] != undefined){
            encuentro.push({
                nombre: objeto[`neutral[${i}].nombre`],
                equipo: "neutral",
                hoja: objeto[`neutral[${i}].hoja`],
                iniciativa: objeto[`neutral[${i}].hoja`] == ""
                    ? +objeto[`neutral[${i}].iniciativa`]
                    : this.calcularTiradaIniciativa(+objeto[`neutral[${i}].iniciativa`])
            });
            i++;
        }

        this.encuentro = encuentro.sort((a, b) => a.iniciativa - b.iniciativa);
    };

    toHtml(){
        const formularioElement = document.createElement("form");        
        formularioElement.id = "formulario_despliegue";

        const mainRow = document.createElement("div");
        mainRow.classList.add("form-group", "row");

        let i = 0;
        for(const combatiente of this.encuentro){
            const combatienteElement = document.createElement("div");
            combatienteElement.classList.add("col-md-12", "mb-2");

            const combatienteRow = document.createElement("div");
            combatienteRow.classList.add("row", "align-items-center");

            const nombreInput = document.createElement("input");
            nombreInput.id = `combatiente_${i}__nombre`;
            nombreInput.name = `combatiente[${i}].nombre`;
            nombreInput.type = "hidden";
            nombreInput.value = combatiente.nombre;
            combatienteRow.appendChild(nombreInput);

            const hojaInput = document.createElement("input");
            hojaInput.id = `combatiente_${i}__hoja`;
            hojaInput.name = `combatiente[${i}].hoja`;
            hojaInput.type = "hidden";
            hojaInput.value = combatiente.hoja;
            combatienteRow.appendChild(hojaInput);

            const equipoInput = document.createElement("input");
            equipoInput.id = `combatiente_${i}__equipo`;
            equipoInput.name = `combatiente[${i}].equipo`;
            equipoInput.type = "hidden";
            equipoInput.value = combatiente.equipo;
            combatienteRow.appendChild(equipoInput);            

            const iniciativaInput = document.createElement("input");
            iniciativaInput.id = `combatiente_${i}__iniciativa`;
            iniciativaInput.name = `combatiente[${i}].iniciativa`;
            iniciativaInput.type = "hidden";
            iniciativaInput.value = combatiente.iniciativa;
            combatienteRow.appendChild(iniciativaInput);

            const nombreText = document.createElement("label");
            nombreText.htmlFor = `combatiente_${i}__nombre`;
            nombreText.classList.add("col-md-6", "col-form-label", combatiente.equipo);
            nombreText.innerHTML = combatiente.nombre;
            combatienteRow.appendChild(nombreText);

            const iniciativaText = document.createElement("label");
            iniciativaText.htmlFor = `combatiente_${i}__nombre`;
            iniciativaText.classList.add("col-md-3", "col-form-label");
            iniciativaText.innerHTML = combatiente.iniciativa;
            combatienteRow.appendChild(iniciativaText);

            const ventajaCol = document.createElement("div");
            ventajaCol.classList.add("col-md-3");

            const ventajaInput = document.createElement("input");
            ventajaInput.id = `combatiente_${i}__ventaja`;
            ventajaInput.name = `combatiente[${i}].ventaja`;
            ventajaInput.type = "text";
            ventajaInput.classList.add("form-control");
            ventajaInput.oninput = () => filterNumbers(ventajaInput);

            ventajaCol.appendChild(ventajaInput);
            combatienteRow.appendChild(ventajaCol);
            combatienteElement.appendChild(combatienteRow);
            mainRow.appendChild(combatienteElement);
            i++;
        }

        formularioElement.appendChild(mainRow);
        return formularioElement;
    };

    calcularTiradaIniciativa(iniciativa){
        return Math.floor(Math.random() * 19 + 1) + iniciativa;
    };
}