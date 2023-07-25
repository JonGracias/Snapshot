
var currentIndex = 0;

// Function to replace the content of the current table with new data
function addNewTable() {
    console.log(currentIndex)

    const currentTable = document.getElementById('table');
    const dateSelector = document.getElementById('dateSelector');
    const selectedIndex = dateSelector.value;
    var newDate = dates[currentIndex][selectedIndex];
    const newTableContent = int_dict[currentIndex][newDate]['table'];

 
    currentTable.innerHTML = newTableContent;

    // Update the "light" CSS property in the countContainer
    const countContainers = document.querySelectorAll('.docCounter');
    for (let i = 0; i < countContainers.length; i++) {
        const countContainer = countContainers[i];
        const counts = countContainer.querySelector('.counts');
        counts.classList.remove('lighter');
        if (i === currentIndex) {
            counts.classList.add('lighter');
        }
    }
}

function updateCurrentDate() {
    const dateSelector = document.getElementById('dateSelector');
    const selectedIndex = dateSelector.value;
    const selectedOption = dateSelector.options[selectedIndex];
    selectedDate = selectedOption.getAttribute('data-date');
    addNewTable(); // Update the table when the date changes
}

// Function to scroll to the previous table
function left() {
    if (currentIndex > 0) {
        currentIndex -= 1;
        addNewTable();
    }
}

// Function to scroll to the next table
function right() {
    const maxIndex = Object.keys(int_dict).length - 1;
    if (currentIndex < maxIndex) {
        currentIndex += 1;
        addNewTable();
    }
}