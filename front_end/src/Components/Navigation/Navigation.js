import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/navigation.css';
import Title from './Title';
import Count from './Count';
import DateComponent from './Date'; 
import Display from './Display';

function Navigation() {


  return (
    <>
      <div className='tableDisplay'>
        <div className="navi">
          <div className='titlesContainer'>
            <Title />
          </div>
          <div className='datesContainer'>
            <DateComponent />
          </div>
          <div id='countContainer' className='countContainer'>
            <Count />
          </div>
          <div className='displayContainer'>
            <Display />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
