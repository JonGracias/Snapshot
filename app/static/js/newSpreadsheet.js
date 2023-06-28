

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

  // Handle the dropped file here
  var file = event.dataTransfer.files[0];
  console.log('File dropped:', file.name);

  sanitizeAndUpload(file);
}

function default_file(filePath){
    const formData = new FormData();
    formData.append('file', filePath);
  
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.log('Error uploading file');
        }
      })
      .catch(error => {
        console.log('Error uploading file:', error);
      });
  }
  


function sanitizeAndUpload(file) {
  
    const formData = new FormData();
    formData.append('file', file); // Convert JSON to a string before appending

    // Use fetch API to send the data to the server
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.log('Error uploading file');
        }
      })
      .catch(error => {
        console.log('Error uploading file:', error);
      });

}
