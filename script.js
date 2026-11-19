// Общая логика для всех отдельных страниц SANG Military Academy.
const nav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
const toTop = document.getElementById('toTop');
const search = document.getElementById('materialSearch');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

if (toTop) {
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('visible', window.scrollY > 450);
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Поиск включается только на странице «Материалы».
if (search) {
  const items = [...document.querySelectorAll('.material-item')];
  const emptyState = document.getElementById('emptyState');
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase('ru');
    let visible = 0;
    items.forEach(item => {
      const matches = item.textContent.toLocaleLowerCase('ru').includes(query);
      item.hidden = !matches;
      if (matches) visible++;
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  });
}

document.querySelectorAll('.placeholder-link').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});
