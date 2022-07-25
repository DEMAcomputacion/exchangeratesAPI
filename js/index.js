var myHeaders = new Headers();
let nombreMonedas = {};
const $base = document.querySelector("#base");
const $fecha = document.querySelector("#fecha");
const $btnConsultar = document.querySelector("#consultar");

myHeaders.append("apikey", "Bvv7hTJPErtJvAQYHgflw6i17sFHIqQs");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
 .then(response => response.json())
  .then(result => creaArraySimbolos(result))

function creaArraySimbolos(result){
    const simbolos = Object.keys(result.symbols);
    nombreMonedas = result.symbols
    creaSelectorMoneda(simbolos, result)
}

function creaSelectorMoneda(simbolos, result){
    simbolos.forEach(elem => {
        const $option = document.createElement("option");
        $option.innerText = elem.concat(" - ").concat(result.symbols[elem]);
        $option.value = elem;
        $base.appendChild($option)
    });
}

$btnConsultar.onclick = function(event){
    const base = $base.value;
    const fecha = $fecha.value;
    validaSeleccion(base, fecha);
    event.preventDefault()
}

function validaSeleccion(base, fecha) {
    if(base.length = 3 && /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(fecha)){
        pideCambios(base,fecha)
    }
}
function pideCambios(base, fecha) {
    fetch(`https://api.apilayer.com/exchangerates_data/${fecha}&base=${base}`, requestOptions)
        .then(response => response.json())
        .then(result => armaListado(result, base, fecha))
}

function armaListado(result){
    const $zonaTitulo = document.querySelector("#zonaTitulo");
    $zonaTitulo.innerHTML = `* <b>${arguments[1]} </b>- ${nombreMonedas[arguments[1]]} - Fecha: ${arguments[2]}`
    const $keys = Object.keys(result.rates)
    const cantidad = $keys.length
    const datosPorColumna = Math.ceil(cantidad / 3);
    let inicial = 0;
    for(let i = 1; i < 4; i++){
            for(let j = inicial; j <= (datosPorColumna + inicial); j++){
            if(j < cantidad){
            const $nuevoTr = document.createElement("tr");
            const $nuevoTdMoneda = document.createElement("td");
            const $nuevoTdCambio = document.createElement("td");
            $nuevoTdMoneda.innerHTML = $keys[j].concat(" - ").concat('<i class="textomonedas">' + nombreMonedas[$keys[j]] + '</i>')
            $nuevoTdCambio.innerText = result.rates[$keys[j]];
            const $tablaCorrespondiente = document.querySelector(`#tBody${i}`)
            
                $tablaCorrespondiente.appendChild($nuevoTr);
                $nuevoTr.appendChild($nuevoTdMoneda)
                $nuevoTr.appendChild($nuevoTdCambio)
            }
        }
        inicial = inicial + datosPorColumna;
    }
}
