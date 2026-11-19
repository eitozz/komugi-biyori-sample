const header = document.querySelector('.header');
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 80);
window.addEventListener('scroll', updateHeader, {passive: true});
updateHeader();
const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); };
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 601px)').addEventListener('change', event => { if(event.matches) closeMenu(); });

const filters = [...document.querySelectorAll('.filter')];
const products = [...document.querySelectorAll('.product')];
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => { const selected = filter === button; filter.classList.toggle('is-selected', selected); filter.setAttribute('aria-pressed', String(selected)); });
  let count = 0;
  products.forEach(product => { const visible = category === 'all' || product.dataset.category === category; product.hidden = !visible; if(visible) count++; });
  document.querySelector('#filter-status').textContent = `${count}種類のパンを表示しています`;
}));

const photos = [...document.querySelectorAll('.hero-photo')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reducedMotion.matches) {
  // Keep the opening brief and settle on the final photo.
  photos.slice(1).forEach((photo, index) => {
    window.setTimeout(() => {
      if (reducedMotion.matches || document.hidden || !photo.complete || !photo.naturalWidth) return;
      document.querySelector('.hero-photo.is-active').classList.remove('is-active');
      photo.classList.add('is-active');
    }, (index + 1) * 1850);
  });
}

const contactForm = document.querySelector('.contact-form');
const contactSubmit = contactForm.querySelector('.contact-submit');
const contactReview = contactForm.querySelector('.contact-review');
const reviewList = contactReview.querySelector('dl');
const fields = [
  ['お問い合わせの種別', '#contact-topic'],
  ['お名前', '#contact-name'],
  ['メールアドレス', '#contact-email'],
  ['お問い合わせ内容', '#contact-message']
];

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  reviewList.replaceChildren();
  for (const [label, selector] of fields) {
    const term = document.createElement('dt');
    const value = document.createElement('dd');
    term.textContent = label;
    value.textContent = contactForm.querySelector(selector).value;
    reviewList.append(term, value);
  }
  contactReview.hidden = false;
  contactReview.querySelector('h3').focus();
});

contactReview.querySelector('.contact-edit').addEventListener('click', () => {
  contactReview.hidden = true;
  reviewList.replaceChildren();
  contactForm.querySelector('#contact-topic').focus();
});
contactForm.addEventListener('input', () => {
  contactReview.hidden = true;
  reviewList.replaceChildren();
});
contactSubmit.hidden = false;
