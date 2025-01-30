const slideWrapper = document.querySelector('[data-slide="wrapper"]');
const slideList = document.querySelector('[data-slide = "list"]');
const navPrevButton = document.querySelector('[data-slide="nav-prev-button"]');
const navNextButton = document.querySelector('[data-slide = "nav-next-button"]');
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]');
let slideItems = document.querySelectorAll('[data-slide="item"]');
let controlsButtons;
let slideInterval;
const state = {
        startingPoint: 0,
        savedPosition: 0,
        currentPoint: 0,
        movement: 0,
        currentSlideIndex: 0,
        autoPlay: true,
        timeInterval: 3000,
        controls: true
};

function translateSlide({ position }) {
        state.savedPosition = position;
        slideList.style.transform = `translateX(${position}px)`;
}

function getSlidesPerView() {
        const windowWidth = window.innerWidth;

        if (windowWidth > 962) return 3;
        else if (windowWidth <= 962 && windowWidth > 590) return 2;
        else return 1;
}

function getCenterPosition({ index }) {
        const slidesPerView = getSlidesPerView();
        const slideItem = slideItems[index];
        const slideWidth = slideItem.clientWidth;
        const totalSlidesWidth = slideWidth * slidesPerView;
        const windowWidth = document.body.clientWidth;
        const margin = (windowWidth - totalSlidesWidth) / 2;

        const position = margin - (index * slideWidth);
        return position;
}

function adjustVisibleSlides() {
        const slidesPerView = getSlidesPerView();

        slideList.style.width = `${slideItems[0].clientWidth * slideItems.length}px`;
        const totalSlidesWidth = slideItems[0].clientWidth * slideItems.length;
        if (slideList.offsetWidth < totalSlidesWidth) {
                slideList.style.width = `${totalSlidesWidth}px`;
        }

        setVisibled({ index: state.currentSlideIndex, animate: true });
}

function setVisibled({ index, animate }) {
        const slidesPerView = getSlidesPerView();
        if (index < 0) index = slideItems.length - slidesPerView;
        if (index >= slideItems.length) index = slidesPerView - 1;

        const position = getCenterPosition({ index });
        state.currentSlideIndex = index;
        slideList.style.transition = animate ? "transform .5s" : 'none';
        activeControlButton(index);
        translateSlide({ position });
}

function nextSlide() {
        const slidesPerView = getSlidesPerView();
        if (state.currentSlideIndex + slidesPerView >= slideItems.length) {
                setVisibled({ index: slidesPerView, animate: false });
        } else {
                setVisibled({ index: state.currentSlideIndex + 1, animate: true });
        }
}

function prevSlide() {
        const slidesPerView = getSlidesPerView();
        if (state.currentSlideIndex - slidesPerView < 0) {
                setVisibled({ index: slideItems.length - slidesPerView - 1, animate: false });
        } else {
                setVisibled({ index: state.currentSlideIndex - 1, animate: true });
        }
}

function createControlButtons() {
        controlsButtons = document.querySelectorAll('[data-slide="control-button"]');
        slideItems.forEach(() => {
                const controlButton = document.createElement('button');
                controlButton.classList.add('slide-control-button');
                controlButton.dataset.slide = 'control-button';
                controlsWrapper.append(controlButton);
        });
}

function activeControlButton(index) {
        const slideItem = slideItems[index];
        const dataIndex = Number(slideItem.dataset.index);
        const controlButton = controlsButtons[dataIndex];

        controlsButtons.forEach((controlButtonItem) => {
                controlButtonItem.classList.remove('active');
        });

        if (controlButton) controlButton.classList.add('active');
}

function createSlideClones() {
        const slidesPerView = getSlidesPerView();

        for (let i = 0; i < slidesPerView; i++) {
                const firstSlide = slideItems[i].cloneNode(true);
                firstSlide.classList.add('slide-cloned');
                firstSlide.dataset.index = slideItems.length + i;
                slideList.append(firstSlide);

                const lastSlide = slideItems[slideItems.length - 1 - i].cloneNode(true);
                lastSlide.classList.add('slide-cloned');
                lastSlide.dataset.index = -1 - i;
                slideList.prepend(lastSlide);
        }

        slideItems = document.querySelectorAll('[data-slide="item"]');
        adjustVisibleSlides();
}

function onMouseDown(event, index) {
        const slideItem = event.currentTarget;
        state.startingPoint = event.clientX;
        state.currentPoint = event.clientX - state.savedPosition;
        state.currentSlideIndex = index;
        slideList.style.transition = 'none';

        slideItem.style.cursor = 'grabbing';
        slideItem.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) {
        state.movement = event.clientX - state.startingPoint;
        const position = event.clientX - state.currentPoint;
        translateSlide({ position });
}

function onMouseUp(event) {
        const pointsToMove = event.type.includes('touch') ? 50 : 150;

        const slideItem = event.currentTarget;

        if (state.movement < -pointsToMove) {
                nextSlide();
        } else if (state.movement > pointsToMove) {
                prevSlide();
        } else {
                setVisibled({ index: state.currentSlideIndex, animate: true });
        }

        slideItem.removeEventListener('mouseleave', onMouseUp);
        slideItem.removeEventListener('mousemove', onMouseMove);
        slideItem.style.cursor = 'grab';
}

function onTouchStart(event, index) {
        event.clientX = event.touches[0].clientX;
        onMouseDown(event, index);
        const slideItem = event.currentTarget;
        slideItem.addEventListener('touchmove', onTouchMove);
}

function onTouchMove(event) {
        event.clientX = event.touches[0].clientX;
        onMouseMove(event);
}

function onTouchEnd(event) {
        onMouseUp(event);
        const slideItem = event.currentTarget;
        slideItem.removeEventListener('touchmove', onTouchMove);
}

function onControlButtonClick(index) {
        const slidesPerView = getSlidesPerView();
        const targetIndex = index + slidesPerView;
        setVisibled({ index: targetIndex, animate: true });
}

function onSlideListTransitionEnd() {
        const slideItem = slideItems[state.currentSlideIndex];
        const slidesPerView = getSlidesPerView();

        if (slideItem.classList.contains("slide-cloned")) {
                if (Number(slideItem.dataset.index) >= slideItems.length - slidesPerView) {
                        setVisibled({ index: slidesPerView, animate: false });
                } else if (Number(slideItem.dataset.index) < slidesPerView) {
                        setVisibled({ index: slideItems.length - slidesPerView - 1, animate: false });
                }
        }
}

function setAutoPlay() {
        if (state.autoPlay) {
                slideInterval = setInterval(() => {
                        nextSlide();
                }, state.timeInterval);
        }
}

function setListeners() {
        controlsButtons = document.querySelectorAll('[data-slide="control-button"]');
        controlsButtons.forEach((controlButton, index) => {
                controlButton.addEventListener('click', () => {
                        onControlButtonClick(index);
                });
        });
        slideItems.forEach((slideItem, index) => {
                slideItem.addEventListener('dragstart', event => {
                        event.preventDefault();
                });
                slideItem.addEventListener('mousedown', (event) => {
                        onMouseDown(event, index);
                        slideItem.addEventListener('mouseleave', onMouseUp);
                });
                slideItem.addEventListener('mouseup', onMouseUp);
                slideItem.addEventListener('touchstart', (event) => {
                        onTouchStart(event, index);
                });
                slideItem.addEventListener('touchend', onTouchEnd);
        });
        navNextButton.addEventListener('click', nextSlide);
        navPrevButton.addEventListener('click', prevSlide);
        slideList.addEventListener('transitionend', onSlideListTransitionEnd);
        slideWrapper.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
        });
        slideWrapper.addEventListener('mouseleave', setAutoPlay);
        let resizeTimeout;
        window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                        setVisibled({ index: state.currentSlideIndex, animate: false });
                        adjustVisibleSlides();

                }, 300);
        });
}

function initSlider(options) {
        const { startAtIndex = 0, autoPlay = true, timeInterval = 3000, controls = true, arrows = true } = options;
        const slidesPerView = getSlidesPerView();

        state.autoPlay = autoPlay;
        state.timeInterval = timeInterval;
        if (!arrows) {
                navPrevButton.style.display = 'none';
                navNextButton.style.display = 'none';
        }

        createControlButtons();
        createSlideClones();

        setVisibled({ index: startAtIndex + slidesPerView, animate: false });

        if (!controls) {
                document.getElementById('slide-controls').style.display = 'none';
        }
        if (state.autoPlay) {
                setAutoPlay();
        }

        setListeners();
}

initSlider({
        startAtIndex: 0,
        autoPlay: true,
        timeInterval: 3000,
        controls: false,
        arrows: false
});