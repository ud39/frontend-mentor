let main = document.querySelector('main')
let rating = document.querySelector('i.selected-rating')
let form = document.querySelector('form')
let radios = form.querySelectorAll('input[type="radio"]')
let checked = false


function submitRating(e) {
  e.preventDefault()
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      checked = true
      rating.innerHTML = form.querySelector('input[type="radio"]:checked').value
      console.log('Rating submitted')
      break;
    }

    if (!checked) {
      alert('Please select a rating')
      return
    } 
  }
}
