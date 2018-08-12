import Utils from './utils';

const Navigation = (() => {
  const mobileTrigger = document.querySelector('.cdt-top-nav .mobile-trigger');
  const topNavigations = document.querySelector('.cdt-top-nav .navigations');
  const navItems = document.querySelectorAll('.cdt-nav > li');
  const allOtherNavsCloned = [];
  const allOtherNavsParent = [];
  let secondaryNavCreated = false;
  let secondaryMobileNavs;
  let menuOpen = false;

  /* Initial hiding of cdt-nav children */
  const navChildrenVisibility = (state) => {
    const cls = (state) ? 'show' : 'hide';
    const navChildren = document.querySelectorAll('.cdt-nav li ul');
    navChildren.forEach((listItem) => {
      listItem.classList.add(cls);
    });
  };

  const setResponsiveMenu = () => {
    if (window.innerWidth <= Utils.tabletPhoneBreakpoint) {
      navChildrenVisibility(false);
      const allOtherNavs = document.querySelectorAll('.cdt-nav-responsive');
      allOtherNavs.forEach((nav) => {
        allOtherNavsCloned.push(nav.cloneNode(true));
        // let parentElement = nav.parentElement;
        allOtherNavsParent.push(nav.parentElement);
      });
      if (!secondaryNavCreated) {
        secondaryMobileNavs = document.createElement('div');
        const secondaryMobileNavsUl = document.createElement('ul');
        secondaryMobileNavs.appendChild(secondaryMobileNavsUl);
        secondaryMobileNavs.classList.add('cdt-secondary', 'cdt-list');
        topNavigations.querySelector('nav').appendChild(secondaryMobileNavs);
        const secondTopNav = document.querySelector('.cdt-second-nav');
        if (secondTopNav) {
          secondTopNav.querySelectorAll('ul li').forEach(item => secondaryMobileNavsUl.appendChild(item));
          secondTopNav.style.display = 'none';
        }
        allOtherNavs.forEach((nav, index) => {
          nav.querySelectorAll(':scope > ul > li').forEach((item) => {
            secondaryMobileNavsUl.appendChild(item);
          });
          allOtherNavsParent[index].removeChild(allOtherNavs[index]);
        });
        secondaryNavCreated = true;
      }
    } else if (secondaryNavCreated) {
      navChildrenVisibility(true);
      allOtherNavsParent.map((parent, index) => parent.appendChild(allOtherNavsCloned[index]));
      secondaryMobileNavs.parentElement.removeChild(secondaryMobileNavs);
      secondaryMobileNavs = null;
      secondaryNavCreated = false;
      allOtherNavsCloned.length = 0;
      allOtherNavsParent.length = 0;
    }
  };
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
      menuOpen = !menuOpen;
    });
  }

  navItems.forEach((listItem) => {
    const navChildren = document.querySelectorAll('.cdt-nav li ul');
    listItem.addEventListener('click', () => {
      navChildren.forEach((lsItem) => {
        lsItem.classList.add('hide');
      });
      listItem.querySelector('ul').classList.remove('hide');
    });
  });

  /* cdt-nav list ul child selected */
  const childListItems = document.querySelectorAll('.cdt-list li ul .cdt-list-item');
  childListItems.forEach((listItem) => {
    listItem.addEventListener('click', () => {
      childListItems.forEach((item) => {
        item.classList.remove('selected');
      });
      listItem.classList.add('selected');
    });
  });

  // Hide on Scroll
  const topNavScrollHide = document.querySelector('.cdt-top-nav.hide-on-scroll');
  if (topNavScrollHide) {
    const secondaryNav = document.querySelector('.cdt-second-nav');
    const topNavHideHeight = topNavScrollHide.offsetHeight;
    let calculatedTopNavHeight = topNavHideHeight;
    if (secondaryNav) {
      calculatedTopNavHeight = topNavHideHeight - secondaryNav.offsetHeight;
      topNavScrollHide.style.height = `${calculatedTopNavHeight}px`;
    }
    const hideOnScrollOffsetTop = '60';
    let isVisible = true;

    let lastKnownScrollPosition = 0;
    let ticking = false;
    let previousScrollY = 0;

    const showHideNav = (scrollPos) => {
      if (scrollPos > previousScrollY) {
        if (isVisible && scrollPos > hideOnScrollOffsetTop) {
          isVisible = false;
          topNavScrollHide.style.transition = 'transform 400ms ease-out';
          topNavScrollHide.style.transform = 'translateY(-100%)';
        }
      } else if (!isVisible) {
        topNavScrollHide.style.transition = 'transform 400ms ease-out';
        topNavScrollHide.style.transform = 'translateY(0)';
        isVisible = true;
      }
      previousScrollY = scrollPos;
    };
    if (!menuOpen) {
      window.addEventListener('scroll', () => {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            showHideNav(lastKnownScrollPosition);
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  }
})();

export default Navigation;
