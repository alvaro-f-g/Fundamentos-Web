export function noAccents(str) {
     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');  // h2 muestra mal las tildes, así conseguimos quitarlas
}

export function withPoints(number) {
     return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function dateToString(date) {
     const monthNames = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
     ];

     return `${date.getDate()} de ${monthNames[date.getMonth()]} del ${date.getFullYear()}`;
}