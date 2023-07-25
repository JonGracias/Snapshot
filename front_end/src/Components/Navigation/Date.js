import React, { useEffect, useContext } from 'react';
import AppContext from '../Context/Context'; // Assuming you have your context here
import './styles/date.css';



function DateComponent() {
    const { int_dates } = useContext(AppContext);
  
    useEffect(() => {
      console.log("int_dates in useEffect:", int_dates);
    }, [int_dates]);
  
    return (
      <>
        <select id="dateSelector" className="dateSelector">
          {int_dates.map((date, index) => (
            <option key={index} className="dates show" value={index} data-date={date}>
              {date} {/* Show the date as a formatted string */}
            </option>
          ))}
        </select>
      </>
    );
  }
  

export default DateComponent;
