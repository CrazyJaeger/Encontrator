class Encuentro{
    constructor(objeto){
        const combatientes = [];
        this.hojas = [];

        let i = 0;
        while(objeto[`combatiente[${i}].nombre`] != undefined){
            const item = {
                nombre: objeto[`combatiente[${i}].nombre`],
                equipo: objeto[`combatiente[${i}].equipo`],
                iniciativa: +objeto[`combatiente[${i}].iniciativa`] + (+objeto[`combatiente[${i}].ventaja`] / 100),
                atributos: null
            };
            if(objeto[`combatiente[${i}].hoja`] != ""){
                if(!this.hojas.includes(objeto[`combatiente[${i}].hoja`])){
                    this.hojas.push(objeto[`combatiente[${i}].hoja`]);
                }               
                item.hoja = objeto[`combatiente[${i}].hoja`];
            }
            
            combatientes.push(item);
            i++;
        }

        this.encuentro = combatientes.sort((a, b) => a.iniciativa - b.iniciativa);
    };

    appendToHtml(parent){
        // Primero recuperamos todas las hojas
        if(this.hojas.length > 0){
            let that = this;
            const hoja = this.hojas.shift();
            obtenerJson("criaturas", hoja, (obj) => {
                for(const item of that.encuentro){
                    if(item.hoja == hoja){
                        item.atributos = new Criatura(obj, true);
                    }
                }
                that.appendToHtml(parent);
            });
            return;
        }

        let i = 0;
        for(const combatiente of this.encuentro){
            const cartaElement = document.createElement("div");
            cartaElement.id = `combatiente_${i}`;
            cartaElement.classList.add("card", "mb-2");

            const cabeceraElement = document.createElement("div");
            cabeceraElement.classList.add("card-header", "fw-bold", combatiente.equipo);
            cabeceraElement.innerHTML = combatiente.nombre;
            cartaElement.appendChild(cabeceraElement);

            if(combatiente.atributos){
                const healthCuerpoElement = document.createElement("div");
                healthCuerpoElement.id = `combatiente_${i}__health`;
                healthCuerpoElement.classList.add("card-body", "form-group", "row", "align-items-center");

                const acElement = document.createElement("div");
                acElement.classList.add("col-md-2", "col-form-label");
                acElement.innerHTML = `AC: ${combatiente.atributos.claseArmadura}`;
                healthCuerpoElement.appendChild(acElement);

                const currentHealthElement = document.createElement("label");
                currentHealthElement.classList.add("col-md-2", "col-form-label");
                currentHealthElement.id = `combatiente_${i}__puntosGolpeActuales`;
                currentHealthElement.name = "puntosGolpeActuales.label";
                currentHealthElement.innerHTML = combatiente.atributos.puntosGolpe;
                healthCuerpoElement.appendChild(currentHealthElement);

                const healthModifierCol = document.createElement("div");
                healthModifierCol.classList.add("col-md-2");

                const healthModifierInput = document.createElement("input");
                healthModifierInput.id = `combatiente_${i}__modPuntosGolpe`;
                healthModifierInput.name = "modPuntosGolpe";
                healthModifierInput.type = "text";
                healthModifierInput.classList.add("form-control");
                healthModifierCol.appendChild(healthModifierInput);

                healthCuerpoElement.appendChild(healthModifierCol);

                const restarBtnCol = document.createElement("div");
                restarBtnCol.classList.add("col-md-2");

                const restarBtn = document.createElement("button");
                restarBtn.id = `combatiente_${i}__healthBtn_restar`
                restarBtn.classList.add("btn", "btn-primary", "w-100");
                restarBtn.innerHTML = "Restar"
                restarBtn.onclick = () => this.modifyHealthOnClick(
                    combatiente.atributos.puntosGolpe,
                    cabeceraElement,
                    currentHealthElement,
                    healthModifierInput
                );
                restarBtnCol.appendChild(restarBtn);

                healthCuerpoElement.appendChild(restarBtnCol);

                const sumarBtnCol = document.createElement("div");
                sumarBtnCol.classList.add("col-md-2");

                const sumarBtn = document.createElement("button");
                sumarBtn.id = `combatiente_${i}__healthBtn_sumar`
                sumarBtn.classList.add("btn", "btn-secondary", "w-100");
                sumarBtn.innerHTML = "Sumar"
                sumarBtn.onclick = () => this.modifyHealthOnClick(
                    combatiente.atributos.puntosGolpe,
                    cabeceraElement,
                    currentHealthElement,
                    healthModifierInput,
                    false
                );
                sumarBtnCol.appendChild(sumarBtn);

                healthCuerpoElement.appendChild(sumarBtnCol);

                const borrarBtnCol = document.createElement("div");
                borrarBtnCol.classList.add("col-md-2");

                const borrarBtn = document.createElement("button");
                borrarBtn.id = `combatiente_${i}__healthBtn_borrar`
                borrarBtn.classList.add("btn", "btn-delete", "w-100");
                borrarBtn.innerHTML = "Borrar"
                borrarBtn.onclick = () => this.borrarCombatiente(parent, cartaElement);
                borrarBtnCol.appendChild(borrarBtn);

                healthCuerpoElement.appendChild(borrarBtnCol);

                cartaElement.appendChild(healthCuerpoElement);

                cartaElement.appendChild(combatiente.atributos.toAccordion(i));
            }
            
            parent.appendChild(cartaElement);
            i++;
        }
    };

    modifyHealthOnClick(maxHealth, headerElement, currentHealthElement, healthModifierInput, restar = true){
        let pg = +currentHealthElement.innerHTML;
        pg = restar
            ? pg - +healthModifierInput.value
            : pg + +healthModifierInput.value;
        
        currentHealthElement.innerHTML = pg;
        healthModifierInput.value = "";

        if(pg <= 0){
            headerElement.classList.add("dead");
        }
        if(pg < maxHealth/2){
            headerElement.classList.add("injured");
        } else {
            headerElement.classList.remove("dead", "injured");
        }
    };

    borrarCombatiente(parent, cartaElement){
        parent.removeChild(cartaElement);
    };
}