import React, { useContext, useEffect, useState } from 'react';
import './styles/title.css';
import AppContext from '../Context/Context';

function Title() {
  const { title } = useContext(AppContext);


  return (
    <>
      <div className="docTitles">
        <div className="titles">
        {title ? (
          <h2>{title}</h2>
        ):(
          <h2>Plese Choose A File </h2>
        )}
        </div>
      </div>
    </>
  );
}

export default Title;
