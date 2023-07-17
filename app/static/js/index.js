function loadNavigation() {
    $.ajax({
    type: 'GET',
    url: '/navigation', 
    success: function(response) {
        $('#navigation').html(response);
    }
    });
}


