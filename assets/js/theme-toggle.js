document.querySelectorAll('.theme-toggle').forEach(e => {
        e.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
        });
});
document.querySelectorAll('.language-toggle').forEach(e => {
        e.addEventListener('click', () => {
                {
                        document.body.classList.toggle('language-en');
                }
        })
})
function detectUserLanguage() {
        const userLanguage = navigator.language || navigator.userLanguage;

        // Verifica se o idioma é português (pt-BR, pt-PT, etc.)
        if (userLanguage.startsWith('pt')) {
                return 'pt';
        }
        // Caso contrário, define o idioma como inglês
        return 'en';
}

// Função para definir o idioma do site
function setSiteLanguage(language) {
        document.documentElement.classList.remove('language-pt', 'language-en');
        document.documentElement.classList.add(`language-${language}`);
}

// Define o idioma inicial do site
const userLanguage = detectUserLanguage();
setSiteLanguage(userLanguage);