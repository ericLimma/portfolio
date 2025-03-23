#Slider Component
O Slider Component é um componente de carrossel (slider) responsivo e altamente configurável, desenvolvido em JavaScript puro. Ele permite a exibição de slides em diferentes layouts (1 a 5 colunas) e inclui funcionalidades como controles de navegação, dots (indicadores de slide), loop infinito, autoplay e suporte a arrastar (drag) para dispositivos touch e mouse.

###Funcionalidades
-*Layout* Responsivo:* Ajusta automaticamente o número de colunas exibidas com base no tamanho da tela.

-*Tipos de Slide:* Suporta layouts de 1 a 5 colunas (single, double, triple, quadruple, quintuple).

-*Controles de Navegação:* Botões de "próximo" e "anterior" para navegar entre os slides.

-*Dots (Indicadores):* Indicadores de slide que permitem pular diretamente para um slide específico.

-*Loop Infinito:* Permite a navegação contínua entre os slides.

-*Autoplay:* Reprodução automática dos slides em intervalos configuráveis.

-*Arrastar (Drag):* Suporte a arrastar slides em dispositivos touch e mouse.

-*Pausar Autoplay:* Pausa a reprodução automática quando o mouse está sobre o slider.

###Como Usar
Estrutura HTML
Para utilizar o Slider Component, você precisa seguir a estrutura HTML abaixo:

```<div class="slide-container" data-slide='slide-container' data-type="quadruple" data-slide-loop data-slide-auto>
    <div class="slide-display" data-slide='slide-display'>
        <div class="slide-item project-item" data-slide="slide-item"></div>
        <div class="slide-item project-item" data-slide="slide-item"></div>
        <div class="slide-item project-item" data-slide="slide-item"></div>
        <div class="slide-item project-item" data-slide="slide-item"></div>
        <div class="slide-item project-item" data-slide="slide-item"></div>
        <div class="slide-item project-item" data-slide="slide-item"></div>
    </div>
    <div class="slide-controls" data-slide='slide-controls'>
        <img class="slide-control slide-control-prev" data-slide='slide-control-prev' src="assets/icons/prev.webp" alt="prev button">
        <img class="slide-control slide-control-next" data-slide='slide-control-next' src="assets/icons/next.webp" alt="next button">
    </div>
</div>```

###Atributos do Slider
-*data-slide='slide-container':* Define o contêiner do slider.

-*data-type:* Define o tipo de layout do slider. Valores possíveis: single, double, triple, quadruple, quintuple.

-*data-slide-loop:* Habilita o loop infinito.

-*data-slide-auto:* Habilita o autoplay.

-*data-slide-dots:* Habilita os dots (indicadores de slide).

-*data-slide-controls:* Habilita os controles de navegação.

###Inicialização do Slider
O slider é inicializado automaticamente ao carregar a página. Basta incluir o código JavaScript fornecido no seu projeto.
```
const sliders = document.querySelectorAll('[data-slide="slide-container"]');

sliders.forEach((slider) => {
    const slideType = slider.dataset.type;
    const dots = slider.hasAttribute('data-slide-dots');
    const controls = slider.hasAttribute('data-slide-controls');
    const loop = slider.hasAttribute('data-slide-loop');
    const autoPlay = slider.hasAttribute('data-slide-auto');

    new Slider(slider, {
        slideType,
        dots,
        controls,
        loop,
        autoPlay
    });
});```

###Opções do Slider
O construtor da classe *Slider* aceita as seguintes opções:

```markdown
|Opção  |Descrição| 
|-------|---------|
| slideType | Tipo de layout do slider (single, double, triple, quadruple, quintuple).| 
| dots | Habilita os dots (indicadores de slide).      | 


controls	Habilita os controles de navegação.
loop	Habilita o loop infinito.
autoPlay	Habilita o autoplay.
Métodos Públicos
prevSlide(): Navega para o slide anterior.

nextSlide(): Navega para o próximo slide.

activeAutoPlay(): Inicia a reprodução automática.

pauseAutoPlay(): Pausa a reprodução automática.

moveToSlide(index): Navega para o slide especificado pelo índice.

Eventos
Mouse/Touch: O slider suporta interações de arrastar (drag) para navegar entre os slides.

Autoplay: O autoplay é pausado quando o mouse está sobre o slider e retomado quando o mouse sai.

Exemplo de Uso
Aqui está um exemplo completo de como usar o Slider Component:

<div class="slide-container" data-slide='slide-container' data-type="triple" data-slide-loop data-slide-auto data-slide-dots data-slide-controls>
    <div class="slide-display" data-slide='slide-display'>
        <div class="slide-item project-item" data-slide="slide-item">Slide 1</div>
        <div class="slide-item project-item" data-slide="slide-item">Slide 2</div>
        <div class="slide-item project-item" data-slide="slide-item">Slide 3</div>
        <div class="slide-item project-item" data-slide="slide-item">Slide 4</div>
        <div class="slide-item project-item" data-slide="slide-item">Slide 5</div>
        <div class="slide-item project-item" data-slide="slide-item">Slide 6</div>
    </div>
    <div class="slide-controls" data-slide='slide-controls'>
        <img class="slide-control slide-control-prev" data-slide='slide-control-prev' src="assets/icons/prev.webp" alt="prev button">
        <img class="slide-control slide-control-next" data-slide='slide-control-next' src="assets/icons/next.webp" alt="next button">
    </div>
</div>
Considerações Finais
O Slider Component é uma solução flexível e fácil de usar para criar carrosséis responsivos em projetos web. Com suas diversas opções de configuração, ele pode ser adaptado para atender a uma variedade de necessidades de design e interação.