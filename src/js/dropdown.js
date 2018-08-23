const Dropdown = (() => {
  const dropToggles = document.querySelectorAll('.drop-toggle');
  if (dropToggles) {
    const dropDownPadding = 4;
    dropToggles.forEach((dropToggle) => {
      const dropDown = dropToggle.nextElementSibling;
      dropToggle.addEventListener('click', (e) => {
        e.preventDefault();
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
  }
})();
export default Dropdown;
