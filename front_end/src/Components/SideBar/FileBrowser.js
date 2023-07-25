import '../../App.css';
import React, { useState } from 'react';
import Browse from './Browse';
import Save from './Save';



function FileBrowser() {
    const [showComponent1, setShowComponent1] = useState(true);
    const toggleComponents = () => {
      setShowComponent1((prev) => !prev);
    };

    return(
        <>
            <div id="load" className="fileBrowser">
                <form id="searchForm">
                    <input type="text" id="searchInput" placeholder="Search..."></input>
                    <input type="submit" value="Search"></input>
                </form>
                <div id="load" className="browser">
                    {showComponent1 ? <Browse /> : <Save />}
                </div>
                
                <div className='toggleBrowserContainer'>
                    <button className='toggleBrowser' onClick={toggleComponents}>Toggle {showComponent1 ?  'Save' : 'Browse'}</button>
                </div>
            </div>
        </>
    );
    
}

export default FileBrowser;