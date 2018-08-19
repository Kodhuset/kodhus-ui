import Utils from './utils';

const Navigation = (() => {
  const topNav = document.querySelector('.cdt-top-nav');
  const mobileTrigger = document.querySelector('.cdt-top-nav .mobile-trigger');
  const topNavigations = document.querySelectorAll('.cdt-top-nav .navigations');
  const secondaryNav = document.querySelector('.cdt-second-nav');

  const navItems = document.querySelectorAll('.cdt-nav > li');
  const allOtherNavsCloned = [];
  const allOtherNavsParent = [];
  let secondaryNavCreated = false;

  let menuOpen = false;

  const mobileNavigation = document.createElement('div');
  mobileNavigation.classList.add('mobile-navigation');
  // const mobileNavigationNav = document.createElement('nav');
  // mobileNavigation.appendChild(mobileNavigationNav);

  /* Initial hiding of cdt-nav children */
  const navChildrenVisibility = () => {
    // const cls = (state) ? 'show' : 'hide';
    // const navChildren = document.querySelectorAll('.cdt-nav li ul');
    // navChildren.forEach((listItem) => {
    //   listItem.classList.add(cls);
    // });
  };

  const setResponsiveMenu = () => {
    const secondaryMobileNavs = document.createElement('nav');
    secondaryMobileNavs.classList.add('cdt-list', 'cdt-secondary');
    const secondaryMobileNavsUl = document.createElement('ul');
    secondaryMobileNavs.appendChild(secondaryMobileNavsUl);
    if (window.innerWidth <= Utils.desktopBreakPoint) {
      // navChildrenVisibility(false);
      const allOtherNavs = document.querySelectorAll('.cdt-nav-responsive');
      allOtherNavs.forEach((nav) => {
        allOtherNavsCloned.push(nav.cloneNode(true));
        // let parentElement = nav.parentElement;
        allOtherNavsParent.push(nav.parentElement);
      });

      if (!secondaryNavCreated) {
        topNavigations.forEach((navigation) => {
          navigation.querySelectorAll('nav').forEach(nav => mobileNavigation.appendChild(nav.cloneNode(true)));
        });
        topNav.appendChild(mobileNavigation);
        mobileNavigation.style.top = `${topNav.offsetHeight}px`;
        allOtherNavs.forEach((nav, index) => {
          nav.querySelectorAll(':scope > ul > li').forEach((item) => {
            secondaryMobileNavsUl.appendChild(item);
          });
          allOtherNavsParent[index].removeChild(allOtherNavs[index]);
        });
        mobileNavigation.appendChild(secondaryMobileNavs);
        mobileNavigation.classList.add('navigations');
        secondaryNavCreated = true;
      }
    } else {
      console.log('screen bigger than desktop', window.innerWidth, Utils.desktopBreakPoint);
      if (secondaryNav) {
        topNav.style.height = `${document.querySelectorAll('.navigations')[0].offsetHeight}px`;
      }
      if (secondaryNavCreated) {
        navChildrenVisibility(true);
        allOtherNavsParent.map((parent, index) => parent.appendChild(allOtherNavsCloned[index]));
        // secondaryMobileNavs.parentElement.removeChild(secondaryMobileNavs);
        // secondaryMobileNavs = null;
        // secondaryNavCreated = false;
        allOtherNavsCloned.length = 0;
        allOtherNavsParent.length = 0;
      }
      if (mobileNavigation) {
        mobileNavigation.classList.remove('open');
      }
      // topNavigations.forEach((navigation) => {
      //   navigation.classList.remove('hide');
      // });
      // if (secondTopNav) {
      //   secondTopNav.classList.remove('hide');
      // }
    }
  };
  if (topNavigations && topNav) {
    window.addEventListener('resize', () => {
      setResponsiveMenu();
    });
    setResponsiveMenu();
  }

  if (mobileTrigger) {
    mobileTrigger.addEventListener('click', () => {
      mobileNavigation.classList.toggle('open');
      // topNavigations.classList.toggle('show');
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

  // const topNavHideHeight = topNavScrollHide.offsetHeight;
  // let calculatedTopNavHeight = topNavHideHeight;
  // Hide on Scroll
  const topNavScrollHide = document.querySelector('.cdt-top-nav.hide-on-scroll');
  if (topNavScrollHide) {
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
