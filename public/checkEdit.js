const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
formulario.setAttribute('validate', 'true');

const expresiones = {   
    name: /^[A-Z].*$/, 
    dorsal: /^[0-9]{1,2}$/, //2 digitos,cada uno de un num del 0 al 9
    date: /^(?:19|20)\d{2},(0[1-9]|1[0-2]),(0[1-9]|[12]\d|3[01])$/, //formato fecha
    nacionalidad: /^[A-Z].*$/, //empieza por mayuscula y despues puede ir cualquier cantidad de carácteres
    marketValue: /^(?:[1-9]\d{0,7}|100000000)$/, //entre 1 y 100000000
    descripcion: /^.{50,500}$/, //entre 50 y 500 carácteres
    image: /^(ftp|http|https):\/\/[^ "]+$/ //formato url
}

const campos = {
    name: false,
    dorsal: false,
    date: false,
    nacionalidad: false,
    marketValue: false,
    descripcion: false
}

const checkForm = (event) => {
    switch (event.target.name) {
        case "name":
            checkInput(expresiones.name, event.target, 'name');
            break;
        case "dorsal":
            checkInput(expresiones.dorsal, event.target, 'dorsal');
            break;
        case "date":
            checkInput(expresiones.date, event.target, 'date');
            break;
        case "nacionalidad":
            checkInput(expresiones.nacionalidad, event.target, 'nacionalidad');
            break;
        case "marketValue":
            checkInput(expresiones.marketValue, event.target, 'marketValue');
            break;
        case "descripcion":
            checkInput(expresiones.descripcion, event.target, 'descripcion');
            break;
        case "image":
            checkInput(expresiones.image, event.target, 'image');
            break;
    }
}

const checkInput = (expresion, input, campo) => {
 if(expresion.test(input.value)){
     document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
     document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
     //document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
     //document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
     document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
     campos[campo] = true;
 }else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        //document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        //document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
 }
 document.getElementById('name').oninput
}

inputs.forEach((input) => {
    input.addEventListener('keyup', checkForm);
    input.addEventListener('blur', checkForm);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if(campos.name && campos.dorsal && campos.date && campos.nacionalidad && campos.marketValue && campos.descripcion && (formulario.getAttribute('validate') === 'true')){
        formulario.submit();
    }else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});