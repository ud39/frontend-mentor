const form = document.querySelector('form');
const birthday = document.querySelectorAll('section.age span strong');

form.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    Array.from(form.elements).forEach((input) => {
      if (!input.checkValidity()) {
        input.classList.add('invalid');
        input.nextElementSibling.style.display = 'block'
        input.parentElement.style.color = 'var(--red)'
      } else {
        input.classList.remove('invalid');
        input.parentElement.style.color = 'inherit'
        const nextSibling = input.nextElementSibling;
        if (nextSibling !== null) {
          nextSibling.style.display = 'none';
        }
      }

    });
  }

  if (e.key !== 'Enter' || !form.checkValidity()) return;

  e.preventDefault();

  const now = new Date();
  const day = form.day.value;
  const month = form.month.value;
  const year = form.year.value;

  const birthData = [
    now.getFullYear() - year,
    Math.abs(now.getMonth() - month),
    Math.abs(now.getDay() - day),
  ];

  birthday.forEach((el, index) => {
    el.innerHTML = birthData[index];
  });
});
