var fileBrowser = $('#fileBrowser');
var openBrowser = document.querySelector(".openBrowser");
var closeBrowser = document.querySelector(".closeBrowser");


function openSidebar(){
    fileBrowser.show();
    openBrowser.classList.remove('show');
    closeBrowser.classList.remove('hide');
}

function closeSidebar(){
    fileBrowser.hide();
    openBrowser.classList.add('show');
    closeBrowser.classList.add('hide');
}
  