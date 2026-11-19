// Навигация по разделам, мобильное меню и поиск по материалам.
const nav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = [...document.querySelectorAll('.nav-link')];
const toTop = document.getElementById('toTop');

function updateActiveLink() {
  const current = window.location.hash || '#home';
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === current));
}

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('hashchange', updateActiveLink);
window.addEventListener('load', updateActiveLink);

window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 450);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const search = document.getElementById('materialSearch');
const materialItems = [...document.querySelectorAll('.material-item')];
const emptyState = document.getElementById('emptyState');

search.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase('ru');
  let visibleCount = 0;
  materialItems.forEach(item => {
    const match = item.textContent.toLocaleLowerCase('ru').includes(query);
    item.hidden = !match;
    if (match) visibleCount++;
  });
  emptyState.hidden = visibleCount !== 0;
});

document.getElementById('year').textContent = new Date().getFullYear();

// Ссылки-заглушки не должны уводить пользователя наверх страницы.
document.querySelectorAll('.placeholder-link').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});
