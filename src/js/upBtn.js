// кнопка up to top page

const refs = { upBtnEl: document.getElementById('up-btn') };
export const {upBtnEl} = refs;

window.onscroll = scrollFunction;

function scrollFunction() {
  upBtnEl.style.display = document.documentElement.scrollTop > 300 ? 'block' : 'none';
  
}

upBtnEl.addEventListener('click', () => {
  document.documentElement.scrollTop = 0;
  
});

