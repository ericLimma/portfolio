'use strict'

const slideWrapper = document.querySelector('[data-slide="wrapper"]');
const slideList = document.querySelector('[data-slide = "list"]');
const navPrevButton = document.querySelector('[data-slide="nav-prev-button"]');
const navNextButton = document.querySelector('[data-slide = "nav-next-button"]');
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]');
const slideItems = document.querySelectorAll('[data-slide="slide-item"]');
let controlsButtons;

const state = {
        startingPoint: 0,
        savedPosition: 0,
        currentPoint: 0,
        movement: 0,
        currentSlideIndex: 0
}


/* if tela > 962 divide por 3 */
/* if tela <= 962 divide por 2 */
/* if tela <590 não divide */

function translateSlide({ position }) {
        state.savedPosition = position;
        slideList.style.transform = `translateX(${position}px)`;
}

function getCenterPosition({ index }) {
        const slideItem = slideItems[index];
        const slideWidth = slideItem.clientWidth;
        const windoWidth = document.body.clientWidth;
        const margin = (windoWidth - slideWidth) / 2
        const position = margin - (index * slideWidth);

        return position
}

function setVisibled({ index }) {

        const position = getCenterPosition({ index });

        state.currentSlideIndex = index;

        slideList.style.transition = "transition: transform .5s ease-in-out;"

        activeControlButton(index);
        translateSlide({ position });
}

function nextSlide() {
        setVisibled({ index: (state.currentSlideIndex + 1) });
}

function prevSlide() {
        setVisibled({ index: (state.currentSlideIndex - 1) });
}

function createControlButtons() {
        slideItems.forEach(() => {
                const controlButton = document.createElement('button');
                controlButton.classList.add('slide-control-button');
                controlButton.dataset.slide = 'control-button';
                controlsWrapper.append(controlButton);
        })
}
function activeControlButton(index) {
        const controlButton = controlsButtons[index]; // Corrigido para usar controlsButtons
        controlsButtons.forEach((controlButtonItem) => {
                controlButtonItem.classList.remove('active');
        });
        controlButton.classList.add('active');
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

        const slideItem = event.currentTarget;

        if (state.movement < -150) {
                nextSlide();

        } else if (state.movement > 150) {
                prevSlide();

        } else {
                setVisibled({ index: state.currentSlideIndex });

        }


        slideItem.removeEventListener('mousemove', onMouseMove);
        slideItem.style.cursor = 'grab';

}

function onControlButtonClick(index) {
        setVisibled({ index });
}

function onMouseLeave() {
        /* onMouseUp(); */
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

                });
                slideItem.addEventListener('mouseup', onMouseUp);
                slideItem.addEventListener('mouseleave', onMouseLeave);

        });

        navNextButton.addEventListener('click', nextSlide);
        navPrevButton.addEventListener('click', prevSlide);
};

function initSlider() {
        createControlButtons();
        setListeners();
        setVisibled({ index: 0 });
};

initSlider();