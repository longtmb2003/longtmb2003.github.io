// @ts-check

class SpiritSwordCursorComponent {
  /** @param {HTMLElement} element */
  constructor(element) {
    this.element = element;
    this.interactiveSelector = 'a, button, summary, [role="button"]';
  }

  mount() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.documentElement.classList.add('cursor-ready');
    addEventListener('pointermove', event => this.onMove(event), { passive:true });
    addEventListener('pointerover', event => this.onHover(event), { passive:true });
    addEventListener('pointerdown', () => this.onPress(), { passive:true });
    addEventListener('pointerup', () => this.element.classList.remove('pressed'), { passive:true });
    addEventListener('realm:progress', event => this.onRealmProgress(event), { passive:true });
    document.addEventListener('mouseleave', () => this.element.classList.remove('visible'));
  }

  /** @param {PointerEvent} event */
  onMove(event) {
    this.element.style.setProperty('--cursor-x', `${event.clientX}px`);
    this.element.style.setProperty('--cursor-y', `${event.clientY}px`);
    this.element.classList.add('visible');
  }

  /** @param {PointerEvent} event */
  onHover(event) {
    const target = event.target instanceof Element ? event.target : null;
    this.element.classList.toggle('interactive', !!target?.closest(this.interactiveSelector));
    this.element.classList.toggle('realm-target', !!target?.closest('.realm-node'));
  }

  onPress() {
    this.element.classList.add('pressed', 'striking');
    setTimeout(() => this.element.classList.remove('striking'), 330);
  }

  /** @param {Event} event */
  onRealmProgress(event) {
    const percent = event instanceof CustomEvent ? Number(event.detail?.percent ?? 0) : 0;
    this.element.classList.remove('stage-foundation', 'stage-golden', 'stage-nascent');
    if (percent >= 72) this.element.classList.add('stage-nascent');
    else if (percent >= 42) this.element.classList.add('stage-golden');
    else if (percent >= 18) this.element.classList.add('stage-foundation');
  }
}

const sword = document.querySelector('.spirit-sword-cursor');
if (sword instanceof HTMLElement) new SpiritSwordCursorComponent(sword).mount();
