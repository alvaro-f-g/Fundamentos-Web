import express from 'express';
import * as playerService from './playerService.js';
import { Player, Subelement } from './defaultPlayers.js';

const router = express.Router();

function noAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');  // h2 muestra mal las tildes, así conseguimos quitarlas
}

router.get('/', (req, res) => {
    res.render('plantilla', {
        players: playerService.getPlayers(),
    });
});

router.get("/formulario", (req, res) => {
    res.render('formulario', {
        title: "Nueva ficha",
        cancel: "/"
    });
});

router.post('/crear', (req, res) => {
    let player = new Player(
        req.body.photo,
        req.body.name,
        req.body.position,
        req.body.number,
        req.body.birthday,
        req.body.nationality,
        req.body.price,
        req.body.description
    )

    try {
        playerService.correctValues(player);
    } catch (error) {
        res.render('mensajes', {
            title: "Error",
            message: error.message,
            back: "javascript:history.back()"
        });
    }

    playerService.addPlayer(player);
    res.render('mensajes', {
        title: "Ficha creada",
        message: "Jugador añadido correctamente",
        back: "/"
    });
});

router.get('/ficha', (req, res) => {
    let id = parseInt(req.query.id);
    let player = playerService.getPlayer(id);
    
    res.render('ficha', {
        player: player,
        name: noAccents(player.name),
        subelems: player.subelements
    });
});

router.get('/borrar', (req, res) => {
    let id = parseInt(req.query.id);
    let name = playerService.getPlayer(id).name;

    playerService.deletePlayer(id);

    res.render('mensajes', {
        title: "Ficha eliminada",
        message: noAccents("Ficha de " + name + " eliminada definitivamente"),
        back: "/"
    });
});

router.get('/editar', (req, res) => {
    let id = parseInt(req.query.id)
    let player = playerService.getPlayer(id);

    res.render('formulario', {
        title: noAccents("Ficha de " + player.name),
        edit: true,
        player: player,
        cancel: "/ficha?id=" + id
    });
});

router.post('/fichaEditada', (req, res) => {
    let newPlayer = new Player(
        req.body.photo,
        req.body.name,
        req.body.position,
        req.body.number,
        req.body.birthday,
        req.body.nationality,
        req.body.price,
        req.body.description
    );

    try {
        playerService.correctValues(newPlayer);
    } catch (error) {
        res.render('mensajes', {
            title: "Error",
            message: error.message,
            back: "javascript:history.back()"
        });
    }

    let id = req.body.id;
    let player = playerService.getPlayer(parseInt(id));

    playerService.editPlayer(player, newPlayer);

    res.render('mensajes', {
        title: noAccents("Ficha de " + player.name + " editada"),
        message: "Ficha editada correctamente",
        back: "/ficha?id=" + id
    });
});

router.post("/subelementoCreado", (req, res) => {
    let sub = new Subelement(
        req.body.emblem,
        req.body.club,
        req.body.start,
        req.body.end
    );

    try {
        playerService.correctSubvalues(sub);
    } catch (error) {
        res.render('mensajes', {
            title: "Error",
            message: error.message,
            back: "javascript:history.back()"
        });
    }

    let id = parseInt(req.body.id);
    let player = playerService.getPlayer(id);

    player.addSubelement(sub);

    res.render('ficha', {
        player: player,
        name: noAccents(player.name),
        subelems: player.subelements
    });
});

export default router;