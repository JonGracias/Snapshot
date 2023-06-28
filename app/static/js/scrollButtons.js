let currentItem = 1;

function setCurrentItem(newItem) {
  currentItem = newItem;
  updateCountDiv();
  updateDocTitles();
}

function updateCountDiv() {
  const countDivs = document.getElementsByClassName('countDiv');
  for (let i = 0; i < countDivs.length; i++) {
    if (i + 1 === currentItem) {
      countDivs[i].classList.add('lighter');
    } else {
      countDivs[i].classList.remove('lighter');
    }
  }
}

function updateDocTitles() {
    const titleContainers = document.querySelectorAll('.title');
    const dateContainers = document.querySelectorAll('.date');
    const tableContainers = document.querySelectorAll('.tables');
  
    titleContainers.forEach((titleContainer, index) => {
      if (index + 1 === currentItem) {
        titleContainer.classList.remove('hide');
      } else {
        titleContainer.classList.add('hide');
      }
    });
  
    dateContainers.forEach((dateContainer, index) => {
      if (index + 1 === currentItem) {
        dateContainer.classList.remove('hide');
      } else {
        dateContainer.classList.add('hide');
      }
    });

    tableContainers.forEach((tableContainer, index) => {
      if (index + 1 === currentItem) {
        tableContainer.classList.remove('hide');
      } else {
        tableContainer.classList.add('hide');
      }
    });
  }
  
  
  

function scrollLeftX() {
  const projectContainer = document.getElementById('ssInputPanel');
  const dataLength = parseInt(
    document.querySelector('.scrollerLeft').getAttribute('data-length')
  );

  const titlesContainer = document.getElementById('titlesContainer');
  const dateContainer = document.getElementById('dateContainer');
  const titlesWidth = titlesContainer.offsetWidth;
  const dateWidth = dateContainer.offsetWidth;

  if (currentItem === 1) {
    projectContainer.scrollLeft = projectContainer.scrollWidth;
    titlesContainer.scrollLeft = titlesContainer.scrollWidth;
    dateContainer.scrollLeft = dateContainer.scrollWidth;
    setCurrentItem(dataLength);
  } else {
    const tables = projectContainer.getElementsByClassName('tablesContainer');
    const currentTable = tables[currentItem - 2];
    const tableWidth = currentTable.offsetWidth;
    projectContainer.scrollLeft = projectContainer.scrollLeft - tableWidth;
    titlesContainer.scrollLeft = titlesContainer.scrollLeft - titlesWidth;
    dateContainer.scrollLeft = dateContainer.scrollLeft - dateWidth;
    setCurrentItem(currentItem - 1);
  }
  console.log(currentTable)
}

function scrollRight() {
  const projectContainer = document.getElementById('ssInputPanel');
  const scrollLeft = projectContainer.scrollLeft;
  const dataLength = parseInt(
    document.querySelector('.scrollerLeft').getAttribute('data-length')
  );
  const tables = projectContainer.getElementsByClassName('tablesContainer');
  const currentTable = tables[currentItem - 1];
  const tableWidth = currentTable.offsetWidth;

  const titlesContainer = document.getElementById('titlesContainer');
  const dateContainer = document.getElementById('dateContainer');
  const titlesWidth = titlesContainer.offsetWidth;
  const dateWidth = dateContainer.offsetWidth;

  if (currentItem === dataLength) {
    projectContainer.scrollLeft = 0;
    titlesContainer.scrollLeft = 0;
    dateContainer.scrollLeft = 0;
    setCurrentItem(1);
  } else {
    projectContainer.scrollLeft = scrollLeft + tableWidth;
    titlesContainer.scrollLeft = scrollLeft + titlesWidth;
    dateContainer.scrollLeft = scrollLeft + dateWidth;
    setCurrentItem(currentItem + 1);
  }
  console.log(currentItem)
}

/* // Add this code after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  const titlesContainer = document.querySelector('.titlesContainer');

  // Attach the scroll event listener to the titlesContainer
  titlesContainer.addEventListener('scroll', handleScroll);
}); */
