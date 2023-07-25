import React, { useContext, useEffect, useState } from 'react';
import './styles/title.css';
import AppContext from '../Context/Context';

function Title() {
  const { title } = useContext(AppContext);


  return (
    <>
      <div className="docTitles">
        <div className="titles">
          <h2>{title}</h2>
        </div>
      </div>
    </>
  );
}

export default Title;
