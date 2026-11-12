/* ============================================================
   ÍNDICE DO ARQUIVO
   0. Configuração (e-mail e endereço do formulário)
   1. Botão de tema        5. Revelar ao rolar
   2. Menu do celular      6. Transição entre páginas
   3. Céu e estrelas       7. Formulário de contato
   4. Constelação Python + Java
   ============================================================ */
'use strict';

/* ================================================================
   CONFIGURAÇÃO: troque aqui
   ================================================================ */
const CONTACT_EMAIL = 'joaorodrigooliver9@gmail.com';
const FORM_ENDPOINT = ''; // ex.: 'https://formspree.io/f/SEU_ID'. Vazio = abre o app de e-mail (mailto:)

const root = document.documentElement;
const lang = root.lang.startsWith('en') ? 'en' : 'pt';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================ */
/* ================================================================
   SEÇÃO 1 — Botão de tema: troca data-theme e guarda a escolha (a mesma chave vale para PT e EN) */
const themeBtn = document.querySelector('.theme-toggle');
const syncTheme = () => themeBtn.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
themeBtn.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch { /* ignora */ }
  syncTheme();
});
syncTheme();

/* ============================================================ */
/* ================================================================
   SEÇÃO 2 — Menu do celular */
const navBtn = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
const setMenu = (open) => {
  menu.classList.toggle('open', open);
  navBtn.setAttribute('aria-expanded', String(open));
};
navBtn.addEventListener('click', () => setMenu(navBtn.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* ============================================================ */
/* ================================================================
   SEÇÃO 3 — Céu: estrelas em posições fixas (gerador "sorteado" com semente, igual em toda visita)
      e a variável --sky (0 a 1) que mede o quanto você já rolou. O CSS faz o resto. */
const starsBox = document.querySelector('.stars');
let seed = 7;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (let i = 0; i < 70; i++) {
  const s = document.createElement('span');
  s.className = rand() > 0.8 ? 'star big' : 'star';
  s.style.left = rand() * 100 + '%';
  s.style.top = rand() * 100 + '%';
  s.style.setProperty('--d', (rand() * 4).toFixed(1) + 's');
  starsBox.append(s);
}
let ticking = false;
const updateSky = () => {
  const max = root.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  root.style.setProperty('--sky', p.toFixed(3));
  ticking = false;
};
addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(updateSky); } // no máximo 1 cálculo por quadro
}, { passive: true });
addEventListener('resize', updateSky);
updateSky();

/* ============================================================ */
/* ================================================================
   SEÇÃO 4 — Constelação Python + Java: SVG montado por código (um só lugar para os dois idiomas).
      As duas linhas terminam na MESMA estrela (SHARED): a "colaboração" entre as linguagens. */
const NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
};
const SHARED = [50, 28];
const PY = [[10, 12], [22, 6], [33, 18], [25, 33], SHARED];
const JV = [[90, 38], [78, 44], [69, 31], [62, 12], SHARED];
document.querySelectorAll('.constellation').forEach((fig) => {
  const svg = svgEl('svg', { viewBox: '0 0 100 50', 'aria-hidden': 'true', focusable: 'false' });
  [['py', PY], ['jv', JV]].forEach(([cls, pts]) => {
    svg.append(svgEl('polyline', { class: `cl ${cls}`, points: pts.map((p) => p.join(',')).join(' '), pathLength: 1 }));
    pts.slice(0, -1).forEach(([x, y]) => svg.append(svgEl('circle', { class: `cs ${cls}`, cx: x, cy: y, r: 0.9 })));
  });
  svg.append(svgEl('circle', { class: 'cs shared', cx: SHARED[0], cy: SHARED[1], r: 1.6 }));
  fig.prepend(svg);
});

/* ============================================================ */
/* ================================================================
   SEÇÃO 5 — Revelar ao rolar: IntersectionObserver avisa quando o elemento entra na tela */
const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal, .constellation').forEach((el) => io.observe(el));

/* ============================================================ */
/* ================================================================
   SEÇÃO 6 — Transição entre páginas: o CSS cuida dos navegadores com View Transitions.
      Aqui fica só a alternativa simples (esmaece e depois navega) para os demais. */
if (!('onpagereveal' in window) && !reduceMotion) {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey
        || a.target === '_blank' || a.origin !== location.origin
        || (a.hash && a.pathname === location.pathname)) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = a.href; }, 180);
  });
  addEventListener('pageshow', () => document.body.classList.remove('leaving')); // botão "voltar"
}

/* ============================================================ */
/* ================================================================
   SEÇÃO 7 — Formulário: validação no navegador, mensagens por idioma, sem innerHTML (só textContent) */
const MSG = {
  pt: {
    required: 'Preencha este campo.',
    email: 'Informe um e-mail válido, como nome@dominio.com.',
    short: 'Escreva pelo menos 10 caracteres.',
    fix: 'Corrija os campos destacados.',
    mailto: 'Quase lá! Seu app de e-mail vai abrir com a mensagem pronta; é só enviar.',
    sent: 'Mensagem enviada! Responderei em breve.',
    fail: 'Não foi possível enviar. Tente de novo ou use um dos contatos abaixo.',
  },
  en: {
    required: 'Please fill in this field.',
    email: 'Enter a valid email, like name@domain.com.',
    short: 'Please write at least 10 characters.',
    fix: 'Please fix the highlighted fields.',
    mailto: 'Almost there! Your email app will open with the message ready; just send it.',
    sent: 'Message sent! I will reply soon.',
    fail: 'Could not send. Please try again or use one of the contacts below.',
  },
}[lang];

const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('form-status');
  const fields = [...form.elements].filter((f) => f.matches('input, textarea'));
  const clean = (v) => v.replace(/[\r\n]+/g, ' ').trim(); // campos de uma linha: sem quebras
  const val = (id) => form.elements[id].value;

  const check = (f) => {
    const v = f.id === 'message' ? f.value.trim() : clean(f.value);
    if (!v) return MSG.required;
    if (f.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return MSG.email;
    if (f.id === 'message' && v.length < 10) return MSG.short;
    return '';
  };
  const show = (f) => {
    const err = check(f);
    f.setAttribute('aria-invalid', String(Boolean(err)));
    document.getElementById(f.id + '-error').textContent = err;
    return !err;
  };
  // depois de um erro, revalida enquanto a pessoa digita
  fields.forEach((f) => f.addEventListener('input', () => {
    if (f.getAttribute('aria-invalid') === 'true') show(f);
  }));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'status';
    status.textContent = '';
    const results = fields.map(show);
    if (results.includes(false)) {
      status.classList.add('err');
      status.textContent = MSG.fix;
      fields[results.indexOf(false)].focus();
      return;
    }
    const data = { name: clean(val('name')), email: clean(val('email')), subject: clean(val('subject')), message: val('message').trim() };
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        status.classList.add('ok');
        status.textContent = MSG.sent;
      } else {
        const body = `${data.message}\n\n${data.name} <${data.email}>`;
        location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
        status.classList.add('ok');
        status.textContent = MSG.mailto;
      }
    } catch {
      status.classList.add('err');
      status.textContent = MSG.fail;
    }
  });
}