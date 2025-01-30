const html = document.querySelector('html');
const check = document.getElementById('check');


check.addEventListener('change', () => {
    html.classList.toggle('light-mode');
} )