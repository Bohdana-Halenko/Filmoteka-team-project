// import Darkmode from 'darkmode-js';

// new Darkmode().showWidget();


// const options = {
//   bottom: '95px', // default: '32px'
//   left: '32px', // default: 'unset'
//   time: '0.5s', // default: '0.3s'
//   mixColor: '#fff', // default: '#fff'
//   backgroundColor: '#fff',  // default: '#fff'
//   buttonColorDark: 'gray',  // default: '#100f2c'
//   buttonColorLight: '#fff', // default: '#fff'
//   saveInCookies: false, // default: true,
//     autoMatchOsTheme: true, // default: true
// }

// const darkmode = new Darkmode(options);
// darkmode.showWidget();



// ----------------------new dark-button--------------------------------------------------------------------------------

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});






