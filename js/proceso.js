
var procesos = {
    lista_procesos: [],
    lista_terminados: [],
    quantum: 0
}

var proceso = {
    pid: 0,
    rafaga: 0,
    residuo_rafaga: 0,
    estado: 'listo',
    tiempo_final: 0,

    addProcess: function(tiempo, q) {
        proceso.rafaga = tiempo;
        proceso.residuo_rafaga = proceso.rafaga;
        quantum = q;
        proceso.pid += 1;
        procesos.lista_procesos.push([
            proceso.pid,
            proceso.rafaga,
            quantum,
            proceso.residuo_rafaga,
            proceso.estado
        ]);
    },
    addFinishedProcees: function(pid, rafaga, q, tiempo) {

        procesos.lista_terminados.push([pid, rafaga, q, tiempo, 'terminado']);
    },
    totalProcesosListos: function(lista_procesos) {
        let c = 0;
        for(let i = 0; i < lista_procesos.length; i += 1) {
            
            if( lista_procesos[i][1] == "" ) {
                c += 1;
            }
        }
        if( c == lista_procesos.length ) {
            return true;
        } else {
            return false;
        }
    },
    procesoActual: function(lista_procesos) {
        let i = 0
        while(i < lista_procesos.length) {
            if( lista_procesos[i][1] == "" ) {
                i += 1
            }else {
                return i;
            }
        }

    }


}