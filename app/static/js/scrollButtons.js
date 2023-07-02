let currentItem = 0;
const startingIndex = 1;

const dataLength = parseInt(
    document.querySelector('.scrollerLeft').getAttribute('data-length')
);
const endingIndex = dataLength - 1;

function setCurrentItem(newItem) {
  currentItem = newItem;
  updateDocTitles();
}

function updateDocTitles() {
    const titles = document.querySelectorAll('.titles');
    const dates = document.querySelectorAll('.dates');
    const tables = document.querySelectorAll('.docTablesInner');
    const counts = document.querySelectorAll('.counts');


   counts.forEach((count, index) => {
      if(index === currentItem && index >= startingIndex) {
        count.classList.add('lighter');
      } else {
        count.classList.remove('lighter')
      }
    });

    titles.forEach((title, index) => {
      if (index === currentItem) {
        title.classList.remove('hide');
      } else {
        title.classList.add('hide');
      }
    });
  
    dates.forEach((date, index) => {
      if (index === currentItem) {
        date.classList.remove('hide');
      } else {
        date.classList.add('hide');
      }
    });

    tables.forEach((table, index) => {
      if (index === currentItem) {
        table.classList.remove('hide');
      } else {
        table.classList.add('hide');
      }
    });
  }
  
  
  

function scrollLeftX() {

    if (currentItem <= startingIndex) {
        setCurrentItem(endingIndex);
    } else {
        setCurrentItem(currentItem - 1);
    }
}

function scrollRight() {
    
    if (currentItem >= endingIndex) {
        setCurrentItem(startingIndex);
    } else if(currentItem === 0){
        setCurrentItem(startingIndex);
    } else {
        setCurrentItem(currentItem + 1);
    }

}