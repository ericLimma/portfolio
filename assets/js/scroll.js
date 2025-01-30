document.addEventListener('DOMContentLoaded', () => {
        if (document.body.clientWidth > 800) {
                const sections = document.querySelectorAll('.section');
                let currentIndex = 0;
                let isScrolling = false; // Evita múltiplos eventos de scroll ao mesmo tempo
                document.getElementById('home').scrollIntoView({
                        block: 'center'
                })

                function scrollToSection(index) {
                        if (index >= 0 && index < sections.length) {
                                sections[index].scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'center', // Centraliza a seção
                                });
                        }
                }

                document.addEventListener('wheel', (event) => {
                        if (isScrolling) return;
                        isScrolling = true;

                        if (event.deltaY > 0 && currentIndex < sections.length - 1) {
                                currentIndex++;
                        } else if (event.deltaY < 0 && currentIndex > 0) {
                                currentIndex--;
                        }

                        scrollToSection(currentIndex);

                        setTimeout(() => {
                                isScrolling = false;
                        }, 500); // Controle do tempo do scroll
                });

                document.addEventListener('keydown', (event) => {
                        if (isScrolling) return;
                        isScrolling = true;

                        if (event.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                                currentIndex++;
                        } else if (event.key === 'ArrowUp' && currentIndex > 0) {
                                currentIndex--;
                        }

                        scrollToSection(currentIndex);

                        setTimeout(() => {
                                isScrolling = false;
                        }, 500); // Controle do tempo do scroll
                });
        }

});
let resizeTimeout;

window.addEventListener('resize', () => {
        console.log('redimensionado')
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
                console.log('recarregado')
                location.reload(); // Força o refresh da página
        }, 1000);
})