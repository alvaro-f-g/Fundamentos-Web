export function noAccents(str) {
     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');  // h2 muestra mal las tildes, así conseguimos quitarlas
}

function withPoints(number) {
     return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function dateToString(date) {
     const monthNames = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
     ];

     return `${date.getDate()} de ${monthNames[date.getMonth()]} del ${date.getFullYear()}`;
}

export function formatInfo(player) {
     return [noAccents(player.name), withPoints(player.marketValue), dateToString(new Date(player.birth))];
}

export function numberInRange(name, number, min, max) {
     if (!Number.isInteger(number)) throw new Error(name + " debe ser un número entero");
     if (number < min || number > max) throw new Error(name + " debe ser un número entre " + min + " y " + max);
}

export function correctDate(string) {
     const parts = string.split('-');

     const year = parseInt(parts[0]);
     const month = parseInt(parts[1]);
     const day = parseInt(parts[2]);

     const date = new Date(year, month - 1, day);

     return (isNaN(date.getTime()) || date.getFullYear() !== year || month < 1 || month > 12 || day < 1 || day > 31)
}

export function validFormat(url) {
     const regex = /^(ftp|http|https):\/\/[^ "]+$/;
     return regex.test(url) || url.startsWith("/images/");  // Válido si es una URL o una de las imágenes ya guardadas en el servidor
}