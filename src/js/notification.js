const Notification = (() => {
  const notifications = document.querySelectorAll('.cdt-notification');
  notifications.forEach((notification) => {
    const closeBtn = notification.querySelector('.close') || notification.querySelector("[data-close='true']");
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        notification.classList.add('hide');
      });
    }
  });
})();

export default Notification;
