// Het 404-spelletje: rijd de robot rond en verzamel 10 ballen in 30 seconden.
// Het veld toont "404" in muren; het middelste cijfer is teal, net als in het logo.

type Dir = 'u' | 'd' | 'l' | 'r';
const MOVES: Record<Dir, [number, number]> = { u: [0, -1], d: [0, 1], l: [-1, 0], r: [1, 0] };
const KEYS: Record<string, Dir> = {
  ArrowUp: 'u', w: 'u', W: 'u',
  ArrowDown: 'd', s: 'd', S: 'd',
  ArrowLeft: 'l', a: 'l', A: 'l',
  ArrowRight: 'r', d: 'r', D: 'r',
};
const DIGITS: Record<string, string[]> = {
  '4': ['101', '101', '111', '001', '001'],
  '0': ['111', '101', '101', '101', '111'],
};
const GOAL = 10;
const SECONDS = 30;

export function initGame(root: HTMLElement) {
  const W = Number(root.dataset.w);
  const H = Number(root.dataset.h);
  const cells = [...root.querySelectorAll<HTMLElement>('.c')];
  const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
  const scoreEl = $('[data-score]');
  const timeEl = $('[data-time]');
  const bestEl = $('[data-best]');
  const wonEl = $('[data-won]');
  const overEl = $('[data-over]');
  const startBtn = root.querySelector<HTMLButtonElement>('[data-start]')!;

  const walls = new Map<string, 't' | 'y'>();
  ['4', '0', '4'].forEach((d, i) =>
    DIGITS[d].forEach((row, y) =>
      [...row].forEach((ch, x) => {
        if (ch === '1') walls.set(`${2 + i * 4 + x},${2 + y}`, i === 1 ? 't' : 'y');
      }),
    ),
  );
  // Het gat in de 0 is onbereikbaar: daar komen geen ballen.
  const voids = new Set(['7,3', '7,4', '7,5']);

  let phase: 'idle' | 'play' | 'won' | 'over' = 'idle';
  let rx = 0;
  let ry = H - 1;
  let dir: Dir = 'r';
  let balls: { x: number; y: number }[] = [];
  let score = 0;
  let time = SECONDS;
  let best = 0;
  let timer: number | undefined;

  const key = (x: number, y: number) => `${x},${y}`;
  const free = (x: number, y: number) =>
    !walls.has(key(x, y)) && !voids.has(key(x, y)) && !(x === rx && y === ry) && !balls.some((b) => b.x === x && b.y === y);

  function spawn() {
    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * W);
      const y = Math.floor(Math.random() * H);
      if (free(x, y)) return void balls.push({ x, y });
    }
  }

  function render() {
    cells.forEach((c, i) => {
      const x = i % W;
      const y = Math.floor(i / W);
      const w = walls.get(key(x, y));
      let cls = 'c';
      if (w) cls += w === 't' ? ' wall t' : ' wall';
      else if (x === rx && y === ry) cls += ` bot ${dir}`;
      else if (balls.some((b) => b.x === x && b.y === y)) cls += ' ball';
      c.className = cls;
    });
    scoreEl.textContent = String(score);
    timeEl.textContent = String(time);
    bestEl.textContent = String(best);
    wonEl.hidden = phase !== 'won';
    overEl.hidden = phase !== 'over';
    if (phase === 'over') overEl.textContent = `Tijd op! ${score} ballen. Nog een keer?`;
    startBtn.textContent = phase === 'play' ? 'Herstart' : phase === 'idle' ? 'Start game ▶' : 'Opnieuw ▶';
  }

  function stop(next: 'won' | 'over') {
    phase = next;
    best = Math.max(best, score);
    clearInterval(timer);
  }

  function start() {
    clearInterval(timer);
    phase = 'play';
    rx = 0;
    ry = H - 1;
    dir = 'r';
    balls = [];
    score = 0;
    time = SECONDS;
    for (let i = 0; i < 3; i++) spawn();
    timer = window.setInterval(() => {
      time -= 1;
      if (time <= 0) {
        time = 0;
        stop('over');
      }
      render();
    }, 1000);
    render();
  }

  function move(d: Dir) {
    if (phase !== 'play') return;
    dir = d;
    const [dx, dy] = MOVES[d];
    const nx = Math.min(W - 1, Math.max(0, rx + dx));
    const ny = Math.min(H - 1, Math.max(0, ry + dy));
    if (!walls.has(key(nx, ny))) {
      rx = nx;
      ry = ny;
      const hit = balls.findIndex((b) => b.x === nx && b.y === ny);
      if (hit >= 0) {
        balls.splice(hit, 1);
        score += 1;
        if (score >= GOAL) stop('won');
        else spawn();
      }
    }
    render();
  }

  startBtn.addEventListener('click', start);
  root.querySelectorAll<HTMLButtonElement>('[data-dir]').forEach((b) =>
    b.addEventListener('click', () => move(b.dataset.dir as Dir)),
  );
  // Toetsenbord: alleen tijdens het spel, en niet als iemand in een tekstveld typt.
  document.addEventListener('keydown', (e) => {
    const d = KEYS[e.key];
    if (!d || phase !== 'play' || (e.target as HTMLElement).closest('input, textarea, select')) return;
    e.preventDefault();
    move(d);
  });

  render();
}
