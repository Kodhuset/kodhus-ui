const BGParallax = (() => {
  const headers = document.querySelectorAll('[data-bg-parallax]');
  let ticking = false;
  let lastKnownScrollPosition = 0;
  const resetParallax = (item) => {
    if (item) item.style.backgroundPosition = 'center 0';
    else {
      headers.forEach((header) => {
        header.style.backgroundPosition = 'center 0';
      });
    }
  };

  resetParallax();

  const calculateRangeValue = (oldMin, oldMax, newMin, newMax, oldValue) => {
    const oldRange = (oldMax - oldMin);
    const newRange = (newMax - newMin);
    return (((oldValue - oldMin) * newRange) / oldRange) + newMin;
  };

  const scroll = (scrollPos) => {
    headers.forEach((header) => {
      if (scrollPos > header.offsetTop - window.innerHeight / 2) {
        const oldMin = (header.offsetTop) < (window.innerHeight / 2) ? header.offsetTop
          : header.offsetTop - window.innerHeight / 2;
        const oldMax = oldMin + header.offsetHeight;
        const yPosition = calculateRangeValue(oldMin, oldMax, 0, -50, scrollPos);
        header.style.backgroundPosition = `center ${yPosition}px`;
      } else {
        resetParallax(header);
      }
    });
  };

  window.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        scroll(lastKnownScrollPosition);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

export default BGParallax;
