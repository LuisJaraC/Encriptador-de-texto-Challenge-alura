let inputText = document.getElementById('input');
let buttonEncriptar = document.getElementById('btn1');
let buttonDesencriptar = document.getElementById('btn2');
let columnShow = document.getElementById('columnShow');
let buttonCopyPaste= document.getElementById('btn-cp')

function encriptacion(texto){
    var equivalentes = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };
    var textoEncriptado = '';
    //recorrer cada letra del texto
    for (let letra of texto){
        //verificar si la letra es una vocal y reemplazarla segun las equivalencias
        if(equivalentes[letra]){
            textoEncriptado += equivalentes[letra];
        }else {
            textoEncriptado += letra; //si no es vocal, omitir proceso anterior
        }
    }
    return textoEncriptado; //retorna la palabra en el dom atraves del mostrar columna
    
}


function encryptText(){
    //limpiar el body del documento
    columnShow.innerHTML = '';
    //agregar el texto encriptado al body del documento column show
    var palabra = encriptacion(inputText.value);
    columnShow.innerHTML += `<p><strong> ${palabra}</strong></p>
    <button id="btn-cp" onclick="copyPaste()"><strong>Copiar</strong></button>`
    
}

function desencriptar(texto){
    var reglas = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    }
    let textoDesencriptado = '';
    let i = 0;
    while ( i < texto.length){
        //verificar si se coincide con las reglas
        let encontrado = false;//controla el bucle
        for (let [clave, valor] of Object.entries(reglas)){
            //slice extrae una porcion del texto encriptado y la longitud es igual a la regla revisada
            //si coincide con una de las reglas se agrega la vocal correspondiente y se avanza el indice
            if(texto.slice(i, i + clave.length) === clave){
                textoDesencriptado += valor;
                i += clave.length;
                encontrado = true;
                break;
            }
        }
        if(!encontrado){
            textoDesencriptado += texto[i];
            i++; //si no coincide, moverse a la siguiente letra
        }
    }
    return textoDesencriptado; //retorna la palabra
}
function decryptText(){
    columnShow.innerHTML = '';
    var desencriptacion = desencriptar(inputText.value);
    columnShow.innerHTML += `<p><strong> ${desencriptacion}</strong></p>`;
    buttonCopyPaste.style.display = 'none';
}

function copyPaste(){
    let textoCopiado = columnShow.querySelector('p').textContent.trim();
    // console.log(textoCopiado);
    
    inputText.value = textoCopiado;
}

inputText.addEventListener('input', function() {
    this.value = this.value
        .replace(/[^a-zA-Z0-9\s]/g, '') // elimina los caracteres especiales, reemplazandolos por un espacio vacíopor medio de regex
        .toLowerCase(); //convierte a minusculas lo que ingrese el usuario
});