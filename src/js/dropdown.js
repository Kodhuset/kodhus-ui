const Dropdown = (() => {
  const dropToggles = document.querySelectorAll('.drop-toggle');
  if (dropToggles) {
    const dropDownPadding = 4;
    dropToggles.forEach((dropToggle) => {
      const dropDown = dropToggle.nextElementSibling;
      dropDown.querySelectorAll('li').forEach((item) => {
        item.addEventListener('click', () => {
          dropDown.classList.toggle('open');
        });
      });
      dropToggle.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        const dropToggleRect = dropToggle.getBoundingClientRect();
        let topPosition;
        let leftPosition;
        if (dropDown.offsetHeight + dropToggleRect.bottom + dropDownPadding < window.innerHeight) {
          topPosition = dropToggle.offsetHeight + dropDownPadding;
        } else {
          topPosition = -(dropDown.offsetHeight + dropDownPadding);
        }
        if (dropDown.offsetWidth + dropToggleRect.left < window.innerWidth) {
          leftPosition = 0;
        } else {
          leftPosition = -dropDown.offsetWidth + dropToggle.offsetWidth;
        }
        dropDown.style.transform = `translate3d(${leftPosition}px, ${topPosition}px, 0)`;
        dropDown.classList.toggle('open');
      });
    });
    // close dropdowns if clicked outside
    document.addEventListener('click', () => {
      dropToggles.forEach((dropToggle) => {
        dropToggle.nextElementSibling.classList.remove('open');
      });
    });
  }
})();
export default Dropdown;
