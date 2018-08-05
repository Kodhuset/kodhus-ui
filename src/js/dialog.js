const Dialog = (() => {
  const dialogTriggers = document.querySelectorAll('[data-dialog]');
  const dialogs = document.querySelectorAll('.cdt-dialog-container');

  dialogTriggers.forEach((trigger) => {
      trigger.addEventListener('click', function() {
          document.querySelector(trigger.dataset.dialog).classList.add('show');
      });
  });

  dialogs.forEach((dialog) => {
      dialog.querySelector("[data-close='true']").addEventListener('click', function() {
          dialog.classList.remove('show');
      });
  });
})();

export default Dialog;