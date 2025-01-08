document.addEventListener('DOMContentLoaded', function () {
    var radios = document.querySelectorAll('.tab-controls input[type=radio]');
    var tabs = document.querySelectorAll('.tab-content .tab');

    radios.forEach(function (radio, index) {
        radio.addEventListener('change', function () {
            // Move todas as abas para fora da tela usando translateX e oculta o conteúdo
            tabs.forEach(function (tab) {
                tab.style.transform = 'translateX(150%)';
                
                tab.style.display = 'none'; // Oculta todas as abas
            });

            // Mostrar a aba correspondente
            var targetIndex = Array.from(radios).indexOf(radio);
            var targetTab = tabs[targetIndex];
            if (targetTab) {
                targetTab.style.display = 'flex'; // Exibe a aba selecionada
                setTimeout(function () {
                    targetTab.style.transform = 'translateX(0)';
                }, 100); // 100 milissegundos de atraso
            }
        });
    });
});
