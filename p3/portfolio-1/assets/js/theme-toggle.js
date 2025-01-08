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