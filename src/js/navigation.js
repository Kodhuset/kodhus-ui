import Utils from './utils';

const Navigation = (() => {
  const mobileTrigger = document.querySelector('.cdt-top-nav .mobile-trigger');
  const topNavigations = document.querySelector('.cdt-top-nav .navigations');
  const navItems = document.querySelectorAll('.cdt-nav > li');
  const allOtherNavsCloned = [];
  const allOtherNavsParent = [];
  let secondaryNavCreated = false;
  let secondaryMobileNavs;

  const setResponsiveMenu = () => {
      if (window.innerWidth <= Utils.tabletPhoneBreakpoint) {
          navChildrenVisibility(false);
          const allOtherNavs = document.querySelectorAll('.cdt-nav-responsive');
          allOtherNavs.forEach((nav) => {
              allOtherNavsCloned.push(nav.cloneNode(true));
              let parentElement = nav.parentElement;
              allOtherNavsParent.push(nav.parentElement);
          });
          if (!secondaryNavCreated) {
              secondaryMobileNavs = document.createElement('div');
              const secondaryMobileNavsUl = document.createElement('ul');
              secondaryMobileNavs.appendChild(secondaryMobileNavsUl);
              secondaryMobileNavs.classList.add('cdt-secondary', 'cdt-list');
              topNavigations.querySelector('nav').appendChild(secondaryMobileNavs);
              allOtherNavs.forEach((nav, index) => {
                  
                  nav.querySelectorAll(':scope > ul > li').forEach((item) => {
                      secondaryMobileNavsUl.appendChild(item);
                  });
                  allOtherNavsParent[index].removeChild(allOtherNavs[index]);
              });
              secondaryNavCreated = true;
          }
      } else {
          if (secondaryNavCreated) {
              navChildrenVisibility(true);
              allOtherNavsParent.map((parent, index) => {
                  parent.appendChild(allOtherNavsCloned[index]);
              });
              secondaryMobileNavs.parentElement.removeChild(secondaryMobileNavs);
              secondaryMobileNavs = null;
              secondaryNavCreated = false;
              allOtherNavsCloned.length = 0;
              allOtherNavsParent.length = 0;
          }   
      }
  }
  if (topNavigations) {
      window.addEventListener('resize', () => {
          setResponsiveMenu();
      });
      setResponsiveMenu();
  }

  if (mobileTrigger) {
      mobileTrigger.addEventListener('click', (e) => {
          e.target.classList.toggle('open');
          topNavigations.classList.toggle('show');
      });
  }

  /* Initial hiding of cdt-nav children */
  const navChildrenVisibility = (state) => {
      const cls = (state) ? 'show' : 'hide';
      const navChildren = document.querySelectorAll('.cdt-nav li ul');
      navChildren.forEach((listItem, index) => {
          listItem.classList.add(cls);
      });
  }

  navItems.forEach((listItem, index) => {
      listItem.addEventListener('click', () => {
          navChildren.forEach((listItem, index) => {
              listItem.classList.add('hide');
          });
          listItem.querySelector('ul').classList.remove('hide');
      });
  });

  /* cdt-nav list ul child selected */
  const childListItems = document.querySelectorAll('.cdt-list li ul .cdt-list-item');
  childListItems.forEach((listItem, index) => {
      listItem.addEventListener('click', () => {
          childListItems.forEach((item, i) => {
              item.classList.remove('selected')
          });
          listItem.classList.add('selected');
      });
  });
})();

export default Navigation;