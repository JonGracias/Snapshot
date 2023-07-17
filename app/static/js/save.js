var save = $('#save');
var open = $('#openSave');
var close = $('#closeSave');

function startSave(){
  close.hide();
}
function openSave() {
  save.show();
  open.hide();
  close.show();
  saveDocs();
};

function saveDocs() {
  $.ajax({
    type: 'GET',  
    url: '/save',
    success: function(response) {
      save.html(response);
    }
  });
}

function closeSave() {
  save.hide();
  close.hide();
  open.show();
};


  