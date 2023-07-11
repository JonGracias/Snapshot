$(document).ready(function() {
    var save = $('#save');
    var open = $('#openSave');
    var close = $('#closeSave');

    close.hide();

  
    open.click(function() {
      closeOthers();
      save.show();
      open.hide();
      close.show();
      saveDocs();
    });
  

    function closeOthers(){
      $('#load').hide();
      $('#navigation').hide();
    }


    function saveDocs() {
      $.ajax({
        type: 'GET',  
        url: '/save',
        success: function(response) {
          save.html(response);
        }
      });
    }
  
    close.click(function() {
      save.hide();
      close.hide();
      open.show();
    });
  });
  