import express from 'express';
import * as playerService from './playerService.js';
import { Player, Subelement } from './defaultPlayers.js';

const router = express.Router();

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
    let sub = new Subelement(
        req.body.escudos,
        req.body.clubes, 
        req.body.temporadas
    )

    let id = parseInt(req.body.id);

    if(playerService.correctSubvalues(sub)){
        let player = playerService.getPlayer(id);
        player.addSubelement(sub);
        nota="Subelemento añadido";
    }
    res.render('mensajes', { //esto con render pasa las notas y el id a mensajes html, es decir se renderiza la vista 'mensajes' con el objeto que contiene el "id" y la "nota". Esto  muestra un mensaje al usuario sobre el resultado de la operación, ya sea que se haya añadido correctamente el subelemento o si ha habido algún problema.
        id: id,
        nota: nota
    });
});

router.post('/jugador/new', (req, res) => {
    let player = new Player(
        req.body.playerphoto,
        req.body.name,
        req.body.position,
        req.body.jerseyNumber,
        req.body.birthday,
        req.body.nationality,
        req.body.price,
        req.body.description,
    )

    if(playerService.correctValues(player)){ //si no ha habido ningún error, se crea el nuevo elemento(jugador)
        playerService.addPlayer(player);
        nota="Jugador añadido";
    }
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
    let newPlayer = new Player(
        req.body.playerphoto,
        req.body.name,
        req.body.position,
        req.body.jerseyNumber,
        req.body.birthday,
        req.body.nationality,
        req.body.price,
        req.body.description,
    );

    if (playerService.correctValues(newPlayer)){
        let player = playerService.getPlayer(parseInt(id));
        let subelement = player.subelements;
        player = {nombreApellidos, descripcion, posición, dorsal, fechaNacimiento, nacionalidad, fotoPerfil, valorMercado, subelement, id};
        playerService.editPlayer(parseInt(id),player);
        nota = "Se ha editado el jugador";
    }
res.render('playerEdited', {
        nota: nota,
        id: parseInt(id)
    });
});

export default router;