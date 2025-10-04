class Conjuro{
    constructor(objeto){
        this.nombre = objeto.nombre;
        this.componentes = {
            verbal: objeto.verbal == 'on',
            somatico: objeto.somatico == 'on',
            material: objeto.material == 'on'
        };
        this.alcance = objeto.alcance;
        this.tipoAreaEfecto = objeto.tipoAreaEfecto;
        this.areaEfecto = objeto.areaEfecto;       
        this.tiempoLanzamiento = objeto.tiempoLanzamiento;
        this.duracion = objeto.duracion;
        this.requiereConcentracion = objeto.requiereConcentracion;
        this.tipoTiradaSalvacion = objeto.tipoTiradaSalvacion;
        this.tipoSalvacion = objeto.tipoSalvacion;
        this.descripcion = objeto.descripcion
        this.enlace = objeto.enlace;        
    };

    toHtml(nivel, idx){
        const containerElement = document.createElement("div");
        containerElement.id = `conjuros_${nivel}__conjuros_${idx}__Container`;
        containerElement.classList.add("col-md-12", "col-form-label");

        const nombreInputElement = document.createElement("input");
        nombreInputElement.type = "hidden";
        nombreInputElement.id = `conjuros_${nivel}__conjuros_${idx}__nombre`;
        nombreInputElement.name = `conjuros[${nivel}].conjuros[${idx}].nombre`;
        nombreInputElement.value = this.nombre;
        containerElement.appendChild(nombreInputElement);

        const textElement = document.createElement("div");
        textElement.id = `conjuros_${nivel}__conjuros_${idx}__Texto`;

        const nombreTextoElement = document.createElement("b");
        nombreTextoElement.classList.add("me-1");
        nombreTextoElement.innerHTML = this.nombre + "."
        textElement.appendChild(nombreTextoElement);

        const componenteVerbalInputElement = document.createElement("input");
        componenteVerbalInputElement.type = "hidden";
        componenteVerbalInputElement.id = `conjuros_${nivel}__conjuros_${idx}__componente_verbal`;
        componenteVerbalInputElement.name = `conjuros[${nivel}].conjuros[${idx}].componente.verbal`;
        componenteVerbalInputElement.value = this.componenteVerbal;
        containerElement.appendChild(componenteVerbalInputElement);

        const componenteSomaticoInputElement = document.createElement("input");
        componenteSomaticoInputElement.type = "hidden";
        componenteSomaticoInputElement.id = `conjuros_${nivel}__conjuros_${idx}__componente_somatico`;
        componenteSomaticoInputElement.name = `conjuros[${nivel}].conjuros[${idx}].componente.somatico`;
        componenteSomaticoInputElement.value = this.componenteSomatico;
        containerElement.appendChild(componenteSomaticoInputElement);

        const componenteMaterialInputElement = document.createElement("input");
        componenteMaterialInputElement.type = "hidden";
        componenteMaterialInputElement.id = `conjuros_${nivel}__conjuros_${idx}__componente_material`;
        componenteMaterialInputElement.name = `conjuros[${nivel}].conjuros[${idx}].componente.material`;
        componenteMaterialInputElement.value = this.componenteMaterial;
        containerElement.appendChild(componenteMaterialInputElement);

        const componentesTextoElement = document.createElement("em");
        componentesTextoElement.classList.add("me-1");
        const componentesArr = [];
        for(const componente in this.componentes){
            if(this.componentes[componente] == true){ 
                componentesArr.push(componente.toUpperCase()[0]) 
            }
        }
        componentesTextoElement.innerHTML = `(${componentesArr.join(", ")})`; 
        textElement.appendChild(componentesTextoElement);

        const alcanceInputElement = document.createElement("input");
        alcanceInputElement.type = "hidden";
        alcanceInputElement.id = `conjuros_${nivel}__conjuros_${idx}__alcance`;
        alcanceInputElement.name = `conjuros[${nivel}].conjuros[${idx}].alcance`;
        alcanceInputElement.value = this.alcance;
        containerElement.appendChild(alcanceInputElement);

        const tipoAreaEfectoInputElement = document.createElement("input");
        tipoAreaEfectoInputElement.type = "hidden";
        tipoAreaEfectoInputElement.id = `conjuros_${nivel}__conjuros_${idx}__tipoAreaEfecto`;
        tipoAreaEfectoInputElement.name = `conjuros[${nivel}].conjuros[${idx}].tipoAreaEfecto`;
        tipoAreaEfectoInputElement.value = this.tipoAreaEfecto;
        containerElement.appendChild(tipoAreaEfectoInputElement);

        const areaEfectoInputElement = document.createElement("input");
        areaEfectoInputElement.type = "hidden";
        areaEfectoInputElement.id = `conjuros_${nivel}__conjuros_${idx}__areaEfecto`;
        areaEfectoInputElement.name = `conjuros[${nivel}].conjuros[${idx}].areaEfecto`;
        areaEfectoInputElement.value = this.areaEfecto;
        containerElement.appendChild(areaEfectoInputElement);

        const alcanceTextoElement = document.createElement("em");
        alcanceTextoElement.classList.add("me-1");
        let alcanceTexto = "";
        if(this.tipoAreaEfecto != "objetivo"){
            alcanceTexto += this.alcance > 0 ? `${this.alcance}ft` : "pos.";
            alcanceTexto += `; ${this.tipoAreaEfecto} ${this.areaEfecto}ft`;
        }else{
            alcanceTexto += this.alcance > 0 ? `${this.alcance}ft` : "toque"
        }
        alcanceTextoElement.innerHtml = `[${alcanceTexto}]`
        textElement.appendChild(alcanceTextoElement);

        const tiempoLanzamientoInputElement = document.createElement("input");
        tiempoLanzamientoInputElement.type = "hidden";
        tiempoLanzamientoInputElement.id = `conjuros_${nivel}__conjuros_${idx}__tiempoLanzamiento`;
        tiempoLanzamientoInputElement.name = `conjuros[${nivel}].conjuros[${idx}].tiempoLanzamiento`;
        tiempoLanzamientoInputElement.value = this.tiempoLanzamiento;
        containerElement.appendChild(tiempoLanzamientoInputElement);

        const duracionInputElement = document.createElement("input");
        duracionInputElement.type = "hidden";
        duracionInputElement.id = `conjuros_${nivel}__conjuros_${idx}__duracion`;
        duracionInputElement.name = `conjuros[${nivel}].conjuros[${idx}].duracion`;
        duracionInputElement.value = this.duracion;
        containerElement.appendChild(duracionInputElement);

        const requiereConcentracionInputElement = document.createElement("input");
        requiereConcentracionInputElement.type = "hidden";
        requiereConcentracionInputElement.id = `conjuros_${nivel}__conjuros_${idx}__requiereConcentracion`;
        requiereConcentracionInputElement.name = `conjuros[${nivel}].conjuros[${idx}].requiereConcentracion`;
        requiereConcentracionInputElement.value = this.requiereConcentracion;
        containerElement.appendChild(requiereConcentracionInputElement);

        const tiempoLanzamientoTextoElement = document.createElement("em");
        tiempoLanzamientoTextoElement.classList.add("me-1");
        let tiempoLanzamientoTexto = "";
        if(this.tiempoLanzamiento == "acción"){ tiempoLanzamientoTexto += "acc."; }
        if(this.tiempoLanzamiento == "acción adicional"){ tiempoLanzamientoTexto += "acc.ad."; }
        if(this.tiempoLanzamiento == "reacción"){ tiempoLanzamientoTexto += "reac."; }
        if(this.requiereConcentracion == true){ tiempoLanzamientoTexto += " conc."; }
        tiempoLanzamientoTexto += ` ${this.duracion}`;
        tiempoLanzamientoTextoElement.innerHTML = `{${tiempoLanzamientoTexto}}`;
        textElement.appendChild(tiempoLanzamientoTextoElement);

        const tipoTiradaSalvacionInputElement = document.createElement("input");
        tipoTiradaSalvacionInputElement.type = "hidden";
        tipoTiradaSalvacionInputElement.id = `conjuros_${nivel}__conjuros_${idx}__tipoTiradaSalvacion`;
        tipoTiradaSalvacionInputElement.name = `conjuros[${nivel}].conjuros[${idx}].tipoTiradaSalvacion`;
        tipoTiradaSalvacionInputElement.value = this.tipoTiradaSalvacion;
        containerElement.appendChild(tipoTiradaSalvacionInputElement);

        if(this.tipoTiradaSalvacion != "ninguna"){
            const tipoSalvacionInputElement = document.createElement("input");
            tipoSalvacionInputElement.type = "hidden";
            tipoSalvacionInputElement.id = `conjuros_${nivel}__conjuros_${idx}__tipoSalvacion`;
            tipoSalvacionInputElement.name = `conjuros[${nivel}].conjuros[${idx}].tipoSalvacion`;
            tipoSalvacionInputElement.value = this.tipoSalvacion;
            containerElement.appendChild(tipoSalvacionInputElement);

            const tiradaSalvacionTextoElement = document.createElement("em");
            tiradaSalvacionTextoElement.classList.add("me-1");
            tiradaSalvacionTextoElement.innerHTML = 
                `&lt;${this.tipoTiradaSalvacion.toUpperCase().substring(0, 3)} ${this.tipoSalvacion}&gt;`;
            textElement.appendChild(tiradaSalvacionTextoElement);
        }

        const descripcionInputElement = document.createElement("input");
        descripcionInputElement.type = "hidden";
        descripcionInputElement.id = `conjuros_${nivel}__conjuros_${idx}__descripcion`;
        descripcionInputElement.name = `conjuros[${nivel}].conjuros[${idx}].descripcion`;
        descripcionInputElement.value = this.descripcion;
        containerElement.appendChild(descripcionInputElement);

        const descripcionTextoElement = document.createElement("span");
        descripcionTextoElement.innerHTML = this.descripcion + "."; 
        textElement.appendChild(descripcionTextoElement);

        const enlaceInputElement = document.createElement("input");
        enlaceInputElement.type = "hidden";
        enlaceInputElement.id = `conjuros_${nivel}__conjuros_${idx}__enlace`;
        enlaceInputElement.name = `conjuros[${nivel}].conjuros[${idx}].enlace`;
        enlaceInputElement.value = this.enlace;
        containerElement.appendChild(enlaceInputElement);

        if(this.enlace.length > 0){
            const enlaceTextoElement = document.createElement("a");
            enlaceTextoElement.classList.add("ms-1");
            enlaceTextoElement.href = this.enlace;
            enlaceTextoElement.target = "_blank";
            enlaceTextoElement.innerHTML = "Leer más..."; 
            textElement.appendChild(enlaceTextoElement);
        }

        containerElement.appendChild(textElement);
        
        return containerElement;
    };
}