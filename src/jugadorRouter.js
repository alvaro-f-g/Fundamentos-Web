import express from 'express';
import * as jugadorService from './jugadorService.js';
const router = express.Router();

//función que va a servir para ver si los valores que pones en los subelementos son válidos y si no son válidos se te comunicará
function confirmarValores(escudos,clubes,temporadas){
    let numTemporadas=parseInt(temporadas) //esto transforma el  string temporadas(por estar en un mapa) en un número entero y si la cadena no se ha podido convertir en un número o se convirtiese en un decimal te devuelve Nan
    if(escudos=="" || clubes=="" || temporadas==""){  //si la cadena esta vacía
        return 1
    }
    if(isNaN(numTemporadas) || !Number.isInteger(numTemporadas)){  //comprobamos si numTemporadas no se ha podido convertir en entero o si no es un entero
        return 2
    }
    //Ahora comprobaremos lo de la imagen
    return 0 //caso de no haber habido ningún error

}
//método para mostrar la pagina principal
router.get('/', (req, res) => { 
    res.render('plantilla', { 
        jugadores: jugadorService.getJugadores()
    });
});
//para añadir nuevos jugadores
router.post('/jugador/new', (req, res) => {
 
    let jugador = {
        nombreApellidos: req.body.name, //es name, description,position ... por como esta en el formulario (en el id o name)
        descripcion: req.body.description,
        posición: req.body.position,
        dorsal: req.body.jerseyNumber,
        fechaNacimiento: req.body.birthday,
        nacionalidad: req.body.nationality,
        fotoPerfil: req.body.playerphoto,
        valorMercado: req.body.price
    };
    jugadorService.añadirJugador(jugador);
    res.render('saved_player');
});
router.get('/jugador/:id/borrar', (req, res) => {

    jugadorService.borrarJugador(req.params.id);

    res.render('deleted_player');
});