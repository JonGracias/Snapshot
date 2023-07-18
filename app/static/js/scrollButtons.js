var currentItem = 0;
var button = $('.scrollerRight');
var dataLength = 1;
var currentDate = '';
var startingIndex = 0;

function setCurrentItem(newItem) {
    console.log('setCurrentItem');
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
    console.log(currentItem + 'currentItem');
    const titles = $('.titles');
    const tables = $('.docTablesInner');
    const counts = $('.counts');
    const dates = $('.dates');

    counts.each((index, count) => {
        if (index === currentItem) {
            $(count).addClass('lighter');
        } else {
            $(count).removeClass('lighter');
        }
    });

    titles.each((index, title) => {
        const position = parseInt($(title).attr('position'));
        if (dataLength === 1) {
            currentItem = position;
        }

        if (position === currentItem) {
            $(title).addClass('show');
        } else {
            $(title).removeClass('show');
        }
    });

    dates.each((index, date) => {
        const position = parseInt($(date).attr('position'));
        if (dataLength === 1) {
            currentItem = position;
        }
        if (position === currentItem) {
            $(date).addClass('show');
        } else {
            $(date).removeClass('show');
        }
    });

    tables.each((index, table) => {
        const tableDate = $(table).attr('data-date');
        const position = parseInt($(table).attr('position'));
        if (dataLength === 1) {
            currentItem = position;
        }
        if (position === currentItem && tableDate === currentDate) {
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
