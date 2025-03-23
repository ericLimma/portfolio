export function menu() {
        const hamMenu = document.querySelector('[data-button="ham-menu"]');
        hamMenu.addEventListener('click', () => {
                document.querySelector('.nav-vertical').classList.toggle('show');
        });
}