// @ts-check

class RealmHudComponent {
  /** @param {{status:HTMLElement|null, compass:HTMLElement|null}} elements */
  constructor({ status, compass }) {
    this.status = status;
    this.compass = compass;
    this.track = status?.querySelector('.realm-status-track i') ?? null;
    this.rank = status?.querySelector('strong') ?? null;
    this.activity = status?.querySelector('p') ?? null;
    this.sections = {
      realm:'Realm Map', projects:'Forge Summit', experience:'Journey Ridge',
      skills:'Scripture Peak', contact:'Ascension Gate'
    };
  }

  mount() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) this.setLocation(this.sections[entry.target.id] ?? 'Cultivation Realm');
      });
    }, { rootMargin:'-38% 0px -56% 0px' });
    Object.keys(this.sections).forEach(id => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    addEventListener('realm:progress', event => this.setProgress(event), { passive:true });
  }

  /** @param {string} label */
  setLocation(label) {
    if (this.compass) this.compass.textContent = label;
    if (this.activity) this.activity.textContent = `Currently exploring · ${label}`;
  }

  /** @param {Event} event */
  setProgress(event) {
    const percent = event instanceof CustomEvent ? Number(event.detail?.percent ?? 0) : 0;
    if (this.track instanceof HTMLElement) this.track.style.width = `${Math.max(8, percent)}%`;
    const rank = percent >= 100
      ? 'Realm Mastered · V'
      : percent >= 72
        ? 'Nascent Soul · IV'
        : percent >= 42
          ? 'Golden Core · III'
          : percent >= 18
            ? 'Foundation · II'
            : 'Qi Gathering · I';
    if (this.rank) this.rank.textContent = rank;
  }
}

new RealmHudComponent({
  status:document.getElementById('realmStatus'),
  compass:document.getElementById('compassLabel')
}).mount();
