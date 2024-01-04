import express from 'express';
import session from 'express-session';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { __dirname } from './dirname.js';
import playerRouter from './playerRouter.js';
import { loadDefaultPlayers } from './playerService.js';

const app = express();

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', mustacheExpress(), "html");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public'));

app.use(session({
     secret: 'your secret key',
     resave: false,
     saveUninitialized: true,
}));

app.use('/', playerRouter);

app.listen(3000, () => console.log('Listening on port 3000!'));

loadDefaultPlayers();