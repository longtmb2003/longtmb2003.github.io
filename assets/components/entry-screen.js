// @ts-check

class EntryScreenComponent {
  /** @param {{screen: HTMLElement, playButton: HTMLButtonElement}} elements */
  constructor({ screen, playButton }) {
    this.screen = screen;
    this.playButton = playButton;
    this.started = false;
  }

  mount() {
    const params = new URLSearchParams(location.search);
    if (params.has('realm') || params.has('play')) {
      this.screen.hidden = true;
      this.unlockWorld();
      return;
    }

    this.playButton.addEventListener('click', () => this.play(), { once:true });
  }

  play() {
    this.playButton.disabled = true;
    this.screen.classList.add('opening');
    this.screen.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
      this.unlockWorld();
      this.screen.classList.add('leaving');
    }, 440);
    setTimeout(() => { this.screen.hidden = true; }, 1480);
  }

  unlockWorld() {
    if (this.started) return;
    this.started = true;
    document.body.classList.remove('game-locked');
    document.body.classList.add('game-started');
    dispatchEvent(new CustomEvent('adventure:start'));
  }
}

const screen = document.getElementById('startScreen');
const playButton = document.getElementById('playAdventure');
if (screen instanceof HTMLElement && playButton instanceof HTMLButtonElement) {
  new EntryScreenComponent({ screen, playButton }).mount();
}
