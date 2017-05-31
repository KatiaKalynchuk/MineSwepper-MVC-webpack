'use strict';

import './app.css';
import './style.css';
import GameModel from './model/model.js';
import GameView from './views/view.js';
import ConsoleView from './views/consoleView.js'

import GameController from './controllers/controller.js';


let View = new GameView();


let game = new ConsoleView(View);
window.game = game;



View.init();
