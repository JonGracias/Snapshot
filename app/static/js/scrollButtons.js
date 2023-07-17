var currentItem = 0;
var button = document.querySelector('.scrollerRight');
var dataLength = 1;
var currentDate = ''
var startingIndex = 0;

function setCurrentItem(newItem) {
  console.log('setCurrentItem')
  currentItem = newItem;
  updateDocTitles();
}
function setDate(newDate) {
  currentDate = newDate;
  updateDocTitles();
}

function updateCurrentDate() {
  const dateSelector = document.getElementById('dateSelector');
  const selectedDate = dateSelector.value;
  setDate(selectedDate);
}

function setDataLength(newDataLength) {
  dataLength = newDataLength;
}

function updateDocTitles() {
  console.log(currentItem + 'currentItem');
  const titles = document.querySelectorAll('.titles');
  const tables = document.querySelectorAll('.docTablesInner');
  const counts = document.querySelectorAll('.counts');
  const dates  = document.querySelectorAll('.dates')

  counts.forEach((count, index) => {
    if (index === currentItem) {
      count.classList.add('lighter');
    } else {
      count.classList.remove('lighter');
    }
  });

  titles.forEach((title) => {
    const position = parseInt(title.getAttribute('position'));
    if(dataLength === 1){
      currentItem = position
    }

    if (position === currentItem) {
      title.classList.add('show');
    } else {
      title.classList.remove('show');
    }
  });

  dates.forEach((date) => {
    const position = parseInt(date.getAttribute('position'));
    if(dataLength === 1){
      currentItem = position
    }
    if (position === currentItem) {
      date.classList.add('show');
    } else {
      date.classList.remove('show');
    }
  });

  tables.forEach((table) => {
    const tableDate = table.getAttribute('data-date');
    const position = parseInt(table.getAttribute('position'));
    if(dataLength === 1){
      currentItem = position
    }
    if (position === currentItem && tableDate === currentDate) {
      table.classList.add('show');
    } else {
      table.classList.remove('show');
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
    if (currentItem >= dataLength-1) {
      setCurrentItem(startingIndex);
    } else {
      setCurrentItem(currentItem + 1);
  }

}