$(document).ready(function() {
    var popup = $('#uploadPopup');
    var open = $('#openUpload');
    var close = $('#closeUpload');

    close.hide();
  
    open.click(function() {
      popup.show();
      open.hide();
      close.show();
      loadUpload();
    });
  
    function loadUpload() {
      $.ajax({
        type: 'GET',  
        url: '/save',
        success: function(response) {
          popup.html(response);
        }
      });
    }
  
    close.click(function() {
      popup.hide();
      close.hide();
      open.show();
    });
  });
  