// Robotverkenner op de homepage.
// Zonder JavaScript werkt de lijst met onderdelen gewoon als links; dit script voegt de
// interactieve tekening, de kaart (desktop) en de overlay (mobiel/tablet) toe.

const DESKTOP = window.matchMedia('(min-width: 960px)');

export function initExplorer(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-stage]')!;
  const hots = [...root.querySelectorAll<HTMLButtonElement>('[data-pick]')];
  const cards = [...root.querySelectorAll<HTMLElement>('[data-card]')];
  const rows = [...root.querySelectorAll<HTMLAnchorElement>('[data-hover]')];
  const scan = root.querySelector<HTMLElement>('[data-scan]')!;
  const sheet = root.querySelector<HTMLDialogElement>('[data-sheet]')!;
  const sheetBody = root.querySelector<HTMLElement>('[data-sheet-body]')!;
  const sheetKicker = root.querySelector<HTMLElement>('[data-sheet-kicker]')!;
  const order = hots.filter((h) => h.dataset.pick !== 'ball').map((h) => h.dataset.pick!);
  let current = order[0];
  let opener: HTMLElement | null = null;

  function select(id: string) {
    current = id;
    const hot = hots.find((h) => h.dataset.pick === id)!;
    const x = Number(hot.dataset.x);
    const y = Number(hot.dataset.y);
    root.style.setProperty('--lx', `${Math.min(70, Math.max(0, x - 15))}%`);
    root.style.setProperty('--ly', `${Math.min(70, Math.max(0, y - 15))}%`);
    hots.forEach((h) => h.setAttribute('aria-pressed', String(h === hot)));
    rows.forEach((r) => r.classList.toggle('on', r.dataset.hover === id));
    cards.forEach((c) => (c.hidden = c.dataset.card !== id));
    const card = cards.find((c) => c.dataset.card === id)!;
    scan.textContent = card.querySelector('h3')?.textContent ?? '';
    if (sheet.open) fillSheet(card);
  }

  function fillSheet(card: HTMLElement) {
    const clone = card.cloneNode(true) as HTMLElement;
    clone.hidden = false;
    clone.classList.remove('card', 'shadow');
    clone.removeAttribute('data-card');
    clone.querySelector('h3')?.setAttribute('id', 'sheet-title');
    sheetKicker.textContent = card.querySelector('.tag')?.textContent ?? '';
    sheetBody.replaceChildren(clone);
  }

  function openSheet(trigger: HTMLElement) {
    opener = trigger;
    fillSheet(cards.find((c) => c.dataset.card === current)!);
    sheet.showModal();
  }

  hots.forEach((h) =>
    h.addEventListener('click', () => {
      select(h.dataset.pick!);
      if (!DESKTOP.matches) openSheet(h);
    }),
  );

  // Op desktop kiest hover/focus in de lijst alvast het onderdeel; klikken opent de pagina.
  rows.forEach((r) => {
    const pick = () => DESKTOP.matches && select(r.dataset.hover!);
    r.addEventListener('mouseenter', pick);
    r.addEventListener('focus', pick);
  });

  root.querySelectorAll<HTMLButtonElement>('[data-view]').forEach((b) =>
    b.addEventListener('click', () => {
      stage.dataset.view = b.dataset.view;
      root.querySelectorAll('[data-view]').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    }),
  );

  root.querySelectorAll<HTMLButtonElement>('[data-step]').forEach((b) =>
    b.addEventListener('click', () => {
      const i = Math.max(0, order.indexOf(current));
      select(order[(i + Number(b.dataset.step) + order.length) % order.length]);
    }),
  );

  root.querySelector('[data-close]')?.addEventListener('click', () => sheet.close());
  // Klik op de donkere achtergrond sluit de overlay.
  sheet.addEventListener('click', (e) => {
    if (e.target === sheet) sheet.close();
  });
  sheet.addEventListener('close', () => opener?.focus());
  DESKTOP.addEventListener('change', (e) => e.matches && sheet.open && sheet.close());
}
