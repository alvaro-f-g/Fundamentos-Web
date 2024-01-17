const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const textareas = document.querySelector('#formulario textarea');

 function correctDate(string) { //la copio de auxFunctions.js ya que no se puede importar
    const parts = string.split('-');

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    const date = new Date(year, month - 1, day);

    return (isNaN(date.getTime()) || date.getFullYear() !== year || month < 1 || month > 12 || day < 1 || day > 31)
}

const expresiones = {
    name: /^[A-Z].*$/, 
    number: /^[0-9]{1,2}$/, //2 digitos,cada uno de un num del 0 al 9
    nationality: /^[A-Z].*$/, //empieza por mayuscula y despues puede ir cualquier cantidad de carácteres
    price: /^(?:[1-9]\d{0,7}|100000000)$/, //entre 1 y 100000000
    description: /^.{50,500}$/, //entre 50 y 500 carácteres
    photo: /^(ftp|http|https):\/\/[^ "]+$/ //formato url
}

const campos = {
    name: false,
    number: false,
    //birthday: false,
    nationality: false,
    price: false,
    description: false,
    photo: false
}

const checkForm = (event) => {
    switch (event.target.name) {
        case "name":
            checkInput(expresiones.name, event.target, 'name');
            break;
        case "number":
            checkInput(expresiones.number, event.target, 'number');
            break;
        /*case "birthday":
            checkInput(expresiones.birthday, event.target, 'birthday');
            break;*/
        case "nationality":
            checkInput(expresiones.nationality, event.target, 'nationality');
            break;
        case "price":
            checkInput(expresiones.price, event.target, 'price');
            break;
        case "description":
            checkInput(expresiones.description, event.target, 'description');
            break;
        case "photo":
            checkInput(expresiones.photo, event.target, 'photo');
            break;
    }
}
const checkInput = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', checkForm);
    input.addEventListener('blur', checkForm);
});



formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    if(campos.name && campos.number  && campos.nationality && campos.price && campos.description && campos.photo){
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    }
    else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 5000);
    }   
});    
