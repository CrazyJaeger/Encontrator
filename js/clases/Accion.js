class Accion {
    constructor(objeto) {
        this.esAtaque = objeto.esAtaque == TRUE || objeto.esAtaque == true;
        this.nombre = objeto.nombre;
        if (this.esAtaque) {
            this.tipoAtaque = objeto.tipoAtaque;
            this.modificadorAtaque = objeto.modificadorAtaque;
            this.alcance = objeto.alcance;
            this.objetivos = objeto.objetivos;
            this.numeroDados = objeto.numeroDados;
            this.tipoDado = objeto.tipoDado;
            this.modificadorDanno = objeto.modificadorDanno;
            this.tipoDanno = objeto.tipoDanno;
            this.adicional = objeto.adicional != undefined ? objeto.adicional : "";
        } else {
            this.descripcion = objeto.descripcion;
        }
    };

    /**
     * Proporciona el objeto en su representacion HTML.
     * 
     * Se necesita proporcionar el nombre de la lista y su posición desde el 0 para 
     * establecer correctamente sus identificadores
     * 
     * @param {string} nombreLista nombre de la lista en la que queremos incluir el elemento HTML
     * @param {number} idx índice que ocupará el elemento en la lista
     * @returns 
     */
    toHtml(nombreLista, idx) {
        const containerElement = document.createElement("div");
        containerElement.id = `${nombreLista}_${idx}__Container`;
        containerElement.classList.add("col-md-12", "col-form-label");

        const esAtaqueInputElement = document.createElement("input");
        esAtaqueInputElement.type = "hidden";
        esAtaqueInputElement.id = `${nombreLista}_${idx}__esAtaque`;
        esAtaqueInputElement.name = `${nombreLista}[${idx}].esAtaque`;
        esAtaqueInputElement.value = this.esAtaque;
        containerElement.appendChild(esAtaqueInputElement);

        const nombreInputElement = document.createElement("input");
        nombreInputElement.type = "hidden";
        nombreInputElement.id = `${nombreLista}_${idx}__nombre`;
        nombreInputElement.name = `${nombreLista}[${idx}].nombre`;
        nombreInputElement.value = this.nombre;
        containerElement.appendChild(nombreInputElement);

        const textElement = document.createElement("div");
        textElement.id = `${nombreLista}_${idx}__Texto`;

        const nombreTextoElement = document.createElement("b");
        nombreTextoElement.classList.add("me-1");
        nombreTextoElement.innerHTML = this.nombre + "."
        textElement.appendChild(nombreTextoElement);
        
        if (this.esAtaque) {
            const tipoAtaqueInputElement = document.createElement("input");
            tipoAtaqueInputElement.type = "hidden";
            tipoAtaqueInputElement.id = `${nombreLista}_${idx}__tipoAtaque`;
            tipoAtaqueInputElement.name = `${nombreLista}[${idx}].tipoAtaque`;
            tipoAtaqueInputElement.value = this.tipoAtaque;
            containerElement.appendChild(tipoAtaqueInputElement);

            const tipoAtaqueTextoElement = document.createElement("em");
            tipoAtaqueTextoElement.classList.add("me-1");
            tipoAtaqueTextoElement.innerHTML = `Ataque con arma ${this.tipoAtaque}.`; 
            textElement.appendChild(tipoAtaqueTextoElement);

            const modificadorAtaqueInputElement = document.createElement("input");
            modificadorAtaqueInputElement.type = "hidden";
            modificadorAtaqueInputElement.id = `${nombreLista}_${idx}__modificadorAtaque`;
            modificadorAtaqueInputElement.name = `${nombreLista}[${idx}].modificadorAtaque`;
            modificadorAtaqueInputElement.value = this.modificadorAtaque;
            containerElement.appendChild(modificadorAtaqueInputElement);

            const modificadorAtaqueTextoElement = document.createElement("span");
            modificadorAtaqueTextoElement.classList.add("me-1");
            modificadorAtaqueTextoElement.innerHTML = `${this.modificadorAtaque > 0 ? "+" : ""}${this.modificadorAtaque} a impactar,`; 
            textElement.appendChild(modificadorAtaqueTextoElement);

            const alcanceInputElement = document.createElement("input");
            alcanceInputElement.type = "hidden";
            alcanceInputElement.id = `${nombreLista}_${idx}__alcance`;
            alcanceInputElement.name = `${nombreLista}[${idx}].alcance`;
            alcanceInputElement.value = this.alcance;
            containerElement.appendChild(alcanceInputElement);

            const alcanceTextoElement = document.createElement("span");
            alcanceTextoElement.classList.add("me-1");
            alcanceTextoElement.innerHTML = `alcance ${this.alcance}ft,`; 
            textElement.appendChild(alcanceTextoElement);

            const objetivosInputElement = document.createElement("input");
            objetivosInputElement.type = "hidden";
            objetivosInputElement.id = `${nombreLista}_${idx}__objetivos`;
            objetivosInputElement.name = `${nombreLista}[${idx}].objetivos`;
            objetivosInputElement.value = this.objetivos;
            containerElement.appendChild(objetivosInputElement);

            const objetivosTextoElement = document.createElement("span");
            objetivosTextoElement.classList.add("me-1");
            objetivosTextoElement.innerHTML = `${this.objetivos} objetivo${this.objetivos > 1 ? "s" : ""}.`; 
            textElement.appendChild(objetivosTextoElement);

            const numeroDadosInputElement = document.createElement("input");
            numeroDadosInputElement.type = "hidden";
            numeroDadosInputElement.id = `${nombreLista}_${idx}__numeroDados`;
            numeroDadosInputElement.name = `${nombreLista}[${idx}].numeroDados`;
            numeroDadosInputElement.value = this.numeroDados;
            containerElement.appendChild(numeroDadosInputElement);

            const tipoDadoInputElement = document.createElement("input");
            tipoDadoInputElement.type = "hidden";
            tipoDadoInputElement.id = `${nombreLista}_${idx}__tipoDado`;
            tipoDadoInputElement.name = `${nombreLista}[${idx}].tipoDado`;
            tipoDadoInputElement.value = this.tipoDado;
            containerElement.appendChild(tipoDadoInputElement);

            const modificadorDannoInputElement = document.createElement("input");
            modificadorDannoInputElement.type = "hidden";
            modificadorDannoInputElement.id = `${nombreLista}_${idx}__modificadorDanno`;
            modificadorDannoInputElement.name = `${nombreLista}[${idx}].modificadorDanno`;
            modificadorDannoInputElement.value = this.modificadorDanno;
            containerElement.appendChild(modificadorDannoInputElement);

            const tipoDannoInputElement = document.createElement("input");
            tipoDannoInputElement.type = "hidden";
            tipoDannoInputElement.id = `${nombreLista}_${idx}__tipoDanno`;
            tipoDannoInputElement.name = `${nombreLista}[${idx}].tipoDanno`;
            tipoDannoInputElement.value = this.tipoDanno;
            containerElement.appendChild(tipoDannoInputElement);

            const impactoTextoElement = document.createElement("em");
            impactoTextoElement.classList.add("me-1");
            impactoTextoElement.innerHTML = "Impacto:"; 
            textElement.appendChild(impactoTextoElement);

            const dannoTextoElement = document.createElement("span");
            dannoTextoElement.classList.add("me-1");
            dannoTextoElement.innerHTML = `${this.getImpacto()} (${this.numeroDados}d${this.tipoDado}`; 
            if(this.modificadorDanno != 0){
                dannoTextoElement.innerHTML += +this.modificadorDanno > 0 ? ` +${this.modificadorDanno}` : ` ${this.modificadorDanno}`;
            }
            dannoTextoElement.innerHTML +=  `) de daño ${this.tipoDanno}.`
            textElement.appendChild(dannoTextoElement);  
            
            if(this.adicional){
                const adicionalInputElement = document.createElement("input");
                adicionalInputElement.type = "hidden";
                adicionalInputElement.id = `${nombreLista}_${idx}__adicional`;
                adicionalInputElement.name = `${nombreLista}[${idx}].adicional`;
                adicionalInputElement.value = this.adicional;
                containerElement.appendChild(adicionalInputElement);

                const adicionalTextoElement = document.createElement("span");
                adicionalTextoElement.innerHTML = this.adicional + "."; 
                textElement.appendChild(adicionalTextoElement);
            }
        } else {
            const descripcionInputElement = document.createElement("input");
            descripcionInputElement.type = "hidden";
            descripcionInputElement.id = `${nombreLista}_${idx}__descripcion`;
            descripcionInputElement.name = `${nombreLista}[${idx}].descripcion`;
            descripcionInputElement.value = this.descripcion;
            containerElement.appendChild(descripcionInputElement);

            textElement.insertAdjacentHTML('beforeend', this.descripcion + ".");
        }

        const btnElement = document.createElement("button");
        btnElement.id = `${nombreLista}_${idx}__Delete`;
        btnElement.type = "button";
        btnElement.classList.add("btn", "btn-sm", "btn-delete", "ms-2")
        btnElement.onclick = () => eliminarAccion(nombreLista, +btnElement.id.split("_")[1]);
        
        const icon = document.createElement("i");
        icon.classList.add("fa", "fa-trash");

        btnElement.appendChild(icon);
        textElement.appendChild(btnElement);

        containerElement.appendChild(textElement);

        return containerElement;
    };

    /**
     * Calcula el daño medio de impacto medio.
     * 
     * @returns cantidad de daño medio
     */
    getImpacto(){
        return (this.numeroDados * this.tipoDado) / 2 + +this.modificadorDanno;
    };

    toMarkdown(){
        if(!this.esAtaque){
            return `<b>${this.nombre}.</b> ${this.descripcion}`;
        }
        let modDanno = +this.modificadorDanno > 0 ? ` +${this.modificadorDanno}` : ` ${this.modificadorDanno}`;

        return "" + 
        `<b>${this.nombre}.</b> <em>Ataque con arma ${this.tipoAtaque}.</em>` +
        `${this.modificadorAtaque > 0 ? "+" : ""}${this.modificadorAtaque} a impactar, alcance ${this.alcance}ft, ` +
        `${this.objetivos} objetivo${this.objetivos > 1 ? "s" : ""}. ` +
        `<em>Impacto:</em> ${this.getImpacto()} (${this.numeroDados}d${this.tipoDado} ${modDanno}) de daño ${this.tipoDanno}. ` +
        this.adicional;
    };
}