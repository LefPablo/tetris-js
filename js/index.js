import Game from './game.js';
import View from './view.js';
import Controller from './controller.js';
import Sound from './sound.js';

window.onload = function () {
	const root = document.querySelector('#root');

	const sound = new Sound;
	const game = new Game();
	const view = new View(root, 480, 640, 20, 10);
	const controller = new Controller(game, view, sound);

	window.game = game;
	window.view = view;
	window.controller = controller;
}
