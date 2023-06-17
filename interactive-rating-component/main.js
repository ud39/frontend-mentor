let main = document.querySelector('main')
let ratingSelection = document.querySelector('em.selected-rating')
let ratingElements = document.querySelectorAll('.rating:not(.thank-you)');
let form = document.querySelector('form')
let thankYou = document.querySelector('section.thank-you')
let rating = document.querySelectorAll('.rating')
let radios = form.querySelectorAll('input[type="radio"]')
let checked = false

function submitRating(e) {
  e.preventDefault();

  let checked = false;
  let transitionCount = 0;

  const handleTransitionEnd = () => {
    transitionCount++;

    if (transitionCount === ratingElements.length) {
      ratingElements.forEach(element => {
        element.removeEventListener('transitionend', handleTransitionEnd);
        element.style.display = 'none';
      });

      thankYou.style.maxHeight = '100%';
    }
  };

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      checked = true;
      ratingSelection.textContent = radios[i].value;

      ratingElements.forEach(element => {
        element.addEventListener('transitionend', handleTransitionEnd);
        element.style.opacity = '0';
      });

      break;
    }
  }

  if (!checked) {
    alert('Please select a rating');
  }
}
