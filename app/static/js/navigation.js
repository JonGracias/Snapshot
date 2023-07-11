$(document).ready(function() {
    var nav = $('#navigation');
    var open = $('#openNav');
    var close = $('#closeNav');

    close.hide();

    
    open.click(function() {
        closeOthers();
        nav.show();
        open.hide();
        close.show();
        loadNavigation(); //add query
    });

    function closeOthers(){
        $('#save').hide();
        $('#load').hide();
      }

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