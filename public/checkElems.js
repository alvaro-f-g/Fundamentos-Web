const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const textareas = document.querySelector('#formulario textarea');

const expressions = {
    name: /^[A-Z].*$/, 
    number: /^[0-9]{1,2}$/, //2 digitos,cada uno de un num del 0 al 9
    nationality: /^[A-Z].*$/, //empieza por mayuscula y despues puede ir cualquier cantidad de carácteres
    description: /^.{50,500}$/, //entre 50 y 500 carácteres
    photo: /^(ftp|http|https):\/\/[^ "]+$/ //formato url
}

const fields = {
    name: false,
    number: false,
    birthday: false,
    nationality: false,
    description: false,
    photo: false
}


const elementos = new Map([
    ['name', undefined],
    ['number', undefined],
    ['birthday', undefined],
    ['nationality', undefined],
    ['description', undefined],
    ['photo', undefined]
]);

const checkForm = (event) => {
    const { name, value } = event.target;
    let expression = null;

    elementos.set(name, value);

    switch (name) {
        case "name":
            expression = expressions.name;
            break;
        case "number":
            expression = expressions.number;
            break;
        case "birthday":
            correctValue(correctDate(value), 'birthday');
            return;
        case "nationality":
            expression = expressions.nationality;
            break;
        case "description":
            expression = expressions.description;
            break;
        case "photo":
            expression = expressions.photo;
            break;
    }

    correctValue(expression.test(value), name);
}


const correctValue = (condition, field) => {
    if (condition) {
        document.getElementById(`grupo__${field}`).classList.remove('form-group-incorrect');
        document.getElementById(`grupo__${field}`).classList.add('form-group-correct');
        document.querySelector(`#grupo__${field} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${field} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${field} .form-control-error`).classList.remove('form-control-error-active');
        fields[field] = true;
    } else {
        document.getElementById(`grupo__${field}`).classList.add('form-group-incorrect');
        document.getElementById(`grupo__${field}`).classList.remove('form-group-correct');
        document.querySelector(`#grupo__${field} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${field} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${field} .form-control-error`).classList.add('form-control-error-active');
        fields[field] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', checkForm);
    input.addEventListener('blur', checkForm);
});

formulario.addEventListener('submit', (event) => {
    
    for (const [key, value] of elementos) {
        checkForm({ target: { name: key, value: value } });
    }
    
    if(!(fields.name && fields.number && fields.nationality && fields.description && fields.photo)){
        event.preventDefault();
        document.getElementById('form-error-message').classList.add('form-error-message-active');
        setTimeout(() => {
            document.getElementById('form-error-message').classList.remove('form-error-message-active');
        }, 5000);
    }
});

// Copiada de auxFunctions.js ya que no se puede importar
function correctDate(string) {
    const parts = string.split('-');

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    const date = new Date(year, month - 1, day);

    return !(isNaN(date.getTime()) || date.getFullYear() !== year || month < 1 || month > 12 || day < 1 || day > 31)
}