// Paaseieren. Klein en zonder afhankelijkheden.

// 1. Voor wie de console opent.
console.log(
  '%c YELLOW IoT %c #25905 ',
  'background:#FFD21F;color:#0B0B0C;font:700 14px monospace;padding:4px 2px',
  'background:#14A58B;color:#fff;font:700 14px monospace;padding:4px 2px',
);
console.log('$ ./join --team yellowiot\n> Je leest console-output voor de lol? Dan zoeken we jou: https://www.yellowiot.nl/doe-mee/');

// 2. Vijf keer op het logo klikken op de homepage: dev mode.
const logo = document.querySelector<HTMLAnchorElement>('[data-logo]');
let clicks = 0;
logo?.addEventListener('click', (e) => {
  if (location.pathname !== '/') return;
  e.preventDefault();
  window.scrollTo({ top: 0 });
  clicks += 1;
  if (clicks === 5) showToast();
});

function showToast() {
  const toast = document.createElement('div');
  toast.className = 'toast mono';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <p class="t1">&gt; DEV MODE UNLOCKED</p>
    <p class="t2">Vijf keer klikken? Jij hebt doorzettingsvermogen. Dat zoeken we.</p>
    <a href="/doe-mee/">./join --team yellowiot →</a>
    <button type="button" aria-label="Sluiten">×</button>`;
  toast.querySelector('button')?.addEventListener('click', () => toast.remove());
  document.body.append(toast);
}
