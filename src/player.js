import { numberInRange, correctDate, validFormat } from "./auxFunctions.js";

export class Player {
     constructor(photo, name, position, number, birth, nationality, marketValue, description) {
          this.photo = photo;
          this.name = name;
          this.position = position;
          this.number = number;
          this.birth = birth;
          this.nationality = nationality;
          this.marketValue = marketValue;
          this.description = description;
          this.subelements = [];
     }

     checkValues() {
          let longFields = new Set(["description", "photo"]);
          let positions = new Set(["Banquillo", "Portero", "Defensa", "Centrocampista", "Delantero"]);
          let birthday = new Date(this.birth);

          for (const value in this) {
               if (this[value] === "") throw new Error("Rellene todos los campos del formulario");
               if (this[value].length > 20 && !longFields.has(value)) throw new Error("La longitud del campo " + value + " es demasiado larga");
               if (this[value].length > 2000 && longFields.has(value)) throw new Error("La longitud del campo " + value + " es demasiado larga");
          }
          if (!validFormat(this.photo)) throw new Error("No es una URL de imagen válida");
          if (!positions.has(this.position)) throw new Error("Introduzca una posición válida");
          numberInRange("El dorsal", parseInt(this.number), 0, 99);
          if (!correctDate(this.birth)) throw new Error("Introduzca una fecha correcta");
          if (birthday.getTime() > Date.now()) throw new Error("¿Ha nacido en el futuro?");
          numberInRange("El valor de mercado", parseInt(this.marketValue), 0, 200000000);
          if (this.marketValue == 0) throw new Error("Todos los jugadores valen algo");

          return true;
     }
}

export class Subelement {
     constructor(emblem, club, start, end) {
          this.emblem = emblem,
          this.club = club,
          this.stage = { start: start, end: end }
     }

     checkValues() {
          for (const value in this) {
               if (this[value] === "") throw new Error("Rellene todos los campos");
          }
          if (!validFormat(this.emblem)) throw new Error("No es una URL de imagen válida");
          if (this.club.length > 20) throw new Error("El nombre del club es demasiado largo");
          numberInRange("El año de entrada", parseInt(this.stage.start), 1863, 2222);
          numberInRange("El año de salida", parseInt(this.stage.end), 1863, 2222);
          if (this.stage.start > this.stage.end) throw new Error("¡Es imposible que haya dejado el club antes de haber entrado!");

          return true;
     }
}