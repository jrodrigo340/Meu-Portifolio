/* Roda ANTES da página ser desenhada (fica no <head>, sem defer).
   Assim o tema certo já está aplicado no primeiro frame e não "pisca". */
(() => {
  const root = document.documentElement;
  let theme = null;
  try { theme = localStorage.getItem('theme'); } catch { /* storage bloqueado: segue sem salvar */ }
  if (theme !== 'light' && theme !== 'dark') {
    theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.dataset.theme = theme;
  root.classList.add('js'); // o CSS só esconde elementos "revelados" se o JS existir
})();