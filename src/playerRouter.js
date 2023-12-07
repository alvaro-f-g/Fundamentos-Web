import express from 'express';
import * as playerService from './playerService.js';
const router = express.Router();

//función que va a servir para ver si los valores que pones en los subelementos son válidos y si no son válidos se te comunicará
function confirmarValoresSub(escudos,clubes,temporadas){
    let numTemporadas=parseInt(temporadas); //esto transforma el  string temporadas(por estar en un mapa) en un número entero y si la cadena no se ha podido convertir en un número o se convirtiese en un decimal te devuelve Nan
    if(escudos=="" || clubes=="" || temporadas==""){  //si la cadena esta vacía
        return 1;
    }
    if(isNaN(numTemporadas) || !Number.isInteger(numTemporadas)){  //comprobamos si numTemporadas no se ha podido convertir en entero o si no es un entero
        return 2;
    }
    //Ahora comprobaremos lo de la imagen
    return 0; //caso de no haber habido ningún error

}
function confirmarValoresElem(foto, nombreApellidos, posiscion, dorsal, fechaNacimiento, nacionalidad, valorMercado, descripcion){
    const parts = fechaNacimiento.split('/'); // para obtener los 3 campos de una fecha
    // obtengo las partes
    const month = parseInt(parts[0]);
    const day = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    const nacimiento = new Date(year, month -1, day); 

    let valorDorsal = parseInt(dorsal);
    let valorJugador = parseInt(valorMercado);

    if ( nombreApellidos == "" || posicion == "" || nacionalidad == "" || descripcion == ""){
        return 1;
    }
    else if (isNaN(valorDorsal)|| !Number.isInteger(valorDorsal) || valorDorsal < 0){
        return 2;
    }
    else if (isNaN(valorJugador) || !Number.isInteger(valorJugador) || valorJugador <0){
        return 3;
    }
    else if ( isNaN(nacimiento.getTime()) || nacimiento.getFullYear() !== year || month < 1 || month > 12 || day < 1 || day > 31){
        return 4;
    }
    //aqui comprobamos lo de la imagen, si fuese url(tenemos que hacerlas urls)

    return 0; //si no ha habido errores 
}
//método para mostrar la pagina principal
router.get('/', (req, res) => {
    res.render('plantilla', { 
        players: playerService.getPlayers(),
    });
});

router.get('/ficha', (req,res) => {  // No sé porque pero '/ficha/:id' rompe la visualización del html (en plantilla.html habría que poner href="ficha")
    // let id = parseInt(req.params.id);
    res.render('ficha',{
        player: playerService.getPlayer(0),  // .getPlayer(id),
        subelems: playerService.getPlayer(0).subelements
    });
});

router.post("/nuevoSubElemento",(req,res) => {
    let nota="";
    let id = parseInt(req.body.id) //Obtenemos el valor del "id" del jugador desde el cuerpo de la solicitud POST (req.body.id) y se convierte a un entero utilizando parseInt.
    //Añadimos nuevo subelemento(escudo,club y temporada)
    let warning = confirmarValoresSub(req.body.escudos,req.body.clubes,req.body.temporadas); //Llamamos a la función  confirmarValoresSub con algunos valores del cuerpo de la solicitud (req.body) para validarlos y obtener un código de advertencia (warning).
    if(warning==0){ //si no ha habido ningún error, se crea el nuevo subelemento
        nota="Subelemento añadido"
        id = parseInt(req.body.id)
        //Guardamos las características del nuevo subelemento
        let nuevoSubElem = { 
            escudos : req.body.escudos,
            clubes : req.body.clubes, 
            temporadas : req.body.temporadas
        }
        let jugador = playerService.getPlayer(id); //Obtenemos el jugador correspondiente al id proporcionado
        console.log(jugador);
        jugador.subelements[jugador.subelements.length] = nuevoSubElem; //añadimos el nuevosubElemento al array subElems
    }
    else if (warning == 1){
        nota = "Complete los campos del formulario";
    }
    else if (warning == 2){
        nota = "El número de temporadas debe ser un número entero"
    }
    /*else if(warning == 3){
        nota = "La imagen debe ser válida"
    }*/
    res.render('mensajes', { //esto con render pasa las notas y el id a mensajes html, es decir se renderiza la vista 'mensajes' con el objeto que contiene el "id" y la "nota". Esto  muestra un mensaje al usuario sobre el resultado de la operación, ya sea que se haya añadido correctamente el subelemento o si ha habido algún problema.
        id: id,
        nota: nota
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
    let nota="";
    let warning = confirmarValoresElem(req.body.name,req.body.description,req.body.position,req.body.jerseyNumber,req.body.birthday,req.body.nationality,req.body.playerphoto,req.body.price); //Llamamos a la función  confirmarValoresElem con algunos valores del cuerpo de la solicitud (req.body) para validarlos y obtener un código de advertencia (warning).
    if(warning==0){ //si no ha habido ningún error, se crea el nuevo elemento(jugador)
        playerService.addPlayer(jugador);
        nota="Jugador añadido";
    }
    else if (warning == 1){
        nota = "Rellene todos los campos del formulario";
    }
    else if (warning == 2){
        nota = "El dorsal debe ser un número mayor o igual a 0 "
    }
    else if(warning == 3){
        nota = "El precio/valor de jugador debe ser un número mayor que 0"
    }
    else if(warning == 4){
        nota = "La fecha de nacimiento no es válida, introdúcela en formato MM/DD/YYYY"
    }
    /*else if(warning == 5){
        nota = "La imagen debe ser válida"
    }*/
    res.render('saved_player',{
        nota:nota
    });
        
});
router.get('/jugador/:id/borrar', (req, res) => {

    playerService.deletePlayer(req.params.id);

    res.render('deleted_player');
});

router.get('/editar.html', (req,res) => {  // se usa para cuando se acceda al url de la pagina de edicion, mediante el id obtenemos el jugador que posteriormente se editará
    let id = parseInt(req.query.id)
    res.render('editar', {
        jugador:playerService.getPlayer(id),
        id:id
    });
});
router.post('player/edit',(req, res) => {
    let jugador = {
        id = req.body.id;
        nombreApellidos: req.body.name, //es name, description,position ... por como esta en el formulario (en el id o name)
        descripcion: req.body.description,
        posición: req.body.position,
        dorsal: req.body.jerseyNumber,
        fechaNacimiento: req.body.birthday,
        nacionalidad: req.body.nationality,
        fotoPerfil: req.body.playerphoto,
        valorMercado: req.body.price
    };
    id = parseInt(id);
    let nota="";
    let warning = confirmarValoresElem(req.body.name,req.body.description,req.body.position,req.body.jerseyNumber,req.body.birthday,req.body.nationality,req.body.playerphoto,req.body.price); 
    if (warning == 0){
        let player = playerService.getPlayer(parseInt(id));
        let subelement = player.subelements;
        player = {nombreApellidos, descripcion, posición, dorsal, fechaNacimiento, nacionalidad, fotoPerfil, valorMercado, subelement, id};
        playerService.editPlayer(parseInt(id),player);
        nota = "Se ha editado el jugador";
    }
    else if (warning == 1){
        nota = "Rellene todos los campos del formulario";
    }
    else if (warning == 2){
        nota = "El dorsal debe ser un número mayor o igual a 0 "
    }
    else if(warning == 3){
        nota = "El precio/valor de jugador debe ser un número mayor que 0"
    }
    else if(warning == 4){
        nota = "La fecha de nacimiento no es válida, introdúcela en formato MM/DD/YYYY"
    }
    /*else if(warning == 5){
        nota = "La imagen debe ser válida"
    }*/
    res.render('playerEdited', {
        nota: nota,
        id: parseInt(id)
    });

});
export default router;