$(document).ready(function() {
    var nav = $('#navigation');
    var open = $('#openNav');
    var close = $('#closeNav');

    
    close.hide();
    
    // Here add code to find number of tables user has clicked to send
    /*     $('#searchForm').submit(function(event) {
      event.preventDefault(); // Prevent form submission
      var query = $('#searchInput').val();
      popup.show();
      loadSearchResults(query);
    }); */

    // to /navigation will also need names or _id to query mongodb
    
    open.click(function() {
        nav.show();
        open.hide();
        close.show();
        loadNavigation(); //add query
    });

    function loadNavigation() {
        $.ajax({
        type: 'GET',  // Use POST? to retrieve the HTML
        url: '/navigation', 
        // data:{ query: query },
        success: function(response) {
            nav.html(response);
        }
        });
    }

    close.click(function() {
        nav.hide();
        close.hide();
        open.show();
        });
});