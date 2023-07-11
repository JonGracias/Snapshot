let currentItem = 0;
var button = document.querySelector('.scrollerRight');
var dataLength = button.getAttribute('data-length');
let currentDate = ''
const startingIndex = 0;

function setCurrentItem(newItem) {
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
  console.log(dataLength);
}

function updateDocTitles() {
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

  titles.forEach((title, index) => {
    const position = parseInt(title.getAttribute('position'));
    if (position === currentItem) {
      title.classList.remove('hide');
    } else {
      title.classList.add('hide');
    }
  });

  dates.forEach((date, index) => {
    const position = parseInt(date.getAttribute('position'));
    if (position === currentItem) {
      date.classList.remove('hide');
      //This is broken
/*       date.selected = true; // Select the date associated with currentItem
      currentDate = date.value; // Update currentDate with the selected date */
    } else {
      date.classList.add('hide');
    }
  });

  tables.forEach((table, index) => {
    const tableDate = table.getAttribute('data-date');
    const position = parseInt(table.getAttribute('position'));
    if (position === currentItem && tableDate === currentDate) {
      table.classList.remove('hide');
    } else {
      table.classList.add('hide');
    }
  });
}


function scrollLeftX() {

    if (currentItem === 0) {
        setCurrentItem(dataLength - 1);
        console.log('here I am')
    } else {
        setCurrentItem(currentItem - 1);
    }
    console.log(dataLength + 'datalength')
    console.log(currentItem)
}

function scrollRight() {
    
    if (currentItem === dataLength-1) {
        setCurrentItem(startingIndex);
    } else {
        setCurrentItem(currentItem + 1);
    }
    console.log(currentItem)

}