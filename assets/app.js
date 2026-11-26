/* Long Tran — Full-Stack Developer (Java · React) Portfolio Engine
   Zero-framework vanilla JS · Progressive enhancement · Reduced-motion & 120Hz safe */
(() => {
  'use strict';

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isReducedMotion = () => reducedMotionQuery.matches;

  // =========================================================================
  // 1. OPT-IN SINGLETON WEB AUDIO SFX ENGINE (DEFAULT OFF · ZERO NODE LEAKS)
  // =========================================================================
  const SFX = (() => {
    let enabled = false;
    let ctx = null;
    const toggleBtn = document.getElementById('sfxToggleBtn');
    const stateLabel = document.getElementById('sfxStateText');

    function ensureCtx() {
      if (ctx) {
        if (ctx.state === 'suspended') ctx.resume().catch(() => {});
        return ctx;
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
      return ctx;
    }

    function tone(freq, duration = 0.055, gainPeak = 0.045, type = 'triangle', delay = 0) {
      if (!enabled) return;
      const c = ensureCtx();
      if (!c) return;
      try {
        const start = c.currentTime + delay;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(gainPeak, start + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(start);
        osc.stop(start + duration + 0.01);
        osc.onended = () => {
          osc.disconnect();
          gain.disconnect();
        };
      } catch (_) {}
    }

    function updateUi() {
      if (!toggleBtn) return;
      toggleBtn.setAttribute('aria-pressed', String(enabled));
      if (stateLabel) stateLabel.textContent = enabled ? 'ON' : 'OFF';
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        enabled = !enabled;
        updateUi();
        if (enabled) {
          ensureCtx();
          tone(660, 0.045, 0.04, 'triangle', 0);
          tone(990, 0.06, 0.04, 'triangle', 0.05);
        }
      });
    }

    return {
      tick: () => tone(520, 0.032, 0.03, 'triangle'),
      select: () => tone(740, 0.045, 0.035, 'triangle'),
      block: () => tone(240, 0.065, 0.04, 'sawtooth'),
      chime: () => {
        tone(784, 0.05, 0.035, 'triangle', 0);
        tone(1174, 0.075, 0.035, 'triangle', 0.06);
      },
      raceDone: () => {
        tone(587, 0.05, 0.035, 'triangle', 0);
        tone(880, 0.06, 0.035, 'triangle', 0.055);
        tone(1174, 0.09, 0.04, 'triangle', 0.11);
      }
    };
  })();

  // =========================================================================
  // 2. TOAST NOTIFICATION UTILITY (SAFE textContent · DEBOUNCED)
  // =========================================================================
  let toastTimer = 0;
  function showToast(msg) {
    let toast = document.getElementById('certToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'certToast';
      toast.className = 'cert-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      const icon = document.createElement('span');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '✓';
      const text = document.createElement('span');
      text.className = 'cert-toast-text';
      toast.append(icon, ' ', text);
      document.body.appendChild(toast);
    }
    const textEl = toast.querySelector('.cert-toast-text');
    if (textEl) textEl.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
  }

  // =========================================================================
  // 3. SAIGON REAL-TIME CLOCK (GMT+7)
  // =========================================================================
  (() => {
    const el = document.getElementById('saigonClock');
    if (!el) return;
    let formatter = null;
    try {
      formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    } catch (_) {}

    function updateSaigonClock() {
      const now = new Date();
      if (formatter) {
        el.textContent = formatter.format(now);
      } else {
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const saigonDate = new Date(utc + 3600000 * 7);
        el.textContent = saigonDate.toTimeString().split(' ')[0];
      }
    }
    updateSaigonClock();
    setInterval(updateSaigonClock, 1000);
  })();

  // =========================================================================
  // 4. INTERACTIVE HEAD & POLAROID MEMORY CARD (FIXED DRAG RESET)
  // =========================================================================
  const MEMORIES = [
    {
      id: 'java',
      tag: 'Daily craft',
      title: 'Java & Spring Boot ☕',
      text: 'Modern Java (17/21) with Spring Boot 3 is my primary weapon. Domain modelling, transaction management, zero-allocation persistence and clean contract enforcement across distributed enterprise services.',
      chips: ['Java 21', 'Spring Boot 3', 'Hibernate', 'MapStruct', 'OpenFeign'],
      visual: `<div class="mat mat-term"><div class="mat-bar"><i></i><i></i><i></i><span>EventConsumerService.java</span></div><pre><span class="k">@KafkaListener</span>(topics = <span class="s">"telemetry.<i class="rx"></i>"</span>,
               groupId = <span class="s">"downstream-workers"</span>)
<span class="k">public void</span> onEvent(TelemetryEvent event) {
    eventDispatcher.dispatch(event);
}</pre><span class="mat-cap">simplified · sanitized</span></div>`
    },
    {
      id: 'kafka',
      tag: 'Event pipelines',
      title: 'Kafka & gRPC Pipelines 📨',
      text: 'Decoupling distributed architectures with high-throughput streams. I designed gRPC-to-Kafka ingestion pipelines so core operations, support services and downstream subscribers process identical event streams independently.',
      chips: ['Apache Kafka', 'gRPC', 'Protobuf', 'Consumer Groups'],
      visual: `<div class="mat mat-term"><div class="mat-bar"><i></i><i></i><i></i><span>terminal</span></div><pre><span class="c">$</span> kafka-consumer-groups --list
support-service
downstream-workers
audit-event-log
<span class="c"># 3 groups · 1 decoupled event stream</span></pre><span class="mat-cap">illustrative · sanitized</span></div>`
    },
    {
      id: 'oracle',
      tag: 'Performance',
      title: 'Oracle Tuning (~300× Faster) ⚡',
      text: 'A critical organisation screen used to make everyone wait about two minutes. I followed the execution plan to one filter that looked harmless, changed it to use the indexed organisation ID, and watched the same screen return in ~0.4s. That moment made performance work feel less like magic and more like patient investigation.',
      chips: ['Oracle DB', 'Execution Plans', 'Query Tuning', '~300× Boost'],
      visual: `<div class="mat mat-term"><div class="mat-bar"><i></i><i></i><i></i><span>execution plan</span></div><pre><span class="c">-- before · ~120s</span>
| 2 |  <span class="k">TABLE ACCESS FULL</span> | <i class="rx"></i> |
|   |  filter: ORG_CODE = <span class="s">'<i class="rx"></i>'</span>
<span class="c">-- after · ~0.4s</span>
| 2 |  <span class="s">INDEX RANGE SCAN</span>  | <i class="rx"></i>_ORG_ID |</pre><span class="mat-cap">reconstructed · names redacted</span></div>`
    },
    {
      id: 'security',
      tag: 'Auth & access',
      title: 'AES-GCM & Access Policies 🔐',
      text: 'Guarding the gates is the most critical backend duty. Built OTP login with AES-GCM encryption at rest in MongoDB, lockout and resend quotas, plus dynamic role-based access control and session timeouts enforced over gRPC.',
      chips: ['AES-GCM', 'Spring Security', 'JWT', 'RBAC Scoping'],
      visual: `<div class="mat mat-term"><div class="mat-bar"><i></i><i></i><i></i><span>OtpCipher.java</span></div><pre>Cipher c = Cipher.getInstance(<span class="s">"AES/GCM/NoPadding"</span>);
c.init(ENCRYPT_MODE, key,
       <span class="k">new</span> GCMParameterSpec(128, iv));
<span class="k">byte</span>[] sealed = c.doFinal(code);
<span class="c">// stored with expiry + attempt counter</span></pre><span class="mat-cap">simplified</span></div>`
    },
    {
      id: 'aws',
      tag: 'Just started · 2026',
      title: 'AWS Solutions Architect ☁️',
      text: 'Actively preparing for the AWS Certified Solutions Architect – Associate (SAA-C03). Bridging software and cloud infra: resilient multi-AZ VPC topologies, Kubernetes orchestration, Docker pipelines, and cost-effective scalability.',
      chips: ['AWS SAA-C03', 'Kubernetes', 'Docker', 'Multi-AZ'],
      visual: `<div class="mat mat-paper"><div class="mat-note">SAA-C03 · just started<br>☐ IAM &amp; accounts<br>☐ VPC, subnets, NAT<br>☐ S3 · RDS · DynamoDB<br>☐ HA &amp; disaster recovery</div><span class="mat-cap">my study list</span></div>`
    },
    {
      id: 'gaming',
      tag: 'Competitive gaming',
      title: 'LoL, Valorant & CS:GO 🎮',
      text: 'Some of my favourite gaming moments start when a round looks lost and the team needs one clear call. Valorant, CS:GO and League taught me to stay calm, share only the useful information and commit to a decision together — habits that follow me into incident debugging too.',
      chips: ['Valorant', 'CS:GO', 'League of Legends', 'Teamplay', 'Clutch'],
      visual: `<div class="mat mat-paper"><div class="mat-note">Clutch rules:<br>1. stay calm<br>2. one clear call<br>3. commit together</div><svg class="mat-doodle" viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="20"/><path d="M30 4v16M30 40v16M4 30h16M40 30h16"/></svg><span class="mat-cap">notebook</span></div>`
    },
    {
      id: 'sql',
      tag: 'HackerRank · Jul 2026',
      title: 'SQL (Advanced) Certified 🏅',
      text: 'Earned the HackerRank SQL (Advanced) certificate in July 2026. The exercises sharpened joins, window functions and query design — the same fundamentals I use when reading and reshaping production queries.',
      chips: ['HackerRank Certified', 'Window Functions', 'Query Design'],
      visual: `<div class="mat mat-paper"><div class="mat-ticket"><span class="mat-kicker">Certificate · HackerRank</span><strong>SQL (Advanced)</strong><span>Long Tran</span><span>Issued Jul 5, 2026</span><a href="https://www.hackerrank.com/certificates/801c9ad5b55e" target="_blank" rel="noopener noreferrer" class="mat-stamp" style="text-decoration:none;cursor:pointer;">✓ Certified ↗</a></div></div>`
    },
    {
      id: 'scholarship',
      tag: 'HCMC Open University · Jan 2025',
      title: 'Academic Excellence Scholarship 🎓',
      text: 'Awarded the Academic Excellence Scholarship in January 2025 while finishing my B.Eng in Information Technology (Graduated Sep 2025 with "Good" honors). Four years of computer science fundamentals, data structures and algorithms.',
      chips: ['B.Eng in IT', 'Scholarship Awardee', '2021 — 2025'],
      visual: `<div class="mat mat-paper"><div class="mat-ticket"><span class="mat-kicker">HCMC Open University</span><strong>Academic Excellence Scholarship</strong><span>B.Eng Information Technology</span><span>January 2025</span><span class="mat-stamp">✓ Awarded</span></div></div>`
    },
    {
      id: 'marketing',
      tag: 'New path · 2026',
      title: 'Digital Marketing & Growth 📈',
      text: 'I started learning marketing because reliable software is only useful when people understand and adopt it. SEO, analytics and conversion journeys give me a new lens on backend decisions: not only whether a system works, but whether it helps the product reach the right outcome.',
      chips: ['Funnel Analytics', 'SEO Telemetry', 'Growth Strategy'],
      visual: `<div class="mat mat-paper"><div class="mat-note">Why should anyone care?<br>visit → read → try → stay</div><svg class="mat-doodle" viewBox="0 0 60 60" aria-hidden="true"><path d="M6 8h48L36 32v18l-12 6V32Z"/></svg><span class="mat-cap">notebook</span></div>`
    },
    {
      id: 'csharp',
      tag: 'IO STREAM · 2023',
      title: 'Where It Began: C# & WinUI 🪟',
      text: 'My professional engineering foundation began at IO STREAM crafting native Windows applications with C# and modern WinUI: file security utilities, encryption and multi-threaded media downloaders. Instilled my obsession with low-level execution speed.',
      chips: ['C# / .NET', 'WinUI 3', 'File Security', 'Desktop'],
      visual: `<div class="mat mat-term"><div class="mat-bar"><i></i><i></i><i></i><span>MainWindow.xaml.cs</span></div><pre><span class="c">// IO STREAM · 2023 · WinUI 3</span>
<span class="k">private async void</span> Download_Click(
    <span class="k">object</span> sender, RoutedEventArgs e)
{
    <span class="k">await</span> downloader.StartAsync(url, progress);
}</pre><span class="mat-cap">simplified</span></div>`
    }
  ];

  (() => {
    const stage = document.getElementById('stage');
    const headBtn = document.getElementById('headBtn');
    const heroLeft = document.getElementById('heroLeft');
    const polaroidCard = document.getElementById('polaroidCard');
    const pCloseBtn = document.getElementById('pCloseBtn');
    const pPrevBtn = document.getElementById('pPrevBtn');
    const pNextBtn = document.getElementById('pNextBtn');
    const pMemoryIndex = document.getElementById('pMemoryIndex');
    const pVisual = document.getElementById('pVisual');
    const pTag = document.getElementById('pTag');
    const pTitle = document.getElementById('pTitle');
    const pText = document.getElementById('pText');
    const pChips = document.getElementById('pChips');
    const memoryItems = document.querySelectorAll('.item');
    const headHint = document.getElementById('headHint');

    if (!stage || !headBtn || !polaroidCard) return;

    let activeIndex = -1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let origX = 0;
    let origY = 0;

    memoryItems.forEach(btn => { btn.tabIndex = -1; });

    function toggleStage(open) {
      const shouldOpen = open !== undefined ? open : !stage.classList.contains('open');
      stage.classList.toggle('open', shouldOpen);
      headBtn.setAttribute('aria-expanded', String(shouldOpen));
      memoryItems.forEach(btn => { btn.tabIndex = shouldOpen ? 0 : -1; });
      if (headHint) headHint.textContent = shouldOpen ? 'Choose a memory ↑' : 'Click my head to open it';
      SFX.tick();
      if (!shouldOpen) closeMemory(false);
    }

    function renderMemory(index) {
      if (index < 0 || index >= MEMORIES.length) return;
      activeIndex = index;
      const mem = MEMORIES[index];

      memoryItems.forEach(btn => btn.classList.toggle('selected', Number(btn.dataset.idx) === index));
      stage.classList.add('has-selection');

      pMemoryIndex.textContent = `${String(index + 1).padStart(2, '0')}/${String(MEMORIES.length).padStart(2, '0')}`;
      pTag.textContent = mem.tag;
      pTitle.textContent = mem.title;
      pText.textContent = mem.text;
      pVisual.innerHTML = mem.photo ? `<img src="${mem.photo}" alt="">` : mem.visual;
      pChips.innerHTML = mem.chips.map(c => `<span class="polaroid-chip">${c}</span>`).join('');

      if (!stage.classList.contains('open')) toggleStage(true);
      heroLeft.classList.add('has-active-card');
      polaroidCard.classList.add('active');
      SFX.select();
      pCloseBtn.focus({ preventScroll: true });
    }

    function closeMemory(restoreFocus = true) {
      const previousIndex = activeIndex;
      activeIndex = -1;
      origX = 0;
      origY = 0;
      isDragging = false;
      memoryItems.forEach(btn => btn.classList.remove('selected'));
      stage.classList.remove('has-selection');
      heroLeft.classList.remove('has-active-card');
      polaroidCard.classList.remove('active');
      polaroidCard.style.transform = '';
      if (restoreFocus && previousIndex >= 0) {
        const prevBtn = document.querySelector(`.item[data-idx="${previousIndex}"]`);
        if (prevBtn) prevBtn.focus({ preventScroll: true });
      }
    }

    headBtn.addEventListener('click', () => toggleStage());

    const speechBubble = document.getElementById('speechBubble');
    if (speechBubble) {
      speechBubble.addEventListener('click', () => toggleStage());
      speechBubble.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleStage();
        }
      });
    }

    memoryItems.forEach(btn => {
      btn.addEventListener('click', () => renderMemory(Number(btn.dataset.idx)));
    });

    pCloseBtn.addEventListener('click', () => { SFX.tick(); closeMemory(); });
    pPrevBtn.addEventListener('click', () => renderMemory((activeIndex - 1 + MEMORIES.length) % MEMORIES.length));
    pNextBtn.addEventListener('click', () => renderMemory((activeIndex + 1) % MEMORIES.length));

    document.addEventListener('keydown', e => {
      if (!polaroidCard.classList.contains('active')) return;
      if (e.key === 'Escape') closeMemory();
      else if (e.key === 'ArrowLeft') renderMemory((activeIndex - 1 + MEMORIES.length) % MEMORIES.length);
      else if (e.key === 'ArrowRight') renderMemory((activeIndex + 1) % MEMORIES.length);
    });

    const handle = polaroidCard.querySelector('.polaroid-drag-handle');
    if (handle) {
      handle.style.cursor = 'grab';
      const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        handle.style.cursor = 'grab';
        polaroidCard.style.transition = 'transform 0.2s ease';
      };

      handle.addEventListener('pointerdown', e => {
        if (e.target.closest('button') || !window.matchMedia('(min-width: 581px) and (pointer: fine)').matches) return;
        isDragging = true;
        handle.style.cursor = 'grabbing';
        try { handle.setPointerCapture(e.pointerId); } catch (_) {}
        startX = e.clientX - origX;
        startY = e.clientY - origY;
        polaroidCard.style.transition = 'none';
      });

      handle.addEventListener('pointermove', e => {
        if (!isDragging) return;
        origX = e.clientX - startX;
        origY = e.clientY - startY;
        polaroidCard.style.transform = `translate(${origX}px, ${origY}px) rotate(-1.5deg)`;
      });

      handle.addEventListener('pointerup', stopDrag);
      handle.addEventListener('pointercancel', stopDrag);
      handle.addEventListener('lostpointercapture', stopDrag);
    }
  })();

  // =========================================================================
  // 5. PROJECT DIAGRAMS INTERACTION & ACCESSIBLE LABELS
  // =========================================================================
  document.querySelectorAll('.proj-media').forEach((media, i) => {
    media.dataset.study = String(i + 1).padStart(2, '0');
    const svg = media.querySelector('svg');
    const titleEl = media.closest('article')?.querySelector('h3');
    if (svg && titleEl) {
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', `${titleEl.textContent.trim()} architecture illustration`);
    }
    const cap = media.querySelector('.dgm-cap');
    if (!cap) return;
    const idle = cap.textContent;
    media.querySelectorAll('.n').forEach(node => {
      const show = () => { cap.textContent = node.dataset.role; };
      const hide = () => { cap.textContent = idle; };
      node.addEventListener('mouseenter', show);
      node.addEventListener('focus', show);
      node.addEventListener('mouseleave', hide);
      node.addEventListener('blur', hide);
    });
  });

  // =========================================================================
  // 6. UNIFIED SCROLL ENGINE: TOP PROGRESS BAR (scaleX) + TELEMETRY HUD
  // =========================================================================
  (() => {
    const topProg = document.getElementById('topProgressBar');
    const toTopBtn = document.getElementById('toTopBtn');
    const elev = document.getElementById('archElevVal');
    const zone = document.getElementById('archZoneVal');
    const scY = document.getElementById('archScrollY');

    if (toTopBtn) {
      toTopBtn.addEventListener('click', () => {
        SFX.tick();
        window.scrollTo({ top: 0, behavior: isReducedMotion() ? 'auto' : 'smooth' });
      });
    }

    // Ordered strictly in DOM order so every zone activates accurately.
    const sections = [
      { id: 'about', label: 'ABOUT' },
      { id: 'work', label: 'WORK' },
      { id: 'lab', label: 'LAB' },
      { id: 'experience', label: 'EXP' },
      { id: 'achievements', label: 'HONORS' },
      { id: 'skills', label: 'SKILLS' },
      { id: 'contact', label: 'CONTACT' }
    ].map(s => ({ ...s, el: document.getElementById(s.id) })).filter(s => s.el);

    let ticking = false;

    function updateOnFrame() {
      ticking = false;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      if (topProg) topProg.style.transform = `scaleX(${ratio})`;
      if (toTopBtn) toTopBtn.classList.toggle('show', scrollY > 420);
      if (elev) elev.textContent = `${String(Math.round(ratio * 100)).padStart(2, '0')}%`;
      if (scY) scY.textContent = `Y:${String(Math.round(scrollY)).padStart(4, '0')}`;

      if (zone && sections.length > 0) {
        const probeY = scrollY + window.innerHeight * 0.35;
        let activeSection = sections[0];
        for (let i = 0; i < sections.length; i++) {
          const top = sections[i].el.getBoundingClientRect().top + scrollY;
          if (probeY >= top - 80) activeSection = sections[i];
        }
        if (zone.textContent !== activeSection.label) {
          zone.textContent = activeSection.label;
        }
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateOnFrame);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateOnFrame();
  })();

  // =========================================================================
  // 6B. INTERACTIVE LAB 3-TAB CONSOLE CONTROLLER (WAI-ARIA + KEYBOARD + RESIZE)
  // =========================================================================
  (() => {
    const tabs = [...document.querySelectorAll('.lab-tab[data-lab-tab]')];
    if (tabs.length === 0) return;

    function activateLabTab(nextTab, moveFocus = false) {
      tabs.forEach(tab => {
        const selected = tab === nextTab;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panelId = tab.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) panel.hidden = !selected;
      });
      if (moveFocus) nextTab.focus();
      SFX.select();
      requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activateLabTab(tab, false));
      tab.addEventListener('keydown', e => {
        let targetIdx = -1;
        if (e.key === 'ArrowRight') targetIdx = (idx + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') targetIdx = (idx - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') targetIdx = 0;
        else if (e.key === 'End') targetIdx = tabs.length - 1;
        if (targetIdx >= 0) {
          e.preventDefault();
          activateLabTab(tabs[targetIdx], true);
        }
      });
    });
  })();

  // =========================================================================
  // 7. LAB 01: ORACLE 120s -> 0.4s EXECUTION PLAN SPLIT-WIPE + SPEED RACE
  // =========================================================================
  (() => {
    const stage = document.getElementById('oracleWipeStage');
    const handle = document.getElementById('oracleWipeHandle');
    const raceBtn = document.getElementById('oracleRaceBtn');
    const fillGood = document.getElementById('raceFillGood');
    const fillBad = document.getElementById('raceFillBad');
    const valGood = document.getElementById('raceValGood');
    const valBad = document.getElementById('raceValBad');

    if (stage && handle) {
      let pct = 50;
      let dragging = false;

      function setWipe(nextPct) {
        pct = Math.min(94, Math.max(6, Math.round(nextPct * 10) / 10));
        stage.style.setProperty('--wipe', `${pct}%`);
        handle.setAttribute('aria-valuenow', String(Math.round(pct)));
      }

      function updateFromClientX(clientX) {
        const rect = stage.getBoundingClientRect();
        if (rect.width <= 0) return;
        setWipe(((clientX - rect.left) / rect.width) * 100);
      }

      const stopDrag = () => { dragging = false; };

      handle.addEventListener('pointerdown', e => {
        e.preventDefault();
        dragging = true;
        try { handle.setPointerCapture(e.pointerId); } catch (_) {}
        updateFromClientX(e.clientX);
        SFX.tick();
      });
      handle.addEventListener('pointermove', e => {
        if (!dragging) return;
        updateFromClientX(e.clientX);
      });
      handle.addEventListener('pointerup', stopDrag);
      handle.addEventListener('pointercancel', stopDrag);
      handle.addEventListener('lostpointercapture', stopDrag);

      stage.addEventListener('pointerdown', e => {
        if (e.target.closest('#oracleWipeHandle')) return;
        updateFromClientX(e.clientX);
        SFX.tick();
      });

      handle.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); setWipe(pct - 5); SFX.tick(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); setWipe(pct + 5); SFX.tick(); }
        else if (e.key === 'Home') { e.preventDefault(); setWipe(6); SFX.tick(); }
        else if (e.key === 'End') { e.preventDefault(); setWipe(94); SFX.tick(); }
      });

      setWipe(50);
    }

    // Speed race simulation: 30x time-lapse so 0.4s finishes almost instantly while 120s takes 4.0s
    if (raceBtn && fillGood && fillBad && valGood && valBad) {
      let raceRaf = 0;
      let running = false;

      raceBtn.addEventListener('click', () => {
        cancelAnimationFrame(raceRaf);
        SFX.select();

        if (isReducedMotion()) {
          fillGood.style.transform = 'scaleX(1)';
          fillBad.style.transform = 'scaleX(1)';
          valGood.textContent = '0.4s ✓';
          valBad.textContent = '120.0s';
          return;
        }

        running = true;
        raceBtn.textContent = '⟳ Running 30× Time-Lapse…';
        const totalSimSec = 120;
        const speedFactor = 30; // 120s simulated over 4.0 real seconds
        let simElapsed = 0;
        let goodNotified = false;
        let lastTs = performance.now();

        function step(now) {
          const dt = Math.min((now - lastTs) / 1000, 0.05);
          lastTs = now;
          simElapsed = Math.min(totalSimSec, simElapsed + dt * speedFactor);

          const goodProgress = Math.min(1, simElapsed / 0.4);
          const badProgress = Math.min(1, simElapsed / totalSimSec);

          fillGood.style.transform = `scaleX(${goodProgress})`;
          fillBad.style.transform = `scaleX(${badProgress})`;
          valGood.textContent = goodProgress >= 1 ? '0.4s ✓' : `${Math.min(0.4, simElapsed).toFixed(1)}s`;
          valBad.textContent = `${simElapsed.toFixed(1)}s`;

          if (goodProgress >= 1 && !goodNotified) {
            goodNotified = true;
            SFX.raceDone();
          }

          if (simElapsed < totalSimSec && running) {
            raceRaf = requestAnimationFrame(step);
          } else {
            running = false;
            raceBtn.textContent = '▶ Replay Query Race';
          }
        }
        raceRaf = requestAnimationFrame(step);
      });
    }
  })();

  // =========================================================================
  // 8. LAB 02: LIVE KAFKA & GRPC PIPELINE SIMULATOR + DEV VIEW (120Hz SAFE)
  // =========================================================================
  (() => {
    const canvas = document.getElementById('kafkaSimCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const tpsInput = document.getElementById('simTpsInput');
    const tpsOut = document.getElementById('simTpsOut');
    const dupBtn = document.getElementById('simDupBtn');
    const lagBtn = document.getElementById('simLagBtn');
    const devBtn = document.getElementById('simDevBtn');

    const mProcessed = document.getElementById('simMetricProcessed');
    const mBlocked = document.getElementById('simMetricBlocked');
    const mLag = document.getElementById('simMetricLag');
    const mP99 = document.getElementById('simMetricP99');

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = false;
    let rafId = 0;
    let lastTs = performance.now();

    let targetTps = Number(tpsInput?.value || 12000);
    let lagInjected = false;
    let devView = false;

    let processedCount = 0;
    let blockedCount = 0;
    let supportLag = 0;
    let spawnCarry = 0;
    let lockTtl = 15.0;
    let clock = 0;

    const p99History = Array.from({ length: 44 }, () => 8.5);
    const packets = [];
    const bursts = [];

    const GROUP_LABELS = ['Core Ops', 'Support', 'Audit Log'];
    const PART_COLORS = ['#4BE397', '#7E8CFF', '#D4A359'];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnPacket(isDup = false) {
      const part = Math.floor(Math.random() * 3);
      packets.push({
        t: 0,
        part,
        group: Math.floor(Math.random() * 3),
        dup: isDup,
        key: `K${part}${Math.floor(10 + Math.random() * 89)}`,
        speed: isDup ? 0.52 : 0.42 + (targetTps / 24000) * 0.34,
        blocked: false
      });
    }

    function addBurst(x, y, color) {
      bursts.push({ x, y, r: 4, maxR: 22, alpha: 0.9, color });
    }

    if (tpsInput) {
      tpsInput.addEventListener('input', () => {
        targetTps = Number(tpsInput.value);
        if (tpsOut) tpsOut.textContent = `${(targetTps / 1000).toFixed(1)}k/s`;
      });
    }

    if (dupBtn) {
      dupBtn.addEventListener('click', () => {
        for (let i = 0; i < 4; i++) spawnPacket(true);
        SFX.block();
      });
    }

    if (lagBtn) {
      lagBtn.addEventListener('click', () => {
        lagInjected = !lagInjected;
        lagBtn.classList.toggle('active', lagInjected);
        lagBtn.setAttribute('aria-pressed', String(lagInjected));
        lagBtn.textContent = lagInjected ? '● Support Lag: ON' : '⚠ Simulate Lag';
        SFX.tick();
      });
    }

    if (devBtn) {
      devBtn.addEventListener('click', () => {
        devView = !devView;
        devBtn.classList.toggle('active', devView);
        devBtn.setAttribute('aria-pressed', String(devView));
        devBtn.textContent = devView ? '● Dev View' : '○ Dev View';
        SFX.select();
      });
    }

    function drawRoundedRect(x, y, w, h, r) {
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, r);
      } else {
        const rr = Math.min(r, w / 2, h / 2);
        ctx.moveTo(x + rr, y);
        ctx.arcTo(x + w, y, x + w, y + h, rr);
        ctx.arcTo(x + w, y + h, x, y + h, rr);
        ctx.arcTo(x, y + h, x, y, rr);
        ctx.arcTo(x, y, x + w, y, rr);
        ctx.closePath();
      }
    }

    function updateAndDraw(now) {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(updateAndDraw);
      if (width < 10) {
        lastTs = now;
        return;
      }

      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      clock += dt;

      // Redis distributed lock TTL countdown
      lockTtl -= dt;
      if (lockTtl <= 0.4) lockTtl = 15.0;

      // Spawn packets proportional to TPS (capped for visual clarity)
      if (!isReducedMotion()) {
        const rate = 2.6 + (targetTps / 24000) * 9.5;
        spawnCarry += dt * rate;
        while (spawnCarry >= 1) {
          spawnPacket(false);
          spawnCarry -= 1;
        }
      }

      // Compute simulated lag & p99
      if (lagInjected) {
        supportLag = Math.min(480, supportLag + dt * (45 + targetTps / 400));
      } else {
        supportLag = Math.max(0, supportLag - dt * 160);
      }

      const p99 = 5.2 + (targetTps / 24000) * 9.4 + (lagInjected ? 3.2 : 0) + Math.sin(clock * 4) * 0.6;
      if (Math.floor(clock * 12) !== Math.floor((clock - dt) * 12)) {
        p99History.push(p99);
        if (p99History.length > 44) p99History.shift();
      }

      // Background blueprint grid
      ctx.fillStyle = '#101210';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(238, 231, 215, 0.045)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < width; gx += 24) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, height); ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += 24) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(width, gy); ctx.stroke();
      }

      // Geometry anchors (responsive to narrow & wide containers)
      const narrow = width < 560;
      const padX = narrow ? 10 : Math.max(18, width * 0.04);
      const prodX = padX;
      const prodW = narrow ? Math.max(66, width * 0.21) : Math.min(126, width * 0.17);
      const brokerX = narrow ? width * 0.32 : width * 0.35;
      const brokerW = narrow ? width * 0.30 : Math.min(200, width * 0.27);
      const shieldX = narrow ? width * 0.69 : width * 0.72;
      const consX = narrow ? width * 0.74 : width * 0.78;
      const consW = narrow ? width - consX - padX : Math.min(148, width * 0.19);
      const lanesY = [height * 0.25, height * 0.5, height * 0.75];

      // Connecting rails
      lanesY.forEach((ly, idx) => {
        ctx.strokeStyle = 'rgba(238, 231, 215, 0.14)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(prodX + prodW, height * 0.5);
        ctx.bezierCurveTo(prodX + prodW + (narrow ? 16 : 34), height * 0.5, brokerX - (narrow ? 16 : 34), ly, brokerX, ly);
        ctx.stroke();

        ctx.strokeStyle = idx === 1 && lagInjected ? 'rgba(228, 71, 44, 0.45)' : 'rgba(238, 231, 215, 0.14)';
        ctx.beginPath();
        ctx.moveTo(brokerX + brokerW, ly);
        ctx.lineTo(consX, ly);
        ctx.stroke();
      });

      // Producer Node (gRPC Ingress)
      drawRoundedRect(prodX, height * 0.34, prodW, height * 0.32, 8);
      ctx.fillStyle = '#1A1D19';
      ctx.fill();
      ctx.strokeStyle = 'rgba(238, 231, 215, 0.28)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#E4472C';
      ctx.font = narrow ? '700 8px "JetBrains Mono", monospace' : '700 9px "JetBrains Mono", monospace';
      ctx.fillText(narrow ? 'gRPC' : 'gRPC INGRESS', prodX + 8, height * 0.34 + 16);
      ctx.fillStyle = '#EEE7D7';
      ctx.font = narrow ? '700 10px "JetBrains Mono", monospace' : '700 12px "JetBrains Mono", monospace';
      ctx.fillText(narrow ? 'Prod' : 'Producer', prodX + 8, height * 0.5 + 3);
      ctx.fillStyle = 'rgba(238, 231, 215, 0.55)';
      ctx.font = narrow ? '500 8px "JetBrains Mono", monospace' : '500 9px "JetBrains Mono", monospace';
      ctx.fillText(`${(targetTps / 1000).toFixed(1)}k/s`, prodX + 8, height * 0.5 + 18);

      // Kafka Broker Box + 3 Partitions
      drawRoundedRect(brokerX, height * 0.11, brokerW, height * 0.78, 10);
      ctx.fillStyle = '#161916';
      ctx.fill();
      ctx.strokeStyle = 'rgba(75, 227, 151, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#4BE397';
      ctx.font = narrow ? '700 8px "JetBrains Mono", monospace' : '700 9.5px "JetBrains Mono", monospace';
      ctx.fillText(narrow ? 'KAFKA · 3P' : 'KAFKA TOPIC · 3 PARTITIONS', brokerX + 8, height * 0.11 + 15);

      lanesY.forEach((ly, i) => {
        drawRoundedRect(brokerX + 8, ly - 13, brokerW - 16, 26, 5);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fill();
        ctx.strokeStyle = PART_COLORS[i];
        ctx.globalAlpha = 0.45;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = PART_COLORS[i];
        ctx.font = '700 9px "JetBrains Mono", monospace';
        ctx.fillText(`P${i}`, brokerX + 14, ly + 3);
      });

      // Idempotency Shield Line
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(75, 227, 151, 0.48)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(shieldX, height * 0.12);
      ctx.lineTo(shieldX, height * 0.88);
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = 'rgba(75, 227, 151, 0.85)';
      ctx.font = narrow ? '700 7.5px "JetBrains Mono", monospace' : '700 8.5px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(narrow ? 'DEDUP' : 'IDEMPOTENT', shieldX, height * 0.09);
      ctx.textAlign = 'left';

      // Consumer Group Boxes
      lanesY.forEach((ly, i) => {
        const isLagged = i === 1 && lagInjected;
        drawRoundedRect(consX, ly - 18, consW, 36, 7);
        ctx.fillStyle = isLagged ? '#261714' : '#1A1D19';
        ctx.fill();
        ctx.strokeStyle = isLagged ? '#FF6B52' : 'rgba(238, 231, 215, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.fillStyle = isLagged ? '#FF8E78' : '#EEE7D7';
        ctx.font = narrow ? '700 9px "JetBrains Mono", monospace' : '700 10.5px "JetBrains Mono", monospace';
        ctx.fillText(narrow ? GROUP_LABELS[i].split(' ')[0] : GROUP_LABELS[i], consX + 8, ly - 1);

        ctx.fillStyle = isLagged ? '#FF6B52' : '#4BE397';
        ctx.font = narrow ? '600 7.5px "JetBrains Mono", monospace' : '600 8.5px "JetBrains Mono", monospace';
        ctx.fillText(isLagged ? `LAG +${Math.round(supportLag)}` : (narrow ? 'OK · 0 DUP' : 'NOMINAL · 0 DUP'), consX + 8, ly + 12);
      });

      // Animate & draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        const slowFactor = (p.part === 1 && lagInjected && p.t > 0.62) ? 0.28 : 1;
        p.t += dt * p.speed * slowFactor;

        let px = 0;
        let py = lanesY[p.part];

        if (p.t < 0.28) {
          const u = p.t / 0.28;
          const x0 = prodX + prodW;
          const x3 = brokerX;
          px = x0 + (x3 - x0) * u;
          py = height * 0.5 + (lanesY[p.part] - height * 0.5) * (u * u * (3 - 2 * u));
        } else if (p.t < 0.65) {
          const u = (p.t - 0.28) / 0.37;
          px = brokerX + brokerW * u;
        } else {
          const u = (p.t - 0.65) / 0.35;
          px = brokerX + brokerW + (consX - (brokerX + brokerW)) * u;
        }

        // Duplicate packet hits Idempotency Shield and bounces off
        if (p.dup && px >= shieldX - 4) {
          blockedCount += 1;
          addBurst(shieldX, py, '#FF6B52');
          packets.splice(i, 1);
          continue;
        }

        if (p.t >= 1) {
          processedCount += Math.max(1, Math.round(targetTps / 900));
          addBurst(consX + 4, py, PART_COLORS[p.part]);
          packets.splice(i, 1);
          continue;
        }

        // Packet pill
        ctx.fillStyle = p.dup ? '#FF5238' : PART_COLORS[p.part];
        ctx.beginPath();
        ctx.arc(px, py, p.dup ? 4.5 : 3.2, 0, Math.PI * 2);
        ctx.fill();

        if (devView) {
          ctx.fillStyle = p.dup ? '#FF8E78' : 'rgba(238, 231, 215, 0.78)';
          ctx.font = '600 8px "JetBrains Mono", monospace';
          ctx.fillText(p.dup ? 'DUP!' : p.key, px - 9, py - 7);
        }
      }

      // Draw bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.r += dt * 42;
        b.alpha -= dt * 2.2;
        if (b.alpha <= 0) {
          bursts.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = b.color;
        ctx.globalAlpha = Math.max(0, b.alpha);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Dev View Telemetry Overlay (p99 sparkline + Redis Lock TTL)
      if (devView) {
        const boxW = 166;
        const boxH = 66;
        const bx = padX;
        const by = height - boxH - 12;
        drawRoundedRect(bx, by, boxW, boxH, 6);
        ctx.fillStyle = 'rgba(12, 14, 12, 0.88)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(75, 227, 151, 0.45)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#4BE397';
        ctx.font = '700 8.5px "JetBrains Mono", monospace';
        ctx.fillText(`DEV · p99 ${p99.toFixed(1)}ms · LOCK ${lockTtl.toFixed(1)}s`, bx + 8, by + 15);

        ctx.strokeStyle = '#4BE397';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        p99History.forEach((v, idx) => {
          const sx = bx + 8 + (idx / (p99History.length - 1)) * (boxW - 16);
          const sy = by + boxH - 10 - Math.min(1, (v - 4) / 18) * 34;
          if (idx === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        });
        ctx.stroke();
      }

      // Update DOM metrics cleanly
      if (mProcessed) mProcessed.textContent = processedCount.toLocaleString('en-US');
      if (mBlocked) mBlocked.textContent = String(blockedCount);
      if (mLag) {
        mLag.textContent = String(Math.round(supportLag));
        mLag.className = supportLag > 10 ? 'warn' : 'ok';
      }
      if (mP99) mP99.textContent = `${p99.toFixed(1)}ms`;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        lastTs = performance.now();
        if (!rafId) rafId = requestAnimationFrame(updateAndDraw);
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }, { threshold: 0.05 });
    io.observe(canvas);
  })();

  // =========================================================================
  // 9. INTERACTIVE ARCHITECTURE SIGNAL PATCHBAY (#patchbay)
  // =========================================================================
  (() => {
    const svg = document.getElementById('patchbaySvg');
    const routeEl = document.getElementById('pbRoute');
    const titleEl = document.getElementById('pbTitle');
    const textEl = document.getElementById('pbText');
    const impactEl = document.getElementById('pbImpact');
    const pillsWrap = document.getElementById('pbPills');
    if (!svg) return;

    const COLUMNS = [
      { id: 'spring', no: '01', label: 'SPRING & API', color: '#E4472C' },
      { id: 'kafka', no: '02', label: 'KAFKA & gRPC', color: '#4BE397' },
      { id: 'oracle', no: '03', label: 'ORACLE & DATA', color: '#D4A359' },
      { id: 'sec', no: '04', label: 'AUTH & INFRA', color: '#7E8CFF' }
    ];

    const NODES = [
      { col: 0, row: 0, name: 'gRPC Ingestion' },
      { col: 0, row: 1, name: '.NET → Spring' },
      { col: 0, row: 2, name: 'Spring AOP' },
      { col: 1, row: 0, name: 'Kafka 3-Group' },
      { col: 1, row: 1, name: 'Backup Events' },
      { col: 1, row: 2, name: 'AI Telemetry' },
      { col: 2, row: 0, name: 'Execution Plan' },
      { col: 2, row: 1, name: '120+ Flyway' },
      { col: 2, row: 2, name: 'Org-Tree Index' },
      { col: 3, row: 0, name: 'AES-GCM OTP' },
      { col: 3, row: 1, name: 'Redis Lock' },
      { col: 3, row: 2, name: 'RBAC Scoping' }
    ];

    const CABLES = [
      {
        a: 0, b: 3, color: '#4BE397',
        pill: 'gRPC → Kafka',
        title: 'Decoupled Ingestion',
        text: 'Typed Protobuf ingress feeds a single Kafka topic so each downstream group scales on its own offsets.',
        impact: '3 consumer groups · 0 producer changes'
      },
      {
        a: 6, b: 8, color: '#D4A359',
        pill: 'Plan → Index',
        title: 'Execution-Plan Discipline',
        text: 'Reading real Oracle plan costs replaced a full scan with an indexed range lookup — zero hardware added.',
        impact: 'Cost 84,210 → 42 · ~300× faster'
      },
      {
        a: 9, b: 11, color: '#7E8CFF',
        pill: 'OTP → RBAC',
        title: 'Layered Access Control',
        text: 'Encrypted OTP authentication sits cleanly separated from JWT issuance and gRPC row-level data scoping.',
        impact: 'AES-GCM at rest · least-privilege scoping'
      },
      {
        a: 4, b: 10, color: '#E4472C',
        pill: 'Kafka × Redis',
        title: 'Coordinated Snapshots',
        text: 'TTL-bound Redis locks guard Kafka-triggered backup batches across Oracle, Elasticsearch, and MinIO.',
        impact: '3 storage engines · 0 overlapping runs'
      },
      {
        a: 1, b: 7, color: '#F0B86E',
        pill: 'Cutover × Flyway',
        title: 'Safe Live Re-Platforming',
        text: 'Deterministic Flyway versioning kept legacy .NET and new Spring Boot schemas in sync during live cutover.',
        impact: '1M+ records · 120+ versioned migrations'
      },
      {
        a: 2, b: 5, color: '#6CE5A8',
        pill: 'AOP × Edge',
        title: 'Cross-Cutting Telemetry',
        text: 'One Spring AOP lookup layer shields penalty and enquiry services from noisy multi-source edge data.',
        impact: '~2,000 AI cameras · 1 reusable aspect'
      }
    ];

    const NS = 'http://www.w3.org/2000/svg';
    const el = (tag, attrs = {}) => {
      const n = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, String(v)));
      return n;
    };
    const pos = idx => ({ x: 115 + NODES[idx].col * 255, y: 120 + NODES[idx].row * 130 });

    // Render 4 rack columns
    COLUMNS.forEach((col, i) => {
      const g = el('g');
      g.appendChild(el('rect', {
        x: 35 + i * 255, y: 28, width: 160, height: 454, rx: 10,
        fill: '#1D1F1B', stroke: 'rgba(238,231,215,0.12)', 'stroke-width': 1.5
      }));
      const txt = el('text', {
        x: 115 + i * 255, y: 58, 'text-anchor': 'middle', fill: col.color,
        'font-family': 'JetBrains Mono, monospace', 'font-size': 12, 'font-weight': 700
      });
      txt.textContent = `${col.no} · ${col.label}`;
      g.appendChild(txt);
      svg.appendChild(g);
    });

    // Render 12 jacks
    const nodeRings = [];
    const nodeLabels = [];
    NODES.forEach((node, idx) => {
      const p = pos(idx);
      const g = el('g');
      const ring = el('circle', {
        cx: p.x, cy: p.y, r: 17, fill: '#101210', stroke: '#3A3B36', 'stroke-width': 3
      });
      const hole = el('circle', { cx: p.x, cy: p.y, r: 6.5, fill: '#080807' });
      const label = el('text', {
        x: p.x, y: p.y + 38, 'text-anchor': 'middle', fill: '#8D897E',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 11, 'font-weight': 600
      });
      label.textContent = node.name;
      g.append(ring, hole, label);
      svg.appendChild(g);
      nodeRings.push(ring);
      nodeLabels.push(label);
    });

    // Render 6 cables
    const cableEls = [];
    let activeIdx = 0;

    CABLES.forEach((c, idx) => {
      const pa = pos(c.a);
      const pb = pos(c.b);
      const g = el('g', {
        class: 'patchbay-cable',
        tabindex: '0',
        role: 'button',
        'aria-label': `${NODES[c.a].name} to ${NODES[c.b].name}: ${c.title}`
      });
      const hit = el('path', { stroke: 'transparent', 'stroke-width': 26, fill: 'none' });
      const shadow = el('path', {
        stroke: '#000', 'stroke-opacity': 0.5, 'stroke-width': 8, fill: 'none', transform: 'translate(3 6)'
      });
      const main = el('path', {
        class: 'cable-main', stroke: c.color, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none', opacity: 0.55
      });
      const pulse = el('path', {
        stroke: '#FFFFFF', 'stroke-width': 2, 'stroke-dasharray': '5 18', fill: 'none', opacity: 0
      });
      const plugA = el('circle', { cx: pa.x, cy: pa.y, r: 8, fill: c.color });
      const plugB = el('circle', { cx: pb.x, cy: pb.y, r: 8, fill: c.color });

      g.append(hit, shadow, main, pulse, plugA, plugB);
      g.addEventListener('pointerenter', () => selectCable(idx, false));
      g.addEventListener('click', () => selectCable(idx, true));
      g.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCable(idx, true);
        }
      });
      svg.appendChild(g);
      cableEls.push({ g, hit, shadow, main, pulse, pa, pb, c });
    });

    // Quick-select pills for mobile & keyboard users
    const pillButtons = [];
    if (pillsWrap) {
      CABLES.forEach((c, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'patchbay-pill';
        btn.textContent = c.pill;
        btn.setAttribute('aria-pressed', String(idx === 0));
        btn.addEventListener('click', () => selectCable(idx, true));
        pillsWrap.appendChild(btn);
        pillButtons.push(btn);
      });
    }

    function selectCable(idx, withSound) {
      if (idx === activeIdx && !withSound) return;
      activeIdx = idx;
      const item = CABLES[idx];
      if (routeEl) routeEl.textContent = `${NODES[item.a].name} ⟶ ${NODES[item.b].name}`;
      if (titleEl) titleEl.textContent = item.title;
      if (textEl) textEl.textContent = item.text;
      if (impactEl) {
        impactEl.textContent = item.impact;
        impactEl.style.borderLeftColor = item.color;
      }

      nodeRings.forEach((ring, nIdx) => {
        const hot = nIdx === item.a || nIdx === item.b;
        ring.setAttribute('stroke', hot ? COLUMNS[NODES[nIdx].col].color : '#3A3B36');
        nodeLabels[nIdx].setAttribute('fill', hot ? '#EEE7D7' : '#8D897E');
      });

      cableEls.forEach((ce, cIdx) => {
        const hot = cIdx === idx;
        ce.main.setAttribute('stroke-width', hot ? '8.5' : '5.5');
        ce.main.setAttribute('opacity', hot ? '1' : '0.48');
        ce.shadow.setAttribute('stroke-width', hot ? '10' : '7');
        ce.pulse.setAttribute('opacity', hot ? '0.95' : '0');
        ce.g.setAttribute('aria-pressed', String(hot));
      });

      pillButtons.forEach((btn, pIdx) => {
        btn.setAttribute('aria-pressed', String(pIdx === idx));
      });

      if (withSound) SFX.select();
    }

    // Direct SVG path physics loop (zero React re-renders, pauses off-screen & reduced-motion)
    const pointer = { x: 500, y: 260, active: false };
    svg.addEventListener('pointermove', e => {
      const rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = ((e.clientX - rect.left) / rect.width) * 1000;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 510;
      pointer.active = true;
    });
    svg.addEventListener('pointerleave', () => { pointer.active = false; });

    let visible = false;
    let cableRaf = 0;
    let t = 0;
    let lastTs = performance.now();

    function paintCables(dt) {
      if (!isReducedMotion()) t += dt;

      cableEls.forEach((ce, idx) => {
        const { pa, pb } = ce;
        const midX = (pa.x + pb.x) / 2;
        const sagY = Math.max(pa.y, pb.y) + 84 + Math.abs(pa.x - pb.x) * 0.11;

        let cx = midX;
        let cy = sagY;
        if (!isReducedMotion()) {
          cx += Math.sin(t * 1.4 + idx) * 5;
          cy += Math.cos(t * 1.1 + idx * 1.7) * 4;
          if (pointer.active) {
            const dx = pointer.x - midX;
            const dy = pointer.y - sagY;
            const dist = Math.hypot(dx, dy);
            const pull = Math.max(0, 1 - dist / 240);
            cx += dx * pull * 0.42;
            cy += dy * pull * 0.42;
          }
        }
        const d = `M${pa.x} ${pa.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${pb.x} ${pb.y}`;
        ce.hit.setAttribute('d', d);
        ce.shadow.setAttribute('d', d);
        ce.main.setAttribute('d', d);
        ce.pulse.setAttribute('d', d);
        if (idx === activeIdx && !isReducedMotion()) {
          ce.pulse.setAttribute('stroke-dashoffset', String((-t * 58).toFixed(1)));
        }
      });
    }

    function renderCables(now) {
      if (!visible) {
        cableRaf = 0;
        return;
      }
      cableRaf = requestAnimationFrame(renderCables);
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      paintCables(dt);
    }

    selectCable(0, false);
    paintCables(0);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        lastTs = performance.now();
        if (!cableRaf) cableRaf = requestAnimationFrame(renderCables);
      } else if (cableRaf) {
        cancelAnimationFrame(cableRaf);
        cableRaf = 0;
      }
    }, { threshold: 0.02 });
    io.observe(svg);
  })();

  // =========================================================================
  // 10. MAGNETIC CONTACT CTA, EXECUTIVE BUSINESS CARD & VCARD (.vcf) EXPORT
  // =========================================================================
  (() => {
    const isVi = document.documentElement.lang === 'vi';

    function wireCopyButton(btnId, dataAttr, fallbackVal, toastEn, toastVi) {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      const idleText = btn.dataset.copyLabel || 'Copy';
      const copiedText = btn.dataset.copiedLabel || '✓ Copied';
      let timer = 0;
      btn.addEventListener('click', () => {
        const val = btn.dataset[dataAttr] || fallbackVal;
        const onCopied = () => {
          btn.classList.add('copied');
          btn.textContent = copiedText;
          SFX.chime();
          showToast(isVi ? toastVi : toastEn);
          clearTimeout(timer);
          timer = window.setTimeout(() => {
            btn.classList.remove('copied');
            btn.textContent = idleText;
          }, 2200);
        };
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(val).then(onCopied).catch(() => showToast(val));
        } else {
          showToast(val);
        }
      });
    }

    wireCopyButton('copyEmailBtn', 'email', 'tranminhbaolong.forwork@gmail.com', 'Email copied to clipboard!', 'Đã sao chép địa chỉ Email!');
    wireCopyButton('copyPhoneBtn', 'phone', '+84905195128', 'Phone number copied to clipboard!', 'Đã sao chép số điện thoại!');
    wireCopyButton('copySiteUrlBtn', 'siteUrl', 'https://longtmb2003.github.io/', 'Portfolio URL copied to clipboard!', 'Đã sao chép liên kết!');

    const flipper = document.getElementById('bizCardFlipper');
    if (flipper) {
      const frontFace = flipper.querySelector('.biz-face-front');
      const backFace = flipper.querySelector('.biz-face-back');
      const flipBtns = [...flipper.querySelectorAll('[data-biz-flip]')];
      if (backFace) backFace.inert = true;

      flipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const flipped = flipper.classList.toggle('is-flipped');
          if (frontFace) {
            frontFace.setAttribute('aria-hidden', String(flipped));
            frontFace.inert = flipped;
            frontFace.style.transform = '';
          }
          if (backFace) {
            backFace.setAttribute('aria-hidden', String(!flipped));
            backFace.inert = !flipped;
          }
          SFX.select();
          const nextBtn = (flipped ? backFace : frontFace)?.querySelector('[data-biz-flip]');
          nextBtn?.focus({ preventScroll: true });
        });
      });
    }

    const vcardBtn = document.getElementById('downloadVcardBtn');
    if (vcardBtn) {
      vcardBtn.addEventListener('click', () => {
        const vcfLines = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          'N:Tran;Long;;;',
          'FN:Long Tran',
          'ORG:GTEL OTS (part of FTEL)',
          'TITLE:Full-Stack Engineer (Java & React)',
          'TEL;TYPE=CELL,VOICE:+84905195128',
          'EMAIL;TYPE=INTERNET,WORK:tranminhbaolong.forwork@gmail.com',
          'URL:https://longtmb2003.github.io/',
          'ADR;TYPE=WORK:;;Tan Phu District;Ho Chi Minh City;;;Vietnam',
          'NOTE:Full-Stack Engineer (Java / Spring Boot / React) & Web Studio: https://longtmb2003.github.io/studio.html',
          'END:VCARD'
        ];
        const blob = new Blob([vcfLines.join('\r\n')], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Long_Tran_Contact.vcf';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        SFX.chime();
        showToast(isVi ? 'Đã tải tệp danh bạ (.vcf)!' : 'Contact card (.vcf) saved!');
      });
    }

    const bizCard = document.getElementById('execBizCard');
    if (bizCard && window.matchMedia('(pointer: fine)').matches) {
      let targetRx = 0;
      let targetRy = 0;
      let curRx = 0;
      let curRy = 0;
      let tiltRaf = 0;

      function animateTilt() {
        curRx += (targetRx - curRx) * 0.12;
        curRy += (targetRy - curRy) * 0.12;
        if (Math.abs(targetRx - curRx) < 0.015 && Math.abs(targetRy - curRy) < 0.015) {
          curRx = targetRx;
          curRy = targetRy;
          bizCard.style.transform = (curRx === 0 && curRy === 0) ? '' : `rotateX(${curRx.toFixed(2)}deg) rotateY(${curRy.toFixed(2)}deg)`;
          tiltRaf = 0;
          return;
        }
        bizCard.style.transform = `rotateX(${curRx.toFixed(2)}deg) rotateY(${curRy.toFixed(2)}deg)`;
        tiltRaf = requestAnimationFrame(animateTilt);
      }

      bizCard.addEventListener('pointermove', e => {
        if (flipper?.classList.contains('is-flipped')) return;
        const rect = bizCard.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        bizCard.style.setProperty('--biz-x', `${px.toFixed(1)}%`);
        bizCard.style.setProperty('--biz-y', `${py.toFixed(1)}%`);
        if (!isReducedMotion()) {
          targetRx = ((py - 50) / 50) * -2.2;
          targetRy = ((px - 50) / 50) * 2.8;
          if (!tiltRaf) tiltRaf = requestAnimationFrame(animateTilt);
        }
      });
      bizCard.addEventListener('pointerleave', () => {
        targetRx = 0;
        targetRy = 0;
        if (!tiltRaf) tiltRaf = requestAnimationFrame(animateTilt);
      });
    }

    // Featured Exhibition Stage (#exhibitStage on studio.html — vandanar.design-inspired)
    const exhibitStage = document.getElementById('exhibitStage');
    if (exhibitStage) {
      const EXHIBITS = [
        {
          url: 'vodinhlong-graduation.vercel.app',
          href: 'https://vodinhlong-graduation.vercel.app/',
          img: 'assets/projects/vodinhlong.webp',
          alt: 'Vo Dinh Long — FIT HCMUS Graduation Invitation screenshot',
          role: 'Interactive Ceremony Invite · 2026',
          title: 'Võ Đình Long — FIT HCMUS Graduation',
          summary: 'Vintage airmail envelope interaction ("Swipe to unseal"), Canvas particle ambiance, custom guest-named invite URLs, Hall 1 map, and live wish wall.'
        },
        {
          url: 'phamminhphuong-graduation.vercel.app',
          href: 'https://phamminhphuong-graduation.vercel.app/',
          img: 'assets/projects/phamminhphuong.webp',
          alt: 'Pham Minh Phuong — HCMUT Graduation Keepsake screenshot',
          role: 'Story-Driven Keepsake Web · 2026',
          title: 'Phạm Minh Phương — HCMUT Keepsake',
          summary: 'Royal-navy wax-seal envelope opening into a family tribute letter, Gate A2 memory timeline, interactive graduate trivia quiz, gallery, and wish wall.'
        },
        {
          url: 'tranhuynhanhthu.vercel.app',
          href: 'https://tranhuynhanhthu.vercel.app/',
          img: 'assets/projects/tranhuynhanhthu.webp',
          alt: 'Tran Huynh Anh Thu — Creative Marketer Portfolio screenshot',
          role: 'Editorial Brand Portfolio · React + Vite',
          title: 'Trần Huỳnh Anh Thư — Digital Marketer',
          summary: 'Magazine-grade portfolio ("The Art of Exploring") with bilingual VI/EN switch, 3D motion toggle, 4+ years of multi-industry campaigns, and 18.6× ROAS proof.'
        },
        {
          url: 'tranthihongngoc.vercel.app',
          href: 'https://tranthihongngoc.vercel.app/',
          img: 'assets/projects/tranthihongngoc.webp',
          alt: 'Tran Thi Hong Ngoc — IMC Specialist Portfolio screenshot',
          role: 'Executive Case-Study Portfolio · Next.js',
          title: 'Trần Thị Hồng Ngọc — IMC Specialist',
          summary: 'Next.js personal brand portfolio highlighting 1.5M+ influencer reach, 50+ short-form videos, 20+ PR/OOH placements, ATS view, and Kiều by KITA / UEH cases.'
        }
      ];

      const railItems = [...exhibitStage.querySelectorAll('[data-exhibit-idx]')];
      const imgEl = document.getElementById('exhibitImg');
      const urlEl = document.getElementById('exhibitUrl');
      const cntEl = document.getElementById('exhibitCounter');
      const linkEl = document.getElementById('exhibitLink');
      const roleEl = document.getElementById('exhibitRole');
      const titleEl = document.getElementById('exhibitTitle');
      const sumEl = document.getElementById('exhibitSummary');
      const ctaEl = document.getElementById('exhibitCta');
      let currentEx = 0;

      function selectExhibit(idx, playSound) {
        if (idx === currentEx || !EXHIBITS[idx]) return;
        currentEx = idx;
        const item = EXHIBITS[idx];
        railItems.forEach((b, i) => {
          const active = i === idx;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', String(active));
        });
        if (imgEl) {
          imgEl.classList.add('is-swapping');
          window.setTimeout(() => {
            imgEl.src = item.img;
            imgEl.alt = item.alt;
            imgEl.classList.remove('is-swapping');
          }, 120);
        }
        if (urlEl) urlEl.textContent = item.url;
        if (cntEl) cntEl.textContent = `0${idx + 1} / 0${EXHIBITS.length}`;
        if (linkEl) linkEl.href = item.href;
        if (roleEl) roleEl.textContent = item.role;
        if (titleEl) titleEl.textContent = item.title;
        if (sumEl) sumEl.textContent = item.summary;
        if (ctaEl) ctaEl.href = item.href;
        if (playSound) SFX.tick();
      }

      railItems.forEach(btn => {
        const idx = Number(btn.dataset.exhibitIdx);
        btn.addEventListener('click', () => selectExhibit(idx, true));
        btn.addEventListener('mouseenter', () => selectExhibit(idx, false));
      });
    }

    // Client & Web Studio: category filter + Desktop/Mobile viewport morph
    const studioBtns = document.querySelectorAll('.studio-filter-btn');
    const studioCards = document.querySelectorAll('.studio-card');
    studioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        studioBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const filter = btn.dataset.studioFilter;
        SFX.tick();
        studioCards.forEach(card => {
          const match = filter === 'all' || card.dataset.studioCat === filter;
          card.classList.toggle('hidden', !match);
          card.classList.toggle('fade-in', match);
        });
      });
    });

    const showcaseGrid = document.getElementById('studioShowcaseGrid');
    const vpBtns = document.querySelectorAll('[data-vp]');
    if (showcaseGrid && vpBtns.length > 0) {
      vpBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          vpBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
          showcaseGrid.classList.toggle('mobile-preview-mode', btn.dataset.vp === 'mobile');
          SFX.select();
        });
      });
    }

    // Live Bespoke Sandbox (#atelierSandbox on studio.html)
    const sandbox = document.getElementById('atelierSandbox');
    if (sandbox) {
      const nameInput = document.getElementById('sandboxNameInput');
      const displayEl = document.getElementById('sbxDisplayName');
      const slugEl = document.getElementById('sbxUrlSlug');
      const stageEl = document.getElementById('sandboxStage');
      const kickerEl = document.getElementById('sbxKicker');
      const badgeEl = document.getElementById('sbxBadge');
      const greetingEl = document.getElementById('sbxGreeting');
      const descEl = document.getElementById('sbxDesc');
      const pillsEl = document.getElementById('sbxPills');
      const sparkBtn = document.getElementById('sandboxSparkBtn');
      const particlesEl = document.getElementById('sbxParticles');
      const modeBtns = sandbox.querySelectorAll('[data-sbx-mode]');
      const swatchBtns = sandbox.querySelectorAll('[data-sbx-theme]');

      const MODES = {
        invite: {
          kicker: 'CLASS OF 2026 · HONORS CEREMONY',
          badge: 'VIP INVITE',
          greeting: 'Cordially inviting you to celebrate',
          desc: 'Interactive ceremony map, ambient soundtrack, personalized guest pass & live wishbook.',
          pills: ['♫ Audio', '📍 Venue Map', '💌 Guestbook'],
          suffix: '-graduation.vercel.app'
        },
        portfolio: {
          kicker: 'SELECTED WORKS · EDITION 2026',
          badge: 'OPEN TO WORK',
          greeting: 'Creative Direction & Case Studies by',
          desc: 'Editorial case studies, verified KPI impact, bilingual SEO metadata & custom domain.',
          pills: ['⚛ React / Next.js', '📊 KPI Proof', '🌐 Custom OG'],
          suffix: '.vercel.app'
        }
      };
      let currentMode = 'invite';

      function syncSandboxName() {
        const raw = (nameInput?.value || '').trim() || 'Your Name';
        if (displayEl) displayEl.textContent = raw.toUpperCase();
        if (slugEl) {
          const slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'your-site';
          slugEl.textContent = `${slug}${MODES[currentMode].suffix}`;
        }
      }

      function burstParticles() {
        if (!particlesEl || isReducedMotion()) return;
        for (let i = 0; i < 18; i++) {
          const dot = document.createElement('span');
          dot.className = 'sbx-dot-spark';
          const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.35;
          const dist = 45 + Math.random() * 95;
          dot.style.left = `${45 + Math.random() * 10}%`;
          dot.style.top = `${45 + Math.random() * 10}%`;
          dot.style.setProperty('--tx', `${(Math.cos(angle) * dist).toFixed(1)}px`);
          dot.style.setProperty('--ty', `${(Math.sin(angle) * dist).toFixed(1)}px`);
          dot.addEventListener('animationend', () => dot.remove());
          particlesEl.appendChild(dot);
        }
      }

      nameInput?.addEventListener('input', syncSandboxName);

      modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          currentMode = btn.dataset.sbxMode || 'invite';
          modeBtns.forEach(b => {
            const active = b === btn;
            b.classList.toggle('active', active);
            b.setAttribute('aria-pressed', String(active));
          });
          const cfg = MODES[currentMode];
          if (kickerEl) kickerEl.textContent = cfg.kicker;
          if (badgeEl) badgeEl.textContent = cfg.badge;
          if (greetingEl) greetingEl.textContent = cfg.greeting;
          if (descEl) descEl.textContent = cfg.desc;
          if (pillsEl) {
            pillsEl.textContent = '';
            cfg.pills.forEach(label => {
              const s = document.createElement('span');
              s.textContent = label;
              pillsEl.appendChild(s);
            });
          }
          syncSandboxName();
          SFX.select();
        });
      });

      swatchBtns.forEach(sw => {
        sw.addEventListener('click', () => {
          swatchBtns.forEach(b => {
            const active = b === sw;
            b.classList.toggle('active', active);
            b.setAttribute('aria-pressed', String(active));
          });
          if (stageEl) stageEl.dataset.theme = sw.dataset.sbxTheme || 'gold';
          SFX.tick();
        });
      });

      sparkBtn?.addEventListener('click', () => {
        burstParticles();
        SFX.raceDone();
      });
    }

    // Interactive Project Blueprint Configurator (#blueprint on studio.html)
    const bpTicket = document.getElementById('bpTicket');
    if (bpTicket) {
      const fmtBtns = [...document.querySelectorAll('[data-bp-format]')];
      const modBtns = [...document.querySelectorAll('[data-bp-mod]')];
      const etaEl = document.getElementById('bpEtaBadge');
      const titleEl = document.getElementById('bpSelectedFormat');
      const countEl = document.getElementById('bpModCount');
      const briefEl = document.getElementById('bpBriefPreview');
      const zaloBtn = document.getElementById('bpZaloBtn');
      const emailLink = document.getElementById('bpEmailLink');

      function updateBlueprint() {
        const activeFmt = fmtBtns.find(b => b.classList.contains('active')) || fmtBtns[0];
        const fmtName = activeFmt?.dataset.bpFormat || 'Custom Website';
        const baseDays = Number(activeFmt?.dataset.bpDays || 3);
        const activeMods = modBtns.filter(b => b.classList.contains('active'));
        const addDays = activeMods.reduce((sum, b) => sum + Number(b.dataset.bpAdd || 0), 0);
        const minD = Math.max(2, Math.floor(baseDays + addDays * 0.6));
        const maxD = Math.max(minD + 1, Math.ceil(baseDays + addDays));

        const modNames = activeMods.map(b => b.dataset.bpMod);
        const brief = modNames.length > 0
          ? `Hi Long, I'd like to commission a ${fmtName} with ${modNames.join(', ')}.`
          : `Hi Long, I'd like to commission a ${fmtName}.`;

        if (titleEl) titleEl.textContent = fmtName;
        if (etaEl) etaEl.textContent = `EST. ${minD}–${maxD} DAYS`;
        if (countEl) countEl.textContent = `${activeMods.length} active`;
        if (briefEl) briefEl.textContent = brief;
        if (emailLink) {
          const subject = encodeURIComponent(`Website Commission Inquiry — ${fmtName}`);
          const body = encodeURIComponent(`${brief}\n\nTimeline / Target Date:\nReference or Links:\n`);
          emailLink.href = `mailto:tranminhbaolong.forwork@gmail.com?subject=${subject}&body=${body}`;
        }
        return brief;
      }

      fmtBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          fmtBtns.forEach(b => {
            const active = b === btn;
            b.classList.toggle('active', active);
            b.setAttribute('aria-pressed', String(active));
          });
          SFX.select();
          updateBlueprint();
        });
      });

      modBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const next = !btn.classList.contains('active');
          btn.classList.toggle('active', next);
          btn.setAttribute('aria-pressed', String(next));
          SFX.tick();
          updateBlueprint();
        });
      });

      zaloBtn?.addEventListener('click', () => {
        const brief = updateBlueprint();
        navigator.clipboard?.writeText(brief).catch(() => {});
        SFX.chime();
        showToast('Project brief copied! Paste it in Zalo ↗');
        window.open('https://zalo.me/0905195128', '_blank', 'noopener,noreferrer');
      });

      updateBlueprint();
    }

    const contactHeading = document.getElementById('contactMagnetic');
    if (!contactHeading || !window.matchMedia('(pointer: fine)').matches) return;

    const chars = [...contactHeading.querySelectorAll('.mag-char')];
    if (chars.length === 0) return;

    const states = chars.map(() => ({ x: 0, y: 0, vx: 0, vy: 0, baseX: 0, baseY: 0 }));
    let mouseX = -9999;
    let mouseY = -9999;
    let inView = false;
    let dirtyBase = true;

    function cacheBasePositions() {
      dirtyBase = false;
      chars.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        states[i].baseX = rect.left + rect.width / 2 - states[i].x + window.scrollX;
        states[i].baseY = rect.top + rect.height / 2 - states[i].y + window.scrollY;
      });
    }

    window.addEventListener('resize', () => { dirtyBase = true; }, { passive: true });
    window.addEventListener('pointermove', e => {
      mouseX = e.clientX + window.scrollX;
      mouseY = e.clientY + window.scrollY;
    }, { passive: true });

    const accents = ['#E4472C', '#2FA36B', '#3F4FB3', '#D4A359'];
    let lastTs = performance.now();
    let magRaf = 0;

    function tick(now) {
      if (!inView || isReducedMotion()) {
        magRaf = 0;
        return;
      }
      magRaf = requestAnimationFrame(tick);
      if (dirtyBase) cacheBasePositions();
      const dt = Math.min((now - lastTs) / 1000, 0.05) * 60;
      lastTs = now;

      for (let i = 0; i < chars.length; i++) {
        const s = states[i];
        const dx = s.baseX - mouseX;
        const dy = s.baseY - mouseY;
        const dist = Math.hypot(dx, dy);
        const radius = 150;
        let ax = -s.x * 0.09;
        let ay = -s.y * 0.09;
        if (dist > 0.1 && dist < radius) {
          const force = (1 - dist / radius) * 6.5;
          ax += (dx / dist) * force;
          ay += (dy / dist) * force;
        }
        s.vx = (s.vx + ax * dt) * Math.pow(0.82, dt);
        s.vy = (s.vy + ay * dt) * Math.pow(0.82, dt);
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        const mag = Math.hypot(s.x, s.y);
        if (mag > 0.08) {
          chars[i].style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) rotate(${(s.x * 0.22).toFixed(2)}deg)`;
          chars[i].style.color = mag > 10 ? accents[i % accents.length] : '';
        } else if (chars[i].style.transform) {
          chars[i].style.transform = '';
          chars[i].style.color = '';
        }
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !isReducedMotion()) {
        dirtyBase = true;
        lastTs = performance.now();
        if (!magRaf) magRaf = requestAnimationFrame(tick);
      } else if (magRaf) {
        cancelAnimationFrame(magRaf);
        magRaf = 0;
      }
    });
    io.observe(contactHeading);
  })();

  // =========================================================================
  // 11. SPOTLIGHT CARDS, CHRONICLES ERA SPY & MODE TOGGLE
  // =========================================================================
  document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  (() => {
    const eraLinks = document.querySelectorAll('.era-links a');
    const storyChapters = document.querySelectorAll('.story-chapter');

    if ('IntersectionObserver' in window && storyChapters.length > 0) {
      const eraObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          eraLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
              link.setAttribute('aria-current', 'location');
            } else {
              link.classList.remove('active');
              link.removeAttribute('aria-current');
            }
          });
        });
      }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
      storyChapters.forEach(ch => eraObserver.observe(ch));
    }

    const btnStory = document.getElementById('btnStoryMode');
    const btnLog = document.getElementById('btnLogMode');
    const chronicles = document.getElementById('story-chronicles');
    const storyTranscripts = document.querySelectorAll('.story-transcript');

    if (btnStory && btnLog && chronicles) {
      btnStory.addEventListener('click', () => {
        btnStory.classList.add('active');
        btnStory.setAttribute('aria-pressed', 'true');
        btnLog.classList.remove('active');
        btnLog.setAttribute('aria-pressed', 'false');
        chronicles.setAttribute('data-mode', 'story');
        storyTranscripts.forEach(t => t.removeAttribute('open'));
        SFX.tick();
      });

      btnLog.addEventListener('click', () => {
        btnLog.classList.add('active');
        btnLog.setAttribute('aria-pressed', 'true');
        btnStory.classList.remove('active');
        btnStory.setAttribute('aria-pressed', 'false');
        chronicles.setAttribute('data-mode', 'blueprint');
        storyTranscripts.forEach(t => t.setAttribute('open', 'true'));
        SFX.tick();
      });
    }
  })();

  // =========================================================================
  // 12. CERTIFICATE LIGHTBOX MODAL (FULL FOCUS MANAGEMENT)
  // =========================================================================
  (() => {
    const certData = {
      'claude-code-in-action': {
        title: 'Claude Code in Action',
        issuer: 'Anthropic · Claude Academy',
        date: 'November 2026',
        earner: 'Long Tran',
        authority: 'Claude Academy (Anthropic)',
        credId: '75ff886b-739a-41af-8dca-4b7404e60825',
        verifyUrl: 'https://academy.claude.com/badges/75ff886b-739a-41af-8dca-4b7404e60825',
        desc: 'Completed Anthropic\'s intermediate Claude Code in Action curriculum focused on steering long-horizon agentic workflows: Plan Mode scoping, lean CLAUDE.md guardrails, reusable skills, test-gated hooks, headless CI/CD integration, and rigorous verification of autonomous runs.',
        skills: ['Plan Mode Scoping', 'CLAUDE.md Guardrails', 'Reusable Agent Skills', 'Test-Gated Hooks', 'Headless CI/CD', 'Unsupervised Verification'],
        badgeImg: null,
        icon: 'AI',
        certDoc: null,
        statusText: 'Verified Badge · Claude Academy',
        isHonor: false
      },
      'claude-code-101': {
        title: 'Claude Code 101',
        issuer: 'Anthropic · Claude Academy',
        date: 'November 2026',
        earner: 'Long Tran',
        authority: 'Claude Academy (Anthropic)',
        credId: '931620025a2f6fa00558279139d5a159',
        verifyUrl: 'https://academy.claude.com/verify/931620025a2f6fa00558279139d5a159',
        desc: 'Completed Anthropic\'s official Claude Code 101 course covering agentic coding workflows, codebase exploration, structured planning, AI-assisted implementation and unit testing, and human-reviewed production software delivery.',
        skills: ['Claude Code', 'Agentic Workflows', 'Context Engineering', 'Codebase Navigation', 'AI-Assisted Testing', 'Human-Reviewed Delivery'],
        badgeImg: null,
        icon: 'AI',
        certDoc: null,
        statusText: 'Verified on Claude Academy',
        isHonor: false
      },
      lfel1004: {
        title: 'LFEL1004: Authentication & Authorization for Web/API',
        issuer: 'The Linux Foundation · LF Training & Certification',
        date: 'October 31, 2026',
        earner: 'Long Trần',
        authority: 'Credly / The Linux Foundation',
        credId: 'vA3RkD3tbU6DYUpmmhEtbw',
        verifyUrl: 'https://www.credly.com/go/vA3RkD3tbU6DYUpmmhEtbw',
        desc: 'Demonstrated proficiency in configuring and enforcing identity and access controls for modern web and API applications: OAuth 2.0 / OpenID Connect flows, Single Sign-On (SSO), Role-Based Access Control (RBAC), Multi-Factor Authentication (MFA), and token-based security to enforce least-privilege access.',
        skills: ['OAuth 2.0', 'OpenID Connect', 'SSO Integration', 'Role-Based Access Control (RBAC)', 'Multi-Factor Auth (MFA)', 'Token Security', 'Least-Privilege Enforcement', 'API Security'],
        badgeImg: 'assets/certs/linux-foundation-lfel1004.png',
        certDoc: null,
        statusText: 'Verified on Credly',
        isHonor: false
      },
      'hackerrank-sql': {
        title: 'SQL (Advanced) Certification',
        issuer: 'HackerRank · Skills Verification',
        date: 'July 5, 2026',
        earner: 'Long Tran',
        authority: 'HackerRank',
        credId: '801c9ad5b55e',
        verifyUrl: 'https://www.hackerrank.com/certificates/801c9ad5b55e',
        desc: 'Rigorous verification of advanced SQL mastery: complex multi-table joins, analytical window functions, query execution plan tuning, relational indexing strategies, query optimization, and schema design.',
        skills: ['Analytical Window Functions', 'Query Optimization', 'Complex Joins', 'Execution Plans & Indexing', 'Schema Design', 'Data Aggregations'],
        badgeImg: 'assets/certs/hackerrank-sql-advanced.png',
        certDoc: 'assets/certs/hackerrank-sql-advanced-cert.jpg',
        statusText: 'Verified on HackerRank',
        isHonor: false
      }
    };

    const overlay = document.getElementById('certModalOverlay');
    const closeBtn = document.getElementById('certModalCloseBtn');
    const copyBtn = document.getElementById('modalCopyBtn');
    let activeCertId = null;
    let lastFocusedEl = null;

    function openCertModal(id, triggerEl) {
      const item = certData[id];
      if (!item || !overlay) return;
      activeCertId = id;
      lastFocusedEl = triggerEl || document.activeElement;

      const modalImg = document.getElementById('modalCertImg');
      const modalImgWrap = document.getElementById('modalImgWrap');
      const toggleWrap = document.getElementById('modalViewToggle');
      const btnBadge = document.getElementById('toggleBadgeBtn');
      const btnCert = document.getElementById('toggleCertBtn');
      const idBadge = document.getElementById('modalCertIdBadge');
      const statusEl = document.getElementById('modalCertStatus');
      const statusText = document.getElementById('modalCertStatusText');
      const titleEl = document.getElementById('modalCertTitle');
      const issuerEl = document.getElementById('modalCertIssuer');
      const descEl = document.getElementById('modalCertDesc');
      const earnerEl = document.getElementById('modalCertEarner');
      const dateEl = document.getElementById('modalCertDate');
      const authEl = document.getElementById('modalCertAuthority');
      const idValEl = document.getElementById('modalCertIdVal');
      const skillsWrap = document.getElementById('modalCertSkills');
      const verifyBtn = document.getElementById('modalVerifyBtn');

      if (item.badgeImg) {
        modalImg.src = item.badgeImg;
        modalImg.alt = item.title;
        modalImg.hidden = false;
        modalImg.style.display = 'block';
        modalImgWrap.querySelector('.cert-icon-emblem')?.remove();
      } else if (item.icon) {
        modalImg.removeAttribute('src');
        modalImg.hidden = true;
        modalImg.style.display = 'none';
        let iconEl = modalImgWrap.querySelector('.cert-icon-emblem');
        if (!iconEl) {
          iconEl = document.createElement('span');
          iconEl.className = 'cert-icon-emblem';
          iconEl.style.fontSize = '64px';
          iconEl.setAttribute('aria-hidden', 'true');
          modalImgWrap.appendChild(iconEl);
        }
        iconEl.textContent = item.icon;
      }

      if (item.certDoc) {
        toggleWrap.style.display = 'flex';
        btnBadge.classList.add('active');
        btnCert.classList.remove('active');
        btnBadge.onclick = () => {
          btnBadge.classList.add('active');
          btnCert.classList.remove('active');
          modalImg.src = item.badgeImg;
          SFX.tick();
        };
        btnCert.onclick = () => {
          btnCert.classList.add('active');
          btnBadge.classList.remove('active');
          modalImg.src = item.certDoc;
          SFX.tick();
        };
      } else {
        toggleWrap.style.display = 'none';
      }

      idBadge.textContent = item.credId ? `ID: ${item.credId}` : '';
      statusText.textContent = item.statusText;
      statusEl.style.color = item.isHonor ? 'var(--c-indigo)' : 'var(--c-green)';
      titleEl.textContent = item.title;
      issuerEl.textContent = item.issuer;
      descEl.textContent = item.desc;
      earnerEl.textContent = item.earner;
      dateEl.textContent = item.date;
      authEl.textContent = item.authority;
      idValEl.textContent = item.credId || 'N/A';

      skillsWrap.innerHTML = '';
      item.skills.forEach(s => {
        const chip = document.createElement('span');
        chip.className = 'cert-tag';
        chip.textContent = s;
        skillsWrap.appendChild(chip);
      });

      verifyBtn.href = item.verifyUrl;
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      SFX.select();
      closeBtn?.focus({ preventScroll: true });
    }

    function closeCertModal() {
      if (!overlay) return;
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus({ preventScroll: true });
      }
      lastFocusedEl = null;
    }

    document.querySelectorAll('[data-cert-open]').forEach(btn => {
      btn.addEventListener('click', () => openCertModal(btn.dataset.certOpen, btn));
    });

    closeBtn?.addEventListener('click', () => { SFX.tick(); closeCertModal(); });
    overlay?.addEventListener('click', e => {
      if (e.target === overlay) closeCertModal();
    });

    copyBtn?.addEventListener('click', () => {
      if (!activeCertId || !certData[activeCertId]) return;
      const url = certData[activeCertId].verifyUrl;
      navigator.clipboard?.writeText(url).then(() => {
        SFX.chime();
        showToast('Credential URL copied to clipboard!');
      }).catch(() => showToast(`URL: ${url}`));
    });

    document.addEventListener('keydown', e => {
      if (!overlay || !overlay.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeCertModal();
        return;
      }
      // Focus trap inside modal
      if (e.key === 'Tab') {
        const focusables = [...overlay.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')]
          .filter(el => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  })();

  // =========================================================================
  // 13. MOBILE MENU, NAV SCROLL-SPY, SCROLL REVEAL & SVG REDUCED-MOTION SYNC
  // =========================================================================
  (() => {
    const mobileIndex = document.querySelector('.mobile-index');
    if (mobileIndex) {
      mobileIndex.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => { mobileIndex.open = false; });
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileIndex.open) {
          mobileIndex.open = false;
          mobileIndex.querySelector('summary')?.focus();
        }
      });
      document.addEventListener('click', e => {
        if (mobileIndex.open && !mobileIndex.contains(e.target)) mobileIndex.open = false;
      });
    }

    const navLinks = [...document.querySelectorAll('.nav a')];
    if ('IntersectionObserver' in window && navLinks.length > 0) {
      const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          navLinks.forEach(link => {
            if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-12% 0px -65% 0px', threshold: 0 });
      navLinks.forEach(link => {
        if (!link.hash) return;
        const sec = document.querySelector(link.hash);
        if (sec) navObserver.observe(sec);
      });
    }

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.04, rootMargin: '0px 0px -24px 0px' });
      document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));
    } else {
      document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
    }

    function syncSvgMotion() {
      document.querySelectorAll('svg').forEach(svg => {
        if (isReducedMotion()) svg.pauseAnimations?.();
        else svg.unpauseAnimations?.();
      });
    }
    syncSvgMotion();
    reducedMotionQuery.addEventListener('change', syncSvgMotion);
    const pVisual = document.getElementById('pVisual');
    if (pVisual) new MutationObserver(syncSvgMotion).observe(pVisual, { childList: true });
  })();
})();
