import express from 'express';
import * as playerService from './playerService.js';
import { Player, Subelement } from './player.js';
import { noAccents, formatInfo } from './auxFunctions.js';

const router = express.Router();

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

router.post('/formulario/inscribir', (req, res) => {
    let player = new Player(
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
        playerService.addPlayer(player);

        res.render('mensajes', {
            title: "Ficha creada",
            message: "Jugador añadido correctamente",
            back: "/"
        });
    }
    catch (error) {
        showError(res, error);
    }
});

router.get('/ficha', (req, res) => {
    let id = parseInt(req.query.id);
    let player = playerService.getPlayer(id);
    const [name, value, date] = formatInfo(player);

    res.render('ficha', {
        player: player,
        name: name,
        value: value + " €",
        date: date,
        subelems: player.subelements
    });
});

router.get('/ficha/borrar', (req, res) => {
    let id = parseInt(req.query.id);
    let player = playerService.getPlayer(id);

    try {
        playerService.deletePlayer(player);

        res.render('mensajes', {
            title: "Ficha eliminada",
            message: noAccents("Ficha de " + player.name + " eliminada definitivamente"),
            back: "/"
        });
    }
    catch (error) {
        showError(res, error);
    }
});

router.get('/ficha/editar', (req, res) => {
    let id = parseInt(req.query.id)
    let player = playerService.getPlayer(id);

    res.render('formulario', {
        title: noAccents("Ficha de " + player.name),
        edit: true,
        player: player,
        cancel: "/ficha?id=" + id
    });
});

router.post('/ficha/editada', (req, res) => {
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

    let id = parseInt(req.body.id);
    let player = playerService.getPlayer(id);

    try {
        playerService.editPlayer(player, newPlayer);

        res.render('mensajes', {
            title: "Ficha editada",
            message: noAccents("Ficha de " + player.name + " editada correctamente"),
            back: "/ficha?id=" + id
        });
    }
    catch (error) {
        showError(res, error);
    }
});

router.post("/ficha/agregar", (req, res) => {
    let sub = new Subelement(
        req.body.emblem,
        req.body.club,
        req.body.start,
        req.body.end
    );

    let id = parseInt(req.body.id);
    let player = playerService.getPlayer(id);

    try {
        playerService.addSubelement(player, sub);

        res.render('mensajes', {
            title: "Subelemento añadido",
            message: "Subelemento añadido correctamente",
            back: "/ficha?id=" + id
        });
    }
    catch (error) {
        showError(res, error);
    }
});

router.get("/formulario/ben", (req, res) => {
    let ben = new Player(
        "https://m.media-amazon.com/images/M/MV5BZjg2ZjViMTktNWQ1Yy00ODZiLWE1OTgtNDY3MjI0OGUyNjNhXkEyXkFqcGdeQXVyNTk4NDI4NTE@._V1_.jpg",
        "Ben Tennyson",
        "Banquillo",
        "10",
        "2005-12-27",
        "Estadounidense",
        "10000000",
        "Un trasto alienígena llegó de sopetón. Pegándosele al brazo sus secretos descubrió. Con sus superpoderes para siempre le cambió. Es Ben 10. Si un día te lo encuentras no te vaya a sorprender. Si se transforma en héroe sin cómo ni porque. Es loco, fiero, ágil o brillante de una vez. Es Ben 10. Llega al rescate sin preguntar. Contra los males de aquí o de allá. No tiene miedo y disfrutará. Aunque es un revoltoso te vendrá a salvar. Es Ben 10"
    );

    res.render('formulario', {
        title: "Ficha de " + ben.name,
        player: ben,
        cancel: "/"
    });
});

export default router;

function showError(res, error) {
    res.render('mensajes', {
        title: "Error",
        message: error.message,
        back: "javascript:history.back()"
    });
}