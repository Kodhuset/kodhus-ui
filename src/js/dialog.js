const Dialog = (() => {
  const dialogTriggers = document.querySelectorAll('[data-dialog]');
  const dialogs = document.querySelectorAll('.cdt-dialog-container');

  dialogTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      document.querySelector(trigger.dataset.dialog).classList.remove('hide');
    });
  });

  dialogs.forEach((dialog) => {
    dialog.querySelector("[data-close='true']").addEventListener('click', () => {
      dialog.classList.addClass('hide');
    });
  });
})();

export default Dialog;
