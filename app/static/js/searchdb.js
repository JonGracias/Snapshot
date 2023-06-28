$(document).ready(function() {
    var popup = $('#searchPopup');

    $('#searchForm').submit(function(event) {
      event.preventDefault(); // Prevent form submission
      var query = $('#searchInput').val();
      popup.show();
      loadSearchResults(query);
    });

    $('#searchInput').on('input', function() {
      var query = $(this).val();
      loadSearchResults(query);
    });

    function loadSearchResults(query) {
      $.ajax({
        type: 'POST',
        url: '/search',
        data: { query: query },
        success: function(response) {
          popup.html(response);
        }
      });
    }

    $('#closePopup').click(function() {
      popup.hide();
    });
});