var save = $('#save');
var open = $('#openSave');
var close = $('#closeSave');
var dateInput = $('#dateInput');
var loadBrowser = $('#load')

function openSave() {
  loadBrowser.hide();
  save.show();
  open.hide();
  close.show();
  saveDocs();
}

function closeSave() {
  loadBrowser.show();
  save.hide();
  close.hide();
  open.show();
  // Disable the dateInput field
  dateInput.prop('disabled', true);
}
