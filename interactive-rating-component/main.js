let main = document.querySelector('main')
let ratingSelection = document.querySelector('em.selected-rating')
let form = document.querySelector('form')
let thankYou = document.querySelector('section.thank-you')
let rating = document.querySelectorAll('.rating')
let radios = form.querySelectorAll('input[type="radio"]')
let checked = false


function submitRating(e) {
  e.preventDefault()
  for (let i = 0; i < radios.length; i++) {
    console.log(radios[i].checked)
    if (radios[i].checked) {
      checked = true
      ratingSelection.innerHTML = form.querySelector('input[type="radio"]:checked').value
      thankYou.style.display = 'flex'
      rating.forEach( e => e.style.display = 'none')
      break;
    }

  }
    if (!checked) {
      alert('Please select a rating')
      console.log('Rating submitted')
      return
    } 
}
