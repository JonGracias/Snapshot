import '../../App.css';
import React, { useState } from 'react';
import FileBrowser from './FileBrowser';




function SideBar() {
    const [showComponent1, setShowComponent1] = useState(true);
    const toggleComponents = () => {
      setShowComponent1((prev) => !prev);
    };

    return(
        <>
        <div>
            {showComponent1 ? <FileBrowser /> : <div className="fileBrowser.close"></div>}
        </div>
        <div className="toggleFileBrowser">
            <button className='toggleBrowser' onClick={toggleComponents}>{showComponent1 ? '<' : '>'}</button>
        </div>
        </>
    );
    
}

export default SideBar;