import React from 'react';
import './styles/navigation.css';
import Title from './Title';
import Count from './Count';
import DateComponent from './Date'; 
import Tables from './Tables';

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
            <Tables />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
