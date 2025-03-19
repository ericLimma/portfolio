const toggleMenu = () => {
    document.getElementById('menu-mobile').classList.toggle('show');
};

document.getElementById('menu-icon').addEventListener('click', toggleMenu);
document.getElementById('close-icon').addEventListener('click', toggleMenu);

function toggleVisibility() {
    var content = document.getElementById('contentToToggle');
    content.style.display = (content.style.display === 'none') ? 'block' : 'none';
}