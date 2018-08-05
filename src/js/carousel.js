const Carousel = (() => {
  const whichTransitionEvent = () => {
      const el = document.createElement('fake'),
          transEndEventNames = {
              'WebkitTransition': 'webkitTransitionEnd',
              'MozTransition': 'transitionend',
              'transition': 'transitionend'
          };
  
      for (const t in transEndEventNames) {
          if (el.style[t] !== undefined) {
              return transEndEventNames[t];
          }
      }
  }
  
  let inTransition = false;
  
  const transEndEventName = whichTransitionEvent();
  
  const carousel = document.querySelector('.cdt-carousel');
  if (carousel) {
    const carouselType = carousel.getAttribute('data-carousel-type');
    const autoSlide = carousel.getAttribute('data-auto-slide') ? (carousel.getAttribute('data-auto-slide') == 'true' ? true : false) : false;
    const slideDelay = carousel.getAttribute('data-slide-delay');
    
    let infinite = carousel.getAttribute('data-infinite') ? (carousel.getAttribute('data-infinite') == 'true' ? true : false) : false;
    const controls = carousel.querySelectorAll('.controls li');
    const arrowLeft = carousel.querySelector('.arrow.left');
    const arrowRight = carousel.querySelector('.arrow.right');
    const sections = carousel.querySelectorAll('section');
    const numElements = sections.length;
    
    const opacityDuration = carouselType === 'fade' ? carousel.getAttribute('data-opacity-duration') : 0;
    
    const carouselSlideSenseContainer = document.createElement('div');
    
    let selected = 0;
    
    const resetSections = () => {
        if (carouselType === 'slide-sense') {
    
            carouselSlideSenseContainer.classList.add('slideSense-container');
            carousel.prepend(carouselSlideSenseContainer); //prepend not working in IE ?!
        }
        sections.forEach((section, index) => {
            if (carouselType === 'fade') {
                section.style.zIndex = 0;
                section.style.opacity = 0;
                section.style.transition = 'opacity ' + opacityDuration + 'ms';
            } else if (carouselType === 'overlay' || carouselType === 'slide') {
                if (index !== selected) {
                    section.style.zIndex = 0;
                }
            } else if (carouselType === 'slide-sense') {
                section.style.position = 'relative';
                carouselSlideSenseContainer.appendChild(section);
            }
        });
    }
    
    const runCarousel = (index, dir) => {
        if (inTransition) return;
        if (!infinite && index === numElements - 1) {
            arrowRight.style.display = 'none';
        } else {
            arrowRight.style.display = 'block';
        }
        if (!infinite && index === 0) {
            arrowLeft.style.display = 'none';
        } else {
            arrowLeft.style.display = 'block';
        }
        /* setting z-index of all to 0 */
        if (carouselType !== 'slide-sense') {
            resetSections();
        }
        if (carouselType === 'slide-sense') {
    
            carouselSlideSenseContainer.style.transition = 'transform 1s';
            carouselSlideSenseContainer.style.transform = 'translateX(' + -index * 25 + '%)';
            selected = index;
        }
    
        if (carouselType === 'slide') {
            sections[index].style.zIndex = 5;
        } else if (carouselType === 'overlay') {
            sections[selected].style.zIndex = 7;
            sections[index].style.zIndex = 6;
        }
    
        if (carouselType === 'overlay' || carouselType === 'slide') {
            if (infinite) {
                if ((index > selected && (index !== numElements - 1)) || (dir && dir === 'right')) {
                    sections[index].style.transform = 'translateX(100%)';
                } else {
                    sections[index].style.transform = 'translateX(-100%)';
                }
            } else {
                if (index > selected) {
                    sections[index].style.transform = 'translateX(100%)';
                } else {
                    sections[index].style.transform = 'translateX(-100%)';
                }
            }
        }
    
        if (controls.length) {
            controls.forEach(function(control) {
                control.classList.remove('selected');
            });
        }
    
        setTimeout(() => {
            inTransition = true;
            if (carouselType === 'slide-sense') {
                if (controls.length) controls[index].classList.add('selected');
                carouselSlideSenseContainer.addEventListener(transEndEventName, function(e) {
                    selected = index;
                    inTransition = false;
                });
            } else {
                sections[selected].style.transition = 'transform 1s';
                if (carouselType === 'fade') {
                    /* set corresponding section z-index to 1*/
                    sections[index].style.zIndex = 6;
                    sections[index].style.opacity = 1;
                    selected = index;
                    inTransition = false;
                }
                if (carouselType === 'slide') {
                    sections[index].style.transition = 'transform 1s';
                }
    
                if (carouselType === 'overlay' || carouselType === 'slide') {
                    if (infinite) {
                        if ((index > selected && (index !== numElements - 1)) || (dir && dir === 'right')) {
                            sections[selected].style.transform = 'translateX(-100%)';
                        } else {
                            sections[selected].style.transform = 'translateX(100%)';
                        }
                    } else {
                        if (index > selected) {
                            sections[selected].style.transform = 'translateX(-100%)';
                        } else {
                            sections[selected].style.transform = 'translateX(100%)';
                        }
                    }
                    sections[index].style.transform = 'translateX(0)';
                    sections[index].style.transform = 'translateX(0)';
                }
                if (controls.length) controls[index].classList.add('selected');
                let transitionCounter = 0;
                sections[selected].addEventListener(transEndEventName, (e) => {
                    transitionCounter++;
                    if (transitionCounter === 1 && e.propertyName === 'transform') {
                        sections[selected].style.transform = '';
                        sections[selected].style.transition = '';
                        sections[index].style.transform = '';
                        sections[index].style.transition = '';
                        if (carouselType === 'overlay') {
                            sections[selected].style.zIndex = 6;
                            sections[index].style.zIndex = 7;
                        } else if (carouselType === 'slide') {
                            resetSections();
                            sections[selected].style.zIndex = 5;
                            sections[index].style.zIndex = 6;
                        }
                        selected = index;
                        inTransition = false;
                    }
                });
            }
        }, 0);
    }
    
    const slide = () => {
        infinite = true;
        const intervalId = setInterval(() => {
            let index = 0;
            if (selected + 1 >= numElements) {
                if (infinite) {
                    index = 0
                } else {
                    index = numElements - 1;
                }
            } else {
                index = selected + 1;
            }
            runCarousel(index);
        }, slideDelay);
    }
    if (autoSlide) {
        slide();
    }
    if (arrowLeft) {
        arrowLeft.addEventListener('click', () => {
            if (selected === 0 && !infinite) return;
            let index = 0;
            if (selected - 1 < 0) {
                if (infinite) {
                    index = numElements - 1
                } else {
                    index = 0;
                }
            } else {
                index = selected - 1;
            }
            runCarousel(index, 'left');
        });
    }
    if (arrowRight) {
        arrowRight.addEventListener('click', function() {
            if (selected === numElements - 1 && !infinite) return
            let index = 0;
            if (selected + 1 >= numElements) {
                if (infinite) {
                    index = 0
                } else {
                    index = numElements - 1;
                }
            } else {
                index = selected + 1;
            }
            runCarousel(index, 'right');
        });
    }
    
    const initCarousel = function() {
        resetSections();
        sections[selected].style.zIndex = 6;
        if (carouselType === 'fade') {
            sections[selected].style.opacity = 1;
        }
        if (controls.length) controls[selected].classList.add('selected');
    
        controls.forEach((control, index) => {
            control.addEventListener('click', function() {
                if (index === selected) return;
                runCarousel(index);
            });
        });
    }
    initCarousel();
  }
})();

export default Carousel;