import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/Context';
import { DownOutlined , CalendarOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import './styles/date.css';

function DateComponent() {
  const { dates } = useContext(AppContext);
  const [formattedDates, setFormattedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  

  useEffect(() => {
    setFormattedDates(dates[dates.length-1] || []);
  }, [dates]);

  const handleDateSelect = ({ key }) => {
    setSelectedDate(formattedDates[key]); // Update the selected date based on the key
    console.log(key)
  };

 
  const items = formattedDates.map((dateItem, index) => ({
    label: dateItem, 
    key: index.toString(), 
    icon: <CalendarOutlined />, 
  }));

  const menuProps = {
    items,
    onClick: handleDateSelect,
  };

  return (
    <>
    <div className='dateDropDown'>
      {formattedDates.length > 0 ? (
        <Dropdown.Button
          icon={<DownOutlined />}
          menu={menuProps}
        >
          {selectedDate || formattedDates[0]} {/* Show selected date or "Select a Date" */}
        </Dropdown.Button>
      ) : (
        <p>No available dates.</p>
      )}
      </div>
    </>
  );
}

export default DateComponent;
