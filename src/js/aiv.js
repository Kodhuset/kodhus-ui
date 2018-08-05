const Aiv = (() => {
  const revealElements = document.querySelectorAll('[data-aiv]');

  const revealElement = (element, scrollPos, duration, timingFunction, delay) => {
    const elementHeight = element.offsetHeight;
    const elementTop = element.offsetTop;
    element.style.transformOrigin = '50% 100%';
    element.style.transform = `translateY(${100}px) scale(1)`;
    element.style.opacity = '0';
    // if (scroll_pos + window.innerHeight > elTop + elHeight * .4) {
    if (scrollPos + window.innerHeight > elementTop + elementHeight) {
      // el.style.transition = 'all 1s cubic-bezier(0.6, 0.2, 0.1, 1)';
      element.style.transition = `all ${duration}ms ${delay}ms ${timingFunction}`;
      setTimeout(() => {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.opacity = '1';
      }, 0);
    }
  };
  // cache element properties
  const revealElementsCached = [];
  revealElements.forEach((elem) => {
    revealElementsCached.push({
      element: elem,
      duration: elem.getAttribute('data-duration') || 1000,
      timingFunction: elem.getAttribute('data-timing-function') || '',
      delay: elem.getAttribute('data-delay') ? parseInt(elem.getAttribute('data-delay'), 0) : 0,
      elementHeight: elem.offsetHeight,
      elementTop: elem.offsetTop,
      onChildren: elem.getAttribute('data-aiv-children') || false,
      childrenDelay: elem.getAttribute('data-children-delay') || 0,
    });
  });
  const reveal = (scrollPos) => {
    revealElementsCached.forEach((elementObj) => {
      if (elementObj.onChildren) {
        elementObj.element.querySelectorAll(':scope > *').forEach((element, index) => {
          revealElement(element, scrollPos, elementObj.duration,
            elementObj.timingFunction, index * elementObj.childrenDelay);
        });
      } else {
        revealElement(elementObj.element, scrollPos, elementObj.duration,
          elementObj.timingFunction, elementObj.delay);
      }
    });
  };

  if (revealElements.length) {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    window.addEventListener('scroll', () => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          reveal(lastKnownScrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    });
  }
})();

export default Aiv;
