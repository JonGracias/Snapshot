import './styles/save.css';


function Save() {
    return (
      <>
        <div className="fileUploader">
            <div className='intro'>
                <h1>File Upload</h1>
            </div>
            <div className='dragAndDrop'>
                <p>Drag and drop a file here</p>
            </div>
            <form
                id="uploadForm"
                action="/upload"
                method="POST"
                className="file"
                encType="multipart/form-data"
            >
                <input id="fileInput" type="file" name="file" className="fileItem" />
                <label htmlFor="dateInput" className="fileItem">
                Date (MM/YYYY):
                </label>
                <input
                type="text"
                id="dateInput"
                name="dateInput"
                pattern="\d{2}/\d{4}"
                required
                className="fileItem"
                />
                <div className='uploadButtonContainer'>
                    <input type="submit" value="Upload" className="uploadButton" />
                </div>
            </form>
        </div>
      </>
    );
  }
  
  export default Save;
  