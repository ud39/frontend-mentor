const form = document.querySelector("form")
const birthday = document.querySelectorAll("section.age span strong")



form.addEventListener('keypress', (e) => {
  if(e.key !== "Enter") return

  e.preventDefault()

  const day = form.day.value
  const month = form.month.value
  const year = form.year.value

  const birthData = [day, month, year]

  birthday.forEach( (el, index) => {
    el.innerHTML = birthData[index]
  })

})

