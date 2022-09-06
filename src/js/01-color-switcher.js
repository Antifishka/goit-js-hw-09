function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyEl: document.body,
};
let timerId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStoptBtnClick);

function onStartBtnClick() {
  refs.startBtn.setAttribute("disabled", true);
  
  timerId = setInterval(() => {
    console.log('Change backgground color');
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000); 
};

function onStoptBtnClick() {
  refs.startBtn.removeAttribute("disabled"); 

  clearInterval(timerId);
  console.log('Stop change');
};
