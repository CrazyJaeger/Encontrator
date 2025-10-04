class Criatura{
    constructor(objeto){
        let aux, aux2, key, i, j; // Variables auxiliares

        this.nombre = objeto.nombre;
        this.tipoCriatura = objeto.tipoCriatura;
        this.tamanno = objeto.tamanno;
        this.alineamiento = objeto.alineamiento;
        this.claseArmadura = +objeto.claseArmadura;
        this.tipoArmadura = objeto.tipoArmadura;
        this.puntosGolpe = +objeto.puntosGolpe;
        this.dadosGolpe = objeto.dadosGolpe;
        this.velocidad = objeto.velocidad;
        this.velocidadNado = objeto.velocidadNado;
        this.velocidadVuelo = objeto.velocidadVuelo;
        this.competencia = +objeto.competencia;
        this.desafio = objeto.desafio;
        this.fuerza = +objeto.fuerza;
        this.destreza = +objeto.destreza;
        this.constitucion = +objeto.constitucion;
        this.inteligencia = +objeto.inteligencia;
        this.sabiduria = +objeto.sabiduria;
        this.carisma = +objeto.carisma;
        this.iniciativa = this.calcularModificador(this.destreza);

        this.tiradaSalvacion = [];
        i = 0;
        aux = objeto[`tiradasSalvacion[${i}]`];
        while(aux != undefined){
            this.tiradaSalvacion.push(aux);
            i++;
            aux = objeto[`tiradasSalvacion[${i}]`];
        }

        this.habilidades = [];
        i = 0;
        aux = objeto[`habilidades[${i}]`];
        while(aux != undefined){
            this.habilidades.push(aux);
            i++;
            aux = objeto[`habilidades[${i}]`];
        }

        this.sentidos = [];
        i = 0;
        aux = objeto[`sentidos[${i}]`];
        while(aux != undefined){
            this.sentidos.push(aux);
            i++;
            aux = objeto[`sentidos[${i}]`];
        }

        this.idiomas = [];
        i = 0;
        aux = objeto[`idiomas[${i}]`];
        while(aux != undefined){
            this.idiomas.push(aux);
            i++;
            aux = objeto[`idiomas[${i}]`];
        }

        this.inmunidadesEstado = [];
        i = 0;
        aux = objeto[`inmunidadesEstado[${i}]`];
        while(aux != undefined){
            this.inmunidadesEstado.push(aux);
            i++;
            aux = objeto[`inmunidadesEstado[${i}]`];
        }

        this.inmunidadesDanno = [];
        i = 0;
        aux = objeto[`inmunidadesDanno[${i}]`];
        while(aux != undefined){
            this.inmunidadesDanno.push(aux);
            i++;
            aux = objeto[`inmunidadesDanno[${i}]`];
        }
        
        this.resistenciasDanno = [];
        i = 0;
        aux = objeto[`resistenciasDanno[${i}]`];
        while(aux != undefined){
            this.resistenciasDanno.push(aux);
            i++;
            aux = objeto[`resistenciasDanno[${i}]`];
        }

        this.rasgos = [];
        i = 0;
        key = objeto[`rasgos[${i}].Key`];
        while(key != undefined){
            aux = {};
            aux[`${key}`] = objeto[`rasgos[${i}].Value`]
            this.rasgos.push(aux);
            i++;
            key = objeto[`rasgos[${i}].Key`];
        }

        this.conjuros = [];
        this.esConjurador = objeto.esConjurador == CHECKED;
        if(this.esConjurador){
            this.conjurosCaracteristica = objeto.conjurosCaracteristica;
            i = 0;
            while(objeto[`conjuros[${i}].nivel`] != undefined){
                aux = {};
                aux.nivel = objeto[`conjuros[${i}].nivel`];
                aux.espacios = objeto[`conjuros[${i}].espacios`];
                aux.conjuros = [];
                j = 0;
                while(objeto[`conjuros[${i}].conjuros[${j}].nombre`] != undefined){
                    aux2 = {};
                    aux2.nombre = objeto[`conjuros[${i}].conjuros[${j}].nombre`];
                    aux2.verbal = objeto[`conjuros[${i}].conjuros[${j}].componentes.verbal`];
                    aux2.somatico = objeto[`conjuros[${i}].conjuros[${j}].componentes.somatico`];
                    aux2.material = objeto[`conjuros[${i}].conjuros[${j}].componentes.material`];
                    aux2.alcance = objeto[`conjuros[${i}].conjuros[${j}].alcance`];
                    aux2.tipoAreaEfecto = objeto[`conjuros[${i}].conjuros[${j}].tipoAreaEfecto`];
                    aux2.areaEfecto = objeto[`conjuros[${i}].conjuros[${j}].areaEfecto`];
                    aux2.tiempoLanzamiento = objeto[`conjuros[${i}].conjuros[${j}].tiempoLanzamiento`];
                    aux2.duracion = objeto[`conjuros[${i}].conjuros[${j}].duracion`];
                    aux2.requiereConcentracion = objeto[`conjuros[${i}].conjuros[${j}].requiereConcentracion`];
                    aux2.tipoTiradaSalvacion = objeto[`conjuros[${i}].conjuros[${j}].tipoTiradaSalvacion`];
                    aux2.tipoSalvacion = objeto[`conjuros[${i}].conjuros[${j}].tipoSalvacion`];
                    aux2.descripcion = objeto[`conjuros[${i}].conjuros[${j}].descripcion`];
                    aux2.enlace = objeto[`conjuros[${i}].conjuros[${j}].enlace`];
                    aux.conjuros.push(new Conjuro(aux2));
                    j++;
                }
                this.conjuros.push(aux);
                i++;
            }
        }
        
        this.acciones = [];
        i = 0;
        while(objeto[`acciones[${i}].nombre`] != undefined){
            aux = {};
            aux.esAtaque = objeto[`acciones[${i}].esAtaque`];
            aux.nombre = objeto[`acciones[${i}].nombre`];
            aux.tipoAtaque = objeto[`acciones[${i}].tipoAtaque`];
            aux.modificadorAtaque = objeto[`acciones[${i}].modificadorAtaque`];
            aux.alcance = objeto[`acciones[${i}].alcance`];
            aux.objetivos = objeto[`acciones[${i}].objetivos`];
            aux.numeroDados = objeto[`acciones[${i}].numeroDados`];
            aux.tipoDado = objeto[`acciones[${i}].tipoDado`];
            aux.modificadorDanno = objeto[`acciones[${i}].modificadorDanno`];
            aux.tipoDanno = objeto[`acciones[${i}].tipoDanno`];
            aux.adicional = objeto[`acciones[${i}].adicional`];
            aux.descripcion = objeto[`acciones[${i}].descripcion`];
            this.acciones.push(new Accion(aux));
            i++;
        }

        this.accionesAdicionales = [];
        i = 0;
        while(objeto[`accionesAdicionales[${i}].nombre`] != undefined){
            aux = {};
            aux.esAtaque = objeto[`accionesAdicionales[${i}].esAtaque`];
            aux.nombre = objeto[`accionesAdicionales[${i}].nombre`];
            aux.tipoAtaque = objeto[`accionesAdicionales[${i}].tipoAtaque`];
            aux.modificadorAtaque = objeto[`accionesAdicionales[${i}].modificadorAtaque`];
            aux.alcance = objeto[`accionesAdicionales[${i}].alcance`];
            aux.objetivos = objeto[`accionesAdicionales[${i}].objetivos`];
            aux.numeroDados = objeto[`accionesAdicionales[${i}].numeroDados`];
            aux.tipoDado = objeto[`accionesAdicionales[${i}].tipoDado`];
            aux.modificadorDanno = objeto[`accionesAdicionales[${i}].modificadorDanno`];
            aux.tipoDanno = objeto[`accionesAdicionales[${i}].tipoDanno`];
            aux.adicional = objeto[`accionesAdicionales[${i}].adicional`];
            aux.descripcion = objeto[`accionesAdicionales[${i}].descripcion`];
            this.accionesAdicionales.push(new Accion(aux));
            i++;
        }

        this.reacciones = [];
        i = 0;
        while(objeto[`reacciones[${i}].nombre`] != undefined){
            aux = {};
            aux.esAtaque = objeto[`reacciones[${i}].esAtaque`];
            aux.nombre = objeto[`reacciones[${i}].nombre`];
            aux.tipoAtaque = objeto[`reacciones[${i}].tipoAtaque`];
            aux.modificadorAtaque = objeto[`reacciones[${i}].modificadorAtaque`];
            aux.alcance = objeto[`reacciones[${i}].alcance`];
            aux.objetivos = objeto[`reacciones[${i}].objetivos`];
            aux.numeroDados = objeto[`reacciones[${i}].numeroDados`];
            aux.tipoDado = objeto[`reacciones[${i}].tipoDado`];
            aux.modificadorDanno = objeto[`reacciones[${i}].modificadorDanno`];
            aux.tipoDanno = objeto[`reacciones[${i}].tipoDanno`];
            aux.adicional = objeto[`reacciones[${i}].adicional`];
            aux.descripcion = objeto[`reacciones[${i}].descripcion`];
            this.reacciones.push(new Accion(aux));
            i++;
        }
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

    toJson(){
        return JSON.stringify(this);
    };

    toMarkdown(){
        let markdown = 
        `<table>` + "\n" +
        `    <tr>` + "\n" +
        `        <th colspan="6">` + "\n" +
        `            ${this.nombre}<br/>` + "\n" +
        `            <em>${this.tipoCriatura} ${this.tamanno}, ${this.alineamiento}</em>` + "\n" +
        `        </th>` + "\n" +
        `    </tr>` + "\n" +
        `    <tr>` + "\n" +
        `        <td colspan="6">` + "\n" +
        `            <b>Armadura de clase:</b> ${this.claseArmadura} (${this.tipoArmadura})<br/>` + "\n" +
        `            <b>Puntos de golpe:</b> ${this.puntosGolpe} (${this.dadosGolpe})<br/>` + "\n";
        
        const velocidadTexto = `${this.velocidad}ft`;
        if(this.velocidadNado.length > 0){
            velocidadTexto += `, nado ${this.velocidadNado}ft`;
        }
        if(this.velocidadVuelo.length > 0){
            velocidadTexto += `, vuelo ${this.velocidadVuelo}ft`;
        }
        
        markdown +=
        `            <b>Velocidad:</b> ${velocidadTexto}<br/>` + "\n" +
        `            <b>Iniciativa:</b> ${this.pintarSigno(this.iniciativa )}<br/>` + "\n" +
        `            <b>Competencia:</b> +${this.competencia}<br/>` + "\n" +
        `            <b>Desafío:</b> +${this.desafio} (${EXP_DESAFIO[this.desafio]})<br/>` + "\n" +
        `        </td>` + "\n" +
        `    </tr>` + "\n" +
        `    <tr>` + "\n" +
        `        <td>FUE</td>` + "\n" +
        `        <td>DES</td>` + "\n" +
        `        <td>CON</td>` + "\n" +
        `        <td>INT</td>` + "\n" +
        `        <td>SAB</td>` + "\n" +
        `        <td>CAR</td>` + "\n" +
        `    </tr>` + "\n" +
        `    <tr>` + "\n" +
        `        <td>${this.fuerza} (${this.pintarSigno(this.calcularModificador(this.fuerza))})</td>` + "\n" +
        `        <td>${this.destreza} (${this.pintarSigno(this.calcularModificador(this.destreza))})</td>` + "\n" +
        `        <td>${this.constitucion} (${this.pintarSigno(this.calcularModificador(this.constitucion))})</td>` + "\n" +
        `        <td>${this.inteligencia} (${this.pintarSigno(this.calcularModificador(this.inteligencia))})</td>` + "\n" +
        `        <td>${this.sabiduria} (${this.pintarSigno(this.calcularModificador(this.sabiduria))})</td>` + "\n" +
        `        <td>${this.carisma} (${this.pintarSigno(this.calcularModificador(this.carisma))})</td>` + "\n" +
        `    </tr>` + "\n" +
        `    <tr>` + "\n" +
        `        <td colspan="6">` + "\n" +
        `            <b><em>Características.</em></b><br/>` + "\n";

        if(this.tiradaSalvacion.length > 0){
            const tsArr = [];
            for(const ts of this.tiradaSalvacion){
                tsArr.push(`${ts} (${this.pintarSigno(this.calcularModificador(this[ts]) + this.competencia)})`);
            }
            markdown += 
            `            <b>Tiradas de salvación:</b> ${tsArr.join(", ")}<br/>` + "\n";
        }
        if(this.habilidades.length > 0){
            const habArr = [];
            for(const hab of this.habilidades){
                habArr.push(`${hab} (${this.pintarSigno(this.calcularModificador(this[TIRADAS_CARACTERISTICAS[hab]]) + this.competencia)})`);
            }
            markdown += 
            `            <b>Habilidades:</b> ${habArr.join(", ")}<br/>` + "\n";
        }
        if(this.sentidos.length > 0){
            markdown += 
            `            <b>Sentidos:</b> ${this.sentidos.join(", ")}<br/>` + "\n";
        }
        if(this.idiomas.length > 0){
            markdown += 
            `            <b>Idiomas:</b> ${this.idiomas.join(", ")}<br/>` + "\n";
        }
        if(this.inmunidadesDanno.length > 0){
            markdown += 
            `            <b>Inmunidades al daño:</b> ${this.inmunidadesDanno.join(", ")}<br/>` + "\n";
        }
        if(this.inmunidadesEstado.length > 0){
            markdown += 
            `            <b>Inmunidades a estados:</b> ${this.inmunidadesEstado.join(", ")}<br/>` + "\n";
        }
        if(this.resistenciasDanno.length > 0){
            markdown += 
            `            <b>Resistencias al daño:</b> ${this.resistenciasDanno.join(", ")}<br/>` + "\n";
        }
        markdown +=
        `        </td>` + "\n" +
        `    </tr>` + "\n";

        if(this.rasgos.length > 0){
            markdown +=
            `    <tr>` + "\n" +
            `        <td colspan="6">` + "\n"
            `            <b><em>Rasgos.</em></b><br/>` + "\n";
            const rasgArr = [];
            for(const rasg in this.rasgos){
                rasgArr.push(`<b>${rasg}.<b/> ${this.rasgos[rasg]}`)
            }
            markdown += rasgArr.join("<br/>\n") + "\n";

            markdown +=
            `        </td>` + "\n" +
            `    </tr>` + "\n";
        }
        if (this.esConjurador){
            markdown +=
            `    <tr>` + "\n" +
            `        <td colspan="6">` + "\n"
            `            <b><em>Lanzamiento de conjuros.</em></b><br/>` + "\n";

            const conjCar = this.conjurosCaracteristica.toUpperCase().substring(0, 3);
            const conjCd = 8 + this[this.conjurosCaracteristica] + this.competencia;
            const conjImp = this[this.conjurosCaracteristica] + this.competencia;

            markdown +=
            `            Característica de lanzamiento: ${conjCar}; CD: ${conjCd}; ${conjImp} a impactar.<br/>` + "\n";

            const nivArr = [];
            for(const niv of this.conjuros){
                let nivTxt = +niv.nivel > 0
                    ? `<em><b>Conjuros Nivel ${niv.nivel} (Espacios: ${niv.espacios})</b></em><br/>\n` 
                    : `<em><b>Trucos.</b></em><br/>\n`;
                const conjArr = [];
                for(const conj of niv.conjuros){
                    conjArr.push(conj.toMarkdown());
                }
                nivTxt += conjArr.join("<br/>\n");
                nivArr.push(nivTxt);
            }

            markdown += nivArr.join("<br/>\n");
            markdown +=
            `        </td>` + "\n" +
            `    </tr>` + "\n";
        }
        if(this.acciones.length > 0){
            markdown +=
            `    <tr>` + "\n" +
            `        <td colspan="6">` + "\n" +
            `            <b><em>Acciones.</em></b><br/>` + "\n";
            const accArr = [];
            for(const acc of this.acciones){
                accArr.push(acc.toMarkdown());
            }

            markdown += accArr.join("<br/>\n");
            markdown +=
            `        </td>` + "\n" +
            `    </tr>` + "\n";
        }
        if(this.accionesAdicionales.length > 0){
            markdown +=
            `    <tr>` + "\n" +
            `        <td colspan="6">` + "\n"
            `            <b><em>Acciones Adicionales.</em></b><br/>` + "\n";
            const accAdArr = [];
            for(const accAd in this.accionesAdicionales){
                accAdArr.push(accAd.toMarkdown());
            }

            markdown += accAdArr.join("<br/>\n");
            markdown +=
            `        </td>` + "\n" +
            `    </tr>` + "\n";
        }
        if(this.reacciones.length > 0){
            markdown +=
            `    <tr>` + "\n" +
            `        <td colspan="6">` + "\n"
            `            <b><em>Reacciones.</em></b><br/>` + "\n";
            const reaccArr = [];
            for(const reacc in this.reacciones){
                reaccArr.push(reacc.toMarkdown());
            }

            markdown += reaccArr.join("<br/>\n");
            markdown +=
            `        </td>` + "\n" +
            `    </tr>` + "\n";
        }
        
        markdown +=
        `</table>` + "\n";

        return markdown;
    };
}