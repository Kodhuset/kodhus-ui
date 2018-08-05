import Dialog from './dialog';
import Notification from './notification';
import Navigation from './navigation';
import Aiv from './aiv';
import BGParallax from './bg-parallax';
import Carousel from './carousel';

(() => {
  document.querySelectorAll('pre code').forEach(function(block, i) {
      hljs.highlightBlock(block);
  });
})();

export { Dialog, Notification, Navigation, Aiv, BGParallax, Carousel };