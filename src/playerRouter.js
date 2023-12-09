import express from 'express';
import * as playerService from './playerService.js';
import { Player, Subelement } from './defaultPlayers.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('plantilla', {
        players: playerService.getPlayers(),
    });
});

router.get('/ficha', (req,res) => {
    let id = parseInt(req.query.id);
    let player = playerService.getPlayer(id);
    res.render('ficha',{
        player: player,
        name: player.name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),  // h2 muestra mal las tildes, así conseguimos quitarlas
        subelems: player.subelements
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
        res.render('mensajes', {
            title: "Subelemento añadido",
            message: "Subelemento añadido correctamente"
        });
    }
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
        res.render('mensajes',{
            title: "Ficha creada",
            message: "Jugador añadido correctamente"
        });
    }
});

router.get('/borrar', (req, res) => {
    let id = parseInt(req.query.id);
    let name = playerService.getPlayer(id).name;

    playerService.deletePlayer(id);

    res.render('mensajes', {
        title: "Ficha eliminada",
        message: "Ficha de " + name + " eliminada definitivamente"
    });
});

router.get('/editar', (req, res) => {
    let id = parseInt(req.query.id)
    let player = playerService.getPlayer(id);
    res.render('formulario');
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
        res.render('mensajes', {
            title: "Ficha editada",
            message: "Ficha editada correctamente"
        });
    }
});

router.get("/formulario", (req, res) => {
    res.render('formulario');
});

export default router;