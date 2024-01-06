import express from 'express';
import * as playerService from './playerService.js';
import { Player, Subelement } from './player.js';
import { noAccents, formatInfo } from './auxFunctions.js';
import { getPlayers } from './playerService.js';

const router = express.Router();

router.get('/', (req, res) => {
    const players= getPlayers(0,5); 
    res.render('plantilla', {
       players: players  
      });
});

router.get('/players', (req, res) => {

    const from = parseInt(req.query.from) ;

    const to = parseInt(req.query.to) ;

    const players= getPlayers(from,to);

    res.render('players', {
        players: players});
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
        res.redirect('/formulario/inscrito');
    }
    catch (error) {
        showError(res, error);
    }
});

router.get('/formulario/inscrito', (req, res) => {
    res.render('mensajes', {
        title: "Ficha creada",
        message: "Jugador añadido correctamente",
        back: "/"
    });
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

        req.session.playerName = player.name;
        res.redirect('/ficha/borrada');
    }
    catch (error) {
        showError(res, error);
    }
});

router.get('/ficha/borrada', (req, res) => {
    res.render('mensajes', {
        title: "Ficha eliminada",
        message: noAccents("Ficha de " + req.session.playerName + " eliminada definitivamente"),
        back: "/"
    });
});

router.get('/ficha/formulario', (req, res) => {
    let id = parseInt(req.query.id)
    let player = playerService.getPlayer(id);

    res.render('formulario', {
        title: noAccents("Ficha de " + player.name),
        edit: true,
        player: player,
        cancel: "/ficha?id=" + id
    });
});

router.post('/ficha/editar', (req, res) => {
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

        req.session.playerName = player.name;
        req.session.playerId = player.id;
        res.redirect('/ficha/editada');
    }
    catch (error) {
        showError(res, error);
    }
});

router.get('/ficha/editada', (req, res) => {
    res.render('mensajes', {
        title: "Ficha editada",
        message: noAccents("Ficha de " + req.session.playerName + " editada correctamente"),
        back: "/ficha?id=" + req.session.playerId
    });
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

        req.session.playerId = player.id;
        res.redirect('/ficha/agregado');
    }
    catch (error) {
        showError(res, error);
    }
});

router.get("/ficha/agregado", (req, res) => {
    res.render('mensajes', {
        title: "Subelemento añadido",
        message: "Subelemento añadido correctamente",
        back: "/ficha?id=" + req.session.playerId
    });
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