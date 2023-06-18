const inputEmail = document.querySelector("input[type='email']")
const errorMessage = document.querySelector("#error-message")
const thankYou = document.querySelector(".thank-you")
const wrapperThankYou = document.querySelector(".wrapper-height-auto")
const submittedEmail = document.querySelector("#submitted-email")
const newsletter = document.querySelector(".newsletter")
const picture = document.querySelector("picture")

console.log(inputEmail)

const submitEmail = (event) => {
  event.preventDefault()
  
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const checkEmail = inputEmail.value.trim()

  if (checkEmail === '') { 
    alert('Forget to enter the email address') 
    return
  }

  if (!emailReg.test(checkEmail)) {
    inputEmail.style.border = "red solid 2px"
    inputEmail.style.color = 'red'
    inputEmail.style.backgroundColor = 'rgba(255, 99, 71, 0.1)'
    errorMessage.style.display = 'inline'
    return
  }

  newsletter.style.display = 'none'
  picture.style.display = 'none'
  wrapperThankYou.style.display = 'flex'
  setTimeout( () => {
  thankYou.style.maxHeight = '100%'
  submittedEmail.innerHTML = inputEmail.value
  }, 100)
}


inputEmail.addEventListener('input', () => {

  if (inputEmail.value !== '') {
    inputEmail.style.opacity = 1
    inputEmail.style.border = "black solid 1px"
    inputEmail.style.color = 'black'
    setTimeout(() => {
      errorMessage.style.display = 'none'
    }, 200)
  }

})


