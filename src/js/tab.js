const Tab = (() => {
  let selectedIndex = 0;
  const tabs = document.querySelectorAll('.cdt-tab');
  console.log('tabs!', tabs);
  tabs.forEach((tab) => {
    tab.querySelector('ul').querySelectorAll('li')
      .forEach((item, index) => {
        if (item.classList.contains('selected')) {
          selectedIndex = index;
          tab.querySelector('.tabs-content').children[selectedIndex]
            .classList.add('show');
        }
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          selectedIndex = index;
          tab.querySelectorAll('li').forEach(it => it.classList.remove('selected'));
          Array.from(tab.querySelector('.tabs-content').children).forEach((child, i) => {
            if (i === selectedIndex) {
              child.classList.add('show');
            } else {
              child.classList.remove('show');
            }
          });
          item.classList.add('selected');
        });
      });
  });
})();

export default Tab;
