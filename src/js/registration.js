const btnWindowRegistration = document.querySelector('.login-form__btn-to-registartion')
const windowRegistration = document.querySelector('.registration-form__window')
const closeWindowBtnRegistration = document.querySelector('.registration-form-close-btn')
const formWindow = document.querySelector('.login-form__window')

btnWindowRegistration.addEventListener('click', openCloseWindowRegistration)
closeWindowBtnRegistration.addEventListener('click', openCloseWindowRegistration)

function openCloseWindowRegistration(e){ 
    e.preventDefault();
    windowRegistration.classList.toggle('is-hidden'),
    formWindow.classList.add('is-hidden')
}

export {openCloseWindowRegistration}