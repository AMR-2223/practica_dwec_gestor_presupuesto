var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0){
        presupuesto = cantidad;
        return presupuesto;
    }
    else {
        console.log("Cantidad introducida no es positiva");
        return Number(-1);
    }
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
   
    //MÉTODOS        
    this.mostrarGastoCompleto = function() {
        let objFecha = new Date(this.fecha).toLocaleString();
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${objFecha}
Etiquetas:\n`;
        for (let e of this.etiquetas) {
            texto += `- ${e}\n`;
        }
        return texto;
    }
    
    this.actualizarFecha = function(actFecha){
        if(Date.parse(actFecha)) { //Se cumple si Date.parse(actFecha) = true
            this.fecha = Date.parse(actFecha);
        }
    
    }
    this.anyadirEtiquetas = function (...etiquetas) {
        for (let etiqueta of etiquetas) {
            if (this.etiquetas.indexOf(etiqueta) == -1) {
                this.etiquetas.push(etiqueta);
            }
        }
    }
    
    this.borrarEtiquetas = function (...etiquetas) {
        let nuevoListadoEtiquetas = [];
        for (let etiqueta of this.etiquetas){
            if(etiquetas.indexOf(etiqueta) == -1) {
                nuevoListadoEtiquetas.push(etiqueta);
            }
        this.etiquetas = nuevoListadoEtiquetas;
        }
    }

    
    //PROPIEDADES
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    
    //fecha viene en formato string "2021-10-06T13:10"
    //this.fecha tiene que guardar un timestamp
    let f = Date.parse(fecha);
    if (isNaN(f)) {
        this.fecha = Date.parse(new Date());
    }
    else {
        this.fecha = f;
    }
    
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
}    
    
    
CrearGasto.prototype.mostrarGasto = function (){
    return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
}

CrearGasto.prototype.actualizarDescripcion = function (actDescripcion) {
    (this.descripcion = actDescripcion);
}
CrearGasto.prototype.actualizarValor = function (nuevovalor){
    if (Number(nuevovalor) >= 0){
        this.valor = nuevovalor;
    }     
}

CrearGasto.prototype.fecha = function(){
    this.fecha = new Date.timestamp;
}

CrearGasto.prototype.etiquetas = function(){
    this.etiquetas = [];
}



function listarGastos () {
    return gastos;
}

function anyadirGasto (gasto)  {
    gasto.id = idGasto++;
    gastos.push(gasto);
}

function borrarGasto(idGasto) {
    let gasto = null;    
    for (let g of gastos)
    {
        if(g.id == idGasto) {
        gasto = g;
    }
    }   
    if (gasto){
        let posicionGasto = gastos.indexOf(gasto);
        gastos.splice(posicionGasto,1);
    }

}

function calcularTotalGastos () {
    let totalGastos = 0;
    for (let g of gastos){
        totalGastos += g.valor;
    }
    return totalGastos;
}

function calcularBalance (){
    return presupuesto - calcularTotalGastos();
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
