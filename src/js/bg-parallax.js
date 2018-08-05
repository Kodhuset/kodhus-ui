const BGParallax = (() => {
  const headers = document.querySelectorAll('[data-bg-parallax]');
  let ticking = false;
  let last_known_scroll_position = 0;
  const resetParallax = (item) => {
    if (item) item.style.backgroundPosition = 'center 0';
    else {
        headers.forEach((header) => {
        header.style.backgroundPosition = 'center 0';  
        });  
    }
  }
  resetParallax();

  const calculateRangeValue = (oldMin, oldMax, newMin, newMax, oldValue) => {
    let oldRange = (oldMax - oldMin); 
    let newRange = (newMax - newMin);
    return (((oldValue - oldMin) * newRange) / oldRange) + newMin;
  }

  const scroll = (scroll_pos) => {
    headers.forEach((header, index) => {
        if (scroll_pos > header.offsetTop - window.innerHeight / 2) {
        let oldMin = (header.offsetTop) < (window.innerHeight/2) ? header.offsetTop : header.offsetTop - window.innerHeight / 2;
        let oldMax = oldMin + header.offsetHeight;
        let yPosition = calculateRangeValue(
            oldMin, oldMax, 0, -50, scroll_pos);
        header.style.backgroundPosition = 'center ' + yPosition + 'px';
        } else {
        resetParallax(header);
        }  
    });
  }

  window.addEventListener('scroll', (e) => {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
          scroll(last_known_scroll_position);
        ticking = false;
        });
        ticking = true;
    }
  });
})();

export default BGParallax;