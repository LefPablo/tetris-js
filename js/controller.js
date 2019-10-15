export default class Controller {
	constructor (game, view, sound) {
		this.game = game;
		this.view = view;
		this.isPlaying = false;
		this.intervalId = null;
		this.sound = sound;
		this.level = game.getState().level;
		this.lines = game.getState().lines;
		this.pieces = game.getState().pieces;

		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		document.addEventListener('keyup', this.handleKeyUp.bind(this));
		this.view.renderStartScreen();
		this.sound.playSound('music');
	}

	updateView () {
		const state = game.getState();

		if (state.isGameOver) {
			this.isPlaying = false;
			this.stopTimer();
			this.view.renderGameOverScreen(state);
		} else if (this.isPlaying){
			this.view.renderMainScreen(state);
		} else if (!view.busy) {
			this.view.renderPauseScreen();
		}
		this.soundPlay(state);
	}	

	soundPlay(state) {
		if (state.isGameOver) {
			this.sound.playSound('gameOver');
		} else {
			if (state.level != this.level) {
				this.sound.playSound('level');
				this.level = state.level;
			} else {
				if (state.lines != this.lines) {
					this.sound.playSound('line');
					this.lines = state.lines;
				}
				if (state.pieces != this.pieces) {
					this.sound.playSound('lock');
					this.pieces = state.pieces;
				}
			}
		}
	}

	update() {
		this.game.movePieceDown();
		this.updateView();
		this.sound.playSound('down');
	}

	play () {
		this.isPlaying = true;	
		this.startTimer();
		this.updateView();
		this.sound.playSound('play');
	}

	pause () {
		this.isPlaying = false;
		this.stopTimer();
		this.updateView();
		this.sound.playSound('pause');
	}

	reset () {
		this.game.reset();
		this.play();
	}

	startTimer () {
		const speed = 1000 - this.game.getState().level  * 100;

		if (!this.intervalId) {
			this.intervalId = setInterval(() => {
				this.update();
			}, speed > 0 ? speed : 100);
		}
	}

	stopTimer () {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	handleKeyDown(event) {
		const state = this.game.getState();

		switch (event.keyCode) {
			case 13:
				if (state.isGameOver) {
					this.reset();
				} else if (this.isPlaying) {
					this.pause();
				} else {
					this.play();
				}
			break;
		}
		if (this.isPlaying) {
			switch (event.keyCode) {
				case 37:
					this.game.movePieceLeft();
					this.updateView();
				break;
				case 38:
					this.game.rotatePiece();
					this.updateView();
				break;
				case 39:
					this.game.movePieceRight();
					this.updateView();
				break;
				case 40:
					this.stopTimer();
					this.game.movePieceDown();
					this.updateView();
				break;
			}
		}
	}

	handleKeyUp(event) {
		if (this.isPlaying) {
			switch (event.keyCode) {
				case 40:
					this.startTimer();
				break;
			}
		}
	}
}