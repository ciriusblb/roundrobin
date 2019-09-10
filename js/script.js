var tiempo_proceso = document.getElementById("tiempo");
var q = document.getElementById("q");
var btnAgregar = document.getElementById("btnAgregar");
var btnIniciar = document.getElementById("btnIniciar");

var intervalo;

function btnAddProcess(e){
    e.preventDefault();
    // p1: tiempo, p2: quantum
    proceso.addProcess(tiempo_proceso.value, q.value);
    updateTable("table_procesos", procesos.lista_procesos);
}

function RoundRobin(e){
    e.preventDefault();
    let iterador = 0;
    let contador = 0;
    let tiempo = 0;
    let finalizador = 0;
    let procesos_listos = procesos.lista_procesos;
    updateTable("table_procesos", procesos_listos);
    intervalo = setInterval(function() {
        if( proceso.totalProcesosListos( procesos_listos ) ) {
            clearInterval(intervalo);
        }
        if( iterador == procesos_listos.length ) {
            iterador = proceso.procesoActual( procesos_listos );
        }
        // si el quantum es mayor o igual que el proceso
        if ( procesos_listos[iterador][2] >= procesos_listos[iterador][1] ) {
            if(procesos_listos[iterador][1] == 0) {
                proceso.addFinishedProcees(
                    procesos_listos[iterador][0],
                    procesos_listos[iterador][1],
                    procesos_listos[iterador][2],
                    tiempo
                );
                procesos_listos[iterador][0] = '';
                procesos_listos[iterador][1] = '';
                procesos_listos[iterador][2] = '';
                procesos_listos[iterador][3] = '';
                procesos_listos[iterador][4] = '';
                iterador += 1;
            } else {
                procesos_listos[iterador][4] = 'procesando';
                procesos_listos[iterador][1] -= 1;

            }
        } else {
            if ( contador < procesos_listos[iterador][2] ) {
                procesos_listos[iterador][4] = 'procesando';
                procesos_listos[iterador][1] -= 1;
                contador += 1; 
                console.log(contador)
                // if(contador == procesos_listos[iterador][2]){
                //     procesos_listos[iterador][4] = 'listo';
                //     iterador += 1;
                //     contador = 0;
                // }
            } else {
                console.log("aqui ya no entra")
                contador = 0;
                procesos_listos[iterador][4] = 'listo';
                iterador += 1;
            }
        }
        updateTable("table_procesos", procesos_listos);
        updateTable("table_terminados", procesos.lista_terminados);
        tiempo += 1;
    }, 1000)

}

btnAgregar.addEventListener('click', btnAddProcess);
btnIniciar.addEventListener('click', RoundRobin); 

function updateTable(id_table, array_data) {
    var fila = "";
    var table = document.getElementById(id_table);
    table.innerHTML = "";
    var tr = document.createElement("tr");

    var total = "";
    for ( let j = 0; j < array_data.length; j++) {
        fila +=  "<tr> <td>" + array_data[j][0] + "</td>";
        fila += "<td>" + array_data[j][1] + "</td>";
        fila += "<td>" + array_data[j][2] + "</td>";
        fila += "<td> " + array_data[j][3] + "</td>";
        fila += "<td> " + array_data[j][4] + "</td> </tr>";
        
    }
    table.innerHTML = fila;
}