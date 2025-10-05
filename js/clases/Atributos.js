class Atributos{
    constructor(objeto){
        this.claseArmadura = +objeto.claseArmadura;
        this.puntosGolpeMaximos = objeto.puntosGolpeMaximos != undefined
            ? +objeto.puntosGolpeMaximos
            : +objeto.puntosGolpe
            ;
        this.puntosGolpeRestantes = objeto.puntosGolpeRestantes != undefined
            ? +objeto.puntosGolpeRestantes 
            : this.puntosGolpeMaximos
        ;
        this.velocidad = objeto.velocidad;
        this.velocidadNado = objeto.velocidadNado;
        this.velocidadVuelo = objeto.velocidadVuelo;
        this.fuerza = +objeto.fuerza;
        this.destreza = +objeto.destreza;
        this.constitucion = +objeto.constitucion;
        this.inteligencia = +objeto.inteligencia;
        this.sabiduria = +objeto.sabiduria;
        this.carisma = +objeto.carisma;
        this.tiradaSalvacion = objeto.tiradaSalvacion;
        this.inmunidadesEstado = objeto.inmunidadesEstado;
        this.inmunidadesDanno = objeto.inmunidadesDanno;
        this.resistenciasDanno = objeto.resistenciasDanno;
        this.rasgos = objeto.rasgos;
        this.conjuros = objeto.conjuros;
        this.acciones = objeto.acciones;
        this.accionesAdicionales = objeto.accionesAdicionales;
        this.reacciones = objeto.reacciones;
    };

    /**
    * Calcula el modificador correspondiente al atributo indicado
    * 
    * @param {number} atributo valor cuyo modificador queremos obtener
    * @returns valor del modificador
    */
    calcularModificador(atributo){
        return atributo >= 10
            ? Math.floor((atributo - 10) / 2)
            : Math.floor(atributo / 2) - 5;
    }

    /**
    * Proporciona el modificador con signo
    * 
    * @param {number} modificador que queremos calcular con signo
    * @returns modificador con signo
    */
    pintarSigno(modificador){
        return modificador > 0 ? `+${modificador}` : modificador;
    }

    toHtmlInputs(idx){
        const baseId = `combatientes_${idx}__atributos`;
        const basename = `combatientes[${idx}].atributos`;
        let i, j;

        const column = document.createElement("div");
        column.classList.add("col-md-12");

        const claseArmaduraInput = document.createElement("input");
        claseArmaduraInput.type = "hidden";
        claseArmaduraInput.id = `${baseId}_claseArmadura`;
        claseArmaduraInput.name = `${basename}.claseArmadura`;
        claseArmaduraInput.value = this.claseArmadura;
        column.appendChild(claseArmaduraInput);

        const puntosGolpeMaximosInput = document.createElement("input");
        puntosGolpeMaximosInput.type = "hidden";
        puntosGolpeMaximosInput.id = `${baseId}_puntosGolpeMaximos`;
        puntosGolpeMaximosInput.name = `${basename}.puntosGolpeMaximos`;
        puntosGolpeMaximosInput.value = this.puntosGolpeMaximos;
        column.appendChild(puntosGolpeMaximosInput);

        const puntosGolpeRestantesInput = document.createElement("input");
        puntosGolpeRestantesInput.type = "hidden";
        puntosGolpeRestantesInput.id = `${baseId}_puntosGolpeRestantes`;
        puntosGolpeRestantesInput.name = `${basename}.puntosGolpeRestantes`;
        puntosGolpeRestantesInput.value = this.puntosGolpeRestantes;
        column.appendChild(puntosGolpeRestantesInput);

        const velocidadInput = document.createElement("input");
        velocidadInput.type = "hidden";
        velocidadInput.id = `${baseId}_velocidad`;
        velocidadInput.name = `${basename}.velocidad`;
        velocidadInput.value = this.velocidad;
        column.appendChild(velocidadInput);
        
        const velocidadNadoInput = document.createElement("input");
        velocidadNadoInput.type = "hidden";
        velocidadNadoInput.id = `${baseId}_velocidadNado`;
        velocidadNadoInput.name = `${basename}.velocidadNado`;
        velocidadNadoInput.value = this.velocidadNado;
        column.appendChild(velocidadNadoInput);

        const velocidadVueloInput = document.createElement("input");
        velocidadVueloInput.type = "hidden";
        velocidadVueloInput.id = `${baseId}_velocidadVuelo`;
        velocidadVueloInput.name = `${basename}.velocidadVuelo`;
        velocidadVueloInput.value = this.velocidadVuelo;
        column.appendChild(velocidadVueloInput);

        const fuerzaInput = document.createElement("input");
        fuerzaInput.type = "hidden";
        fuerzaInput.id = `${baseId}_fuerza`;
        fuerzaInput.name = `${basename}.fuerza`;
        fuerzaInput.value = this.fuerza;
        column.appendChild(fuerzaInput);

        const destrezaInput = document.createElement("input");
        destrezaInput.type = "hidden";
        destrezaInput.id = `${baseId}_destreza`;
        destrezaInput.name = `${basename}.destreza`;
        destrezaInput.value = this.destreza;
        column.appendChild(destrezaInput);

        const constitucionInput = document.createElement("input");
        constitucionInput.type = "hidden";
        constitucionInput.id = `${baseId}_constitucion`;
        constitucionInput.name = `${basename}.constitucion`;
        constitucionInput.value = this.constitucion;
        column.appendChild(constitucionInput);

        const inteligenciaInput = document.createElement("input");
        inteligenciaInput.type = "hidden";
        inteligenciaInput.id = `${baseId}_inteligencia`;
        inteligenciaInput.name = `${basename}.inteligencia`;
        inteligenciaInput.value = this.inteligencia;
        column.appendChild(inteligenciaInput);

        const sabiduriaInput = document.createElement("input");
        sabiduriaInput.type = "hidden";
        sabiduriaInput.id = `${baseId}_sabiduria`;
        sabiduriaInput.name = `${basename}.sabiduria`;
        sabiduriaInput.value = this.sabiduria;
        column.appendChild(sabiduriaInput);

        const carismaInput = document.createElement("input");
        carismaInput.type = "hidden";
        carismaInput.id = `${baseId}_carisma`;
        carismaInput.name = `${basename}.carisma`;
        carismaInput.value = this.carisma;
        column.appendChild(carismaInput);

        i = 0;
        for(const ts of this.tiradaSalvacion){
            const tsInput = document.createElement("input");
            tsInput.type = "hidden";
            tsInput.id = `${baseId}_tiradaSalvacion_${i}`;
            tsInput.name = `${basename}.tiradaSalvacion[${i}]`;
            tsInput.value = ts;
            column.appendChild(tsInput);
            i++;
        }

        i = 0;
        for(const ie of this.inmunidadesEstado){
            const ieInput = document.createElement("input");
            ieInput.type = "hidden";
            ieInput.id = `${baseId}_inmunidadesEstado_${i}`;
            ieInput.name = `${basename}.inmunidadesEstado[${i}]`;
            ieInput.value = ie;
            column.appendChild(ieInput);
            i++;
        }

        i = 0;
        for(const id of this.inmunidadesDanno){
            const idInput = document.createElement("input");
            idInput.type = "hidden";
            idInput.id = `${baseId}_inmunidadesDanno_${i}`;
            idInput.name = `${basename}.inmunidadesDanno[${i}]`;
            idInput.value = id;
            column.appendChild(idInput);
            i++;
        }

        i = 0;
        for(const rd of this.resistenciasDanno){
            const rdInput = document.createElement("input");
            rdInput.type = "hidden";
            rdInput.id = `${baseId}_resistenciasDanno_${i}`;
            rdInput.name = `${basename}.resistenciasDanno[${i}]`;
            rdInput.value = rd;
            column.appendChild(rdInput);
            i++;
        }

        i = 0;
        for(const key in this.rasgos){
            const keyInput = document.createElement("input");
            keyInput.type = "hidden";
            keyInput.id = `${baseId}_rasgos_${i}_Key`;
            keyInput.name = `${basename}.rasgos[${i}].Key`;
            keyInput.value = key;
            column.appendChild(keyInput);

            const valueInput = document.createElement("input");
            valueInput.type = "hidden";
            valueInput.id = `${baseId}_rasgos_${i}_Value`;
            valueInput.name = `${basename}.rasgos[${i}].Value`;
            valueInput.value = this.rasgos[key];
            column.appendChild(valueInput);
            i++;
        }
        

        /*
        this.conjuros = objeto.conjuros;
        this.acciones = objeto.acciones;
        this.accionesAdicionales = objeto.accionesAdicionales;
        this.reacciones = objeto.reacciones;
        */
    }
}