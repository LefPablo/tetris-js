export default class View {
	static colors = {
		'1': 'cyan',
		'2': 'blue',
		'3': 'orange',
		'4': 'yellow',
		'5': 'green',
		'6': 'purple',
		'7': 'red'
	};

	constructor(element, width, height, rows, columns) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.busy = false;

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');

		this.playfieldBorderWidth = 4;
		this.playfieldX = this.playfieldBorderWidth;
		this.playfieldY = this.playfieldBorderWidth;
		this.playfieldWidth = this.width * 2 / 3;
		this.playfieldHeight = this.height;
		this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
		this.playfieldHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

		this.blockWidth = this.playfieldInnerWidth / columns;
		this.blockHeight = this.playfieldHeight / rows;

		this.pannelX = this.playfieldWidth + 10;
		this.pannelY = 0;
		this.pannelWidth = this.width / 3;
		this.panelHeight = this.height;

		this.element.appendChild(this.canvas);
	}

	renderMainScreen(state) {
		this.busy = false; 
		this.clearScreen();
		this.renderPlayfield(state);
		this.renderPanel(state);
	}

	renderStartScreen() {
		this.busy = true; 
		this.context.fillStyle = 'white';
		this.context.font = '18px "Press Start 2P"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'meddle';
		this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);
	}

	renderPauseScreen() {
		this.busy = true; 
		this.context.fillStyle = 'rgba(0,0,0,0.75)';
		this.context.fillRect(0, 0, this.width, this.height);

		this.context.fillStyle = 'white';
		this.context.font = '18px "Press Start 2P"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'meddle';
		this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2);
	}

	renderGameOverScreen({score}) {
		this.busy = true; 
		this. clearScreen();

		this.context.fillStyle = 'rgba(0,0,0,0.75)';
		this.context.fillRect(0, 0, this.width, this.height);

		this.context.fillStyle = 'white';
		this.context.font = '18px "Press Start 2P"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'meddle';
		this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
		this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
		this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + 48);
	}

	clearScreen() {
		this.context.clearRect(0, 0, this.width, this.height);
	}

	renderPlayfield({playfield}) {
		for (let y = 0; y < playfield.length; y++) {
			const line = playfield[y];

			for (let x = 0; x < line.length; x++) {
				const block = line[x];

				if(block) {
					this.renderBlock(
						this.playfieldX + this.playfieldBorderWidth + (x * this.blockWidth), 
						this.playfieldY + (y * this.blockHeight), 
						this.blockWidth, 
						this.blockHeight, 
						View.colors[block]);
				}
			}
		}

		this.context.strokeStyle = 'white';
		this.context.lineWidth = this.playfieldBorderWidth;
		this.context.strokeRect(4, 4, this.playfieldWidth, this.playfieldHeight);
	}

	renderPanel ({ level, score, lines, nextPiece}) {
		this.context.textAlign = 'start';
		this.context.textBaseline = 'top';
		this.context.fillStyle = 'white';
		this.context.font = '14px "Press Start 2P"';
		this.context.fillText(`Score: ${score}`, this.pannelX, this.pannelY + 0);
		this.context.fillText(`Lines: ${lines}`, this.pannelX, this.pannelY + 24);
		this.context.fillText(`Level: ${level}`, this.pannelX, this.pannelY + 48);
		this.context.fillText(`Next: `, this.pannelX, this.pannelY + 96);

		for(let y = 0; y < nextPiece.blocks.length; y++) {
			for ( let x = 0; x < nextPiece.blocks[y].length; x++) {
				const block = nextPiece.blocks[y][x];

				if (block) {
					this.renderBlock(
						this.pannelX + (x * this.blockWidth * 0.5),
						this.pannelY + 100 + (y * this.blockHeight * 0.5),
						this.blockWidth * 0.5,
						this.blockHeight * 0.5,
						View.colors[block]
						);
				}
			}
		}
	}

	renderBlock(x, y, width, height, color) {
		this.context.fillStyle = color;
		this.context.strokeStyle = 'black';
		this.context.lineWidth = 2;

		this.context.fillRect(x, y ,width, height);
		this.context.strokeRect(x, y, width, height);
	}
}	
