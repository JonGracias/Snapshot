function dragOverHandler(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
}

function dragLeaveHandler(event) {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');
}

function dropHandler(event) {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');
  
  const fileInput = document.getElementById('fileInput');
  fileInput.files = event.dataTransfer.files;
  
  setCurrentItem(0);
  document.getElementById('uploadForm').style.display = 'block';
}


document.addEventListener('DOMContentLoaded', function() {
  const dragContainer = document.getElementById('dragContainer');
  dragContainer.addEventListener('dragover', dragOverHandler);
  dragContainer.addEventListener('dragleave', dragLeaveHandler);
  dragContainer.addEventListener('drop', dropHandler);
});
