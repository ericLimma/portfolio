const whatsappLinks = document.querySelectorAll('.whatsapp');

function updateWhatsappLinks() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        whatsappLinks.forEach((item) => {
                item.href = isMobile ?
                        "https://wa.me/5519996624496" :
                        "https://web.whatsapp.com/send?phone=5519996624496";
        });
}

// Atualiza ao carregar a página
updateWhatsappLinks();

// Atualiza ao redimensionar a tela
window.addEventListener("resize", updateWhatsappLinks);