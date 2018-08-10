class StepProgressBar {
  init({ defaultColor = '#999', activeIndex = 0 }) {
    this.defaultColor = defaultColor;
    this.element = document.querySelector('.cdt-step-progressbar');
    const children = Array.from(this.element.children);
    if (this.element.classList.contains('horizontal')) {
      this.element.querySelectorAll('li').forEach((item) => {
        item.style.width = `${100 / (children.length - 1)}%`;
      });
    }
    this.setActiveIndex(activeIndex);
  }

  fixActive() {
    this.element.querySelectorAll('li.active').forEach(item => item.classList.remove('fix-last-active'));
    Array.from(this.element.querySelectorAll('li.active')).slice(-1)[0].classList.add('fix-last-active');
  }

  setActiveIndex(activeIndex) {
    this.element.querySelectorAll('li')
      .forEach(item => item.classList.remove('active'));
    Array.from(this.element.children).filter((item, index) => index <= activeIndex)
      .forEach(item => item.classList.add('active'));
    this.fixActive();
  }
}

export default StepProgressBar;
