var currentItem = 0;
var dataLength = 1;
var currentDate = '';
var startingIndex = 0;

function setCurrentItem(newItem) {
    currentItem = newItem;
    updateDocTitles();
}

function setDate(newDate) {
    currentDate = newDate;
    updateDocTitles();
}

function updateCurrentDate() {
    const dateSelector = $('#dateSelector');
    const selectedDate = dateSelector.val();
    setDate(selectedDate);
}

function setDataLength(newDataLength) {
    dataLength = newDataLength;
}

function updateDocTitles() {
  const titles = $('.titles');
  const tables = $('.docTablesInner');
  const counts = $('.counts');
  const dates = $('.dates');

  const adjustedCurrentItem = currentItem % dataLength; // Adjust currentItem for different data lengths

  counts.each((index, count) => {
    const countValue = count.innerText.trim();
    if (index === adjustedCurrentItem) {
      console.log('count: ' + countValue);
      $(count).addClass('lighter');
    } else {
      $(count).removeClass('lighter');
    }
  });

  titles.each((index, title) => {
    const position = parseInt($(title).attr('position'));
    if (position === adjustedCurrentItem) {
      $(title).addClass('show');
    } else {
      $(title).removeClass('show');
    }
  });

  dates.each((index, date) => {
    const position = parseInt($(date).attr('position'));
    if (position === adjustedCurrentItem) {
      $(date).addClass('show');
      console.log('position: ' + position);
      console.log('currentItem: ' + adjustedCurrentItem);
      return false;
    } else {
      $(date).removeClass('show');
    }
  });

  tables.each((index, table) => {
    const tableDate = $(table).attr('data-date');
    const position = parseInt($(table).attr('position'));
    if (position === adjustedCurrentItem && tableDate === currentDate) {
      $(table).addClass('show');
    } else {
      $(table).removeClass('show');
    }
  });
}



function scrollLeftX() {
    if (currentItem <= 0) {
        setCurrentItem(dataLength - 1);
    } else {
        setCurrentItem(currentItem - 1);
    }
}

function scrollRight() {
    if (currentItem >= dataLength - 1) {
        setCurrentItem(startingIndex);
    } else {
        setCurrentItem(currentItem + 1);
    }
}
