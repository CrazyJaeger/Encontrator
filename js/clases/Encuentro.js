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
                    equipo: "enemigo",
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
                    equipo: "aliado",
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

            this.combatientes = combatientes.sort((a, b) => a.iniciativa - b.iniciativa);
        }
        debugger;
    };

    toDespliegueHtml(){

    };
}