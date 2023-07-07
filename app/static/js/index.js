$(document).ready(function() {
    var popup = $('#uploadPopup');
    var open = $('#openPopup');
    var close = $('#closePopup');

    close.hide(); // Hide the close button initially
  
    open.click(function() {
      popup.show();
      open.hide();
      close.show();
      loadUpload();
    });
  
    function loadUpload() {
      $.ajax({
        type: 'GET',  // Use GET to retrieve the HTML
        url: '/file_upload',
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
  