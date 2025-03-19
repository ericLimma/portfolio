class Slider {
        constructor(slider, options = {}) {
                this.slider = slider;
                this.slideList = this.slider.querySelectorAll('[data-slide="slide-item"]');
                this.slideDisplay = this.slider.querySelector('[data-slide="slide-display"]');
                /* state */
                this.slideType = options.slideType;
                this.slideColumns;
                this.dots = options.dots;
                this.loop = options.loop;
                this.currentIndex = 0;
                this.savedPosition = 0;
                this.isTransitioning = false; // Novo: controle de transição

                this.adjustLayout();
                window.addEventListener('resize', () => this.adjustLayout());

                if (options.controls) this.activeControls();
                this.crateDraggableArea();

                if (this.loop) this.createSlideClones();
                if (this.dots) this.activeDots();
                if (options.autoPlay) this.activeAutoPlay();
        }


        createSlideClones() {
                for (let i = 0; i < this.slideColumns; i++) {
                        const firstSlide = this.slideList[i].cloneNode(true);
                        firstSlide.classList.add('slide-cloned');
                        firstSlide.dataset.index = this.slideList.length + i;
                        this.slideTrack.appendChild(firstSlide);

                        const lastSlide = this.slideList[this.slideList.length - 1 - i].cloneNode(true);
                        lastSlide.classList.add('slide-cloned');
                        lastSlide.dataset.index = -1 - i;
                        this.slideTrack.prepend(lastSlide);
                }

                // Ajusta o currentIndex para começar no primeiro item original
                this.currentIndex = this.slideColumns; // Ignora os clones à esquerda
                this.translateTrack(true); // Move o slider para a posição inicial sem transição
        }

        adjustLayout() {
                this.width = window.innerWidth;

                // Em telas menores que 768px, exibe apenas 1 slide
                if (this.width < 768) {
                        this.slideColumns = 1;
                } else {
                        // Em telas maiores, aplica a lógica normal
                        switch (this.slideType) {
                                case 'single':
                                        this.slideColumns = 1;
                                        break;
                                case 'double':
                                        this.slideColumns = 2;
                                        break;
                                case 'triple':
                                        this.slideColumns = 3;
                                        break;
                                case 'quadruple':
                                        this.slideColumns = 4;
                                        break;
                                case 'quintuple':
                                        this.slideColumns = 5;
                                        break;
                                default:
                                        this.slideColumns = 1;
                                        break;
                        }
                }
                this.setSliderTrack();
        }

        setSliderTrack() {
                const sliderDisplayWidth = this.slideDisplay.clientWidth;
                const itemWidth = (sliderDisplayWidth - (this.slideColumns - 1) * 16) / this.slideColumns;

                this.slideTrack = document.createElement('div');
                this.slideTrack.classList.add('slide-track');
                this.slideTrack.dataset.slide = 'slide-track';

                this.slideDisplay.innerHTML = '';
                this.slideList.forEach((item, i) => {
                        item.style.width = `${itemWidth}px`;
                        item.dataset.index = i;
                        this.slideTrack.appendChild(item);
                });
                this.slideDisplay.appendChild(this.slideTrack);
                this.slideTrackGap = parseFloat(window.getComputedStyle(this.slideTrack).gap);
        }

        activeControls() {
                const slideControls = this.slider.querySelector('[data-slide="slide-controls"]');
                slideControls.style.display = 'flex';
                const prevControl = this.slider.querySelector('[data-slide="slide-control-prev"]');
                prevControl.addEventListener('click', () => {
                        this.prevSlide();
                });
                const nextControl = this.slider.querySelector('[data-slide="slide-control-next"]');
                nextControl.addEventListener('click', () => {
                        this.nextSlide();
                });
        }

        activeAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                        this.nextSlide();
                }, 3000);
        }

        pauseAutoPlay() {
                clearInterval(this.autoPlayInterval)
        }

        crateDraggableArea() {
                const draggableArea = document.createElement('div');
                draggableArea.dataset.slide = 'slide-draggable';
                draggableArea.classList.add('slide-draggable');

                // Eventos de mouse
                draggableArea.addEventListener('mousedown', (event) => {
                        this.onDragStart(event);
                });

                // Eventos de touch (com { passive: false })
                draggableArea.addEventListener('touchstart', (event) => {
                        if (event.cancelable) {
                                event.preventDefault(); // Evita o comportamento padrão do touch
                        }
                        this.onDragStart(event.touches[0]); // Usa o primeiro toque
                }, { passive: false });

                // Pausa o autoplay quando o mouse entra no draggable
                draggableArea.addEventListener('mouseenter', () => {
                        this.pauseAutoPlay()
                });

                // Retoma o autoplay quando o mouse sai do draggable
                draggableArea.addEventListener('mouseleave', () => {
                        this.activeAutoPlay()
                });

                this.slider.appendChild(draggableArea);
        }

        onDragStart(event) {
                this.isDragging = true;
                this.startX = event.clientX || event.pageX;
                this.initialPosition = this.savedPosition;

                // Adiciona os listeners de movimento e fim
                document.addEventListener('mousemove', this.onDragMove.bind(this));
                document.addEventListener('mouseup', this.onDragEnd.bind(this));
                document.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });
                document.addEventListener('touchend', this.onDragEnd.bind(this));
        }

        onDragMove(event) {
                if (!this.isDragging) return;

                const currentX = event.clientX || event.touches[0].clientX;
                const deltaX = currentX - this.startX;
                const newPosition = this.initialPosition + deltaX;

                this.slideTrack.style.transform = `translateX(${newPosition}px)`;
                this.savedPosition = newPosition;
        }

        onDragEnd() {
                if (!this.isDragging) return;

                this.isDragging = false;

                // Remove os listeners
                document.removeEventListener('mousemove', this.onDragMove.bind(this));
                document.removeEventListener('mouseup', this.onDragEnd.bind(this));
                document.removeEventListener('touchmove', this.onDragMove.bind(this));
                document.removeEventListener('touchend', this.onDragEnd.bind(this));

                const itemWidth = this.slider.querySelector('[data-slide="slide-item"]').clientWidth;
                const gap = this.slideTrackGap;
                const totalWidth = itemWidth + gap;

                const currentPosition = this.savedPosition;
                const newIndex = Math.round(Math.abs(currentPosition) / totalWidth);

                this.currentIndex = Math.max(0, Math.min(newIndex, this.slideList.length - this.slideColumns));

                this.translateTrack();
        }

        activeDots() {
                const dotsContainer = document.createElement('div');
                dotsContainer.classList.add('slide-dots-container');

                for (let i = 0; i < this.slideList.length; i++) {
                        const slideDot = document.createElement('button');
                        slideDot.classList.add('slide-dot');
                        slideDot.dataset.index = i;
                        dotsContainer.appendChild(slideDot);

                        if (i === 0) {
                                slideDot.classList.add('active');
                        }

                        slideDot.addEventListener('click', () => {
                                this.moveToSlide(i + this.slideColumns); // Ajusta o índice para ignorar os clones
                        });
                }

                this.slider.appendChild(dotsContainer);
        }

        updateActiveDot() {
                const dots = this.slider.querySelectorAll('.slide-dot');
                const activeIndex = this.currentIndex - this.slideColumns; // Ajusta o índice para corresponder aos itens originais

                dots.forEach((dot, index) => {
                        if (index === activeIndex) {
                                dot.classList.add('active');
                        } else {
                                dot.classList.remove('active');
                        }
                });
        }

        prevSlide() {
                if (this.isTransitioning) return; // Bloqueia se estiver em transição
                this.isTransitioning = true; // Inicia a transição

                if (this.currentIndex > this.slideColumns) {
                        this.currentIndex -= 1;
                        this.translateTrack();
                } else if (this.loop) {
                        this.currentIndex = this.slideList.length + this.slideColumns - 1;
                        this.translateTrack(true);

                        setTimeout(() => {
                                this.translateTrack();
                        }, 50);
                }

                // Libera o bloqueio após a transição
                setTimeout(() => {
                        this.isTransitioning = false;
                }, 500); // Tempo igual à duração da transição (0.5s)
        }

        nextSlide() {
                if (this.isTransitioning) return; // Bloqueia se estiver em transição
                this.isTransitioning = true; // Inicia a transição

                if (this.currentIndex < this.slideList.length + this.slideColumns - 1) {
                        this.currentIndex += 1;
                        this.translateTrack();
                } else if (this.loop) {
                        this.currentIndex = this.slideColumns;
                        this.translateTrack(true);

                        setTimeout(() => {
                                this.translateTrack();
                        }, 50);
                }

                // Libera o bloqueio após a transição
                setTimeout(() => {
                        this.isTransitioning = false;
                }, 500); // Tempo igual à duração da transição (0.5s)
        }

        translateTrack(disableTransition = false) {
                const itemWidth = this.slider.querySelector('[data-slide="slide-item"]').clientWidth;
                const gap = this.slideTrackGap;
                const totalWidth = itemWidth + gap;

                const position = -(totalWidth * this.currentIndex);
                this.savedPosition = position;

                this.slideTrack.style.transition = !disableTransition ? 'transform 0.5s' : 'none';
                this.slideTrack.style.transform = `translateX(${position}px)`;

                if (this.dots) {
                        this.updateActiveDot();
                }
        }
}

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
})