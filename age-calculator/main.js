const form = document.querySelector('form');
const birthday = document.querySelectorAll('section.age span strong');

form.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    Array.from(form.elements).forEach((input) => {
      if (!input.checkValidity()) input.classList.add('invalid');
    });
  }

  if (e.key !== 'Enter' || !form.checkValidity()) return;

  console.log(form);
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
