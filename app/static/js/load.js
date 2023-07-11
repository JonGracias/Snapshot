var clickedItems = []; // Array to store clicked items
$(document).ready(function() {
  var load = $('#load');
  var open = $('#openLoad');
  var close = $('#closeLoad');
  var submit = $('#submit');
  
  var search = $('#searchForm');
  var input = $('#searchInput');


  open.click(function() {
    closeOthers();
    load.show();
    browse();
  });

  search.submit(function(event) {
    event.preventDefault();
    var query = input.val();
    if (query) {
      loadSearchResults(query);
    } else {
      browse();
    }
  });

  function closeOthers(){
    $('#save').hide();
    $('#navigation').hide();
  }

  function browse() {
    $.ajax({
      type: 'GET',
      url: '/browseDB',
      success: function(response) {
        load.html(response);
        $(document).ready(function() {
          attachClickHandlers();
        });
      }
    });
  }

  function loadSearchResults(query) {
    $.ajax({
      type: 'POST',
      url: '/search',
      data: { query: query },
      success: function(response) {
        load.html(response);
        attachClickHandlers(); // Attach click handlers to search results
        close.show();
      }
    });
  }

  function attachClickHandlers() {
    $('.searchItems').on('click', '.job-button', function() {
      var itemName = $(this).text().trim();

      var index = clickedItems.indexOf(itemName);

      if (index === -1) {
        clickedItems.push(itemName);
      } else {
        clickedItems.splice(index, 1);
      }

      $(this).toggleClass('selected');
      console.log(clickedItems);
    });
  }


  // add send number of tables when POST
  function setNavigation(query) {
    $.ajax({
      type: 'POST',
      url: '/navigation',
      data: { clickedItems: JSON.stringify(query) }, // Convert array to JSON string
      success: function(response) {
        $('#navigation').html(response);
      }
    });
  }
  
  submit.click(function() {
    load.hide();
    $('#navigation').show();
    console.log(clickedItems)
    setNavigation(clickedItems);
  });

  close.click(function() {
    load.hide();
    open.show();
  });
  
});
