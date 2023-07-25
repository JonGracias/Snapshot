var clickedItems = []; // Array to store clicked items
var load = $('#load');
var close = $('#closeLoad');
var submit = $('#submit');
var search = $('#searchForm');
var input = $('#searchInput');

$(document).ready(function() {
  search.submit(function(event) {
    event.preventDefault();
    console.log('i is searching -onSubmit');
    var query = input.val();
    if (query) {
      loadSearchResults(query);
    } else {
      browse();
    }
  });
});

// For load.html where the documents are listed.
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

// For load.html when a search is input
function loadSearchResults(query) {
  $.ajax({
    type: 'POST',
    url: '/search',
    data: { query: query },
    success: function(response) {
      load.html(response);
      attachClickHandlers();
      close.show();
    }
  });
}

function attachClickHandlers() {
  $('.results').on('click', '.job-button', function() {
    var itemName = $(this).text().trim();
    var index = clickedItems.indexOf(itemName);
    if (index === -1) {
      clickedItems.push(itemName);
    } else {
      clickedItems.splice(index, 1);
    }
    $(this).toggleClass('selected');
    navChannel(clickedItems);
    console.log(clickedItems);
  });
}

function isQuery(query) {
  return Array.isArray(query) && query.length > 0;
}

function navChannel(query) {
  setNavigation(query);
}

// When a user clicks on an item in load.html
function setNavigation(query) {
  $.ajax({
    type: 'POST',
    url: '/navigation',
    data: { clickedItems: JSON.stringify(query) },
    success: function(response) {
      $('#navigation').html(response);

    }
  });
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
