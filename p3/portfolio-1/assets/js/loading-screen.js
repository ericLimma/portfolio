document.addEventListener('DOMContentLoaded', () => {

        // Cria o elemento de carregamento
        const loadingScreen = document.getElementById('loading');

        const circle = document.getElementById('circle');
        const loadingPercent = document.getElementById('loading-percent');
        const loadingText = document.getElementById('loading-text');

        let angle = 0;
        let percent = 0;

        // Aumenta o intervalo para 16ms (aproximadamente 60 FPS)
        const intervalId = setInterval(() => {
                angle += 2; // Aumente a velocidade de rotação

                if (angle > 360) {
                        angle = 0;
                }

                circle.style.transform = `rotate(${angle}deg)`;

        }, 10);

        const intervalPercent = setInterval(() => {
                percent += 4;
                loadingPercent.textContent = `${percent}%`;

                if (percent >= 100) {
                        clearInterval(intervalPercent);
                        loadingText.textContent = 'Carregamento concluído!';
                        setTimeout(() => {
                                loadingScreen.style.display = 'none'; // Torna o loading invisível
                                clearInterval(intervalId);
                        }, 800);
                }

        }, 30);
});
