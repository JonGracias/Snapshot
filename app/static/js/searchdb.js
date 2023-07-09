$(document).ready(function() {
    var popup = $('#searchPopup');
    var open = $('#openSearch');
    var close = $('#closeSearch');

    var search = $('#searchForm');
    var input = $('#searchInput');


    open.click(function() {
      popup.show();
      browse();
   });

    search.submit(function(event) {
      event.preventDefault();
      var query = input.val();
      if(query){
        loadSearchResults(query);
      }else{
        browse()
      }
    });


    function browse() {
      $.ajax({
        type: 'GET',
        url: '/browseDB',
        success: function(response) {
          popup.html(response);
        }
      });
    }

    function loadSearchResults(query) {
      $.ajax({
        type: 'POST',
        url: '/search',
        data: { query: query },
        success: function(response) {
          popup.html(response);
          close.show(); 
        }
      });
    }

    close.click(function() {
      popup.hide();
      open.show();
    });
});