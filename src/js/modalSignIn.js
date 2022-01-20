const closeWindowBtn = document.querySelector('.login-form-close-btn')
const formWindow = document.querySelector('.login-form__window')

closeWindowBtn.addEventListener('click', closeWindow)

function closeWindow(){
  formWindow.classList.toggle('is-hidden')
}

export {closeWindow}