export default class Sound {
	constructor () {
		this.down = new Audio();	// Создаём новый элемент Audio
		this.level = new Audio();
		this.lock = new Audio();
		this.line = new Audio();
		this.music = new Audio();
		this.sound = new Audio();

		this.music.src = '../sound/sound.mp3';// Указываем путь к звуку "клика"
		this.music.loop = true;
		this.music.autoplay = true;
	}
	
	playSound(name) {
		switch (name) {
			case 'down': 
				this.sound.src = '../sound/down.mp3'; // Автоматически запускаем
				this.sound.autoplay = true;
			break;
			case 'level':
				this.level.src = '../sound/level.mp3';
				this.level.autoplay = true;
			break;
			case 'line':
				this.line.src = '../sound/line.mp3';
				this.line.autoplay = true;
			break;
			case 'lock':
				this.lock.src = '../sound/lock.mp3';
				this.lock.autoplay = true;
			break;
			case 'gameOver':
				this.sound.src = '../sound/gameOver.mp3';
				this.sound.autoplay = true;
			break;
			case 'pause':
				this.sound.src = '../sound/pause.mp3';
				this.sound.autoplay = true;
			break;
			case 'play':
				this.sound.src = '../sound/play.mp3';
				this.sound.autoplay = true;
			break;
		}
	}
}