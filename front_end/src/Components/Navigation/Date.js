import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../Context/Context';
import { DownOutlined , CalendarOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import './styles/date.css';

function DateComponent() {
  const { dates, setCurrentDateIndex, currentIndex, currentDateIndex } = useContext(AppContext);
  const [formattedDates, setFormattedDates] = useState([]);
  

  useEffect(() => {
    setFormattedDates(dates[currentIndex] || []);
  }, [currentIndex]);

  const handleDateSelect = ({ key }) => {
    setCurrentDateIndex(key)
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
          {formattedDates[currentDateIndex]} {/* Show selected date or "Select a Date" */}
        </Dropdown.Button>
      ) : (
        <p>No available dates.</p>
      )}
      </div>
    </>
  );
}

export default DateComponent;
