const Dialog = (() => {
  const dialogTriggers = document.querySelectorAll('[data-dialog]');
  const dialogs = document.querySelectorAll('.cdt-dialog-container');

  dialogTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      document.querySelector(trigger.dataset.dialog).classList.remove('hide');
    });
  });

  dialogs.forEach(dialog => dialog.querySelectorAll("[data-close='true']")
    .forEach(closeTrigger => closeTrigger.addEventListener('click', () => dialog.classList.add('hide'))));
})();

export default Dialog;
